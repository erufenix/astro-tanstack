import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'

import { authClient, authQueries } from '~/pages/_app/queries'
import { tryCatch } from '~/pages/_app/try-catch'

export const Route = createFileRoute('/login')({
	beforeLoad: async ({ context: { queryClient } }) => {
		const { data } = await tryCatch(queryClient.fetchQuery(authQueries.get()))

		if (data?.user) {
			throw redirect({ to: '/profile' })
		}
	},

	component: Component,
})

function Component() {
	const router = useRouter()

	return (
		<div>
			<button
				className='px-4 py-2 rounded-md bg-blue-500 text-white'
				onClick={async () => {
					await authClient.signIn()
					await router.invalidate()
				}}
				type='button'
			>
				Login anonymously
			</button>
		</div>
	)
}
