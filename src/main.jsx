import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import PS2Background from './components/PS2Background/PS2Background'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <PS2Background>
        <App />
      </PS2Background>
    </Router>
  </React.StrictMode>
)