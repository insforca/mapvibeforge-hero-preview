---
tags: [criacao, design]
fase: criação
---

# Direcção de design

## Paleta (tokens em `app/globals.css`)

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#faf9f6` | marfim, fundo geral |
| `--card-bg` | `#f5f2ed` | fundos de secção |
| `--accent` | `#c8b89a` | travertino/areia, rótulos e filetes |
| `--muted` | `#8a7f72` | cinzento quente, texto secundário |
| `--text` | `#1a1a1a` | preto mate |
| `--border` | `#e8e3dc` | filetes |

Nos mapas SVG: papel `#f5f0e6`, água `#dbd6cc`, parques `#d5cfc2`. Ver [[Mapas SVG]].

## Tipografia

- Títulos: **Playfair Display** (400–600, itálico na chamada de capa).
- Interface e texto corrido: **Inter** (300–500).
- Carregadas por `@import` do Google Fonts em `globals.css`. Ver [[Problemas conhecidos]] sobre passar a `next/font`.

## Linguagem visual

- Masthead em três andares: linha de edição, nome, navegação por secções sobre filete grosso de 2 px.
- Filetes finos entre secções, como numa revista.
- Cada mapa aparece emoldurado: passe-partout de linho (`#ede8dc`), montagem branca, mapa.
- Cartões sem cantos redondos; sombra mínima; ao passar o rato sobem 4 px.
- Faixa negra no fim da capa com nomes de cidades em `--accent`.

## Evitar

Gradientes vivos, emojis, etiquetas "New", brilhos, CTAs agressivos, estética de startup.
