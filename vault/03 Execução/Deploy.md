---
tags: [execucao, deploy]
fase: execução
---

# Deploy

## Estado (20 Nov 2026)

- **Vercel**, conta `insforca`, projecto **`mapvibeforge-hero-preview`**.
- Domínios: `citymapprints.com` e `www.citymapprints.com`, verificados.
- DNS no Cloudflare: CNAME `@` e `www` → `4f5d4e65abfff0d6.vercel-dns-016.com`, **proxy desligado** (nuvem cinzenta). Com o proxy ligado o certificado do Vercel falha.
- `vercel.json` define `framework: nextjs`, porque o projecto estava configurado para procurar `dist/` (herança do Vite).
- A pasta local está ligada ao projecto (`.vercel/`, fora do Git).

## Como publicar

```
npm run build          # tem de passar
vercel deploy          # preview
vercel deploy --prod   # produção (citymapprints.com)
```

## Por verificar

- Se o projecto Vercel está ligado ao GitHub (deploy automático a cada push) ou só recebe deploys pela CLI.
- O workflow do GitHub Pages (`.github/workflows/deploy.yml`) não existe neste ramo; confirmar se ainda existe em `main` antes de fundir.
- O projecto Vercel antigo `citymapprints-com` parece sem uso: arquivar?

Ver [[Runbook]].
