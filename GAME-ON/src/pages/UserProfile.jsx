import axios from 'axios'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../../Globals'
import Sessions from '../components/Sessions'

const UserProfile = ({ user }) => {
  const [userInfo, setUserInfo] = useState(null)

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

  useEffect(() => {
    handleUser()
  }, [])
  if (userInfo) {
    console.log(userInfo)

    return (
      <div>
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
          {userInfo.data.map((session) => (
            <h1>asdasd{session.game}</h1>
          ))}
        </table>
      </div>
    )
  }
}

export default UserProfile
