import { createRequestHandler } from '@tanstack/react-start/server'

import { createAppRouter } from './router'

export async function handleRequest(request: Request) {
	const router = createAppRouter()

	const getServerRouter = () => router

	const handler = createRequestHandler({
		request: new Request(request.url.replace('.html', ''), request),
		createRouter: getServerRouter,
	})

	// trigger the handler, which loads the router for SSR
	await handler(() => null)

	// inject scripts for dehydrated router
	// ref: https://github.com/TanStack/router/blob/main/packages/react-start-server/src/defaultRenderHandler.tsx
	const scriptHtml = await Promise.all(router.serverSsr!.injectedHtml).then(
		(htmls) => htmls.join(''),
	)

	return { getServerRouter, scriptHtml }
}
