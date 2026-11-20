---
tags: [manutencao, bugs]
fase: manutenção
---

# Problemas conhecidos

Gravidade: 🔴 parte em produção · 🟠 prejudica SEO ou utilizadores · 🟡 limpeza.

| | Problema | Onde | Detalhe |
|---|---|---|---|
| 🟠 | O CTA perde a cidade e a paleta | tema Shopify de mapvibestudio.com | o iframe do editor é criado só com `?shopify=1&sku=`; script pronto em [[Shopify deep links]] |
| 🔴 | Loja com encomendas pausadas | mapvibestudio.com | aviso "Back soon — Orders reopen soon"; o funil leva a uma loja que não vende |
| 🟠 | Só um estilo tem entradas | `content/gallery/` | as 13 entradas publicadas são todas `fine-line-minimal`; as outras 21 páginas de estilo ficam `noindex` até terem entradas |
| 🟠 | 7 entradas em rascunho | `content/gallery/` | Berlim, Copenhaga, Los Angeles, Sydney, Amalfi (desenho genérico), Quioto (desenho de Tóquio), Lisboa (desenho de Roma) |
| 🟠 | Títulos de catálogo | `content/gallery/` | "New York City Map Print" e afins; trocar por títulos editoriais ([[Spec de lançamento]] §5) |
| 🟠 | Sem imagem OpenGraph | `app/layout.tsx` | falta uma imagem por omissão e uma por entrada |
| 🟡 | `components/ui/button.tsx` sem uso | | apagar ou usar |

Resolvidos a 20 Nov 2026: `vercel.json` do Vite, capa não responsiva, masthead fixa em telemóvel, ids de âncora repetidos, `clipPath` repetidos (removidos, eram redundantes), imagens inexistentes no JSON-LD, SVG sem texto alternativo, data da edição, fontes por `@import` (agora `next/font`), demo antigo (13 MB), CTAs para `#gallery`, FAQ em dois sítios.

Ao resolver um problema, apagar a linha e anotar o commit no [[Roadmap]].
