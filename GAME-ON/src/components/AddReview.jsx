import { useState } from 'react'
import { BASE_URL } from '../../Globals'
import Rating from '@mui/material/Rating'
import Button from '@mui/material/Button'
import Coaches from './Coaches'

const AddReview = ({ user, selectedSession, setSelectedSession, coaches }) => {
  const [coach, setCoach] = useState(
    coaches.filter((obj) => {
      return obj.name == selectedSession.coach
    })[0]
  )
  const [formState, setFormState] = useState({
    comment: '',
    rating: 5,
    user: user.id
  })
  const handleChange = (event) => {
    console.log(selectedSession)
    setFormState({ ...formState, [event.target.id]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }
  return (
    coach && (
      <div className="full-page">
        <form>
          <h1>Add review</h1>
          <Coaches coaches={[coach]} />

          <div>
            <h2>Rating</h2>
            <Rating
              name="simple-controlled"
              size="large"
              precision={0.5}
              value={formState.rating}
              onChange={(event) => {
                setFormState({
                  ...formState,
                  rating: parseFloat(event.target.value)
                })
              }}
            />
          </div>

          <input
            type="text"
            onChange={(event) => {
              handleChange(event)
            }}
          />

          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={handleSubmit}
          >
            add review
          </Button>
        </form>
      </div>
    )
  )
}

export default AddReview
