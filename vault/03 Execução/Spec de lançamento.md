---
tags: [execucao, spec]
fase: execução
data: 2026-11-20
estado: rascunho
---

# Spec de lançamento — citymapprints.com

Como levar a "MapVibe Ecosystem Spec" do estado actual (20 itens escritos à mão, mapas SVG) a uma galeria editorial gerada por pipeline, com 100 entradas no lançamento e espaço para crescer até milhares.

Relacionado: [[Roadmap]], [[Arquitectura]], [[Dados estruturados]], [[Mapas SVG]], [[Deploy]].

---

## 1. Princípios (não negociáveis)

1. **Dois sites, dois papéis.** citymapprints.com é descoberta editorial; mapvibestudio.com é gerador e loja. Não se fundem. A única ponte é o CTA "Create your own".
2. **A galeria é o produto.** Cada entrada é um nó semântico (dados estruturados + imagem + texto), não "uma imagem".
3. **Fotografado, não gerado.** Realismo de fotografia de arquitectura e interiores. Nada de estética de "AI art", pósteres estilizados ou surrealismo.
4. **O mapa na imagem tem de ser verdadeiro.** O quadro mostra a cidade real, no estilo que a loja vende. Ver §5.3: é o ponto técnico mais importante do pipeline.
5. **Qualidade antes de volume.** Nada é publicado sem revisão humana. Ver §8 sobre o risco de conteúdo em escala.

---

## 2. Ponto de partida (20 Nov 2026)

| Área | Estado |
|---|---|
| Deploy | Vercel, projecto `mapvibeforge-hero-preview`, domínios `citymapprints.com` e `www` verificados. `vercel.json` (framework Next.js) por fazer commit. |
| Dados | `lib/gallery-data.ts`: 20 itens fixos, campos `title, city, theme, occasion, description, altText, anchor, mapStyle`. |
| Imagens | Nenhuma fotografia. Mapas SVG estilizados em `components/CityMapSvg.tsx`, 7 estilos. Vários são genéricos (`grid`). |
| Página | Uma só página `/` com âncoras (`FilterNav`), JSON-LD `ItemList` + `FAQPage`. |
| Bloqueios já conhecidos | Capa não responsiva, edição/copyright desactualizados, restos do Vite. Ver [[Roadmap]] e [[Problemas conhecidos]]. |
| Outros projectos Vercel | `citymapprints-com` (antigo, por arquivar?), `mapvibe-render-service`, `mapvibe-studio` (`app.mapvibestudio.com`). |

---

## 3. Sobre o repositório `joeseesun/qiaomu-artist-style`

Lido a 20 Nov 2026. **Não é** um sistema de estilos nem uma camada de orquestração de prompts. É:

- uma app Next.js estática que mostra uma grelha filtrável de 383 imagens;
- **um único prompt** (montanhas, floresta, riacho) em que só muda o nome de um pintor (`{artist}`), definido em `data/site-config.ts`;
- um script `npm run generate:images` que chama a API HiAPI em lote (`--offset`, `--limit`, `--force`, `--quality`) e grava WebP em `public/generated/`.

**Conclusão:**

- **Não usar o código.** O repositório não tem licença, por isso a reutilização não está autorizada. Além disso, imita estilos de pintores identificados pelo nome, o oposto do realismo que queremos.
- **Copiar o padrão, que é exactamente o que precisamos:** template de prompt × lista de variáveis → script em lote idempotente → ficheiros estáticos → galeria Next.js gerada a partir dos dados. Implementamo-lo de raiz e com mais camadas (módulos de prompt, revisão, composição do mapa, metadados).

---

## 4. Modelo de conteúdo

Uma entrada = um ficheiro JSON em `content/gallery/<slug>.json`, validado com `zod` no build. `lib/gallery-data.ts` passa a ler esta pasta em vez de ter os dados escritos no código.

