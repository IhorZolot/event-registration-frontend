import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventList from './components/EventList';
import RegistrationForm from './components/RegistrationForm';
import ParticipantsList from './components/ParticipantsList';
import CreateEvent from './components/CreateEvent';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/event/create" element={<CreateEvent />} />
        <Route path="/event/:eventId/register" element={<RegistrationForm />} />
        <Route path="/event/:eventId/participants" element={<ParticipantsList />} />
      </Routes>
    </Router>
  );
}

export default App;
