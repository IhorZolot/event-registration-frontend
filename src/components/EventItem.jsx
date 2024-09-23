import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './EventItem.module.css';


const EventItem = ({ event }) => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate(`/event/${event._id}/register`);
  };

  const handleViewParticipants = () => {
    navigate(`/event/${event._id}/participants`);
  };

  return (
    <div className={styles.itemEvent}>
      <h3>{event.title}</h3>
      <p className={styles.description}>{event.description}</p>
      <div className={styles.sectorDate}>
      <p>{event.eventDate}</p>
      <p>{event.organizer}</p>
      </div>
      <div className={styles.buttons}>
        <button className={styles.buttonItem}   onClick={handleRegister}>Register</button>
        <button className={styles.buttonItem} onClick={handleViewParticipants}>View</button>
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
