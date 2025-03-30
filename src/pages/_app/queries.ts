import { actions } from 'astro:actions'
import { queryOptions } from '@tanstack/react-query'

const queryKeys = {
	auth: () => ['auth'] as const,
	data: () => ['data'] as const,
}

export const authClient = {
	signIn: async () => {
		const { data } = await actions.signIn()
		return data!
	},
	signOut: async () => {
		const { data } = await actions.signOut()
		return data!
	},
}

export const authQueries = {
	get: () =>
		queryOptions({
			queryKey: [...queryKeys.auth()],
			queryFn: async () => {
				const { data } = await actions.getSession()
				return data!
			},
		}),

	invalidate: () => queryOptions({ queryKey: [...queryKeys.auth()] }),
}

export const dataQueries = {
	onDemand: () =>
		queryOptions({
			queryKey: [...queryKeys.data()],
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
					const { data } = await actions.getData()
					return data
				}
			},
			staleTime: 60_000,
		}),

	onBuild: () =>
		queryOptions({
			queryKey: [...queryKeys.data()],
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
					const { data } = await actions.getData()
					return data
				}
			},
			staleTime: 60_000,
		}),

	invalidate: () => queryOptions({ queryKey: [...queryKeys.data()] }),
}
