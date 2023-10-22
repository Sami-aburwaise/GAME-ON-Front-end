import { NavLink } from 'react-router-dom'
import Coaches from '../components/Coaches'

import * as React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

const Home = ({ coaches }) => {
  return (
    <main>
      <section id="Book-session">
        <video autoPlay loop muted>
          <source src="../src/assets/bg_vid.mp4" type="video/mp4" />
        </video>
        <div className="content">
          <h1>GAME ON!</h1>
          <h2>Get pro</h2>
          <NavLink to="/session">
            <Button variant="contained" color="success" size="large">
              Book a Session
            </Button>
          </NavLink>
        </div>
      </section>
      <section id="our-coaches">
        <h1>our coaches</h1>
        <Coaches coaches={coaches} />
      </section>
      <section id="about">
        <h1>about GAME ON</h1>
      </section>
    </main>
  )
}

export default Home
