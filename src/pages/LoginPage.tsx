import { useLocation, useNavigate, Path } from 'react-router-dom'

import { Button, Stack } from '@mui/material'

import Text from '../components/Text'
import { IAuthContext } from '../hoc/AuthProvider'
import useAuth from '../hooks/useAuth'

const LoginPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { signIn } = useAuth() as IAuthContext

  const fromPage: string | Partial<Path> =
    location?.state?.from?.pathname || '/'

  const handleSabmit = (event) => {
    event.preventDefault()
    const form = event.target
    const newUser: string = form.userName.value

    signIn(newUser, () =>
      navigate(fromPage, { replace: true, state: location?.state?.from?.state })
    )
  }

  return (
    <Stack className="container">
      <Text size={{ sm: 'h1' }}>Login Page</Text>
      <form onSubmit={handleSabmit}>
        <label>
          Name: <input name="userName" />
        </label>
        <Button type="submit">Login</Button>
      </form>
    </Stack>
  )
}

export default LoginPage
