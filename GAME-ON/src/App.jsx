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

import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const App = () => {
  const [user, setUser] = useState(null)

  const Client = axios.create({ BASE_URL })

  Client.interceptors.request.use(
    (config) => {
      //This would read the token that is stored in local storage
      const token = localStorage.getItem('token')
      //if statement where if there is a token, it would set the authorization heade
      if (token) {
        config.headers['authorization'] = `Bearer ${token}`
        console.log(token)
      }
      return config
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
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Nav user={user} />
        <Routes>
          <Route
            path={'/gamesession'}
            element={<Sessions user={user} coaches={coaches} />}
          />
          <Route path="/" element={<Home coaches={coaches} user={user} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin setUser={setUser} />} />
          <Route
            path="/profile"
            element={
              <UserProfile user={user} setUser={setUser} coaches={coaches} />
            }
          />
        </Routes>
        <Footer />
      </ThemeProvider>
    </div>
  )
}

export default App
