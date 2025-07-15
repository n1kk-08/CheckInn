import { useContext, useState } from "react"
import "./login.scss"
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom"


const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }
  const navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault()
    dispatch({ type: "LOGIN_START" })
    try {
      const res = await axios.post("/auth/login", credentials)

      if(res.data.isAdmin){
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details })
        navigate("/")

      }else{
        dispatch({ type: "LOGIN_FAILURE", payload: {message: "You are not allowed"}})
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data })
    }
  }



  return <div className="login">
    <div className="login-container">
      <h2>Please login to continue</h2>
      <input type="text" className="login-input" placeholder="Username" id="username" onChange={handleChange} />
      <input type="Password" className="login-password" placeholder="Password" id="password" onChange={handleChange} />
      <button disabled={loading} className="login-btn" onClick={handleClick}>Login</button>
      this is the message: {error && <span>{error.message}</span>}
    </div>
  </div>
}

export default Login