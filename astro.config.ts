import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
	adapter: cloudflare(),
	build: {
		format: "file",
	},
	devToolbar: {
		enabled: false,
	},
	integrations: [
		react({
			babel: {
				plugins: [["babel-plugin-react-compiler", {}]],
			},
		}),
	],
	prefetch: {
		defaultStrategy: "hover",
		prefetchAll: true,
	},
	trailingSlash: "never",
	vite: {
		build: {
			rollupOptions: {
				external: [
					"tanstack-start-manifest:v",
					"tanstack-start-route-tree:v",
					"tanstack-start-server-fn-manifest:v",
				],
			},
		},
		plugins: [
			tanstackRouter({
				target: "react",
				autoCodeSplitting: true,
				routesDirectory: "src/pages/_app/routes",
				generatedRouteTree: "src/pages/_app/routeTree.gen.ts",
				routeFileIgnorePrefix: "-",
				quoteStyle: "single",
			}),
		],
		resolve: {
			alias: {
				...(process.env.NODE_ENV === "production" && {
					"react-dom/server": "react-dom/server.edge",
				}),
			},
		},
	},
});
