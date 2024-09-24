import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './EventItem.css';


const EventItem = ({ event }) => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate(`/event/${event._id}/register`);
  };

  const handleViewParticipants = () => {
    navigate(`/event/${event._id}/participants`);
  };

  return (
    <div className='event-item'>
      <h3 className='event-title' >{event.title}</h3>
      <p className='event-description'>{event.description}</p>
      <div className='event-info' >
      <p>{event.eventDate}</p>
      <p>{event.organizer}</p>
      </div>
      <div className='event-actions' >
        <button className='event-button'    onClick={handleRegister}>Register</button>
        <button className='event-button'   onClick={handleViewParticipants}>View</button>
      </div>
    </div>
  );
};


EventItem.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    eventDate: PropTypes.string.isRequired,
    organizer: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventItem;
