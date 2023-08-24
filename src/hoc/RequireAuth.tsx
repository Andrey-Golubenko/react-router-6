import React from 'react'

import { Navigate, useLocation } from 'react-router-dom'

import useAuth from '../hooks/useAuth'

import { IAuthContext } from './AuthProvider'

const RequireAuth = (WrappedComponent): React.FC | null => {
  const location = useLocation()

  const { user } = useAuth() as IAuthContext

  if (!user) {
    return Navigate({ to: '/login', state: { from: location } })
  }
  return WrappedComponent()
}

export default RequireAuth
