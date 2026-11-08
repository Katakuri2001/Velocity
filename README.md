# Velocity

Premium, futuristic, cinematic multi-brand automotive showroom.

## Stack

- Next.js App Router, React, TypeScript strict mode
- Tailwind CSS, Framer Motion
- Cloudflare D1 (raw SQL, no Prisma), Cloudflare R2
- Cloudflare Pages hosting

## Development

```bash
npm install
npm run dev        # starts Next.js on http://localhost:3000
npm run build      # production build
npm run typecheck  # TypeScript strict check
npm run lint       # ESLint
npm run test       # Vitest
```

## Cloudflare (deferred)

`wrangler.toml` is scaffolded but inactive. Connect D1, R2, and Pages after `wrangler login`.
