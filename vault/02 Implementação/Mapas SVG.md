---
tags: [implementacao, mapas]
fase: implementação
---

# Mapas SVG

`components/CityMapSvg.tsx` desenha os mapas que aparecem nos cartões, na capa e na faixa de destaques. Ver [[ADR-002 Mapas desenhados em SVG]].

## Estilos disponíveis (`MapStyle`)

| Estilo | Elementos |
|---|---|
| `manhattan` | avenidas verticais, ruas horizontais a cada 11 px, Broadway em diagonal, Central Park, Hudson e East River |
| `paris` | 12 boulevards radiais, 3 anéis, Sena em curva, Île de la Cité, rotunda da Étoile |
| `london` | malha orgânica, Tamisa, Hyde Park, Regent's Park, marca da Tower Bridge |
| `barcelona` | quarteirões octogonais do Eixample, Diagonal, Ramblas, Bairro Gótico, mar |
| `amsterdam` | canais concêntricos em leque, ruas radiais, pontes, IJ |
| `tokyo` | malha densa irregular, anel da Yamanote, Palácio Imperial com fosso |
| `rome` | Tibre, vias antigas, Coliseu, Vaticano, praças |
| `grid` | malha genérica com rio, variada por uma *seed* derivada do nome da cidade |

## Regras

- Valores determinísticos: nada de `Math.random()` (evita erros de hidratação).
- `viewBox` de 400 × 533 (retrato 3:4).
- Cada SVG usa um `clipPath` com id fixo (`cm`, `cp`, `cl`…). **Problema:** com vários mapas do mesmo estilo na página, os ids repetem-se. Ver [[Problemas conhecidos]].

## Limites honestos

São mapas estilizados, não cartografia real. Copenhaga, Los Angeles, Sydney, Berlim e a Costa Amalfitana usam o estilo `grid`, que não as representa. O passo seguinte é gerar os mapas a partir de dados do OpenStreetMap (ver [[Roadmap]]).
