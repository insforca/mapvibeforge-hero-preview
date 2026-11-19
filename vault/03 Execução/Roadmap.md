---
tags: [execucao, tarefas]
fase: execução
---

# Roadmap

Ao fechar uma tarefa: `- [x]`, data e commit curto, ex. `✅ 2026-11-20 · a1b2c3d`.

## Agora (bloqueia o lançamento)

- [ ] Corrigir o deploy: apagar ou substituir `vercel.json` e decidir entre Vercel e GitHub Pages. Ver [[Deploy]].
- [ ] Tornar a capa responsiva (a grelha de 2 colunas parte em telemóvel) e reduzir a altura da masthead fixa.
- [ ] Actualizar a edição para "No. 01 — Winter 2026" e o copyright para o ano corrente (ou calculá-lo).

## A seguir

- [ ] Remover os restos do Vite e as dependências 3D não usadas. Ver [[Arquitectura]].
- [ ] Ids únicos: âncoras dos cartões (`new-york` repete-se) e `clipPath` dos SVG.
- [ ] OpenGraph, Twitter card, canonical, favicon. Ver [[Dados estruturados]].
- [ ] Ligações reais nos CTAs "Create Your Map" / "Create this map" (hoje vão para `#gallery`).
- [ ] Passar as fontes para `next/font` (sem pedido bloqueante ao Google Fonts).
- [ ] Fonte única para o texto do FAQ (componente e JSON-LD).

## Depois

- [ ] Fotografia editorial real: interiores com mapas emoldurados, gradação quente e consistente.
- [ ] Mapas a partir de dados OpenStreetMap em vez de SVG estilizado. Ver [[Mapas SVG]].
- [ ] Schema `Product` por cartão.
- [ ] Conteúdo editorial: guias por cidade, guia de presentes, guia de estilos.
- [ ] Medição: Search Console, analytics sem cookies, Core Web Vitals.

## Feito

- [x] Scaffold Next.js 15 + Tailwind v4 + shadcn/ui ✅ 80a6240
- [x] `.gitignore` e `node_modules` fora do repositório ✅ b3747e4
- [x] Galeria editorial completa (8 secções) ✅ 3cdf34a
- [x] Mapas SVG em vez de fotografias aleatórias ✅ 8f0c097
- [x] Nova marca: City Map Prints, formato revista ✅ d1fa157
