
import react from '@astrojs/react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { defineConfig } from 'astro/config'
import node from '@astrojs/node';


export default defineConfig({
	//adapter: cloudflare(),
	adapter: node({
    mode: 'standalone' // Modo standalone para producción
  }),
	build: {
		format: 'file',
	},
	devToolbar: {
		enabled: false,
	},
	integrations: [
		react({
			babel: {
				plugins: [['babel-plugin-react-compiler', {}]],
			},
		}),
	],
	prefetch: {
		defaultStrategy: 'hover',
		prefetchAll: true,
	},
	trailingSlash: 'never',
	vite: {
		plugins: [
			tanstackRouter({
				target: 'react',
				autoCodeSplitting: true,
				routesDirectory: 'src/pages/_app/routes',
				generatedRouteTree: 'src/pages/_app/routeTree.gen.ts',
				routeFileIgnorePrefix: '-',
				quoteStyle: 'single',
			}),
		],
	},
})
