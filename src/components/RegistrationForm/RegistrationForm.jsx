import { useNavigate, useParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import styles from './RegistrationForm.module.css';
import registrationSchema from '../../config/registrationSchema';
import { API } from '../../config/adminConfig';
import Button from '../../shared/button/Button';


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
		<div className={styles.containerRegistrationForm}>
			<h2>Event registration</h2>
		<form onSubmit={handleSubmit(onSubmit)} >
			<div className={styles.registerForm}>
				<label>Full name</label>
				<input {...register('fullName', { required: true })  } type='text' className={styles.inputRegistrationForm}/>
				{errors.fullName && <span className={styles.errorMessage} >{errors.fullName.message}</span>}
			</div>
			<div className={styles.registerForm}>
				<label>Email</label>
				<input {...register('email', { required: true })} type='email' className={styles.inputRegistrationForm}/>
				{errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
			</div>
			<div className={styles.registerForm}>
				<label>Date of birth</label>
					<DatePicker
            selected={startDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"  
            placeholderText="Select your birth date"
					/>
				{errors.dateOfBirth && <span className={styles.errorMessage}>{errors.dateOfBirth.message}</span>}
			</div>
			<p>Where did you hear about this event?</p>
			<div className={styles.sectorRadioButton}>
				<div >
					<label className={styles.radioButton } >
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
			<div className={styles.buttonsForm} >
			<button type='submit'>Register</button>
			<Button />
			</div>
		</form>
		</div>
	)
}

export default RegistrationForm
