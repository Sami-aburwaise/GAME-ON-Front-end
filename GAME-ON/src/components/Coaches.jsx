import { BASE_URL } from '../../Globals'
const Coaches = ({ coaches }) => {
  return (
    <div className='coaches-container'>
      {coaches.map((coach) => (
        <div className="coach-card">
          <h2>{coach.name}</h2>
          <img src={`${BASE_URL}/${coach.profile_image}`} alt="" />
        </div>
      ))}
    </div>
  )
}

export default Coaches
