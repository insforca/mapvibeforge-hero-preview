---
tags: [implementacao, seo]
fase: implementação
---

# Dados estruturados e metadados

## Em `app/layout.tsx`

- `title`: "City Map Prints — The Map Art Gazette"
- `description`: curadoria de impressões de mapas; Nova Iorque, Londres, Paris, Tóquio e 500+ cidades.
- **Em falta:** OpenGraph, Twitter card, `metadataBase`, `alternates.canonical`, ícones.

## Em `app/page.tsx`

- `ItemList` com os 20 itens; `url` = `https://citymapprints.com/#<anchor>`; `image` aponta para `https://citymapprints.com/maps/<anchor>.png`, **ficheiros que não existem**.
- `FAQPage` com as 6 perguntas. O texto está duplicado do `FaqSection`; convém passar para uma fonte única em `lib/`.

## Por fazer

- [ ] `Product` (ou `CreativeWork`) por cartão, com `offers` só quando houver preço real.
- [ ] Imagens reais para o `ItemList` (exportar os SVG para PNG ou usar fotografias).
- [ ] `Organization` / `WebSite` com `SearchAction` se houver pesquisa.
- [ ] Validar no Rich Results Test e no Schema Markup Validator antes do lançamento.
