---
tags: [manutencao, bugs]
fase: manutenção
---

# Problemas conhecidos

Gravidade: 🔴 parte em produção · 🟠 prejudica SEO ou utilizadores · 🟡 limpeza.

| | Problema | Onde | Detalhe |
|---|---|---|---|
| 🔴 | `vercel.json` reescreve tudo para `/index.html` | raiz | herança do Vite; ver [[Deploy]] |
| 🔴 | Workflow do Pages corre `vite build` | `.github/workflows/deploy.yml` | dispara em push para `main` |
| 🟠 | Capa não responsiva | `HeroSection.tsx` | `gridTemplateColumns: '1fr 1.15fr'` sem media query |
| 🟠 | Masthead fixa com três andares | `Navbar.tsx` | ocupa cerca de 150 px no topo, demais em telemóvel |
| 🟠 | Ids de âncora repetidos | `GalleryCard.tsx` | 5 cartões com `id="new-york"`; HTML inválido |
| 🟠 | `clipPath` com ids repetidos | `CityMapSvg.tsx` | mapas do mesmo estilo partilham `id="cm"` etc. |
| 🟠 | Imagens do JSON-LD não existem | `page.tsx` | `/maps/<anchor>.png` |
| 🟠 | SVG sem texto alternativo | `CityMapSvg.tsx` | o `altText` dos dados não chega ao SVG |
| 🟠 | Data da edição desactualizada | `Navbar.tsx`, `HeroSection.tsx`, `Footer.tsx` | "Summer 2025", "© 2025" |
| 🟡 | Fontes por `@import` | `globals.css` | bloqueia a renderização; usar `next/font` |
| 🟡 | Restos do Vite e do demo 3D | várias pastas | ver [[Arquitectura]] |
| 🟡 | `picsum.photos` e `transpilePackages` de three.js | `next.config.ts` | já não usados |
| 🟡 | CTAs sem destino real | vários | todos para `#gallery` |

Ao resolver um problema, apagar a linha e anotar o commit no [[Roadmap]].
