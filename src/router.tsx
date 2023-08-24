import React from 'react'

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'

import Layout from './components/Layout'
import { routes } from './MainRoutes'
import AboutPage from './pages/AboutPage'
// import ErrorPage from './pages/ErrorPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    // in this case Error will pop up and you have to ctreate a new
    // Layout for the ErrorPage
    // <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
    <Route path="/" element={<Layout />}>
      {routes
        .filter(({ path }) => !path.includes('about'))
        .map(
          ({
            index = false,
            path,
            component: Component,
            loaderFunc,
            errorComponent: ErrorComponent = undefined,
            action = undefined
          }) => (
            <Route
              key={path}
              index={index}
              path={path}
              element={<Component />}
              loader={loaderFunc}
              action={action}
              errorElement={
                ErrorComponent ? (
                  <ErrorComponent />
                ) : (
                  <div>Somthing goes rong!</div>
                )
              }
            />
          )
        )}
      <Route path="about/" element={<AboutPage />}>
        <Route path="contacts" element={<p>Our Contacts</p>} />
        <Route path="team" element={<p>Our Team</p>} />
      </Route>
    </Route>
  )
)

export default router
