import { QueryClientProvider, dehydrate, hydrate } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'
import * as React from 'react'

import type { AstroGlobal } from 'astro'
import { createQueryClient } from './query-client'
import { routeTree } from './routeTree.gen'

export function createAppRouter(astroContext?: AstroGlobal) {
	const queryClient = createQueryClient()

	return createRouter({
		routeTree,
		context: { astroContext, queryClient },

		dehydrate: () => {
			return {
				queryClientState: dehydrate(queryClient),
			}
		},
		hydrate: (dehydrated) => {
			hydrate(queryClient, dehydrated.queryClientState)
		},

		Wrap: ({ children }: { children: React.ReactNode }) => {
			return (
				<React.StrictMode>
					<QueryClientProvider client={queryClient}>
						{children}
					</QueryClientProvider>
				</React.StrictMode>
			)
		},

		defaultGcTime: 0,
		defaultStaleTime: 0,

		defaultPreloadGcTime: 0,
		defaultPreloadStaleTime: 0,

		defaultPreload: 'intent',
	})
}

export type AppRouter = ReturnType<typeof createAppRouter>

declare module '@tanstack/react-router' {
	interface Register {
		router: AppRouter
	}
}