```json
{
  "slug": "lisbon-summer-walls",
  "status": "approved",
  "title": "Lisbon Summer Walls",
  "city": "Lisbon",
  "country": "Portugal",
  "style": "mediterranean",
  "space": "coastal-villa",
  "occasion": "housewarming",
  "mood": "warm-minimal",
  "palette": ["sand", "olive", "travertine"],
  "mapStyle": "minimal-monochrome",
  "image": {
    "src": "/gallery/lisbon-summer-walls.avif",
    "width": 1600, "height": 2000,
    "blurDataURL": "data:image/webp;base64,...",
    "alt": "Minimal monochrome map of Lisbon framed above a travertine console in a sunlit coastal villa"
  },
  "description": "Duas frases editoriais, únicas para esta entrada.",
  "cta": "https://mapvibestudio.com/create?city=lisbon&style=minimal-monochrome",
  "generation": {
    "recipe": "mediterranean-editorial@1",
    "model": "flux-1.1-pro",
    "seed": 81234,
    "mapRender": "render-service:lisbon:minimal-monochrome",
    "reviewedBy": "editor",
    "reviewedAt": "2026-12-02"
  }
}
```

**Vocabulários fechados** em `content/taxonomy.json`: `cities`, `styles`, `spaces`, `occasions`, `moods`, `mapStyles`, cada um com slug, nome de apresentação e descrição curta. Um item com um valor fora da taxonomia falha o build.

**`status`:** `draft` → `approved` → (`retired`). Só `approved` entra no site e no sitemap.

**Nomes:** título evocativo ("Tokyo Quiet Geometry") e, por baixo, a linha de metadados "Tokyo · Japandi · Reading Space". Nunca "Tokyo Map Print".

---

## 5. Pipeline de geração da galeria

```
taxonomy.json + recipes/*.json
        │  1. matriz      scripts/gallery/plan.ts
        ▼
queue/plan.jsonl  (combinações escolhidas, não todas)
        │  2. cena        scripts/gallery/generate.ts   (API de imagem)
        ▼
work/<slug>/scene-*.png   (3–4 variantes, quadro vazio)
        │  3. revisão     scripts/gallery/review  (página local)
        ▼
variante escolhida
        │  4. mapa        scripts/gallery/composite.ts  (render real → perspectiva)
        ▼
work/<slug>/final.png
        │  5. derivados   sharp: AVIF + WebP, 3 larguras, blur
        │  6. metadados   Claude: título, alt, descrição  → revisão humana
        ▼
content/gallery/<slug>.json  +  public/gallery/*   → commit → deploy
```

### 5.1 Matriz (não é combinatória cega)

`plan.ts` gera candidatos `cidade × estilo × espaço × ocasião`, mas **só aceita combinações plausíveis**. A coerência vem de regras em `taxonomy.json` (ex.: `ski-chalet` só com cidades de montanha/inverno; `beach-house` só com cidades costeiras), e há um limite por cidade e por estilo para manter a galeria equilibrada.

### 5.2 Receitas de prompt modulares

Cada estilo tem uma receita versionada em `content/recipes/<style>.json` com blocos fixos:

`[interior] [arquitectura] [luz] [câmara/lente] [materiais] [paleta] [presença humana] [integração do quadro] [negativos]`

O bloco **integração do quadro** pede sempre *"um quadro de parede com uma área de arte lisa e clara"*, como elemento secundário e fora do centro. O bloco **negativos** exclui texto, logótipos, capas de revista e ilustração.

Mudar uma receita sobe a versão (`mediterranean-editorial@2`). Cada entrada regista a receita com que foi feita, para se poder regenerar com consistência.

### 5.3 O mapa verdadeiro (composição)

Os modelos de imagem **inventam** mapas. Um "mapa de Lisboa" gerado não é Lisboa, e mostrar na galeria um produto que a loja não vende é publicidade enganosa. Por isso:

1. a cena é gerada com o quadro vazio;
2. o mapa real da cidade, no estilo vendido, vem do motor da loja: o `mapvibe-render-service` se já exportar PNG/SVG por cidade e estilo, senão um render a partir do OpenStreetMap;
3. `composite.ts` encaixa o mapa no quadro com transformação de perspectiva (4 cantos marcados na revisão), mais sombra e grão para o integrar na luz da cena.

