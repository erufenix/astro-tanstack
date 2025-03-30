import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'

import { authClient, authQueries } from '~/pages/_app/queries'

export const Route = createFileRoute('/_auth/profile')({
	component: Component,
})

function Component() {
	const router = useRouter()
	const { data } = useQuery(authQueries.get())

	return (
		<div>
			<p>Welcome {data?.user}</p>
			<br />
			<button
				className='px-4 py-2 rounded-md bg-blue-500 text-white'
				onClick={async () => {
					await authClient.signOut()
					await router.invalidate()
				}}
				type='button'
			>
				Sign Out
			</button>
		</div>
	)
}
