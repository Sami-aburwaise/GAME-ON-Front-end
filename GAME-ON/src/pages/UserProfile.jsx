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
import AlarmIcon from '@mui/icons-material/Alarm'

const UserProfile = ({ user, setUser, coaches }) => {
  const [userInfo, setUserInfo] = useState(null)
  const [message, setMessage] = useState('')
  const [selectedSession, setSelectedSession] = useState(null)
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
      navigate('/signin')
    }
  }

  const editSession = (session) => {
    setSelectedSession(session)
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

        <div className="userInfo">
          <h2>Profile Details</h2>
          <div>
            <h4>
              Name: {userInfo.firstName} {userInfo.lastName}
            </h4>
          </div>
          <div>
            <h4>Email: {userInfo.emailAddress}</h4>
          </div>
          <div>
            <h4>Age: {userInfo.age}</h4>
          </div>
          <div>
            <h4>Discord: {userInfo.discordAccount}</h4>
          </div>
        </div>

        <table className="Schedule">
          <tbody>
            <tr>
              <th>Game</th>
              <th>Date</th>
              <th>Session Type</th>
              <th>Coach</th>
            </tr>
          </tbody>

          {userInfo.data.map(
            (session) =>
              moment().isBefore(session.date) && (
                <tbody key={session._id}>
                  <tr>
                    <td className="details">{session.game}</td>
                    <td className="details">{moment(session.date).format('llll')}</td>
                    <td className="details">{session.sessionType}</td>
                    <td className="details">{session.coach}</td>
                    <td>
                      <IconButton
                        color="secondary"
                        aria-label="add an alarm"
                        size="large"
                        onClick={() => editSession(session)}
                      >
                        <AlarmIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        size="large"
                        color="error"
                        onClick={() => deleteSession(session._id)}
                      >
                        <DeleteIcon fontSize="large" />
                      </IconButton>
                    </td>
                  </tr>
                </tbody>
              )
          )}
        </table>
        {selectedSession && (
          <Sessions
            user={user}
            sessionToEdit={selectedSession}
            coaches={coaches}
          />
        )}
      </div>
    )
  )
}

export default UserProfile
