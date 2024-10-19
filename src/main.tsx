import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastNotification } from './presentation/components/toast-notification'
import App from './presentation/components/app'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastNotification />
    <App />
  </StrictMode>
)
