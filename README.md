# Astro TanStack

Build Single Page Application (SPA) with Astro, TanStack Router and Query.

- Pre-rendered or server-side rendered with optional hydration.
- Pure client-side rendered

## Key files/directories

- `src/pages/*.astro` - Astro pages
- `src/_app/handle-ssr-request.ts` - load TanStack Router on the server
- `src/_app/entry.tsx` - SPA entry point
- `src/_app/routes` - SPA routes
- `src/_app/router.ts` - TanStack Router configuration
- `src/_app/queries` - server and client data fetching using Astro endpoints/actions (feat TanStack Query)

## Routes

The POC demonstrates Astro's different rendering and hydration strategies when it comes to building a SPA with TanStack Router:

### Pre-rendered

Generated at build time, optional hydration with Astro's `client:load` directive.

- Entry: `pages/[...ssg].astro`
- Routes:
  - `/ssg`
  - `/ssg/no-hydration`

### Server-side rendered

Generated on demand with `export const prerender = false`, optional hydration with Astro's `client:load` directive.

Server-side redirect on protected routes.

- Entry: `pages/[...ssr].astro`
- Routes:
  - `/ssr/login`
  - `/ssr/profile`
  - `/ssr/no-hydration`

### Client-side rendered

Client-only rendering with Astro's `client:only` directive.

Client-side redirect on protected routes.

- Entry: `pages/[...csr].astro`
- Routes:
  - `/csr/login`
  - `/csr/profile`

### Client-side rendered via URL rewrite

Classic client-side SPA, where all routes are served by the same page.

Client-side redirect on protected routes.

For production, different hosting providers will have different ways to set up rewrite rules. This demo is using Cloudflare Pages, and rewrite rules are configured in `public/_redirects`.

For other providers, please refer to [Create React App's documentation](https://create-react-app.dev/docs/deployment).

- Entry: `pages/rewrite.astro`
- Routes:
  - `/rewrite/login`
  - `/rewrite/profile`

## License

MIT
