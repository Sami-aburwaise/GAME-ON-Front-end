import { NavLink } from 'react-router-dom'
const Home = () => {
  return (
    <main>
      <section id="greeting">
        <h1>GAME ON!</h1>
        <NavLink to="/gamesession">Book a Session</NavLink>
      </section>

      <section id="about">
        <h1>about GAME ON</h1>
      </section>
      <section id="our-coaches">
        <h1>our coaches</h1>
      </section>
    </main>
  )
}

export default Home
