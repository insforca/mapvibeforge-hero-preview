---
tags: [execucao, shopify, cta]
fase: execução
data: 2026-11-20
---

# Shopify deep links

Como fazer o botão "Create Yours in This Style" abrir o editor com a cidade e a paleta.

## Como funciona hoje (verificado a 20 Nov 2026)

- **mapvibestudio.com é uma loja Shopify**, não o repositório `mapvibe-content-hub`. Esse repositório é um site docmd antigo que não está publicado no domínio.
- O editor (`mapvibe-studio`) só arranca **dentro de um iframe** ou em `localhost`. Fora disso, `OriginGate` em `src/App.tsx` redirecciona para `https://mapvibestudio.com/products/mapvibe-city-map-print`, e os parâmetros perdem-se.
- Na página de produto, a secção Shopify cria o iframe com `src="https://app.mapvibestudio.com?shopify=1&sku=…"` e volta a carregá-lo quando muda a variante. Em nenhum dos casos passa `city`, `style`, etc.
- O editor já sabe ler `?city=&country=&lat=&lng=&style=&bearing=` (`posterStore.ts`, `getUrlParamFormOverrides`). Testado em `localhost`: abre Lisboa em Blueprint.
- A loja mostra "Back soon — We're improving our print quality. Orders reopen soon." (classe `sales-paused`).

## O que a citymapprints.com envia

```
https://mapvibestudio.com/products/mapvibe-city-map-print?city=Lisbon&country=Portugal&lat=38.7223&lng=-9.1393&style=tk_blueprint&utm_source=citymapprints
```

## O que falta: um script na secção do editor no tema Shopify

Shopify → Loja online → Temas → Editar código → a secção que contém `id="mapvibe-iframe"`. Colar **depois** do `</iframe>`:

```html
<script>
(function () {
  var KEYS = ['city', 'country', 'lat', 'lng', 'style', 'bearing'];
  var page = new URLSearchParams(window.location.search);
  var extra = KEYS
    .filter(function (k) { return page.get(k); })
    .map(function (k) { return k + '=' + encodeURIComponent(page.get(k).slice(0, 120)); })
    .join('&');
  if (!extra) return;

  var iframe = document.getElementById('mapvibe-iframe');
  if (!iframe) return;

  function withParams(src) {
    if (!src || /[?&](city|style)=/.test(src)) return src;
    return src + (src.indexOf('?') > -1 ? '&' : '?') + extra;
  }

  iframe.src = withParams(iframe.getAttribute('src'));

  // A mudança de variante recarrega o iframe com ?shopify=1&sku=…; repor os parâmetros.
  new MutationObserver(function () {
    var src = iframe.getAttribute('src');
    var next = withParams(src);
    if (next !== src) iframe.src = next;
  }).observe(iframe, { attributes: true, attributeFilter: ['src'] });
})();
</script>
```

Melhor ainda, se se preferir mexer no Liquid: acrescentar os parâmetros directamente no `src` inicial e na função que recarrega o iframe (procurar `'?shopify=1&sku='`).

## Teste

1. Abrir `https://mapvibestudio.com/products/mapvibe-city-map-print?city=Lisbon&country=Portugal&lat=38.7223&lng=-9.1393&style=tk_blueprint`.
2. O editor deve mostrar Lisboa em Blueprint (e não Washington em Vintage Noir).
3. Mudar o tamanho (variante) e confirmar que Lisboa se mantém.

Relacionado: [[Spec de lançamento]] §3, [[Deploy]].
