import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { dataQueries } from '~/pages/_app/queries'

export const Route = createFileRoute('/ssr-no-hydration')({
	loader: async ({ context: { astroContext, queryClient } }) => {
		await queryClient.ensureQueryData(dataQueries.onDemand(astroContext))
	},

	component: Component,
})

function Component() {
	const { data } = useQuery(dataQueries.onDemand())

	return (
		<div>
			<div>Server-side rendered</div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	)
}
