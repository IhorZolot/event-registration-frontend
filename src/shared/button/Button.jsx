import { useNavigate } from 'react-router-dom'
import './Button.css'
const Button = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }
  return (
    <button onClick={handleClick} className='button-style'>Back</button>
  )
}

export default Button