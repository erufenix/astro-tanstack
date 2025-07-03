import { RouterProvider } from '@tanstack/react-router'
import { RouterClient } from '@tanstack/react-router/ssr/client'
import { type AppRouter, createAppRouter } from './router'

let clientRouter: AppRouter | undefined

if (!import.meta.env.SSR) {
	clientRouter = createAppRouter()
}

export function AppEntry({
	getServerRouter,
	clientOnly,
}: {
	getServerRouter?: () => AppRouter
	clientOnly?: boolean
}) {
	return clientOnly ? (
		<RouterProvider router={clientRouter!} />
	) : import.meta.env.SSR ? (
		<RouterProvider router={getServerRouter!()} />
	) : (
		<RouterClient router={clientRouter!} />
	)
}
