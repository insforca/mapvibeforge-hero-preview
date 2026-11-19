---
tags: [implementacao]
fase: implementação
---

# Componentes

Ordem na página (`app/page.tsx`):

| # | Componente | Função | Notas |
|---|---|---|---|
| 1 | `Navbar` | masthead em três andares, fixa no topo | links de secção apontam quase todos para `#gallery` |
| 2 | `HeroSection` | capa: chamada principal, três chamadas secundárias, Manhattan grande + Paris pequeno, selo "Issue 01" | grelha de 2 colunas sem media query |
| 3 | `FilterNav` | barra fixa de âncoras por cidade, tema e ocasião | sem JavaScript |
| 4 | `GalleryGrid` | 4 colunas → 2 → 1; título com filetes | CSS em `<style>` embutido |
| 5 | `GalleryCard` | `<article id={anchor}>` com mapa emoldurado, cidade/tema, `<h2>`, texto, "Create this map →" | ids repetidos: vários cartões partilham a mesma âncora |
| 6 | `FeaturedStrip` | "Editor's Selection": 5 cartões horizontais com scroll | usa `featuredItems` |
| 7 | `FaqSection` | 6 perguntas, `id="faq"` | o JSON-LD do FAQ está em `page.tsx`, duplicado do texto |
| 8 | `Footer` | marca, ligações, divisa, copyright | "© 2025" fixo no código |

Outros:

- `CityMapSvg` — ver [[Mapas SVG]].
- `ui/button.tsx` — botão shadcn, ainda sem uso.

## Dados

`lib/gallery-data.ts` define `GalleryItem` com `id, title, city, theme, occasion, description, altText, anchor, mapStyle`. Para acrescentar uma cidade: novo objecto no array, `anchor` coerente com o `FilterNav`, e `mapStyle` existente ou `'grid'`.
