import { defineAction } from 'astro:actions'

export const server = {
	getProducts: defineAction({
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
}
