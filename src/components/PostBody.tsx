import React from 'react'

import { useAsyncValue } from 'react-router-dom'

import { Grid } from '@mui/material'

import { PostType } from '~/pages/BlogPage'

import Text from './Text'

const PostBody = () => {
  const singlePost = useAsyncValue() as PostType

  return (
    <>
      <Grid item padding="1rem">
        <Text size={{ sm: 'h1' }}>{singlePost?.title}</Text>
      </Grid>
      <Grid item className="container" padding="1rem">
        <Text size={{ sm: 'body2', md: 'body1' }}>{singlePost?.body}</Text>
      </Grid>
    </>
  )
}

export default PostBody
