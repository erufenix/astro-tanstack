import { RouterProvider } from '@tanstack/react-router'
import { StartClient } from '@tanstack/react-start/client'

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
		<StartClient router={clientRouter!} />
	)
}
