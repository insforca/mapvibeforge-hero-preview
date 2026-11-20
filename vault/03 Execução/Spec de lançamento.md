---
tags: [execucao, spec]
fase: execução
data: 2026-11-20
estado: rascunho v2
---

# Spec de lançamento — citymapprints.com

Relacionado: [[Roadmap]], [[Arquitectura]], [[Dados estruturados]], [[Mapas SVG]], [[Deploy]].

---

## 1. A ideia numa frase

**citymapprints.com é uma biblioteca de estilos de mapa de cidade, do antigo ao contemporâneo, mostrados em muitas formas e espaços diferentes, que encaminha quem se apaixona por um estilo para o MapVibe Studio.**

- **A biblioteca atrai e inspira.** É ampla, editorial e muito "guardável" no Pinterest.
- **O Studio vende.** As paletas do Studio aparecem salpicadas na biblioteca, ao lado de estilos históricos e contemporâneos, como mais uma família.
- **O que nos diferencia** não é o mapa em si, mas a **variedade de apresentação**: o mesmo estilo visto sozinho, emoldurado, sem moldura, num detalhe, numa sala, numa biblioteca, num escritório, numa câmara municipal…

Os dois sites continuam separados. A ponte é sempre o botão **"Create yours in this style"**.

---

## 2. Os três eixos da biblioteca

Cada imagem da biblioteca é a combinação de três eixos.

### Eixo A — Estilo (o "como está desenhado")

**12 estilos da biblioteca**, mais uma selecção das paletas do Studio.

| Família | Estilo | Notas |
|---|---|---|
| Antigo | Carta náutica (portulano) | linhas de rumo, rosa-dos-ventos, papel velho |
| Antigo | Planta gravada do séc. XVIII | traço a buril, quarteirões sombreados |
| Antigo | Mapa japonês em xilogravura | período Edo, cor plana, papel washi |
| Antigo | Mapa de seguros do séc. XIX | aguarela por material de construção |
| Séc. XX | Topografia suíça | relevo sombreado, curvas de nível |
| Séc. XX | Diagrama de metro | linhas rectas a 45°, cores por linha |
| Séc. XX | Mapa ilustrado mid-century | edifícios desenhados, cor de offset |
| Séc. XX | Cartaz de viagem art déco | geometria, poucas cores, grande título |
| Contemporâneo | Linha fina minimalista | só ruas, um só traço |
| Contemporâneo | Figure-ground | só edifícios, preto sobre branco |
| Contemporâneo | Risografia a duas cores | sobreposição, grão, desalinho |
| Contemporâneo | Aguarela solta | manchas, sem contorno |

**Paletas do Studio** (no Studio o desenho é sempre o mesmo, só muda a paleta). Proposta de selecção inicial, as que encaixam no tom editorial:

| Paleta | ID no Studio | Família onde fica melhor |
|---|---|---|
| Vintage Noir | `vintage_noir` | ao lado do figure-ground |
| Japanese Ink | `tk_japanese_ink` | ao lado da xilogravura |
| Blueprint | `tk_blueprint` | ao lado da topografia suíça |
| Warm Beige | `tk_warm_beige` | contemporâneo |
| Terracotta | `tk_terracotta` | mediterrânico |
| Copper Patina | `tk_copper_patina` | antigo / séc. XX |
| Mediterranean Vibes | `mediterranean_vibes` | mediterrânico |
| Capri Shores | `capri_shores` | costeiro |
| Old Navy | `tk_old_navy` | carta náutica |
| Sage | `tk_sage` | contemporâneo |

O Studio tem 67 paletas, definidas em `mapvibe-studio/src/features/mapvibedomain/domain/themes.ts`. Ficam de fora, por agora, as paletas de desporto e cultura pop (Gotham, The Shire, Spirited Forest, Pastel Symmetry, Synthetica…). Os subtítulos internos referem marcas e obras protegidas (Ghibli, Tolkien, Blade Runner, Wes Anderson), que **não podem aparecer em texto público**.

### Eixo B — Formato (o "como se vê o mapa")

1. **Plano**: só o mapa, de frente, sem contexto.
2. **Emoldurado**: em fundo neutro.
3. **Sem moldura**: papel na parede, fita, molas, prancheta.
4. **Detalhe**: close-up de um bairro, da textura do papel ou da tinta.
5. **Em espaço**: o mapa dentro de uma divisão (ver eixo C).

### Eixo C — Espaço (o "onde está")

Sala · biblioteca · escritório/study · câmara municipal / edifício público · lobby de hotel · estúdio de arquitectura · corredor · quarto · cozinha · café/restaurante · escritório de empresa · casa de praia · chalé.

Exemplo de entrada: *Lisboa × Topografia suíça × Em espaço × Biblioteca.*

---

## 3. Estrutura do site

