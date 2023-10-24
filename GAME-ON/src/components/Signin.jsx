import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../Globals'

const Signin = ({ setUser }) => {
  let navigate = useNavigate()
  const startingState = {
    emailAddress: '',
    password: ''
  }
  const [signinState, setSigninState] = useState(startingState)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const payload = await axios.post(`${BASE_URL}/signin`, signinState)

    setUser(payload.data.user)
    localStorage.setItem('token', payload.data.token)

    setSigninState(startingState)
    navigate('/profile')
  }

  const handleChange = (event) => {
    setSigninState({ ...signinState, [event.target.id]: event.target.value })
  }

  return (
    <div className="full-page">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="emailAddress">Email Address</label>
        <input
          type="email"
          id="emailAddress"
          onChange={handleChange}
          value={signinState.emailAddress}
        />
        <label htmlFor="passwordDigest">Password</label>
        <input
          type="password"
          id="password"
          onChange={handleChange}
          value={signinState.password}
        />
        <button type="submit"> Sign In</button>
      </form>
    </div>
  )
}

export default Signin
