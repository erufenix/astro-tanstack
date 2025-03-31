# Astro TanStack

Build Single Page Application with Astro, TanStack Router and Query.

- Pre-rendered or server-side rendered with optional hydration.
- Pure client-side rendered

## Key files/directories

- `src/pages/*.astro` - Astro pages
- `src/_app/handle-ssr-request.ts` - load TanStack Router on the server
- `src/_app/entry.tsx` - SPA entry point
- `src/_app/routes` - SPA routes
- `src/_app/queries` - server and client data fetching using Astro endpoints/actions (feat TanStack Query)

## Routes

The POC demonstrates several different rendering strategies made possible by Astro:

### Pre-rendered

Generated at build time, optional hydration with Astro's `client:load` directive.

- `/ssg`
- `/ssg-no-hydration`

### Server-side rendered

Generated on demand with `export const prerender = false`.

Server-side redirect on protected routes.

- `/login-ssr`
- `/profile-ssr`
- `/ssr-no-hydration`

### Client-side rendered

Client-only rendering with Astro's `client:only` directive.

Client-side redirect on protected routes.

- `/login`
- `/profile`

## License

MIT
