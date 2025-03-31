import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { dataQueries } from '~/pages/_app/queries'

export const Route = createFileRoute('/ssg-no-hydration')({
	loader: async ({ context: { astroContext, queryClient } }) => {
		await queryClient.ensureQueryData(dataQueries.onBuild(astroContext))
	},

	component: Component,
})

function Component() {
	const { data } = useQuery(dataQueries.onBuild())

	return (
		<div>
			<div>Pre-rendered, no hydration</div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	)
}
