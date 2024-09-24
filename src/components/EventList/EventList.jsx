import  { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';

import EventItem from '../EventItem/EventItem';
import { API } from '../../config/adminConfig';
import SortControls from '../SortControls/SortControls';
import Pagination from '../../shared/pagination/Pagination';
import './EventList.css';


const EventList = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = () => {
      setLoading(true); 
      API.get(`/events`, { params: { page, sortBy, sortOrder } })
        .then((response) => {
          setEvents(response.data.events);
          setTotalPages(response.data.totalPages);
          setLoading(false); 
        })
        .catch((error) => {
          console.error('Error fetching events:', error);
          setLoading(false); 
        });
    };
  
    fetchEvents();
  }, [page, sortBy, sortOrder]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1); 
  };
  const handleOrderChange = (e) => {
    setSortOrder(e.target.value);
    setPage(1); 
  };

  return (
    <div className='event-list' >
      <h1 className='event-list-title'  >Events</h1>
      <div className='event-list-controls'  >
        <button className='btn-create-event'  onClick={() => navigate('/event/create')}>Create Event</button>
        <SortControls 
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        onOrderChange={handleOrderChange}
      />
      </div>
      {loading ? (
      <div>Loading...</div>
    ) : (
      <>
        <div className='event-items'>
          {events.map(event => (
            <EventItem key={event._id} event={event} />
          ))}
        </div>
        <Pagination 
          totalPages={totalPages} 
          currentPage={page} 
          onPageChange={setPage} 
        />
      </>
    )}
  </div>
  );
};

export default EventList;
