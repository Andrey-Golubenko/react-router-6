import { useContext } from 'react'

import { AuthContext, IAuthContext } from '../hoc/AuthProvider'

const useAuth = (): IAuthContext | null => {
  return useContext(AuthContext)
}

export default useAuth
