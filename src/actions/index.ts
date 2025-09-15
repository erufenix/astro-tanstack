import { defineAction } from 'astro:actions'

export const server = {
	getSession: defineAction({
		handler: async (_, context) => {
			const isLoggedIn = context.cookies.get('isLoggedIn')?.boolean() ?? false
			return isLoggedIn ? { user: 'John' } : { user: null }
		},
	}),
	signIn: defineAction({
		handler: async (_, context) => {
			context.cookies.set('isLoggedIn', 'true', {
				maxAge: 600,
				httpOnly: true,
				path: '/',
				sameSite: 'strict',
				secure: import.meta.env.PROD,
			})
			return { success: true }
		},
	}),
	signOut: defineAction({
		handler: async (_, context) => {
			context.cookies.delete('isLoggedIn', {
				httpOnly: true,
				path: '/',
				sameSite: 'strict',
				secure: import.meta.env.PROD,
			})
			return { success: true }
		},
	}),
	getData: defineAction({
		handler: async (_, _context) => {
			return {
				timestamp: Date.now(),
			}
		},
	}),
}
