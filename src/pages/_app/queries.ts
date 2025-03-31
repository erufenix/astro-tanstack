import { actions } from 'astro:actions'
import { queryOptions } from '@tanstack/react-query'
import type { AstroGlobal } from 'astro'

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
	get: (astroContext?: AstroGlobal) =>
		queryOptions({
			queryKey: [...queryKeys.auth()],
			queryFn: async () => {
				if (import.meta.env.SSR) {
					const { data } = await astroContext!.callAction(
						actions.getSession,
						{},
					)
					return data!
				} else {
					const { data } = await actions.getSession()
					return data!
				}
			},
			staleTime: 10_000,
		}),

	invalidate: () => queryOptions({ queryKey: [...queryKeys.auth()] }),
}

export const dataQueries = {
	onDemand: (astroContext?: AstroGlobal) =>
		queryOptions({
			queryKey: [...queryKeys.data()],
			queryFn: async () => {
				if (import.meta.env.SSR) {
					const { data } = await astroContext!.callAction(actions.getData, {})
					return data!
				} else {
					const { data } = await actions.getData()
					return data!
				}
			},
			staleTime: 60_000,
		}),

	onBuild: (astroContext?: AstroGlobal) =>
		queryOptions({
			queryKey: [...queryKeys.data()],
			queryFn: async () => {
				if (import.meta.env.SSR) {
					const { data } = await astroContext!.callAction(actions.getData, {})
					return data!
				} else {
					const { data } = await actions.getData()
					return data!
				}
			},
			staleTime: 60_000,
		}),

	invalidate: () => queryOptions({ queryKey: [...queryKeys.data()] }),
}
