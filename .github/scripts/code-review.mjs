/**
 * Review de PR: publica um comentário sticky com status de CI
 * e, se houver secret, um parecer gerado por modelo.
 *
 * Secrets opcionais: OPENAI_API_KEY ou ANTHROPIC_API_KEY.
 * Nunca imprime o valor dos secrets.
 */
import { readFileSync } from "node:fs";

const MARKER = "<!-- automated-code-review -->";
const DIFF_CHAR_LIMIT = 80_000;

const githubToken = requiredEnv("GITHUB_TOKEN");
const repository = requiredEnv("GITHUB_REPOSITORY");
const eventPath = requiredEnv("GITHUB_EVENT_PATH");
const event = JSON.parse(readFileSync(eventPath, "utf8"));
const pullRequest = event.pull_request;

if (!pullRequest) {
  console.log("Evento sem pull_request. Encerrando sem falha.");
  process.exit(0);
}

const [owner, repo] = repository.split("/");
const prNumber = pullRequest.number;
const apiBase = `https://api.github.com/repos/${owner}/${repo}`;

const ci = {
  lint: process.env.FRONTEND_LINT ?? "skipped",
  typecheck: process.env.FRONTEND_TYPECHECK ?? "skipped",
  tests: process.env.FRONTEND_TESTS ?? "skipped",
  build: process.env.FRONTEND_BUILD ?? "skipped",
};

const statusLine = (label, outcome) => {
  if (outcome === "success") return `✅ ${label}`;
  if (outcome === "failure") return `❌ ${label}`;
  return `⏭️ ${label} (skipped)`;
};

const ciFailed = ["lint", "typecheck", "build"].some((key) => ci[key] === "failure");

const rules = readFileSync(new URL("../CODE_REVIEW.md", import.meta.url), "utf8");

const diff = await fetchPullDiff();
const truncatedDiff =
  diff.length > DIFF_CHAR_LIMIT
    ? `${diff.slice(0, DIFF_CHAR_LIMIT)}\n\n[diff truncado]`
    : diff;

let modelBody = "";
let modelError = "";
let usedModel = false;

try {
  if (process.env.ANTHROPIC_API_KEY) {
    usedModel = true;
    modelBody = await reviewWithAnthropic(rules, truncatedDiff);
  } else if (process.env.OPENAI_API_KEY) {
    usedModel = true;
    modelBody = await reviewWithOpenAI(rules, truncatedDiff);
  }
} catch (error) {
  modelError = error instanceof Error ? error.message : "falha ao chamar o modelo";
  console.error("Review por modelo falhou:", modelError);
}

const comment = buildComment({
  ci,
  ciFailed,
  usedModel,
  modelBody,
  modelError,
});

await upsertComment(comment);

const modelHasBlocker = usedModel && hasBlocker(modelBody);

if (ciFailed || modelHasBlocker) {
  console.error("Code review encontrou BLOCKER ou CI falhou.");
  process.exit(1);
}

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Variável ${name} ausente.`);
  }
  return value;
}

function hasBlocker(markdown) {
  const match = markdown.match(
    /🔴\s*BLOCKER\s*([\s\S]*?)(?=🟠|🟡|🔵|### |## |$)/i,
  );
  if (!match) return false;

  const items = [...match[1].matchAll(/^\s*[-*]\s+(.+)$/gm)].map((item) =>
    item[1].trim().toLowerCase(),
  );

  return items.some(
    (item) => item && !/^(nenhum.*|none.*|n\/a|—|-)$/i.test(item),
  );
}

function buildComment({ ci, ciFailed, usedModel, modelBody, modelError }) {
  const status = [
    statusLine("Lint", ci.lint),
    statusLine("Typecheck", ci.typecheck),
    statusLine("Tests", ci.tests),
    statusLine("Build", ci.build),
  ].join("\n");

  const ciFindings = [];
  if (ci.lint === "failure") {
    ciFindings.push("* Lint falhou no `frontend/` (`npm run lint`).");
  }
  if (ci.typecheck === "failure") {
    ciFindings.push("* Typecheck falhou no `frontend/` (`npx tsc -b`).");
  }
  if (ci.build === "failure") {
    ciFindings.push("* Build falhou no `frontend/` (`npx vite build`).");
  }

  let body = `${MARKER}
## 🤖 Automated Code Review

### Status

${status}
`;

  if (ci.tests === "skipped") {
    body += `\n_Tests skipped: o frontend ainda não tem script de teste no package.json._\n`;
  }

  if (ciFailed) {
    body += `
### Findings (CI)

🔴 BLOCKER
${ciFindings.join("\n")}
`;
  }

  if (usedModel && modelBody) {
    body += `\n${stripDuplicateHeading(modelBody)}\n`;
  } else if (usedModel && modelError) {
    body += `\n_Review por modelo não pôde ser concluído._\n`;
  } else {
    body += `\n_Review por modelo não executado. Para habilitar, configure o secret \`OPENAI_API_KEY\` ou \`ANTHROPIC_API_KEY\`._\n`;
  }

  if (!ciFailed && !usedModel) {
    body += `
## ✅ No significant issues found

Nenhum problema relevante foi detectado automaticamente além do status de CI. Isso não significa que o código está livre de bugs.
`;
  }

  return body.trim() + "\n";
}

function stripDuplicateHeading(markdown) {
  return markdown.replace(/^## 🤖 Automated Code Review\s*/m, "").trim();
}

async function github(path, { method = "GET", accept, body } = {}) {
  const headers = {
    Authorization: `Bearer ${githubToken}`,
    Accept: accept ?? "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (body) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${apiBase}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`GitHub API ${method} ${path} → ${response.status}`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("json")) {
    return response.json();
  }
  return response.text();
}

async function fetchPullDiff() {
  return github(`/pulls/${prNumber}`, {
    accept: "application/vnd.github.diff",
  });
}

async function upsertComment(body) {
  const comments = await github(`/issues/${prNumber}/comments?per_page=100`);
  const previous = comments.find((comment) => comment.body?.includes(MARKER));

  if (previous) {
    await github(`/issues/comments/${previous.id}`, {
      method: "PATCH",
      body: { body },
    });
    return;
  }

  await github(`/issues/${prNumber}/comments`, {
    method: "POST",
    body: { body },
  });
}

function userPrompt(rules, diffText) {
  return `Siga as regras abaixo à risca.

${rules}

---

PR #${prNumber}: ${pullRequest.title}

Descrição:
${pullRequest.body ?? "(sem descrição)"}

---

Diff:

\`\`\`diff
${diffText}
\`\`\`
`;
}

async function reviewWithOpenAI(rules, diffText) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "Você é um revisor de código sênior. Responda só com o Markdown pedido em CODE_REVIEW.md.",
        },
        { role: "user", content: userPrompt(rules, diffText) },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI HTTP ${response.status}`);
  }

  const payload = await response.json();
  const text = payload.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error("OpenAI retornou resposta vazia");
  }
  return text;
}

async function reviewWithAnthropic(rules, diffText) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-20250514",
      max_tokens: 4000,
      temperature: 0.2,
      messages: [{ role: "user", content: userPrompt(rules, diffText) }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic HTTP ${response.status}`);
  }

  const payload = await response.json();
  const text = payload.content?.map((part) => part.text ?? "").join("\n");
  if (!text) {
    throw new Error("Anthropic retornou resposta vazia");
  }
  return text;
}
