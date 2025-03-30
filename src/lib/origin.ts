export const origin = import.meta.env.VERCEL_URL
	? `https://${import.meta.env.VERCEL_URL}`
	: 'http://localhost:4321'
