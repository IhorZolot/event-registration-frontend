import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import eventSchema from '../../config/eventSchema';
import { API } from '../../config/adminConfig';
import Button from '../../shared/button/Button';
import './CreateEvent.css'

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
      toast.success('Event created successfully!');
      reset(); 
      navigate('/'); 
    } catch (error) {
      toast.error('Error creating event!');
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className='create-event' >
      <h2 className='create-title' >Create New Event</h2>
    <form onSubmit={handleSubmit(onSubmit)} className='create-event-form' >
      <div className='form-input'>
        <label>Title</label>
        <input className='input-event-create' {...register('title')} />
        {errors.title && <p className='error-message' >{errors.title.message}</p>}
      </div>
      <div className='form-input' >
        <label>Date</label>
        <DatePicker
          selected={eventDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select event date"
          className='input-event-create'
        />
        {errors.eventDate && <p className='error-message' >{errors.eventDate.message}</p>}
      </div>
      <div className='form-input'>
        <label>Organizer</label>
        <input className='input-event-create'  {...register('organizer')} />
        {errors.organizer && <p className='error-message' >{errors.organizer.message}</p>}
      </div>
      <div className='form-input'>
        <label>Description</label>
        <textarea className='input-event-create' {...register('description')} />
        {errors.description && <p className='error-message' >{errors.description.message}</p>}
      </div>
      <div className='button-section' >
        <button className='button-submit' type="submit">Create</button>
      <Button/>
      </div>
      
    </form>
    </div>
  );
};

export default CreateEvent;
