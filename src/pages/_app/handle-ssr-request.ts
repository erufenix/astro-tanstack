import { createRequestHandler } from '@tanstack/react-router/ssr/server'

import type { AstroGlobal } from 'astro'
import { createAppRouter } from './router'

export async function handleSsrRequest(astroContext: AstroGlobal) {
	const router = createAppRouter(astroContext)

	const getServerRouter = () => router

	const handler = createRequestHandler({
		request: new Request(
			astroContext.request.url.replace('.html', ''),
			astroContext.request,
		),
		createRouter: getServerRouter,
	})

	// request handler, which loads the router for SSR
	// when TanStack Router's redirect is thrown, return redirect response
	// ref: https://github.com/TanStack/router/blob/main/packages/react-router/src/ssr/defaultRenderHandler.tsx
	const redirectResponse = await handler(
		({ router, responseHeaders, request }) => {
			return router.state.redirect
		},
	)

	if (redirectResponse)
		return { redirectResponse, getServerRouter, scriptHtml: '' }

	// inject scripts for dehydrated router
	const scriptHtml = await Promise.all(
		router.serverSsr?.injectedHtml ?? [],
	).then((htmls) => htmls.join(''))

	return { redirectResponse: null, getServerRouter, scriptHtml }
}
