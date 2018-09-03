import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

ReactDOM.render(
	/* Wrap the app in a browser router */
	<BrowserRouter>
		<App />
	</BrowserRouter>, 
document.getElementById('root'))
