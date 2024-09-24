import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import './SharedLayout.css'

const SharedLayout = () => {
	return (
		<main >
				<Suspense>
					<Outlet />
				</Suspense>
		</main>
	)
}

export default SharedLayout
