---
tags: [adr]
estado: aceite
data: 2026-11-19
---

# ADR-001 — Next.js em vez de Vite

## Contexto

O projecto começou como app Vite + React + Tailwind v3, com uma cena three.js e depois um iframe para `cinematic-demo/`. Tudo era renderizado no cliente: o crawler recebia um `<div id="root">` vazio.

## Decisão

Migrar para Next.js 15 com App Router e geração estática, Tailwind v4 e shadcn/ui.

## Consequências

- HTML completo no servidor, essencial para SEO e motores de IA.
- Metadata API e JSON-LD nativos.
- Ficaram restos do Vite no repositório e na configuração de deploy (ver [[Problemas conhecidos]]).
- O `postcss.config.js` teve de passar a CommonJS (`module.exports`) para o Next o ler.
