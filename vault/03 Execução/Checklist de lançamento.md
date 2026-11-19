---
tags: [execucao, lancamento]
fase: execução
---

# Checklist de lançamento

## Código

- [ ] `npm run build` passa sem avisos
- [ ] Nenhum resto do Vite no repositório
- [ ] Ids únicos em toda a página
- [ ] Capa, masthead e grelha testadas a 375, 768, 1024 e 1440 px

## SEO e crawlers

- [ ] Título, descrição, OpenGraph, Twitter card, canonical
- [ ] JSON-LD válido (`ItemList`, `FAQPage`, `Product`)
- [ ] Imagens referidas no JSON-LD existem e respondem 200
- [ ] `robots.txt` e `sitemap.xml`
- [ ] Hierarquia de títulos: um `<h1>`, `<h2>` por cartão
- [ ] Texto alternativo em todas as imagens (o SVG precisa de `role="img"` e `aria-label`)

## Desempenho e acessibilidade

- [ ] Lighthouse ≥ 95 em Performance, Accessibility, Best Practices e SEO
- [ ] Contraste do texto `#8a7f72` sobre `#faf9f6` verificado (está perto do limite AA)
- [ ] Fontes sem bloqueio de renderização

## Produção

- [ ] Domínio citymapprints.com ligado e HTTPS activo
- [ ] Search Console verificado, sitemap submetido
- [ ] Analytics instalado
- [ ] Entrada no [[Runbook]] com o URL e o painel de deploy
