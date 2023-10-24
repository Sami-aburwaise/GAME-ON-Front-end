import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../Globals'
import Sessions from '../components/Sessions'

import Button from '@mui/material/Button';

const UserProfile = ({ user, setUser }) => {
  const [userInfo, setUserInfo] = useState(null)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleUser = async () => {
    let response = await axios.get(`${BASE_URL}/profile?userid=${user.id}`)
    let sessionResponse = await axios.get(
      `${BASE_URL}/gamesession/get?userId=${user.id}`
    )
    setUserInfo({ ...response.data, ...sessionResponse })
  }

  const deleteSession = async (id) => {
    let response = await axios.get(`${BASE_URL}/gamesession/delete/${id}`)
    setMessage(response.data.msg)
  }

  useEffect(() => {
    handleUser()
  }, [message])
  if (userInfo) {
    return (
      <div className="full-page">
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            localStorage.removeItem('token')
            sessionStorage.removeItem('token')
            setUser(null)
            navigate('/signin')
          }}
        >
          logout
        </Button>
        <h2>{message}</h2>
        <div>
          <h3>
            Name: {userInfo.firstName}
            {userInfo.lastName}
          </h3>
        </div>
        <div>
          <h3>Email: {userInfo.emailAddress}</h3>
        </div>
        <div>
          <h3>Age: {userInfo.age}</h3>
        </div>
        <div>
          <h3>Discord: {userInfo.discordAccount}</h3>
        </div>
        <table>
          <tbody>
            <tr>
              <th>Game</th>
              <th>Date</th>
              <th>Session Type</th>
              <th>Coach</th>
            </tr>
          </tbody>
          {userInfo.data.map((session) => (
            <tbody key={session._id}>
              <tr>
                <td>
                  <h1>asdasd{session.game}</h1>
                </td>
                <td>{session.date}</td>
                <td>{session.sessionType}</td>
                <td>{session.coach}</td>
                <td>
                  <button onClick={() => deleteSession(session._id)}>
                    Cancel Session
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    )
  }
}

export default UserProfile
