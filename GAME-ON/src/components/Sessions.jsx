import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../Globals'
import axios from 'axios'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import dayjs from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

const Sessions = ({ user, sessionToEdit }) => {
  const [games, setGames] = useState([
    'Roblox',
    'Call of duty',
    'Fortnite',
    'Rainbow Six Siege'
  ])
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
    console.log(event.target.value)
    setFormState({ ...formState, [event.target.id]: event.target.value })
  }

  const handleDate = (event) => {
    console.log(event.$d)
    setFormState({ ...formState, date: event.$d })
  }

  const bookSession = async () => {
    const response = sessionToEdit
      ? await axios.post(
          `${BASE_URL}/gamesession/edit/${sessionToEdit._id}`,
          formState
        )
      : await axios.post(`${BASE_URL}/gamesession/create`, formState)
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
        <ToggleButtonGroup
          color="primary"
          value={formState.game}
          exclusive
          aria-label="Platform"
          size="large"
        >
          {games.map((game) => (
            <ToggleButton
              key={game}
              id="game"
              size="large"
              value={game}
              onClick={(event) => {
                handleChange(event)
              }}
            >
              {game}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <div className="date">
          <LocalizationProvider dateAdapter={AdapterDayjs} mode="dark">
            <DateTimePicker
              onChange={(event) => handleDate(event)}
              defaultValue={dayjs(formState.date)}
            />
          </LocalizationProvider>
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
