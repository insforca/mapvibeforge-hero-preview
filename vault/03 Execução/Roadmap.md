---
tags: [execucao, tarefas]
fase: execução
---

# Roadmap

Plano completo de lançamento e pipeline da galeria: [[Spec de lançamento]].

Ao fechar uma tarefa: `- [x]`, data e commit curto, ex. `✅ 2026-11-20 · a1b2c3d`.

## Agora (Fase 1 — biblioteca mínima)

- [ ] Colar o script de [[Shopify deep links]] no tema Shopify (passa `city`, `style`… ao iframe do editor).
- [x] Exportação do Studio para PNG por script: `scripts/gallery/studio-export.mjs` (Studio local em `localhost:5179`) + `studio-ingest.mjs` ✅ 2026-11-20
- [ ] Rever as entradas `studio-render` em rascunho: títulos e textos editoriais, aprovar.
- [ ] Pipeline da galeria: `plan → map → scene → review → composite → derive → metadata`.
- [ ] ~150 entradas: 22 estilos/paletas, 5 formatos, ≥ 6 espaços, 10–12 cidades.
- [ ] Títulos editoriais para as 13 entradas actuais, ou substituí-las.
- [ ] Imagem OpenGraph por omissão e por entrada.
- [ ] Plausible, Search Console, Pinterest (rich pins, primeiros 50 pins).

## Depois (Fase 2)

- [ ] Páginas `/cities/[city]` e `/spaces/[space]` a partir de 8 entradas.
- [ ] 300 → 1000 entradas; imagens para Vercel Blob ou R2.
- [ ] Publicação automática no Pinterest e newsletter editorial.
- [ ] `Product` com `offers` quando houver preço do Studio.

## Feito

- [x] Scaffold Next.js 15 + Tailwind v4 + shadcn/ui ✅ 80a6240
- [x] `.gitignore` e `node_modules` fora do repositório ✅ b3747e4
- [x] Galeria editorial completa (8 secções) ✅ 3cdf34a
- [x] Mapas SVG em vez de fotografias aleatórias ✅ 8f0c097
- [x] Nova marca: City Map Prints, formato revista ✅ d1fa157
- [x] Deploy no Vercel com citymapprints.com ✅ 2026-11-20 · fae75fd
- [x] Spec de lançamento v2 (biblioteca de estilos) ✅ 2026-11-20 · 40db6d9
- [x] Fase 0: capa responsiva, edição Winter 2026, copyright calculado, `next/font`, restos do Vite e demo removidos, dados em `content/` com `zod`, rotas `/styles`, `/styles/[style]`, `/prints/[slug]`, sitemap, robots, OpenGraph básico, FAQ em fonte única, ids únicos, CTAs reais ✅ 2026-11-20
