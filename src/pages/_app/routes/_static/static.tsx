import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { productQueries } from '~/pages/_app/queries'

export const Route = createFileRoute('/_static/static')({
	loader: async ({ context: { queryClient } }) => {
		await queryClient.ensureQueryData(productQueries.onBuild())
	},

	component: Component,
})

function Component() {
	const { data } = useQuery(productQueries.onBuild())

	return (
		<div>
			<div>Pre-rendered, no hydration</div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	)
}
