import './App.css'
import './coach.css'
import Home from './pages/Home'
import Signup from './components/Signup'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import Signin from './components/Signin'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../Globals'
import Sessions from './components/Sessions'
import UserProfile from './pages/UserProfile'


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
        console.log(token)
      }
      return config // We return the new config if the token exists or the default config if no token exists.
      // Provides the token to each request that passes through axios
    },
    (error) => Promise.reject(error)
  )

  const checkSession = async () => {
    try {
      const response = await Client.get('http://localhost:4000/session')
      console.log(response.data)
      return response.data
    } catch (error) {
      throw error
    }
  }

  const checkToken = async () => {
    const user = await checkSession()
    setUser(user)
  }

  const [coaches, setCoaches] = useState([])

  const getCoaches = async () => {
    let response = await axios.get(`${BASE_URL}/show_coach`)
    setCoaches(response.data)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
    getCoaches()
  }, [])

  return (
    <div id="app">
      <Nav user={user} />
      <Routes>
        <Route path={'/gamesession'} element={<Sessions user={user} />} />
        <Route path="/" element={<Home coaches={coaches} user={user} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin setUser={setUser} />} />
        <Route
          path="/profile"
          element={<UserProfile user={user} setUser={setUser} />}
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
