import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App.jsx'
import './index.css'
import { initErrorTracking } from './utils/errorTracking.js'
import { registerSW } from 'virtual:pwa-register'

initErrorTracking()

registerSW({ immediate: true })

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

const root = (
  <React.StrictMode>
    {googleClientId ? (
      <GoogleOAuthProvider clientId={googleClientId}>
        <App />
      </GoogleOAuthProvider>
    ) : (
      <App />
    )}
  </React.StrictMode>
)

ReactDOM.createRoot(document.getElementById('root')).render(root)
