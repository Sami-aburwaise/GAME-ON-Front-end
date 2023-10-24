import { redirect } from 'react-router-dom'
import { BASE_URL } from '../../Globals'

import * as React from 'react'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'

const findAvg = (arr) => {
  let sum = 0
  arr.forEach((review) => {
    sum += review.rating
  })
  return parseFloat(sum ? (sum /= arr.length).toFixed(2) : 0)
}

const Coaches = ({ coaches, setCoach }) => {
  return (
    <div className="coaches-container">
      {coaches.map((coach) => (
        <div
          key={coach.name}
          className="coach-card"
          onClick={async () => {
            await setCoach(coach)
            location.href = '#coach-profile'
          }}
        >
          <h2>{coach.name}</h2>
          <img src={`${BASE_URL}/${coach.profile_image}`} alt="" />

          <div className="rating">
            <Rating
              name="read-only"
              value={findAvg(coach.reviews)}
              precision={0.5}
              readOnly
              size="large"
            />
            <h2>({coach.reviews.length})</h2>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Coaches
