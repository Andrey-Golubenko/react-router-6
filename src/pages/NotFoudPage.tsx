import { Link } from 'react-router-dom'

import Text from '../components/Text'

const NotFoudPage = () => {
  return (
    <Text size={{ sm: 'body1', md: 'h2' }} align="center">
      This page doesn&apos;t exist. Please go to <Link to="/">Homepage</Link>
    </Text>
  )
}

export default NotFoudPage
