import React from 'react'

import { RouterProvider } from 'react-router-dom'

import AuthProvider from './hoc/AuthProvider'
import router from './router'

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      {/* OLD APPROUCH */}
      {/* <Routes>
        <Route path="/" element={<Layout />}>
          {routes
            .filter(({ path }) => !path.includes('about'))
            .map(({ index = false, path, component: Component }) => (
              <Route
                key={path}
                index={index}
                path={path}
                element={<Component />}
              />
            ))}
          <Route path="about/" element={<AboutPage />}>
            <Route path="contacts" element={<p>Our Contacts</p>} />
            <Route path="team" element={<p>Our Team</p>} />
          </Route>
        </Route>
      </Routes> */}
    </AuthProvider>
  )
}

export default App
