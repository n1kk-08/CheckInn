import { useContext } from "react"
import "./navbar.css"
import {Link, useNavigate} from "react-router-dom"
import { AuthContext } from "../../Context/AuthContext"

const Navbar = () => {

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/")
  }

  const handleLogin = () => {
    navigate("/Login");
  }

  const {user} = useContext(AuthContext)
  return (
    <div className="navbar">
      <div className="navContainer">

        <Link to="/"><img src="/Logo.png" className="logo-img" alt="CheckInn"/></Link>
        
        {user ? <div className="navItems1">
          <div className="username">{user.username}</div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div> : <div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton" onClick={handleLogin}>Login</button>
        </div>}
      </div>
    </div>
  )
}

export default Navbar