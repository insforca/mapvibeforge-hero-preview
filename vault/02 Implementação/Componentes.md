---
tags: [implementacao]
fase: implementação
---

# Componentes

## Páginas

| Rota | Ficheiro | Conteúdo |
|---|---|---|
| `/` | `app/page.tsx` | capa, barra de navegação, galeria, as quatro famílias, FAQ. JSON-LD `WebSite`, `ItemList`, `FAQPage` |
| `/styles` | `app/styles/page.tsx` | a biblioteca: estilos por família (âncoras `#antique`, `#twentieth-century`, `#contemporary`, `#mapvibe-studio`) |
| `/styles/[style]` | `app/styles/[style]/page.tsx` | texto do estilo, características, entradas, CTA para o Studio, estilos irmãos. **`noindex` enquanto não tiver entradas** |
| `/prints/[slug]` | `app/prints/[slug]/page.tsx` | uma entrada: imagem, ficha, CTA com cidade + paleta, nota de origem, relacionados |
| `/sitemap.xml`, `/robots.txt` | `app/sitemap.ts`, `app/robots.ts` | o sitemap só inclui estilos com entradas e entradas `approved` |

O cabeçalho (`Navbar`) e o rodapé (`Footer`) vivem em `app/layout.tsx`, comuns a todas as páginas.

## Componentes

| Componente | Função |
|---|---|
| `Navbar` | pré-cabeçalho com a edição, masthead, secções da biblioteca, botão "Create Your Map". Fixo só em ecrãs largos |
| `HeroSection` | capa: título, dois botões, três chamadas para estilos, Manhattan + Paris, selo da edição. Uma coluna abaixo de 900 px |
| `FilterNav` | barra "Browse by" com links para famílias e estilos (sem JavaScript) |
| `GalleryGrid` | grelha masonry em CSS (`columns`), cartões que levam a `/prints/[slug]` |
| `MapPrint` | mostra a arte de uma entrada: `next/image` se houver `image`, senão o SVG num passe-partout |
| `FaqSection` | FAQ e `faqJsonLd()`, ambos a partir de `FAQS` em `lib/site.ts` (fonte única) |
| `JsonLd` | `<script type="application/ld+json">` com escape de `<` |
| `CityMapSvg` | desenhos SVG, ver [[Mapas SVG]] |

## Dados

- `content/taxonomy.json`: famílias, estilos (com `studioTheme`, texto, características), formatos, espaços, cidades (com coordenadas para o CTA).
- `content/gallery/<slug>.json`: uma entrada por ficheiro. O nome do ficheiro tem de ser igual ao `slug`.
- `lib/content.ts`: lê e valida tudo com `zod` no build. Um valor fora da taxonomia, um slug repetido ou uma entrada sem `image` nem `svg` **parte o build** com uma mensagem que diz o ficheiro.
- `lib/site.ts`: edição (`EDITION`), nome, descrição, FAQ.

Para acrescentar uma entrada: criar `content/gallery/<slug>.json` com `status: "draft"`, rever, mudar para `"approved"`. Ver o formato em [[Spec de lançamento]] §5.

## CTA para o Studio

`studioUrl(city, studioTheme)` em `lib/content.ts` gera `https://mapvibestudio.com/?city=…&country=…&lat=…&lng=…&style=<id da paleta>&utm_source=citymapprints`. O mapvibestudio.com ainda não passa estes parâmetros ao editor (ver [[Spec de lançamento]] §3).
