// import React, { useEffect, useState } from 'react'

import { Suspense } from 'react'

import {
  Await,
  Link,
  defer,
  json,
  useLoaderData,
  useSearchParams
} from 'react-router-dom'

import { Grid } from '@mui/material'

import { LoaderFunc } from '~/MainRoutes'

import BlogSearch from '../components/BlogSearch'
import Text from '../components/Text'

export type PostType = {
  id: number
  title: string
  body: string
  userId: number
}

const BlogPage = () => {
  // const [posts, setPosts] = useState<Post[]>([])
  const { posts } = useLoaderData() as { posts: PostType[] }
  const [searchParams, setSearchParams] = useSearchParams()

  const postQuery = searchParams.get('post') || ''
  const latest = searchParams.has('latest')

  const startFrom = latest ? 80 : 1

  // useEffect(() => {
  //   fetch('https://jsonplaceholder.typicode.com/posts')
  //     .then((res) => res.json())
  //     .then((data) => setPosts(data))
  // }, [])

  return (
    <Grid container justifyContent="center">
      <Grid item>
        <Text size={{ sm: 'body1', md: 'h2' }} align="center">
          Blogpage
        </Text>
        <Grid item display="flex" justifyContent="center" margin="2rem">
          <BlogSearch
            postQuery={postQuery}
            latest={latest}
            setSearchParams={setSearchParams}
          />
        </Grid>
        <Text size={{ sm: 'h2' }} align="center">
          <Link to="/posts/new"> Add New Post</Link>
        </Text>
        <Grid item>
          <Suspense
            fallback={
              <Text size={{ sm: 'h2' }} align="center">
                Loading ...
              </Text>
            }
          >
            <Await resolve={posts}>
              {(resolvedPosts) => (
                <>
                  {resolvedPosts
                    .filter(
                      (post) =>
                        post.title.includes(postQuery) && post.id >= startFrom
                    )
                    .map((post) => (
                      <Link key={post.id} to={`/posts/${post.id}`}>
                        <li>{post.title}</li>
                      </Link>
                    ))}
                </>
              )}
            </Await>
          </Suspense>
        </Grid>
      </Grid>
    </Grid>
  )
}

async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')

  // if (!res.ok) {
  //   // eslint-disable-next-line @typescript-eslint/no-throw-literal
  //   throw new Response('', {
  //     status: res.status,
  //     statusText: 'Faild to load!'
  //   })
  // }

  return res.json()
}

export const blogLoader: LoaderFunc = async ({ request, params }) => {
  // console.log('request: ', request)
  // console.log('params', params)

  const posts: PostType[] = await getPosts()

  if (!posts.length) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw json({ message: 'Not found', reason: 'Wrong URL' }, { status: 404 })
  }

  return defer({
    posts
  })
}

export default BlogPage
