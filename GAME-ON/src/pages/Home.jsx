import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Coaches from '../components/Coaches'
import CoachProfile from '../components/CoachProfile'

import * as React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

const Home = ({ coaches }) => {
  const [coach, setCoach] = useState(null)

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
        <Coaches coaches={coaches} setCoach={setCoach} />
      </section>
      {coach && <CoachProfile coach={coach} />}

      <section id="why">
        <h1>Why GAME ON?</h1>
        <p>
          Experienced and knowledgeable coaches: Our coaches are experts in a
          variety of esports titles and have a proven track record of success.
        </p>
        <p>
          Personalized coaching: We offer one-on-one and group coaching sessions
          so that you can get the personalized attention you need. Flexible
          scheduling: We offer a variety of scheduling options to fit your busy
          schedule.
        </p>
        <p>
          Affordable pricing: We offer a variety of coaching packages to fit
          your budget. Commitment to your success: We're committed to helping
          you achieve your esports goals.
        </p>
      </section>
      <section id="about">
        <h1>about GAME ON</h1>
        <p>
          GAME ON is a premier esports coaching service that helps gamers of all
          levels reach their full potential. We offer one-on-one and group
          coaching sessions with experienced and knowledgeable coaches who can
          help you improve your skills, learn new strategies, and develop a
          winning mindset.
        </p>
      </section>
    </main>
  )
}

export default Home
