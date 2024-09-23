import { useNavigate } from 'react-router-dom'
import styles from './Button.module.css'

const Button = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }
  return (
    <div onClick={handleClick} className={styles.buttonStyle}>Back</div>
  )
}

export default Button