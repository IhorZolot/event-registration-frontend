import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { API } from '../config/adminConfig';
import eventSchema from '../config/eventSchema';
import { useNavigate } from 'react-router-dom';

import styles from './CreateEvent.module.css';
import Button from '../shared/button/Button';

const CreateEvent = () => {
  const [eventDate, setEventDate] = useState('');
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: zodResolver(eventSchema),
  });

  const handleDateChange = (date) => {
    setEventDate(date);
    setValue('eventDate', date);  
  };

  const onSubmit = async (data) => {
    try {
      const formattedDate = eventDate.toISOString().split('T')[0];
      const response = await API.post('/event/create', {
        ...data,
        eventDate: formattedDate
      });
      console.log('Event created:', response.data);
      reset(); 
      navigate('/'); 
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className={styles.container}  >
      <h2>Create New Event</h2>
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer }>
      <div>
        <label>Title</label>
        <input {...register('title')} />
        {errors.title && <p className={styles.errorMessage} >{errors.title.message}</p>}
      </div>
      <div>
        <label>Date</label>
        <DatePicker
          selected={eventDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select event date"
          className={styles.datePicker}
        />
        {errors.eventDate && <p className={styles.errorMessage}>{errors.eventDate.message}</p>}
      </div>
      <div>
        <label>Organizer</label>
        <input {...register('organizer')} />
        {errors.organizer && <p className={styles.errorMessage}>{errors.organizer.message}</p>}
      </div>
      <div>
        <label>Description</label>
        <textarea {...register('description')} />
      </div>
      <div className={styles.buttons}>
        <button type="submit">Create</button>
      <Button/>
      </div>
      
    </form>
    </div>
  );
};

export default CreateEvent;
