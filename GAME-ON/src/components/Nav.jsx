import { NavLink } from 'react-router-dom'

import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

const Nav = () => {
  return (
    <header>
      <div className="header">
        <h1>GAME ON</h1>
        <nav>
          <a href="#Book-session">
            <h3>Book session</h3>
          </a>
          <a href="#our-coaches">
            <h3>our coaches</h3>
          </a>
          <a href="#about">
            <h3>about</h3>
          </a>
        </nav>
      </div>
      <h3>sign in</h3>
    </header>
  )
}

export default Nav
