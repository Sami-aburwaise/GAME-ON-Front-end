import axios from 'axios'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../../Globals'

const UserProfile = ({ user }) => {
  const [userInfo, setUserInfo] = useState(null)

  const handleUser = async () => {
    console.log(user.data.user.id)
    let response = await axios.get(
      `${BASE_URL}/profile?userid=${user.data.user.id}`
    )
    setUserInfo(response.data)
    console.log(response)
  }

  useEffect(() => {
    handleUser()
  }, [])
  if (userInfo)
    return (
      <div>
        <h2>Name: {userInfo.firstName}</h2>
      </div>
    )
}

export default UserProfile
