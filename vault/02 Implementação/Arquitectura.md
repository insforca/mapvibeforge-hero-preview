---
tags: [implementacao]
fase: implementação
---

# Arquitectura

## Stack

- **Next.js 15.5** com App Router; a página `/` é pré-renderizada como estática (`○` no `next build`).
- **React 19**, **TypeScript 5.9**.
- **Tailwind CSS v4** via `@tailwindcss/postcss`; configuração no próprio CSS (`@import "tailwindcss"`), sem `tailwind.config`.
- **shadcn/ui**: `components.json`, `lib/utils.ts` (`cn`) e `components/ui/button.tsx`. Ainda pouco usado: quase todo o estilo está em `style={{}}` inline.
- Todos os componentes são de servidor; não há `'use client'`.

## Estrutura

```
app/
  layout.tsx        metadados, <html>, globals.css
  page.tsx          monta as secções + JSON-LD
  globals.css       tokens, fontes, Tailwind
components/         ver [[Componentes]]
lib/
  gallery-data.ts   20 itens da galeria + featuredItems
  utils.ts          cn()
public/             estáticos (inclui o vídeo do demo antigo)
```

## Restos do projecto Vite (por limpar)

`src/`, `cinematic-demo/`, `dist/`, `index.html`, `vite.config.ts`, `tsconfig.node.json`, `tailwind.config.ts`, e as dependências `three`, `@react-three/*`, `framer-motion`, `vite`, `@vitejs/plugin-react`. O `tsconfig.json` exclui `src/` para o build passar. Ver [[ADR-001 Next.js em vez de Vite]].

## Comandos

```
npm install
npm run dev      # http://localhost:3000
npm run build    # tem de passar antes de qualquer push
npm run start
```

Nota: no Windows, `npm install` pode exigir `--legacy-peer-deps` por causa do `eslint-config-next`.
