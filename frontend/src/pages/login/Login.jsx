import { useContext, useState } from "react"
import "./login.css"
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import {useNavigate} from "react-router-dom"


const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password : undefined
    });

    const {loading, error, dispatch} = useContext(AuthContext);

    const handleChange = (e) => {
        setCredentials(prev => ({...prev, [e.target.id] : e.target.value}))
    }
    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({type : "LOGIN_START"})
        try {
            const res = await axios.post("/auth/login", credentials)
            dispatch({type:"LOGIN_SUCCESS", payload:res.data})
            navigate("/")
        } catch (error) {
            dispatch({type: "LOGIN_FAILURE", payload: error.response.data})
        }
    }



    return <div className="login">
        <div className="login-container">
            <input type="text" className="login-input" placeholder="Username" id="username" onChange={handleChange}/>
            <input type="Password" className="login-password" placeholder="Password" id="password" onChange={handleChange}/>
            <button disabled={loading} className="login-btn" onClick={handleClick}>Login</button>
            this is the message: {error && <span>{error.message}</span>}
        </div>
    </div>
}

export default Login