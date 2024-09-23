import { useNavigate, useParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { API } from '../config/adminConfig'
import registrationSchema from '../config/registrationSchema'


const RegistrationForm = () => {
	const navigate = useNavigate()
	const { eventId } = useParams()
  const [startDate, setStartDate] = useState('');
	const {
		register,
		handleSubmit,
		formState: { errors }, setValue 
	} = useForm({ resolver: zodResolver(registrationSchema) })

  const handleDateChange = (date) => {
    setStartDate(date);
    setValue('dateOfBirth', date);  
  };

	const onSubmit = async data => {
		try {
      const formattedDate = startDate.toISOString().split('T')[0];
    console.log('Formatted Date:', formattedDate);
			await API.post(`/event/${eventId}/register`, {
				...data,
      dateOfBirth: formattedDate
			})
			navigate(`/event/${eventId}/participants`)
		} catch (error) {
			console.error('Error registering for event:', error)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h2>Event registration</h2>
			<div>
				<label>Full name:</label>
				<input {...register('fullName', { required: true })} type='text' />
				{errors.fullName && <span>{errors.fullName.message}</span>}
			</div>
			<div>
				<label>Email</label>
				<input {...register('email', { required: true })} type='email' />
				{errors.email && <span>{errors.email.message}</span>}
			</div>
			<div>
				<label>Date of birth</label>
					<DatePicker
            selected={startDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"  
            placeholderText="Select your birth date"
					/>
				{errors.dateOfBirth && <span>{errors.dateOfBirth.message}</span>}
			</div>
			<div>
				<label>Where did you hear about this event?</label>
				<div>
					<label>
						<input {...register('source')} type='radio' value='Social media' />
						Social media
					</label>
				</div>
				<div>
					<label>
						<input {...register('source')} type='radio' value='Friends' />
						Friends
					</label>
				</div>
				<div>
					<label>
						<input {...register('source')} type='radio' value='Found myself' />
						Found myself
					</label>
				</div>
			</div>
			<button type='submit'>Register</button>
		</form>
	)
}

export default RegistrationForm
