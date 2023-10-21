import axios from 'axios'
import { useState } from 'react'

const Signup = () => {
  const startingState = {
    firstName: '',
    lastName: '',
    age: '',
    discordAccount: '',
    emailAddress: '',
    passwordDigest: ''
  }
  const [signupState, setSignupState] = useState(startingState)

  const handleSubmit = async (event) => {
    event.preventDefault()
    await axios.post('http://localhost:4000/auth/signup', signupState)

    console.log(signupState)

    setSignupState(startingState)
  }

  const handleChange = (event) => {
    setSignupState({ ...signupState, [event.target.id]: event.target.value })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        onChange={handleChange}
        value={signupState.firstName}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        id="lastName"
        onChange={handleChange}
        value={signupState.lastName}
      />
      <label htmlFor="age">Age</label>
      <input
        type="number"
        id="age"
        onChange={handleChange}
        value={signupState.age}
      />
      <label htmlFor="discordAccount"> Discord Name</label>
      <input
        type="text"
        id="discordAccount"
        onChange={handleChange}
        value={signupState.discordAccount}
      />
      <label htmlFor="emailAddress"> Email Address</label>
      <input
        type="email"
        id="emailAddress"
        onChange={handleChange}
        value={signupState.emailAddress}
      />
      <label htmlFor="passwordDigest">Password</label>
      <input
        type="password"
        id="password"
        onChange={handleChange}
        value={signupState.password}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default Signup
