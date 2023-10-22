import { NavLink } from 'react-router-dom'
import Coaches from '../components/Coaches'
const Home = ({ coaches }) => {
  return (
    <main>
      <section id="Book-session">
        <h1>GAME ON!</h1>
        <NavLink to="/session">Book a Session</NavLink>
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
