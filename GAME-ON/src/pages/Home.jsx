import Coaches from '../components/Coaches'
const Home = ({ coaches }) => {
  return (
    <main>
      <section id="greeting">
        <h1>GAME ON!</h1>
      </section>

      <section id="about">
        <h1>about GAME ON</h1>
      </section>
      <section id="our-coaches">
        <h1>our coaches</h1>
        <Coaches coaches={coaches} />
      </section>
    </main>
  )
}

export default Home
