import axios from 'axios'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../../Globals'
import Sessions from '../components/Sessions'

const UserProfile = ({ user }) => {
  const [userInfo, setUserInfo] = useState(null)
  const [rerender, setRerender] = useState(false)
  const [message, setMessage] = useState('')

  const handleUser = async () => {
    console.log(user.data.user.id)
    let response = await axios.get(
      `${BASE_URL}/profile?userid=${user.data.user.id}`
    )
    let sessionResponse = await axios.get(
      `${BASE_URL}/gamesession?userid=${user.data.user.id}`
    )
    setUserInfo({ ...response.data, ...sessionResponse })
  }

  const deleteSession = async (id) => {
    let response = await axios.get(`${BASE_URL}/gamesession/${id}`)
    setMessage(response.data.msg)
  }

  useEffect(() => {
    handleUser()
  }, [message])
  if (userInfo) {
    console.log(userInfo)

    return (
      <div>
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
            <tbody>
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
