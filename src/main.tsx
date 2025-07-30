import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId='636718790089-3gtp71uehacppj3ug6tqeqq30j90vqg9.apps.googleusercontent.com'>
  <StrictMode>
  
    <App />
  
  </StrictMode>,
  </GoogleOAuthProvider>
)
