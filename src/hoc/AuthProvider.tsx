import { createContext, useState } from 'react'

export type IAuthContext = {
  user: string | null
  signIn: (newUser: string, cd: () => void) => void
  signOut: (cd: () => void) => void
}

export const AuthContext = createContext<IAuthContext | null>(null)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<string | null>(null)

  const signIn = (newUser: string, cb: () => void) => {
    setUser(newUser)
    cb()
  }

  const signOut = (cb: () => void) => {
    setUser(null)
    cb()
  }

  const value: IAuthContext = { user, signIn, signOut }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
