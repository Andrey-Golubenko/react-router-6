import React from 'react'

import { Form } from 'react-router-dom'

import { Input, Stack } from '@mui/material'

const NewPost = ({ requestState }: { requestState: boolean }) => {
  return (
    <Stack sx={{ sm: { width: '100%' }, md: { width: '50%' } }}>
      <Form className="router-dom-form" action="/posts/new" method="post">
        <label className="router-dom-form-label">
          Title: <Input type="text" name="title" />
        </label>
        <label className="router-dom-form-label">
          Body: <Input type="text" name="body" />
        </label>
        <Input
          sx={{ '&:before': { border: 'none' } }}
          type="hidden"
          name="userId"
          value="1"
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
          value="Add post"
          disabled={requestState}
        />
      </Form>
      {/*Bad aproach. We must use <Link>, acordin Documenation*/}
    </Stack>
  )
}

export default NewPost
