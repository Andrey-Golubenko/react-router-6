import { redirect, useNavigate, useNavigation } from 'react-router-dom'

import { Button, Grid, Stack } from '@mui/material'

import NewPost from '~/components/NewPost'
import Text from '~/components/Text'

import { IAuthContext } from '../hoc/AuthProvider'
import useAuth from '../hooks/useAuth'

const CreatePost = () => {
  const navigate = useNavigate()
  const { signOut } = useAuth() as IAuthContext
  const handleClick = () => signOut(() => navigate('/', { replace: true }))

  const navigation = useNavigation()

  return (
    <Stack className="container">
      <Text size={{ sm: 'h1' }} display="flex" justifyContent="center">
        Create New Post
      </Text>

      <NewPost requestState={navigation?.state !== 'idle'} />

      <Grid>
        <Button variant="outlined" size="small" onClick={handleClick}>
          Log Out
        </Button>
      </Grid>
    </Stack>
  )
}

const createPost = async ({ title, body, userId }) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ title, body, userId })
  })
  const newPost = res.json()

  return newPost
}

export const createPostAction = async ({ request }) => {
  const formData = await request.formData()
  const preparedPostData = {
    title: formData.get('title'),
    body: formData.get('body'),
    userId: formData.get('userId')
  }

  const post = await createPost(preparedPostData)

  return redirect(`/posts/${post.id}`)
}

export default CreatePost
