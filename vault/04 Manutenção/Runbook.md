---
tags: [manutencao]
fase: manutenção
---

# Runbook

## Arrancar localmente

```
git pull
npm install          # ou npm install --legacy-peer-deps
npm run dev
```

## Antes de cada push

1. `npm run build` tem de terminar com `○ (Static)` na rota `/`.
2. Ver a página a 375 px e a 1440 px.
3. Entrada no diário da sessão.

## Tarefas recorrentes

| Quando | O quê |
|---|---|
| Cada estação | Actualizar a linha de edição na `Navbar` e as chamadas de capa na `HeroSection` |
| Cada ano | Copyright no `Footer` |
| Mensal | `npm outdated`; actualizar Next.js nas versões de correcção |
| Mensal | Search Console: erros de cobertura e dados estruturados |
| Trimestral | Lighthouse e Core Web Vitals; rever o [[Roadmap]] |

## Acrescentar uma cidade

1. Novo objecto em `lib/gallery-data.ts`.
2. Se tiver estilo próprio, nova função em `components/CityMapSvg.tsx` e novo valor em `MapStyle`.
3. Âncora nova no `FilterNav`, se precisar.
4. Build, ver, commit.

## Onde estão as coisas

- Repositório: `insforca/mapvibeforge-hero-preview`
- Produção: *(por preencher depois do [[Deploy]])*
- Domínio: citymapprints.com
