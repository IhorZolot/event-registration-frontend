import axios from 'axios';

export const API = axios.create({
  baseURL:  import.meta.env.MODE === 'development'
  ? 'http://localhost:3000/api/' 
  : 'https://event-registration-backend-d6s3.onrender.com/api/',
});