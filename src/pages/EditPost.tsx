import { useEffect, useState } from 'react'

import {
  useActionData,
  useLocation,
  useNavigation,
  useParams
} from 'react-router-dom'

import { Stack } from '@mui/material'

import UpdatePost from '~/components/UpdatePost'

import Text from '../components/Text'

import { PostType } from './BlogPage'
import { singlePostloader } from './SinglePage'

const EditPost = () => {
  const { id } = useParams()
  const { state } = useLocation()
  const data = useActionData() as { message: string }
  const [editablePost, setEditablePost] = useState<PostType>(state)
  const navigation = useNavigation()

  useEffect(() => {
    if (data?.message) {
      singlePostloader({
        request: null,
        params: { id }
      }).then(({ data }) => setEditablePost(data?.singlePost))
    }
  }, [data])

  /* You have to remember, that jsonplaceholder.typicode.com API is fake API and does not return data modified on the client  */

  return (
    <Stack>
      <Text
        size={{ sm: 'h1' }}
        display="flex"
        justifyContent="center"
        color="blue"
      >
        {data?.message && data?.message}
      </Text>
      <Text size={{ sm: 'h1' }} display="flex" justifyContent="center">
        Edit Post {editablePost?.id}
      </Text>
      <UpdatePost
        {...editablePost}
        requestState={navigation?.state !== 'idle'}
      />
    </Stack>
  )
}

const updatePost = async ({ title, body, userId, id }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ title, body, userId })
  })

  return res.json()
}

export const updatePostActipon = async ({ request }) => {
  const formData = await request.formData()
  const preparedPostData = {
    title: formData.get('title'),
    body: formData.get('body'),
    userId: formData.get('userId')
  }

  const id = formData.get('id')

  if (!formData.get('title') || !formData.get('body')) {
    return { message: `All fields are required` }
  }

  const updatedPost = await updatePost({ ...preparedPostData, id })

  return { message: `Post ${updatedPost.id} was seccessfully updated` }
}

export default EditPost
