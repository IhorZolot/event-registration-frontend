import  { useState, useEffect, useCallback } from 'react';
import EventItem from './EventItem';
import { API } from '../config/adminConfig';
import Pagination from '../shared/pagination/Pagination';
import SortControls from './SortControls';
import styles from './EventList.module.css';
import {  useNavigate } from 'react-router-dom';

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
    <div className={styles.container}>
      <h1 className={styles.header}>Events</h1>
      <div className={styles.sortControls}>
        <button  onClick={() => navigate('/event/create')}>Create Event</button>
        <SortControls 
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        onOrderChange={handleOrderChange}
      />
      </div>
        
      <div className={styles.eventList}>
          {events.map(event => (
            <EventItem key={event._id} event={event} />
          ))}
        </div>
      <Pagination  totalPages={totalPages} currentPage={page} onPageChange={setPage} />
    </div>
  );
};

export default EventList;
