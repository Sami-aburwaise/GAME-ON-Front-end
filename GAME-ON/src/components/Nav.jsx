import { NavLink } from 'react-router-dom'
import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import PersonIcon from '@mui/icons-material/Person'

const Nav = ({ user }) => {
  return (
    <header>
      <div className="header">
        <NavLink to="/">
          <h1>GAME ON</h1>
        </NavLink>
        <nav>
          <a href="/#Book-session">
            <h3>Book Session</h3>
          </a>
          <a href="/#our-coaches">
            <h3>Our Coaches</h3>
          </a>
          <a href="/#why">
            <h3>Why GAME ON?</h3>
          </a>
          <a href="/#about">
            <h3>About</h3>
          </a>
        </nav>
      </div>
      {user ? (
        <NavLink to="/profile">
          <h3>{user.firstName}</h3>
        </NavLink>
      ) : (
        <NavLink to="/signin">
          <PersonIcon fontSize="large" />
        </NavLink>
      )}
    </header>
  )
}

export default Nav
