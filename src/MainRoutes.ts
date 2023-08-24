import { ActionFunction, Navigate } from 'react-router-dom'

import RequireAuth from './hoc/RequireAuth'
import AboutPage from './pages/AboutPage'
import BlogPage, { blogLoader } from './pages/BlogPage'
import CreatePost, { createPostAction } from './pages/CreatePost'
import EditPost, { updatePostActipon } from './pages/EditPost'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFoudPage from './pages/NotFoudPage'
import PrivatePage from './pages/PrivatePage'
import SinglePage, { singlePostloader } from './pages/SinglePage'

export type LoaderFunc = ({
  request,
  params
}: {
  request: any | undefined
  params: any | undefined
}) => Promise<any>

export type RouteType = {
  index?: boolean
  path: string
  component: (() => JSX.Element | null) | (() => any)
  loaderFunc?: LoaderFunc
  errorComponent?: (() => JSX.Element | null) | (() => any)
  action?: ActionFunction
}

export const routes: RouteType[] = [
  {
    index: true,
    path: '/',
    component: HomePage
  },
  {
    path: 'about',
    component: AboutPage,
    errorComponent: ErrorPage
  },
  {
    path: 'about-us',
    component: Navigate.bind(null, { to: '/about', replace: true })
  },
  {
    path: 'posts',
    component: BlogPage,
    loaderFunc: blogLoader,
    errorComponent: ErrorPage
  },
  {
    path: 'posts/:id',
    component: SinglePage,
    loaderFunc: singlePostloader,
    errorComponent: ErrorPage
  },
  {
    path: 'posts/new',
    component: RequireAuth.bind(null, CreatePost),
    action: createPostAction
  },
  {
    path: 'posts/:id/edit',
    component: RequireAuth.bind(null, EditPost),
    // loaderFunc: singlePostloader,
    errorComponent: ErrorPage,
    action: updatePostActipon
  },
  {
    path: 'private',
    component: RequireAuth.bind(null, PrivatePage)
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: '*',
    component: NotFoudPage
  }
]
