import type { APIContext } from 'astro'
import { auth } from '~/lib/auth'

export const prerender = false

export async function ALL(ctx: APIContext) {
	return auth.handler(ctx.request)
}
