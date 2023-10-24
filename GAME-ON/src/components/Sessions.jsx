import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../Globals'
import axios from 'axios'

const Sessions = ({ user, sessionToEdit }) => {
  let navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      navigate('/signin')
    }
  }, [])

  let startingFormState = {
    game: '',
    date: '',
    sessionType: '',
    coach: 'Ali',
    userId: user.id
  }

  if (sessionToEdit) {
    console.log('edit')
    startingFormState = sessionToEdit
  }

  const [formState, setFormState] = useState(startingFormState)

  const handleChange = (event) => {
    event.preventDefault()
    setFormState({ ...formState, [event.target.id]: event.target.value })
  }

  const bookSession = async () => {
    const response = sessionToEdit
      ? await axios.post(
          `${BASE_URL}/gamesession/edit/${sessionToEdit._id}`,
          formState
        )
      : await axios.post(`${BASE_URL}/gamesession/create`, formState)

    console.log(formState)
    console.log(response)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log(formState)
    bookSession()
    setFormState(startingFormState)
  }

  return user ? (
    <div className="full-page">
      <form>
        <div className="buttons">
          <button
            type="button"
            onClick={(event) => handleChange(event)}
            id="game"
            value="Call of Duty"
          >
            Call of Duty
          </button>
          <button
            type="button"
            onClick={(event) => handleChange(event)}
            id="game"
            value="Roblox"
          >
            Roblox
          </button>
          <button
            type="button"
            onClick={(event) => handleChange(event)}
            id="game"
            value="Fortnite"
          >
            Fortnite
          </button>
          <button
            type="button"
            onClick={(event) => handleChange(event)}
            id="game"
            value="Rainbow Six Siege"
          >
            Rainbow Six Siege
          </button>
        </div>

        <div className="date">
          <label htmlFor="date">Choose your Date</label>
        </div>
        <div className="sessionType">
          <h3>Standard Training</h3>
          <h4>35 BHD</h4>
          <p>
            Esports veterans who have competed against some of the greatest
            talent in their respective games and are recognized for their
            success on global competition stages. They have extensive coaching
            experience at the highest levels of play.
          </p>
          <button
            onClick={(event) => handleChange(event)}
            id="sessionType"
            value="Standard Training"
          >
            Book Session
          </button>
          <h3>Advanced Training</h3>
          <h4>60 BHD</h4>
          <p>
            Trained experts who've earned a distinguished place within the
            esports community through extensive experience coaching national
            teams and the next generation of esports pros. These Sensei are
            committed coaches devoted to coaching students and improving play at
            all ranks
          </p>
          <button
            onClick={(event) => handleChange(event)}
            id="sessionType"
            value="Advanced Training"
          >
            Book Session
          </button>
          <h3>Godly Training</h3>
          <h4>100 BHD</h4>
          <p>
            Esports Gods who have competed against some of the greatest talent
            in their respective games and are recognized for their success on
            global competition stages. They have extensive coaching experience
            at the highest levels of play.
          </p>
          <button
            onClick={(event) => handleChange(event)}
            id="sessionType"
            value="Godly Training"
          >
            Book Session
          </button>
          <input
            type="date"
            id="date"
            readOnly={false}
            onChange={handleChange}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Confirm Booking
        </button>
      </form>
    </div>
  ) : (
    <button
      onClick={() => {
        navigate('/signin')
      }}
    >
      Sign In
    </button>
  )
}

export default Sessions