Isto também resolve a pendência de [[Mapas SVG]] (estilos genéricos que não representam a cidade).

### 5.4 Ferramentas

| Passo | Escolha inicial | Notas |
|---|---|---|
| Cena | Flux 1.1 Pro / Ultra por API (BFL, fal ou Replicate) | Bom realismo de interiores e uso por API em lote. O Midjourney não tem API oficial, por isso só serve para exploração manual. |
| Limpeza | GPT-image ou inpainting do Flux | Só para corrigir artefactos, não para mudar a cena. |
| Upscale | Topaz (manual) ou um upscaler por API | Só nas variantes aprovadas. |
| Derivados | `sharp` | AVIF + WebP, larguras 640/1080/1600, `blurDataURL`. |
| Metadados | Claude por API | Gera rascunhos de título, alt e descrição a partir dos campos. Um humano revê sempre. |

O script deve ser idempotente, como o padrão do §3: `--offset`, `--limit`, `--force`, saltar o que já existe e registar o custo por imagem.

---

## 6. Site

### 6.1 Rotas

| Rota | Conteúdo | Quando existe |
|---|---|---|
| `/` | Capa editorial, destaques, grelha com as entradas mais recentes e curadas, FAQ | sempre |
| `/prints/[slug]` | Página da entrada: imagem grande, texto, metadados, entradas relacionadas, CTA | por cada entrada `approved` |
| `/city/[city]`, `/style/[style]`, `/space/[space]` | Colecção editorial com introdução própria | só com **≥ 8 entradas aprovadas** |

As páginas por entrada são necessárias. O Pinterest precisa de um URL por pin, o schema por item precisa de uma página, e 500 itens numa única página são pesados demais. As colecções só aparecem quando têm massa crítica, para não criar páginas finas.

A navegação continua a ser feita de **links rastreáveis** (`<a href>`), sem filtros em JavaScript.

### 6.2 Grelha

Masonry editorial: 4 colunas no desktop, 2 no tablet e cartões empilhados no telemóvel. Imagens verticais (4:5 ou 2:3), muito espaço em branco e interface mínima.

### 6.3 Dados estruturados

- `/`: `ItemList` + `FAQPage` (já existem) + `Organization`/`WebSite`.
- `/prints/[slug]`: `ImageObject` (com `creditText`, `license`, `acquireLicensePage`) + `CreativeWork`.
- **`Product` só com `offers` reais.** O Google exige `offers`, `review` ou `aggregateRating` para mostrar resultados enriquecidos de produto. Sem preço verdadeiro, um `Product` é inútil ou arriscado. Ligar quando a loja expuser preço por estilo/tamanho (ver §10).
- `sitemap.xml` com extensão de imagem; `robots.txt`.
- OpenGraph e `pinterest`/rich pins por entrada.

### 6.4 Imagens e custos

- **Fase 1** (≤ 150 entradas): ficheiros pré-optimizados em `public/gallery/`, cerca de 40 MB, servidos com `next/image` em modo `unoptimized`, já que os derivados vêm do pipeline. Assim não se gasta a quota de optimização de imagem do Vercel.
- **Fase 2** (> 500): mover as imagens para **Vercel Blob** ou Cloudflare R2, com o mesmo formato de URL, para o repositório Git não crescer sem limite.

### 6.5 Analytics

Começar só com **Plausible** (sem cookies, sem banner). O PostHog entra quando houver funil a medir entre os dois sites. Eventos: clique no CTA (com cidade e estilo), save no Pinterest, saída para mapvibestudio.com.

---

## 7. Pinterest e email

- Uma conta empresarial com **rich pins** activos e um board por estilo e por espaço (não por cidade).
- Publicação a partir do `content/gallery`. O título e a descrição do pin vêm da entrada e o link vai para `/prints/[slug]`. Cadência inicial de 3 a 5 pins por dia, agendados.
- Email: newsletter editorial mensal ("Cities worth keeping on your wall"), com 4 a 6 entradas e uma nota curta. Ferramenta a decidir (ver §10). Sem descontos agressivos.

---

## 8. Riscos

