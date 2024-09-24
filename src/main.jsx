import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<App />
		<ToastContainer
          autoClose={1000}
          position="bottom-right"
          theme="colored"
          closeOnClick
        />
	</BrowserRouter>
)
