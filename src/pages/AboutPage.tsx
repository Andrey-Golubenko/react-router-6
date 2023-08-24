import { Outlet, Link } from 'react-router-dom'

import { Stack } from '@mui/material'

import Text from '../components/Text'

const AboutPage = () => {
  return (
    <Stack className="container" justifyContent="center">
      <Text size={{ sm: 'h1' }} align="center" mb="2rem">
        About Page
      </Text>

      <Link to="contacts">Our Contacts</Link>
      <Link to="team">Our Team</Link>

      <Outlet />
    </Stack>
  )
}

export default AboutPage
