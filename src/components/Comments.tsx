import { useAsyncValue } from 'react-router-dom'

import { Grid } from '@mui/material'

import Text from '../components/Text'

type Comment = {
  email: string
  name: string
  body: string
}

const Comments = () => {
  const comments = useAsyncValue() as Partial<Comment>[]

  return (
    <>
      <Text size={{ sm: 'h1' }} textAlign="center">
        Comments:{' '}
      </Text>
      {comments.map((comment) => (
        <Grid
          container
          key={comment?.name}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          padding="1rem"
        >
          <Grid item className="container">
            <Text size={{ sm: 'h3' }}>{comment?.email}</Text>
          </Grid>
          <Grid item className="container">
            <Text size={{ sm: 'h4' }}>{comment?.name}</Text>
          </Grid>
          <Grid item className="container">
            <Text size={{ sm: 'body1' }}>{comment?.body}</Text>
          </Grid>
        </Grid>
      ))}
    </>
  )
}

export default Comments
