import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
	Link,
	Outlet,
	createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient
}>()({
	component: Component,
})

function Component() {
	return (
		<>
			<div className='flex gap-4 flex-col p-8'>
				<div className='flex gap-4 flex-col'>
					<div className='text-lg font-bold'>Routes:</div>

					<Link className='text-blue-500' to='/static' reloadDocument>
						Pre-rendered, no hydration
					</Link>

					<Link className='text-blue-500' to='/ssg'>
						Pre-rendered, hydrated
					</Link>

					<Link className='text-blue-500' to='/ssr'>
						Server-side rendered
					</Link>

					<div>
						Client-side rendered
						<div>
							<Link className='text-blue-500' to='/login'>
								Login
							</Link>{' '}
							/{' '}
							<Link className='text-blue-500' to='/profile'>
								Profile
							</Link>
						</div>
					</div>
				</div>
				<hr />
				<Outlet />
			</div>
			<ReactQueryDevtools buttonPosition='top-right' />
			<TanStackRouterDevtools position='bottom-right' />
		</>
	)
}
