import { useAuth } from '@clerk/clerk-react'
import { Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    window.location.href = '/login'
  }

  return <Outlet />
}

export default ProtectedRoute
