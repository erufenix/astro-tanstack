import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { dataQueries } from '~/pages/_app/queries'
import { formatDateFromTimestamp } from '~/pages/_app/utils'

export const Route = createFileRoute('/ssg_/no-hydration')({
	loader: async ({ context: { astroContext, queryClient } }) => {
		await queryClient.ensureQueryData(dataQueries.prerender(astroContext))
	},

	component: Component,
})

function Component() {
	const { data } = useQuery(dataQueries.prerender())

	return (
		<div>
			<strong>Pre-rendered, no hydration</strong>
			<p>Generated at {formatDateFromTimestamp(data!.timestamp)}</p>
		</div>
	)
}
