import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'

import { productQueries } from '~/pages/_app/queries'

export const Route = createFileRoute('/ssr')({
	loader: async ({ context: { queryClient } }) => {
		await queryClient.ensureQueryData(productQueries.onDemand())
	},

	component: Component,
})

function Component() {
	const { data } = useQuery(productQueries.onDemand())
	const router = useRouter()
	const queryClient = router.options.context.queryClient

	return (
		<div>
			<div>Server-side rendered</div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
			<button
				className='px-4 py-2 rounded-md bg-blue-500 text-white'
				onClick={async () => {
					await queryClient.invalidateQueries(productQueries.invalidate())
				}}
				type='button'
			>
				Refresh
			</button>
		</div>
	)
}
