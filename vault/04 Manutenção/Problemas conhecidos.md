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
| 🟠 | Estilos da biblioteca sem entradas | `content/gallery/` | as 10 paletas do Studio e a linha fina já têm entradas; os outros 11 estilos (antigos, séc. XX, contemporâneos) ficam `noindex` até terem |
| 🟠 | O Studio troca o nome da cidade pelo bairro | `mapvibe-studio` (geocodificação inversa) | Tóquio → "Chiyoda", Londres → "City of Westminster", mesmo com `?city=`; o export corrige o rótulo, mas o cliente que chega pelo CTA vê o bairro |
| 🟡 | Blueprint e Old Navy | `mapvibe-studio` | o tema define fundo azul-escuro, mas o editor mostra terra creme; confirmar qual é o correcto |
| 🟠 | 7 entradas em rascunho | `content/gallery/` | Berlim, Copenhaga, Los Angeles, Sydney, Amalfi (desenho genérico), Quioto (desenho de Tóquio), Lisboa (desenho de Roma) |
| 🟠 | Títulos de catálogo | `content/gallery/` | "New York City Map Print" e afins; trocar por títulos editoriais ([[Spec de lançamento]] §5) |
| 🟠 | Sem imagem OpenGraph | `app/layout.tsx` | falta uma imagem por omissão e uma por entrada |
| 🟡 | `components/ui/button.tsx` sem uso | | apagar ou usar |

Resolvidos a 20 Nov 2026: `vercel.json` do Vite, capa não responsiva, masthead fixa em telemóvel, ids de âncora repetidos, `clipPath` repetidos (removidos, eram redundantes), imagens inexistentes no JSON-LD, SVG sem texto alternativo, data da edição, fontes por `@import` (agora `next/font`), demo antigo (13 MB), CTAs para `#gallery`, FAQ em dois sítios.

Ao resolver um problema, apagar a linha e anotar o commit no [[Roadmap]].
