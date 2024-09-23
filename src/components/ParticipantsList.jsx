import { useEffect, useState } from 'react';
import { API } from '../config/adminConfig';
import { useNavigate, useParams } from 'react-router-dom';

const ParticipantsList = () => {
  const [participants, setParticipants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { eventId } = useParams();
  const navigate = useNavigate();

  

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await API.get(`/event/${eventId}/participants`);
        setParticipants(response.data);
      } catch (error) {
        console.error('Error fetching participants:', error);
      }
    };
    fetchParticipants();
  }, [eventId]);
  const filteredParticipants = participants.filter(participant =>
    participant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBack = () => {
    navigate(`/`);
  };
  

  return (
    <div>
      <div>  <h2>Awesome Event: participants </h2>

      <input 
				type="text" 
				placeholder="Пошук за ПІБ або електронною поштою" 
				value={searchTerm} 
				onChange={(e) => setSearchTerm(e.target.value)} 
			/>
      </div>
    
      {participants.length === 0 ? (
        <p>No participants registered for this event.</p>
      ) : (
        <ul>
          {filteredParticipants.map(participant => (
            <li key={participant._id}>{participant.fullName}  {participant.email}</li>
          ))}
        </ul>
      )}
      <button onClick={handleBack}>Back</button>
    </div>
  );
};


export default ParticipantsList;