| Rota | O que mostra |
|---|---|
| `/` | Capa editorial e uma mistura curada de tudo (formatos e espaços alternados) |
| `/styles` | A biblioteca: os 12 estilos e as paletas do Studio, por família |
| `/styles/[style]` | Um estilo: texto curto (origem, época, características), grelha de variações, CTA |
| `/prints/[slug]` | Uma imagem: grande, metadados, "mais neste estilo", "mais nesta cidade", CTA |
| `/cities/[city]` | Uma cidade em todos os estilos. Só existe com ≥ 8 entradas |
| `/spaces/[space]` | Um espaço (ex.: bibliotecas) com mapas de vários estilos. Só existe com ≥ 8 entradas |

A navegação é feita com links normais (`<a href>`), rastreáveis, sem filtros em JavaScript.

**A grelha mistura os formatos de propósito**, alternando plano, emoldurado, detalhe e espaço, com proporções diferentes (4:5, 2:3, 1:1). É esse ritmo que dá o ar de revista e de moodboard.

### O CTA para o Studio

O Studio já aceita deep links (`posterStore.ts`, `getUrlParamFormOverrides`):

```
https://app.mapvibestudio.com/?city=Lisbon&country=Portugal&lat=38.7223&lng=-9.1393&style=tk_blueprint
```

- **Paleta do Studio:** "Create yours in this style" abre directamente com cidade e paleta.
- **Estilo da biblioteca que o Studio não vende:** "The closest in MapVibe Studio: Blueprint", que abre com a paleta mais próxima. Cada estilo da biblioteca indica a sua paleta-irmã.

**Decidido (2026-11-20): o CTA aponta para `mapvibestudio.com`.**

Há uma dependência. Testado a 20 Nov: a página `mapvibestudio.com/?city=…&style=…` responde, mas os botões para o editor apontam para `https://app.mapvibestudio.com` sem parâmetros, por isso a cidade e a paleta perdem-se. É preciso, no projecto `mapvibe-content-hub`:

- uma página de entrada (ex.: `mapvibestudio.com/create`, que hoje fecha a ligação) ou a própria home a **passar** `city`, `country`, `lat`, `lng` e `style` para o link `app.mapvibestudio.com/?…`;
- de preferência, mostrar nessa página a paleta escolhida ("You picked Blueprint · Lisbon") antes do botão para o editor.

Até isso existir, o CTA pode ir para `mapvibestudio.com` sem parâmetros, ou directamente para `app.` como solução temporária.

---

## 4. De onde vêm as imagens

| Estilo | Mapa | Cena (formatos B2–B5) |
|---|---|---|
| Paletas do Studio | **Exportação real do Studio** (cidade + paleta), ou seja, o produto exacto que se vende | IA com o quadro vazio, e o mapa real encaixado depois |
| Estilos antigos | **Mapas históricos reais, de domínio público** (Library of Congress e outros, sempre com a licença confirmada, já que algumas colecções proíbem o uso comercial) | IA com o quadro vazio, e o mapa real encaixado depois |
| Séc. XX e contemporâneos | Gerado por IA "no estilo de" (não é a cartografia exacta da cidade) | IA |

Regra: **o que se vende tem de ser real.** Uma imagem com paleta do Studio mostra sempre o render verdadeiro dessa cidade. As imagens de inspiração (estilos que o Studio não vende) ficam marcadas como tal na página.

---

## 5. Modelo de conteúdo

Uma entrada = um ficheiro `content/gallery/<slug>.json`, validado com `zod` no build. Os vocabulários ficam em `content/taxonomy.json` (`styles`, `families`, `formats`, `spaces`, `cities`).

```json
{
  "slug": "lisbon-swiss-relief-library",
  "status": "approved",
  "title": "Lisbon in Relief",
  "subtitle": "Lisbon · Swiss Topography · Library",
  "city": "lisbon",
  "style": "swiss-topography",
  "family": "twentieth-century",
  "format": "in-space",
  "space": "library",
  "source": "ai-inspiration",
  "studioTheme": "tk_blueprint",
  "image": {
    "src": "/gallery/lisbon-swiss-relief-library.avif",
    "width": 1600, "height": 2000,
    "blurDataURL": "data:image/webp;base64,...",
    "alt": "Shaded-relief map of Lisbon in a wooden frame above library shelves, afternoon light"
  },
  "description": "Duas frases editoriais, únicas para esta entrada.",
  "generation": { "recipe": "in-space-library@1", "model": "flux-1.1-pro", "seed": 81234 }
}
```

`source`: `studio-render` | `public-domain` | `ai-inspiration`. Indica a origem do mapa e decide o texto do CTA e a nota de inspiração.

`status`: `draft` → `approved` → `retired`. Só `approved` vai para o site e para o sitemap.

---

## 6. Pipeline

O padrão vem do `qiaomu-artist-style`: template × variáveis → script em lote → ficheiros estáticos → galeria. Esse repositório não tem licença, por isso o código é escrito de raiz.

