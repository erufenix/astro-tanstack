import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
	Link,
	Outlet,
	createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { AstroGlobal } from 'astro'

export const Route = createRootRouteWithContext<{
	astroContext: AstroGlobal | undefined
	queryClient: QueryClient
}>()({
	component: Component,
})

function Component() {
	return (
		<>
			<div className='flex gap-4 flex-col p-8'>
				<div className='flex gap-2 flex-col'>
					<div className='text-lg font-bold'>Routes:</div>

					<div>
						<h3 className='font-bold'>Pre-rendered</h3>
						<div>
							<Link className='text-blue-500' to='/ssg'>
								With hydration
							</Link>{' '}
							/{' '}
							<Link
								className='text-blue-500'
								to='/ssg-no-hydration'
								reloadDocument
							>
								No hydration
							</Link>
						</div>
					</div>

					<div>
						<h3 className='font-bold'>Server-side rendered</h3>
						<div>
							<Link className='text-blue-500' to='/login-ssr'>
								Login
							</Link>{' '}
							/{' '}
							<Link className='text-blue-500' to='/profile-ssr'>
								Profile
							</Link>{' '}
							/{' '}
							<Link
								className='text-blue-500'
								to='/ssr-no-hydration'
								reloadDocument
							>
								No hydration
							</Link>
						</div>
					</div>

					<div>
						<h3 className='font-bold'>Client-side rendered</h3>
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
