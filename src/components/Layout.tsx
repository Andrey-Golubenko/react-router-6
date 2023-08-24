import React from 'react'

import { NavLink, Outlet } from 'react-router-dom'

import CustomNavLink from './CustomNavLink'

const Layout = () => {
  // const active = ({ isActive }) => (isActive ? 'active-link' : '')

  return (
    <>
      <header>
        <CustomNavLink to="/" end="end">
          Home
        </CustomNavLink>
        <CustomNavLink to="/posts">Blog</CustomNavLink>
        <CustomNavLink to="/about">About</CustomNavLink>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="container">{new Date().getFullYear()}</footer>
    </>
  )
}

export default Layout
