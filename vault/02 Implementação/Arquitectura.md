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
  layout.tsx              fontes (next/font), metadados, Navbar + Footer
  page.tsx                capa, galeria, famílias, FAQ + JSON-LD
  styles/page.tsx         a biblioteca
  styles/[style]/page.tsx um estilo
  prints/[slug]/page.tsx  uma entrada
  sitemap.ts, robots.ts, not-found.tsx
  globals.css             tokens e classes (responsivo)
components/               ver [[Componentes]]
content/
  taxonomy.json           famílias, estilos, formatos, espaços, cidades
  gallery/*.json          uma entrada por ficheiro
lib/
  content.ts              leitura + validação zod, consultas, studioUrl()
  site.ts                 edição, nome, FAQ
  utils.ts                cn()
```

Os restos do Vite e o demo 3D foram removidos a 20 Nov 2026.

## Comandos

```
npm install
npm run dev      # http://localhost:3000
npm run build    # tem de passar antes de qualquer push
npm run start
```

Nota: no Windows, `npm install` pode exigir `--legacy-peer-deps` por causa do `eslint-config-next`.
