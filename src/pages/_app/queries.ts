import { actions } from 'astro:actions'
import { queryOptions } from '@tanstack/react-query'
import type { AstroGlobal } from 'astro'
import { GET } from '~/pages/api/data'

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
	prerender: (astroContext?: AstroGlobal) =>
		queryOptions({
			queryKey: [...queryKeys.data()],
			queryFn: async () => {
				if (import.meta.env.SSR) {
					const res = await GET(astroContext!)
					return await res.json()
				} else {
					const { data } = await actions.getData()
					return data!
				}
			},
			staleTime: 60_000,
		}),

	ssr: (astroContext?: AstroGlobal) =>
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
