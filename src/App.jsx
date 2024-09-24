import { Routes, Route } from 'react-router-dom'
import EventList from './components/EventList/EventList'
import CreateEvent from './components/CreateEvent/CreateEvent'
import RegistrationForm from './components/RegistrationForm/RegistrationForm'
import ParticipantsList from './components/ParticipantsList/ParticipantsList'
import SharedLayout from './shared/SharedLayout/SharedLayout'
import { Suspense } from 'react'

function App() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Routes>
				<Route path='/' element={<SharedLayout />}>
					<Route index element={<EventList />} />
					<Route path='/event/create' element={<CreateEvent />} />
					<Route path='/event/:eventId/register' element={<RegistrationForm />} />
					<Route path='/event/:eventId/participants' element={<ParticipantsList />} />
				</Route>
			</Routes>
		</Suspense>
	)
}

export default App
