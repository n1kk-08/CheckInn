import { useContext } from "react"
import "./navbar.css"
import {Link} from "react-router-dom"
import { AuthContext } from "../../Context/AuthContext"

const Navbar = () => {

  const {user} = useContext(AuthContext)
  return (
    <div className="navbar">
      <div className="navContainer">

        <Link to="/"><img src="/Logo.png" className="logo-img"/></Link>
        
        {user ? user.username: <div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton">Login</button>
        </div>}
      </div>
    </div>
  )
}

export default Navbar