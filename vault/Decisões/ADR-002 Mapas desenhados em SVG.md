---
tags: [adr]
estado: aceite (provisória)
data: 2026-11-19
---

# ADR-002 — Mapas desenhados em SVG

## Contexto

A primeira versão usava fotografias aleatórias do picsum.photos, que nada tinham a ver com mapas. Não havia fotografias editoriais próprias, e o ambiente de trabalho não tinha acesso a bancos de imagens.

## Decisão

Desenhar os mapas em SVG inline (`CityMapSvg`), com estilos próprios para as cidades principais e um estilo genérico para as restantes.

## Consequências

- O produto aparece em todo o lado; o site deixou de parecer genérico.
- Zero pedidos de imagem, carregamento rápido.
- Os mapas são aproximações e não cartografia verdadeira; cinco cidades usam o estilo genérico.
- Revisitar quando houver fotografia editorial ou geração a partir do OpenStreetMap. Ver [[Mapas SVG]].
