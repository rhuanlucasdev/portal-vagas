/**
 * Publica no PR o status de CI (lint / typecheck / tests / build).
 * O parecer de código vem do GitHub Copilot (reviewer nativo), não deste script.
 */
import { readFileSync } from "node:fs";

const MARKER = "<!-- automated-code-review -->";

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

const CHECKS = ["lint", "typecheck", "tests", "build"];

const ciFailed = CHECKS.some((key) => ci[key] === "failure");

await upsertComment(buildComment());

if (ciFailed) {
  console.error("CI falhou (lint, typecheck, tests ou build).");
  process.exit(1);
}

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Variável ${name} ausente.`);
  }
  return value;
}

function statusLine(label, outcome) {
  if (outcome === "success") return `✅ ${label}`;
  if (outcome === "failure") return `❌ ${label}`;
  if (outcome === "skipped") return `⏭️ ${label} (skipped)`;
  if (outcome === "cancelled") return `⏹️ ${label} (cancelled)`;
  return `❓ ${label} (${outcome || "unknown"})`;
}

function buildComment() {
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
  if (ci.tests === "failure") {
    ciFindings.push("* Tests falharam no `frontend/`.");
  }

  let body = `${MARKER}
## 🤖 CI Status

### Status

${status}

O **code review** deste PR é feito pelo **GitHub Copilot** (comentários inline na aba Files changed / Reviews).
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
  } else {
    body += `
## ✅ Checks passed

Lint, typecheck, tests e build ok (ou skipped). Isso não substitui o review do Copilot nem garante ausência de bugs.
`;
  }

  return `${body.trim()}\n`;
}

async function github(path, { method = "GET", body } = {}) {
  const headers = {
    Authorization: `Bearer ${githubToken}`,
    Accept: "application/vnd.github+json",
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
