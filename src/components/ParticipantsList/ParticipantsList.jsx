import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API } from '../../config/adminConfig'
import Button from '../../shared/button/Button'
import './ParticipantsList.css'

const ParticipantsList = () => {
	const [participants, setParticipants] = useState([])
	const [searchTerm, setSearchTerm] = useState('')
	const { eventId } = useParams()

	useEffect(() => {
		const fetchParticipants = async () => {
			try {
				const response = await API.get(`/event/${eventId}/participants`)
				setParticipants(response.data)
			} catch (error) {
				console.error('Error fetching participants:', error)
			}
		}
		fetchParticipants()
	}, [eventId])
	const filteredParticipants = participants.filter(
		participant =>
			participant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			participant.email.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<div className='participants-list'>
			<div className='participants-title-block'>
      <h2 className='participants-title'>Awesome Event participants </h2>
				<input
        className='participants-input'
					type='text'
					placeholder='Search by full name or email'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
				/>
			</div>
			{participants.length === 0 ? (
				<p>No participants registered for this event.</p>
			) : (
				<ul className='participants-list-box'>
					{filteredParticipants.map(participant => (
						<li className='participants-list-li' key={participant._id}>
							{participant.fullName} <span className='participants-list-span'>{participant.email}</span>
						</li>
					))}
				</ul>
			)}
      <Button  />
		</div>
	)
}

export default ParticipantsList
