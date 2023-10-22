import './App.css'
import Home from './pages/Home'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../Globals'

const App = () => {
  const [coaches, setCoaches] = useState(null)

  const getCoaches = async () => {
    let response = await axios.get(`${BASE_URL}/show_coach`)
    setCoaches(response.data)
  }

  useEffect(() => {
    getCoaches()
  }, [])
  return (
    <div id="app">
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
