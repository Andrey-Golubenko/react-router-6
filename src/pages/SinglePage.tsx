// import { useState, useEffect } from 'react'

import { Suspense } from 'react'

import {
  // useParams,
  Link,
  useNavigate,
  useLoaderData,
  Await,
  defer,
  json
  // useAsyncValue
} from 'react-router-dom'

import { Button, Grid } from '@mui/material'

import Comments from '../components/Comments'
import PostBody from '../components/PostBody'
import Text from '../components/Text'
import { LoaderFunc } from '../MainRoutes'

import { PostType } from './BlogPage'

const SinglePage = () => {
  const { singlePost, postID, comments } = useLoaderData() as {
    singlePost: PostType
    postID: string
    comments: any
  }
  // const { id } = useParams()
  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  // Bad aproach. We must use <Link>, acordin Documenation
  const goHome = () => navigate('/', { replace: true })

  // const [post, setPost] = useState<SinglePost | null>(null)

  // useEffect(() => {
  //   fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => setPost(data))
  // }, [id])

  return (
    <Grid
      container
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <Suspense
          fallback={<Text size={{ sm: 'h1' }}>Post is Loading ...</Text>}
        >
          <Await resolve={singlePost}>
            <PostBody />
          </Await>
        </Suspense>
      </Grid>
      <Grid item>
        <Suspense
          fallback={<Text size={{ sm: 'h1' }}>Comments is Loading ...</Text>}
        >
          <Await resolve={comments}>
            <Comments />
          </Await>
        </Suspense>
      </Grid>
      <Grid item padding="1rem">
        <Link
          to={`/posts/${postID}/edit`}
          style={{ color: 'green' }}
          state={{ ...singlePost }}
        >
          Edit this Post
        </Link>
      </Grid>
      <Grid item padding="1rem">
        <Button variant="outlined" onClick={goBack}>
          Go Back
        </Button>
      </Grid>
      <Grid item padding="1rem">
        {/*Bad aproach. We must use <Link>, acordin Documenation*/}
        <Button variant="outlined" onClick={goHome}>
          Go Home
        </Button>
      </Grid>
    </Grid>
  )
}

async function getPostByID(postID) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postID}`
  )

  return res.json()
}
async function getPostComments(postID) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postID}/comments`
  )

  return res.json()
}

export const singlePostloader: LoaderFunc = async ({ params }) => {
  const postID = params.id
  const singlePost = await getPostByID(postID)
  const isPostEmpty = !Object.keys(singlePost).length

  if (isPostEmpty) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw json({ message: 'Not found', reason: 'Wrong URL' }, { status: 404 })
  }
  return defer({
    singlePost,
    postID,
    comments: await getPostComments(postID)
  })
}

export default SinglePage
