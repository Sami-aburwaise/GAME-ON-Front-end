import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../Globals'
import Sessions from '../components/Sessions'
import moment from 'moment'
moment().format()

import Button from '@mui/material/Button'

import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

const UserProfile = ({ user, setUser }) => {
  const [userInfo, setUserInfo] = useState(null)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  moment.locale('en-gb')

  const handleUser = async () => {
    if (user) {
      let response = await axios.get(`${BASE_URL}/profile?userid=${user.id}`)
      let sessionResponse = await axios.get(
        `${BASE_URL}/gamesession/get?userId=${user.id}`
      )
      setUserInfo({ ...response.data, ...sessionResponse })
    } else {
      navigate('/')
    }
  }

  const deleteSession = async (id) => {
    let response = await axios.get(`${BASE_URL}/gamesession/delete/${id}`)
    setMessage(response.data.msg)
  }

  const logout = () => {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    setUser(null)
    navigate('/signin')
  }

  useEffect(() => {
    handleUser()
  }, [message])

  return (
    userInfo && (
      <div className="full-page">
        <Button
          variant="outlined"
          color="error"
          id="logout-button"
          onClick={logout}
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
                <td>{session.game}</td>
                <td>{moment(session.date).format('llll')}</td>
                <td>{session.sessionType}</td>
                <td>{session.coach}</td>
                <td>
                  <IconButton
                    aria-label="delete"
                    size="large"
                    color="error"
                    onClick={() => deleteSession(session._id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    )
  )
}

export default UserProfile