| Risco | Mitigação |
|---|---|
| **Conteúdo em escala como spam.** A política do Google contra "scaled content abuse" atinge páginas geradas em massa sem valor próprio, como 10 000 combinações quase iguais. | Revisão humana por entrada, imagem e texto únicos, colecções com limiar mínimo, só `approved` no sitemap, crescimento gradual (100 → 300 → 1000) com medição na Search Console. |
| Mapas falsos nas imagens | Composição com o render real (§5.3). |
| Imagens com aspecto de "gerado" | Receitas fixas, revisão, rejeitar sem pena. Medir a taxa de aprovação por receita. |
| Divulgação de IA | O Pinterest pode marcar imagens geradas. Uma nota discreta em "About" ("cenas criadas digitalmente; os mapas são os nossos produtos reais") protege a confiança. |
| Custos de geração | Custo registado por imagem. Orçamento por fase (§9). |
| CTA para a loja sem destino | Confirmar os parâmetros que o mapvibestudio.com aceita antes de gerar os URLs (§10). |

---

## 9. Fases e critérios de saída

### Fase 0 — Desbloquear (1 semana)

- [ ] Commit de `vercel.json`. Arquivar o projecto Vercel `citymapprints-com`, se já não for preciso.
- [ ] Os três itens de "Agora" do [[Roadmap]]: capa responsiva, edição/copyright, limpeza do Vite.
- [ ] `content/taxonomy.json` + schema `zod` + `lib/gallery-data.ts` a ler `content/gallery/`. Migrar os 20 itens actuais.
- [ ] Rotas `/prints/[slug]`, `sitemap.xml`, `robots.txt`, OpenGraph.
- [ ] Plausible.

**Sai quando:** o build passa com os dados em JSON, existem 20 páginas de entrada e a Lighthouse dá ≥ 90 em mobile.

### Fase 1 — Pipeline e 100 entradas (2–4 semanas)

- [ ] Receitas para 5 estilos (Mediterranean, Japandi, Scandinavian, Chalet, Coastal).
- [ ] Scripts `plan`, `generate`, `review`, `composite`, `derive`, `metadata`.
- [ ] Ligação ao `mapvibe-render-service` (ou render OSM) para 10 cidades.
- [ ] 100 entradas aprovadas: 10 cidades × 5 estilos × cerca de 2 espaços.
- [ ] Search Console, pedido de indexação do sitemap.
- [ ] Pinterest: conta, rich pins, primeiros 50 pins.

**Sai quando:** 100 entradas com mapa real, taxa de aprovação de pelo menos 1 em cada 4 variantes e custo por entrada conhecido.

### Fase 2 — Escala (contínua)

- [ ] Imagens para Blob/R2.
- [ ] Colecções `/city`, `/style`, `/space` quando ultrapassarem o limiar.
- [ ] 300 → 1000 entradas, ao ritmo que a revisão aguentar.
- [ ] Publicação automática no Pinterest.
- [ ] `Product` com `offers`, se a loja expuser preço.

### Fase 3 — Optimização para pesquisa por IA

- [ ] Monitorizar citações em AI Mode, ChatGPT e Perplexity com um conjunto fixo de perguntas.
- [ ] Expandir as entidades (cidades, bairros, estilos) onde houver procura medida.
- [ ] PostHog no funil citymapprints → mapvibestudio.

---

## 10. Decisões em aberto

1. **Origem do mapa no quadro:** o `mapvibe-render-service` já exporta imagens por cidade e estilo? Que formato e que URL/API?
2. **CTA:** que URL e parâmetros aceita a loja? (`app.mapvibestudio.com/create?city=&style=`?)
3. **Modelo de imagem:** testar Flux 1.1 Pro contra GPT-image com 10 cenas iguais antes de fixar. Orçamento da Fase 1?
4. **Revisão:** quem aprova, e quantas entradas por semana são realistas?
5. **Preços:** a loja tem preço fixo por tamanho que possa ir para `offers`?
6. **Email:** que ferramenta (Resend, Buttondown, Kit)? Integração com a loja?
7. **CMS:** JSON local chega até cerca de 1000 entradas. Só reavaliar o Sanity depois disso.
