import './App.css'
import Home from './pages/Home'
import Signup from './components/Signup'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import Signin from './components/Signin'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../Globals'

const App = () => {
  const [user, setUser] = useState(null)

  const Client = axios.create({ BASE_URL })

  // Intercepts every request axios makes
  Client.interceptors.request.use(
    (config) => {
      // Reads the token in localStorage
      const token = localStorage.getItem('token')
      // if the token exists, we set the authorization header
      if (token) {
        config.headers['authorization'] = `Bearer ${token}`
      }
      return config // We return the new config if the token exists or the default config if no token exists.
      // Provides the token to each request that passes through axios
    },
    (error) => Promise.reject(error)
  )

  const checkSession = async () => {
    try {
      const response = await Client.get('http://localhost:4000/auth/session')
      return response.data
    } catch (error) {
      throw error
    }
  }

  const checkToken = async () => {
    const user = await checkSession()
    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div id="app">
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin setUser={setUser} />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
