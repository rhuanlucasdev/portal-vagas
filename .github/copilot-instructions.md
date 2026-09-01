# VagaSul — instruções para o GitHub Copilot

Quando for **code review de pull request**, siga `.github/CODE_REVIEW.md` e estas regras.

Responda em **português**. Comente só problemas relevantes. Não peça overengineering, useMemo/useCallback sem justificativa, nem reescreva código por preferência.

## Contexto

Portal de vagas regional (estudo). Frontend em `frontend/`: React 19, Vite, TypeScript, Tailwind v4, React Router, react-icons. Dados mock em `frontend/src/data/`. Backend ainda não existe.

## Padrões

- Componentes globais: `frontend/src/components/Nome/index.tsx`
- Seções de página: `frontend/src/pages/NomeDaPagina/components/`
- Mocks: `cities.ts`, `categories.ts`, `jobs.ts` — não espalhar dados hardcoded nos componentes
- Cor primária: `blue-900`
- Container: `container mx-auto max-w-6xl px-4`
- Package manager: npm

## No review

Priorize bugs, regressões, TypeScript inseguro (`any`, casts), acessibilidade, secrets e inconsistência com os padrões acima.

Classifique mentalmente: BLOCKER (quebra app/build/segurança), IMPORTANT, SUGGESTION, NIT. Evite NIT de baixo valor.

Para cada comentário: o problema, por que importa, onde está, como corrigir.
