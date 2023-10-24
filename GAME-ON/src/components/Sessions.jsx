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
import Button from '@mui/material/Button'


const Sessions = ({ user, coaches, sessionToEdit }) => {
  const [games, setGames] = useState([
    'Roblox',
    'Call of duty',
    'Fortnite',
    'Rainbow Six Siege'
  ])
  const [sessionTypes, setSessionType] = useState([
    {
      type: 'Standard Training',
      price: '35 BHD',
      description:
        'Esports veterans who have competed against some of the greatest talent in their respective games and are recognized for their success on global competition stages. They have extensive coaching experience at the highest levels of play.'
    },
    {
      type: 'Advanced Training',
      price: '60 BHD',
      description:
        "Trained experts who've earned a distinguished place within the esports community through extensive experience coaching national teams and the next generation of esports pros. These Sensei are committed coaches devoted to coaching students and improving play at all ranks"
    },
    {
      type: 'Godly Training',
      price: '100 BHD',
      description:
        'Esports Gods who have competed against some of the greatest talent in their respective games and are recognized for their success on global competition stages. They have extensive coaching experience at the highest levels of play.'
    }
  ])
  const [selectedSessionType, setselectedSessionType] = useState(
    sessionTypes[0]
  )
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
    coach: '',
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
    navigate('/profile')
  }

  return (
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
          <ToggleButtonGroup
            color="primary"
            value={formState.sessionType}
            exclusive
            aria-label="Platform"
            size="large"
          >
            {sessionTypes.map((sessionType) => (
              <ToggleButton
                key={sessionType.type}
                id="sessionType"
                size="large"
                value={sessionType.type}
                onClick={(event) => {
                  setselectedSessionType(sessionType)
                  handleChange(event)
                }}
              >
                {sessionType.type}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <h3>{selectedSessionType.price}</h3>
          <h4>{selectedSessionType.description}</h4>
        </div>

        <div className="coaches-select">
          <ToggleButtonGroup
            color="primary"
            value={formState.coach}
            exclusive
            aria-label="Platform"
            size="large"
          >
            {coaches.map((coach) => (
              <ToggleButton
                key={coach.name}
                id="coach"
                size="large"
                value={coach.name}
                onClick={(event) => {
                  handleChange(event)
                }}
              >
                {coach.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>

        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={handleSubmit}
        >
          Confirm Booking
        </Button>
      </form>
    </div>
  )
}

export default Sessions
