import type { APIRoute } from 'astro'

export const prerender = false

export const GET: APIRoute = () => {
	return new Response(
		JSON.stringify({
			timestamp: Date.now(),
			data: [
				{ id: 1, name: 'Product 1' },
				{ id: 2, name: 'Product 2' },
			],
		}),
	)
}
