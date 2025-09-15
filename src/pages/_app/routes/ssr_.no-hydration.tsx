import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { dataQueries } from '~/pages/_app/queries'
import { formatDateFromTimestamp } from '~/pages/_app/utils'

export const Route = createFileRoute('/ssr_/no-hydration')({
	loader: async ({ context: { astroContext, queryClient } }) => {
		await queryClient.ensureQueryData(dataQueries.ssr(astroContext))
	},

	component: Component,
})

function Component() {
	const { data } = useQuery(dataQueries.ssr())

	return (
		<div>
			<strong>Server-side rendered, no hydration</strong>
			<p>Generated at {formatDateFromTimestamp(data!.timestamp)}</p>
		</div>
	)
}
