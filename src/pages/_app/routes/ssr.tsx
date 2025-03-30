import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'

import { dataQueries } from '~/pages/_app/queries'

export const Route = createFileRoute('/ssr')({
	loader: async ({ context: { queryClient } }) => {
		await queryClient.ensureQueryData(dataQueries.onDemand())
	},

	component: Component,
})

function Component() {
	const { data } = useQuery(dataQueries.onDemand())
	const router = useRouter()
	const queryClient = router.options.context.queryClient

	return (
		<div>
			<div>Server-side rendered</div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
			<button
				className='px-4 py-2 rounded-md bg-blue-500 text-white'
				onClick={async () => {
					await queryClient.invalidateQueries(dataQueries.invalidate())
				}}
				type='button'
			>
				Refresh
			</button>
		</div>
	)
}
