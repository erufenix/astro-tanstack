import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'

import { authClient, authQueries } from '~/pages/_app/queries'
import { tryCatch } from '~/pages/_app/try-catch'

export const Route = createFileRoute('/ssr_/login')({
	beforeLoad: async ({ context: { astroContext, queryClient } }) => {
		const { data } = await tryCatch(
			queryClient.fetchQuery(authQueries.get(astroContext)),
		)

		if (data?.user) {
			throw redirect({ to: '/ssr/profile' })
		}
	},

	component: Component,
})

function Component() {
	const router = useRouter()
	const queryClient = useQueryClient()

	return (
		<div>
			<button
				className='px-4 py-2 rounded-md bg-blue-500 text-white'
				onClick={async () => {
					await authClient.signIn()
					await queryClient.invalidateQueries(authQueries.get())
					await router.invalidate()
				}}
				type='button'
			>
				Login anonymously
			</button>
		</div>
	)
}
