import { Routes, Route } from 'react-router-dom'
import EventList from './components/EventList/EventList'
import CreateEvent from './components/CreateEvent/CreateEvent'
import RegistrationForm from './components/RegistrationForm/RegistrationForm'
import ParticipantsList from './components/ParticipantsList/ParticipantsList'

function App() {
	return (
		<Routes>
			<Route path='/' element={<EventList />} />
			<Route path='/event/create' element={<CreateEvent />} />
			<Route path='/event/:eventId/register' element={<RegistrationForm />} />
			<Route path='/event/:eventId/participants' element={<ParticipantsList />} />
		</Routes>
	)
}

export default App
