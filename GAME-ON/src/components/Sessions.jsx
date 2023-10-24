import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../Globals'
import axios from 'axios'

const Sessions = ({ user }) => {
  let navigate = useNavigate()

  const startingFormState = {
    game: '',
    date: '',
    sessionType: '',
    coach: '',
    userId: user.id
  }

  const [formState, setFormState] = useState({
    game: '',
    date: '',
    sessionType: '',
    coach: 'ali',
    userId: user.id
  })

  const handleChange = (event) => {
    event.preventDefault()
    setFormState({ ...formState, [event.target.id]: event.target.value })
  }

  const bookSession = async () => {
    const response = await axios.post(
      `${BASE_URL}/gamesession/create`,
      formState
    )
    console.log(formState)
    console.log(response)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log(formState)
    bookSession()
    setFormState(startingFormState)
    navigate('/profile')
  }

  return (
    <div className="full-page">
      <form>
        <h1>Choose Your Game</h1>
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

        <div className="date"></div>
        <div className="sessionType">
          <h3>Standard Training</h3>
          <h4>35 BHD</h4>
          <p>
            Esports veterans who have competed against some of the greatest
            talent in their respective games and are recognized for their
            success on global competition stages. They have extensive coaching
            experience at the highest levels of play.
          </p>
          <br />
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
          <br />
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
          <br />
          <button
            onClick={(event) => handleChange(event)}
            id="sessionType"
            value="Godly Training"
          >
            Book Session
          </button>
          <br />
          <label htmlFor="date">Choose your Date</label>
          <br />
          <input
            type="date"
            id="date"
            readOnly={false}
            onChange={handleChange}
          />
        </div>

        <button type="submit" onClick={handleSubmit} className="submitBtn">
          Confirm Booking
        </button>
      </form>
    </div>
  )
}

export default Sessions
