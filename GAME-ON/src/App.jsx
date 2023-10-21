import './App.css'
import Home from './pages/Home'
import Signup from './components/Signup'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import Signin from './components/Signin'
import { useState } from 'react'

const App = () => {
  const [user, setUser] = useState(null)
  return (
    <div id="app">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin setUser={setUser} />} />
      </Routes>

      <Footer />
      <Signup />
    </div>
  )
}

export default App
