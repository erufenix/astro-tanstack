import { defineAction } from 'astro:actions'

export const server = {
	getData: defineAction({
		handler: async (input, context) => {
			return {
				timestamp: Date.now(),
				data: [
					{ id: 1, name: 'Product 1' },
					{ id: 2, name: 'Product 2' },
				],
			}
		},
	}),
	getSession: defineAction({
		handler: async (input, context) => {
			const isLoggedIn = context.cookies.get('isLoggedIn')?.boolean() ?? false
			return isLoggedIn ? { user: 'John' } : { user: null }
		},
	}),
	signIn: defineAction({
		handler: async (input, context) => {
			context.cookies.set('isLoggedIn', 'true', {
				sameSite: 'strict',
				httpOnly: true,
				secure: true,
				expires: new Date(Date.now() + 60_000),
			})
			return { success: true }
		},
	}),
	signOut: defineAction({
		handler: async (input, context) => {
			context.cookies.delete('isLoggedIn')
			return { success: true }
		},
	}),
}
