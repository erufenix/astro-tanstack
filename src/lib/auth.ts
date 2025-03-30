import { betterAuth } from 'better-auth'
import { anonymous } from 'better-auth/plugins'
import Database from 'better-sqlite3'
import { origin } from './origin'

export const auth = betterAuth({
	database: new Database('../../db.sqlite'),
	baseURL: origin,
	secret: 'secret',
	trustedOrigins: [origin],
	plugins: [
		anonymous({
			emailDomainName: import.meta.env.VERCEL_URL,
		}),
	],
})
