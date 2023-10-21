import { NavLink } from 'react-router-dom'
const Nav = () => {
  return (
    <header>
      <h2>LOGO HERE</h2>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/signin">Sign In</NavLink>
      </nav>
    </header>
  )
}

export default Nav
