import  { useState, useEffect, useCallback } from 'react';
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

  const navigate = useNavigate();

  const fetchEvents = useCallback(async () => {
    try {
      const response = await API.get(`/events`, { params: { page, sortBy, sortOrder } });
      setEvents(response.data.events);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }, [page, sortBy, sortOrder]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1); 
    setEvents([]);
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
        
      <div className='event-items' >
          {events.map(event => (
            <EventItem key={event._id} event={event} />
          ))}
        </div>
      <Pagination  totalPages={totalPages} currentPage={page} onPageChange={setPage} />
    </div>
  );
};

export default EventList;
