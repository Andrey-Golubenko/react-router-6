import { useEffect, useState } from 'react'

import { Form } from 'react-router-dom'

import { Input, Stack } from '@mui/material'

import { PostType } from '~/pages/BlogPage'

const UpdatePost = (props: PostType & { requestState: boolean }) => {
  const { id, title, body, userId, requestState } = props

  const [inputTitle, setInputTitle] = useState<string | null>(title)
  const [inputBody, setInputBody] = useState<string | null>(body)

  const handleChange = (event) => {
    if (event.target.name === 'title') {
      setInputTitle(event.target.value)
      return
    }

    setInputBody(event.target.value)
  }

  useEffect(() => {
    setInputTitle(title)

    setInputBody(body)

    return () => {
      setInputTitle('')
      setInputBody('')
    }
  }, [props])

  return (
    <Stack sx={{ sm: { width: '100%' }, md: { width: '50%' } }}>
      <Form
        className="router-dom-form"
        action={`/posts/${id}/edit`}
        method="patch"
      >
        <label className="router-dom-form-label">
          Title:{' '}
          <Input
            type="text"
            name="title"
            value={inputTitle}
            onChange={handleChange}
          />
        </label>
        <label className="router-dom-form-label">
          Body:{' '}
          <Input
            type="text"
            name="body"
            value={inputBody}
            onChange={handleChange}
          />
        </label>
        <Input
          sx={{ '&:before': { border: 'none' } }}
          type="hidden"
          name="userId"
          value={userId}
        />
        <Input
          sx={{ '&:before': { border: 'none' } }}
          type="hidden"
          name="id"
          value={id}
        />
        <Input
          sx={{
            '&:before': { border: '1px solid gray', height: '100%' },
            width: '25%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          type="submit"
          value="Adit post"
          disabled={requestState}
        />
      </Form>
    </Stack>
  )
}

export default UpdatePost
