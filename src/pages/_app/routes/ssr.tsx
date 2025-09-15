import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'

import { dataQueries } from '~/pages/_app/queries'
import { formatDateFromTimestamp } from '~/pages/_app/utils'

export const Route = createFileRoute('/ssr')({
	loader: async ({ context: { astroContext, queryClient } }) => {
		await queryClient.ensureQueryData(dataQueries.ssr(astroContext))
	},

	component: Component,
})

function Component() {
	const { data } = useQuery(dataQueries.ssr())
	const router = useRouter()
	const queryClient = router.options.context.queryClient

	return (
		<div>
			<strong>Server-side rendered</strong>
			<p>Generated at {formatDateFromTimestamp(data!.timestamp)}</p>
			<button
				className='mt-4 px-4 py-2 rounded-md bg-blue-500 text-white'
				onClick={async () => {
					await queryClient.invalidateQueries(dataQueries.invalidate())
				}}
				type='button'
			>
				Refetch data
			</button>
		</div>
	)
}
