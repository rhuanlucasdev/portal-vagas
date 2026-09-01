# Automated Code Review

Instruções para o **GitHub Copilot code review** (e para quem revisar o PR) no **VagaSul**.

O workflow pede o Copilot como reviewer (`copilot-pull-request-reviewer[bot]`). As regras abaixo também estão resumidas em `.github/copilot-instructions.md`.

O VagaSul é um portal de vagas regional (estudo full stack). O frontend atual está em `frontend/` (React 19, Vite, TypeScript, Tailwind v4, React Router, react-icons). Os dados ainda são mocks em `frontend/src/data/`. O backend NestJS/MongoDB ainda não existe.

Respeite o código e os padrões já existentes. Não peça overengineering. Não reescreva código por preferência pessoal.

Responda **em português**.

---

## Antes de comentar

1. Leia o diff e o contexto do PR.
2. Entenda o que a mudança tenta fazer.
3. Comente só o que for relevante.
4. Evite comentários redundantes, de estilo puro ou de baixo valor.

Para cada finding, explique:

1. qual é o problema;
2. por que importa;
3. onde ocorre (arquivo / trecho);
4. como poderia ser corrigido.

---

## Arquitetura a respeitar

- Componentes globais: `frontend/src/components/Nome/index.tsx`
- Seções de página: `frontend/src/pages/NomeDaPagina/components/`
- Mocks e helpers: `frontend/src/data/` (`cities.ts`, `categories.ts`, `jobs.ts`)
- Cor primária: `blue-900`
- Container: `container mx-auto max-w-6xl px-4`
- Package manager: **npm** (há `package-lock.json`)
- Scripts existentes no frontend: `lint`, `build` (`build` já inclui `tsc -b`). Não existe `typecheck` nem `test` no `package.json`.

Não exigir pasta `features/`, camadas enterprise, nem backend neste momento.

---

## 1. Correção

Verificar bugs, lógica incorreta, estados inconsistentes, erros mal tratados, edge cases e regressões. Condições de corrida só quando houver estado assíncrono real.

## 2. React

Verificar componentes grandes demais, responsabilidades misturadas, hooks com dependências erradas, efeitos inadequados, estado inconsistente, acessibilidade e navegação.

Não exigir abstrações nem splits sem necessidade. Priorizar simplicidade.

## 3. TypeScript

Verificar `any` desnecessário, casts perigosos, `null`/`undefined` ignorados e perda de type safety.

Não recomendar tipagem excessivamente complexa.

## 4. Tailwind / UI

Verificar inconsistência com o design system atual, breakpoints, responsividade, contraste, hover/focus e acessibilidade.

Não sugerir mudança puramente estética sem impacto.

## 5. Arquitetura

Verificar responsabilidade, duplicação, acoplamento, imports e organização de arquivos.

Reutilizar `Navbar`, `Footer`, `SearchBar`, `JobCard` quando fizer sentido (ex.: próxima tela `/vagas`).

## 6. Dados mockados

Enquanto não houver backend:

- manter mocks em `frontend/src/data/`
- não espalhar listas hardcoded nos componentes
- reutilizar helpers (`getJobCity`, `getRecentJobs`, etc.)

## 7. Performance

Só apontar problemas reais. Não sugerir `useMemo`, `useCallback` ou memoização sem justificativa concreta (custo medido ou render claramente problemático).

## 8. Segurança

Verificar secrets, tokens, credenciais, XSS, URLs perigosas e inputs.

Nunca pedir para colocar secrets no código. Credenciais de review devem viver em GitHub Secrets.

## 9. Testes

Ainda **não há** infraestrutura de testes (`vitest`/`jest` ausentes). Não bloquear o PR só por falta de testes.

Pode **sugerir** testes quando a feature for relevante e a suíte existir no futuro.

## 10. Git / PR

Verificar arquivos gerados (`dist`, `node_modules`), `.env`, secrets, mudanças fora de escopo e ruído desnecessário.

---

## Classificação

### BLOCKER

Quebra o app, impede build/lint, perda de dados, vulnerabilidade grave, feature inutilizável. **Bloqueia o PR.**

### IMPORTANT

Deveria ser corrigido antes do merge, mas não necessariamente quebra o app.

### SUGGESTION

Qualidade, legibilidade ou arquitetura. **Não bloqueia.**

### NIT

Detalhe opcional. **Não bloqueia.** Evitar.

Use os marcadores: `BLOCKER`, `IMPORTANT`, `SUGGESTION`, `NIT`.

---

## Formato da resposta

Use exatamente esta estrutura em Markdown:

```markdown
## 🤖 Automated Code Review

### Status

(o workflow preenche lint/typecheck/tests/build; não invente resultados de CI)

### Summary

Resumo curto do que o PR altera.

### Findings

🔴 BLOCKER
* ...

🟠 IMPORTANT
* ...

🟡 SUGGESTION
* ...

🔵 NIT
* ...
```

Se não houver findings:

```markdown
## ✅ No significant issues found

Nenhum problema relevante foi detectado automaticamente. Isso não significa que o código está livre de bugs.
```

A ausência de findings automáticos **não** garante ausência de bugs. Deixe isso explícito.

Não exponha secrets, tokens nem conteúdo privado na resposta.
