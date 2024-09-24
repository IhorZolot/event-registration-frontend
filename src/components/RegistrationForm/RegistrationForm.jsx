import { useNavigate, useParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import registrationSchema from '../../config/registrationSchema';
import { API } from '../../config/adminConfig';
import Button from '../../shared/button/Button';
import './RegistrationForm.css'
import { toast } from 'react-toastify';

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
			toast.success('Registration successful!')
			navigate(`/event/${eventId}/participants`)
		} catch (error) {
			console.error('Error registering for event:', error)
		}
	}

	return (
		<div className='registration-form'>
			<h2 className='registration-title'>Event registration</h2>
		<form onSubmit={handleSubmit(onSubmit)} className='registration-form-container' >
			<div className='form-input'>
				<label>Full name</label>
				<input {...register('fullName', { required: true })  } type='text' className='input-registration' />
				{errors.fullName && <span className='error-message' >{errors.fullName.message}</span>}
			</div>
			<div className='form-input'>
				<label>Email</label>
				<input {...register('email', { required: true })} type='email' className='input-registration'/>
				{errors.email && <span className='error-message'>{errors.email.message}</span>}
			</div>
			<div className='form-input'>
				<label>Date of birth</label>
					<DatePicker
            selected={startDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"  
            placeholderText="Select your birth date"
						className='input-registration'
					/>
				{errors.dateOfBirth && <span className='error-message'>{errors.dateOfBirth.message}</span>}
			</div>
			<p>Where did you hear about this event?</p>
			<div className='form-input-radio'>
				<div >
					<label className='' >
						<input {...register('source')} type='radio' value='Social media' />
						<span>Social media</span>
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
			<div className='button-section' >
			<button type='submit' className='button-submit'>Register</button>
			<Button />
			</div>
		</form>
		</div>
	)
}

export default RegistrationForm
