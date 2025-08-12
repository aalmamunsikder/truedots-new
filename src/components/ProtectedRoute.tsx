import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  console.log('ProtectedRoute: loading =', loading, 'user =', user);

  // If we have a user but loading is true, wait a bit more
  if (loading && user) {
    console.log('ProtectedRoute: User exists but still loading, waiting...');
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
            <div className="w-8 h-8 bg-primary rounded-full"></div>
          </div>
          <p className="text-muted-foreground">Loading...</p>
          <p className="text-xs text-muted-foreground mt-2">Loading user profile...</p>
        </div>
      </div>
    )
  }

  // If loading and no user, show initial loading
  if (loading && !user) {
    console.log('ProtectedRoute: Showing loading screen');
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
            <div className="w-8 h-8 bg-primary rounded-full"></div>
          </div>
          <p className="text-muted-foreground">Loading...</p>
          <p className="text-xs text-muted-foreground mt-2">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // If no user and not loading, immediately redirect to login
  if (!user && !loading) {
    console.log('ProtectedRoute: No user and not loading, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Double-check: if somehow we still don't have a user, redirect
  if (!user) {
    console.log('ProtectedRoute: Final check - no user, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  console.log('ProtectedRoute: User authenticated, rendering children');
  return <>{children}</>
}

export default ProtectedRoute;
