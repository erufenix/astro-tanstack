type Runtime = import('@astrojs/cloudflare').Runtime<
	{
		CF_PAGES_URL: string
		CF_PAGES_BRANCH: string
	} & Env
>

declare namespace App {
	interface Locals extends Runtime {}
}

interface ImportMetaEnv {
	readonly VERCEL_URL: string
}

// interface ImportMeta {
//   readonly env: ImportMetaEnv
// }
