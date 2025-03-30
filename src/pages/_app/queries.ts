import { actions } from 'astro:actions'
import { queryOptions } from '@tanstack/react-query'
import { createAuthClient } from 'better-auth/client'
import { anonymousClient } from 'better-auth/client/plugins'
import { origin } from '~/lib/origin'

const queryKeys = {
	auth: () => ['auth'] as const,
	products: () => ['products'] as const,
}

export const authClient = createAuthClient({
	baseURL: origin,
	plugins: [anonymousClient()],
})

export const authQueries = {
	get: () =>
		queryOptions({
			queryKey: [...queryKeys.auth()],
			queryFn: async () => {
				const { data, error } = await authClient.getSession()
				if (error) {
					throw new Error('Authentication failed. Please try again.')
				}
				if (data) {
					return data
				}
				return { user: null, session: null }
			},
		}),

	invalidate: () => queryOptions({ queryKey: [...queryKeys.auth()] }),
}

export const productQueries = {
	onDemand: () =>
		queryOptions({
			queryKey: [...queryKeys.products()],
			queryFn: async () => {
				if (import.meta.env.SSR) {
					return {
						timestamp: Date.now(),
						data: [
							{ id: 1, name: 'Product 1' },
							{ id: 2, name: 'Product 2' },
						],
					}
				} else {
					const { data } = await actions.getProducts()
					return data
				}
			},
			staleTime: 60_000,
		}),

	onBuild: () =>
		queryOptions({
			queryKey: [...queryKeys.products()],
			queryFn: async () => {
				if (import.meta.env.SSR) {
					return {
						timestamp: Date.now(),
						data: [
							{ id: 1, name: 'Product 1' },
							{ id: 2, name: 'Product 2' },
						],
					}
				} else {
					const { data } = await actions.getProducts()
					return data
				}
			},
			staleTime: 60_000,
		}),

	invalidate: () => queryOptions({ queryKey: [...queryKeys.products()] }),
}
