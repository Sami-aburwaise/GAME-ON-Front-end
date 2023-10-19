import './App.css'
import Home from './pages/Home'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div id='app'>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
