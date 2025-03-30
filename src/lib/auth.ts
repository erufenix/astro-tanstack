import path from 'node:path'
import { betterAuth } from 'better-auth'
import { anonymous } from 'better-auth/plugins'
import Database from 'better-sqlite3'

export const auth = betterAuth({
	database: new Database(path.join(process.cwd(), 'db.sqlite')),
	baseURL: 'http://localhost:4321',
	secret: 'secret',
	trustedOrigins: ['http://localhost:4321'],
	plugins: [
		anonymous({
			emailDomainName: 'localhost',
		}),
	],
})
