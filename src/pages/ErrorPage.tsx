import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError
} from 'react-router-dom'

import { Button, Stack } from '@mui/material'

import Text from '../components/Text'

type ErorrType = {
  [x: string]: any // interesting thing
  status: number
  statusText: string
}

const ErrorPage = () => {
  const error = useRouteError() as ErorrType
  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  if (isRouteErrorResponse(error)) {
    return (
      <Stack alignItems="center">
        <Text size={{ sm: 'h1' }}>Error status: {error.status}</Text>
        {/* This is solution with throw a Response in Fetch-Funktion
          <Text size={{ sm: 'h1' }}>
          {error.statusText || 'Somthing goes rong!'}
        </Text> */}
        {/* This is solution with throw a Response like 'json() - from react-router-dom' in Loader */}
        <Text size={{ sm: 'h1' }}>{error.data.message}</Text>
        <Text size={{ sm: 'h2' }}>{error.data.reason}</Text>
        <Stack padding={5}>
          <Button variant="outlined" onClick={goBack}>
            Go Back
          </Button>
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack alignItems="center">
      <Text size={{ sm: 'h1' }}>Somthing goes rong!</Text>
    </Stack>
  )
}

export default ErrorPage
