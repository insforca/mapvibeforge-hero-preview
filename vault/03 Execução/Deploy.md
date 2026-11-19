---
tags: [execucao, deploy]
fase: execução
---

# Deploy

## Estado actual: nada pronto para produção

Dois ficheiros herdados do projecto Vite estão incompatíveis com o Next.js:

1. **`vercel.json`** reescreve todos os caminhos (menos `cinematic-demo`) para `/index.html`. Na Vercel isto serve o `index.html` antigo do Vite em vez da página Next. Tem de sair antes do primeiro deploy.
2. **`.github/workflows/deploy.yml`** corre `npx vite build` e publica `dist/` no GitHub Pages a cada push para `main`. Se o ramo for fundido em `main` assim, o Pages publica o site antigo ou falha.

## Opção A — Vercel (recomendada)

- Apagar `vercel.json` (o Next.js não precisa dele).
- Importar o repositório na Vercel; o framework é detectado sozinho.
- Ligar o domínio citymapprints.com.
- Desactivar ou apagar o workflow do GitHub Pages.
- Prós: imagens, cabeçalhos e futuras rotas dinâmicas funcionam sem esforço.

## Opção B — GitHub Pages

- `next.config.ts`: `output: 'export'`, `images: { unoptimized: true }`.
- Workflow: `npx next build` e publicar `out/` em vez de `dist/`.
- Se o site ficar num subcaminho (`/mapvibeforge-hero-preview/`), definir `basePath`.
- Prós: gratuito e já existe um ramo `gh-pages`. Contra: sem optimização de imagens nem funções no servidor.

## Decisão

- [ ] Escolher A ou B e registar num ADR novo.
