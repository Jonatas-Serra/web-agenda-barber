import React from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from '../hooks/Auth'

interface RouteProps {
  children: JSX.Element
  isPrivate?: boolean
}

const ProtectedRoute: React.FC<RouteProps> = ({
  children,
  isPrivate = false,
}) => {
  const { user } = useAuth()

  if (isPrivate === !!user) {
    return children
  }

  if (isPrivate) {
    return <Navigate to="/login" />
  }

  return <Navigate to="/dash/resume" />
}

export default ProtectedRoute
