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
							(
							<Link className='text-blue-500' to='/ssg' reloadDocument>
								Reload
							</Link>
							) /{' '}
							<Link className='text-blue-500' to='/ssg/no-hydration'>
								No hydration
							</Link>{' '}
							(
							<Link
								className='text-blue-500'
								to='/ssg/no-hydration'
								reloadDocument
							>
								Reload
							</Link>
							)
						</div>
					</div>

					<div>
						<h3 className='font-bold'>Server-side rendered</h3>
						<div>
							<Link className='text-blue-500' to='/ssr/login'>
								Login
							</Link>{' '}
							(
							<Link className='text-blue-500' to='/ssr/login' reloadDocument>
								Reload
							</Link>
							) /{' '}
							<Link className='text-blue-500' to='/ssr/profile'>
								Profile
							</Link>{' '}
							(
							<Link className='text-blue-500' to='/ssr/profile' reloadDocument>
								Reload
							</Link>
							) /{' '}
							<Link className='text-blue-500' to='/ssr/no-hydration'>
								No hydration
							</Link>{' '}
							(
							<Link
								className='text-blue-500'
								to='/ssr/no-hydration'
								reloadDocument
							>
								Reload
							</Link>
							)
						</div>
					</div>

					<div>
						<h3 className='font-bold'>Client-side rendered</h3>
						<div>
							<Link className='text-blue-500' to='/csr/login'>
								Login
							</Link>{' '}
							(
							<Link className='text-blue-500' to='/csr/login' reloadDocument>
								Reload
							</Link>
							) /{' '}
							<Link className='text-blue-500' to='/csr/profile'>
								Profile
							</Link>{' '}
							(
							<Link className='text-blue-500' to='/csr/profile' reloadDocument>
								Reload
							</Link>
							)
						</div>
					</div>

					<div>
						<h3 className='font-bold'>Client-side rendered via URL rewrite</h3>
						<div>
							<Link className='text-blue-500' to='/rewrite/login'>
								Login
							</Link>{' '}
							(
							<Link
								className='text-blue-500'
								to='/rewrite/login'
								reloadDocument
							>
								Reload
							</Link>
							) /{' '}
							<Link className='text-blue-500' to='/rewrite/profile'>
								Profile
							</Link>{' '}
							(
							<Link
								className='text-blue-500'
								to='/rewrite/profile'
								reloadDocument
							>
								Reload
							</Link>
							)
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