```
taxonomy.json + recipes/
   1. plan       escolhe combinações estilo × cidade × formato × espaço (com regras e quotas)
   2. map        exporta do Studio / vai buscar o mapa histórico / gera o mapa de inspiração
   3. scene      gera 3–4 variantes da cena com o quadro vazio (formatos B2–B5)
   4. review     página local: escolher a variante e marcar os 4 cantos do quadro
   5. composite  encaixa o mapa na cena (perspectiva, sombra, grão)
   6. derive     sharp → AVIF + WebP, 3 larguras, blur
   7. metadata   Claude escreve o rascunho de título, alt e descrição → revisão humana
   → content/gallery/*.json + public/gallery/* → commit → deploy
```

- **Receitas por formato e espaço** (`recipes/in-space-library.json`, `recipes/framed-neutral.json`…), com blocos fixos de luz, lente, materiais, posição do quadro e negativos (sem texto, sem logótipos, sem ar de ilustração). São versionadas.
- **Regras e quotas no `plan`:** equilíbrio entre famílias, formatos e espaços, combinações plausíveis (o chalé não leva carta náutica de Lisboa…) e um limite por cidade.
- **Scripts idempotentes** (`--offset`, `--limit`, `--force`), com o custo de cada imagem registado.
- **Ferramentas:** Flux por API para as cenas, `sharp` para os derivados, Claude para os metadados. O Midjourney fica só para exploração manual, porque não tem API oficial.
- **Exportação do Studio:** confirmar se o `layeredSvgExporter` / `previewCompositing` do Studio pode correr sem interface (script ou `mapvibe-render-service`) para cidade + paleta → PNG.

---

## 7. SEO, Pinterest, dados estruturados

- **Pesquisas-alvo:** "vintage map of [city]", "[city] map poster", "swiss topographic map art", "minimalist city map", "map wall art library", "[estilo] map print".
- **Páginas de estilo com texto real** (origem, época, como reconhecer o estilo). É isto que distingue uma biblioteca de uma galeria de imagens soltas e dá às IAs algo para citar.
- **Dados estruturados:** `ImageObject` + `CreativeWork` por entrada; `CollectionPage` + `ItemList` por estilo, cidade e espaço; `FAQPage` na capa. Usar `Product` só quando houver preço real do Studio.
- **Pinterest:** rich pins e um board por estilo e por espaço ("Maps in Libraries", "Swiss Topography"…). Cada pin aponta para `/prints/[slug]`.
- **Escala com cuidado:** milhares de combinações quase iguais caem na política do Google contra "scaled content abuse". Por isso: revisão humana, quotas, colecções só com ≥ 8 entradas e crescimento gradual.

---

## 8. Fases

### Fase 0 — Desbloquear

- [x] Deploy no Vercel com `citymapprints.com` ✅ 2026-11-20 · fae75fd
- [ ] Itens "Agora" do [[Roadmap]]: capa responsiva, edição/copyright, limpeza do Vite.
- [ ] `content/taxonomy.json` + `zod` + `lib/gallery-data.ts` a ler `content/gallery/`.
- [ ] Rotas `/styles`, `/styles/[style]`, `/prints/[slug]`, sitemap, robots, OpenGraph.

### Fase 1 — Biblioteca mínima (lançamento)

- [ ] 12 páginas de estilo com texto, mais 10 paletas do Studio.
- [ ] **~150 entradas**: 22 estilos/paletas × ~7 entradas, espalhadas por 5 formatos e pelo menos 6 espaços, em 10–12 cidades.
- [ ] Exportação do Studio para PNG por script.
- [ ] Pipeline completo (plan → metadata).
- [ ] Plausible, Search Console, Pinterest com os primeiros 50 pins.

**Sai quando:** cada estilo tem ≥ 6 entradas, todos os formatos aparecem, todas as imagens com paleta do Studio mostram o render real e o CTA abre o Studio com a cidade e a paleta certas.

### Fase 2 — Crescer

- [ ] Páginas `/cities/[city]` e `/spaces/[space]` quando passarem o limiar.
- [ ] Mais estilos e paletas, 300 → 1000 entradas.
- [ ] Imagens para Vercel Blob ou R2.
- [ ] Publicação automática no Pinterest e newsletter editorial.

---

## 9. Decisões em aberto

1. ~~Domínio do CTA~~ → `mapvibestudio.com`, com passagem de parâmetros a implementar no `mapvibe-content-hub` (§3). ✅ 2026-11-20
2. ~~Selecção das paletas~~ → as 10 do §2. ✅ 2026-11-20
3. Os 12 estilos da biblioteca: algum a trocar?
4. Orçamento de geração da Fase 1 (cerca de 150 entradas × 4 variantes).
5. Quem revê e aprova, e a que ritmo?
