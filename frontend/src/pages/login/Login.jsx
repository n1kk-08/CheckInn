import { useContext, useState } from "react"
import "./login.css"
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";


const Login = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const [loginError, setLoginError] = useState(null);

    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
        setLoginError(null); // clear error once user starts typing
    }

    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault();

        // ✅ Check empty fields
        if (!credentials.username || !credentials.password) {
            setLoginError("Please fill in both username and password.");
            return;
        }

        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post("/auth/login", credentials)
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details })

            navigate("/")
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE", payload: error.response?.data })
        }
    }


    return (
        <div>
            <Navbar />
            <div className="login">
                <div className="login-container">
                    <h2>Login to continue..</h2>
                    <label htmlFor="/" className="input-label">Username</label>
                    <input
                        type="text"
                        className="login-input"
                        placeholder="Username"
                        id="username"
                        value={credentials.username}
                        onChange={handleChange}
                    />
                    <label htmlFor="/" className="input-label">Password</label>
                    <input
                        type="password"
                        className="login-password"
                        placeholder="Password"
                        id="password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                    <button
                        disabled={loading}
                        className="login-btn"
                        onClick={handleClick}
                    >
                        Login
                    </button>
                    {loginError && <span className="error-message">{loginError}</span>}
                    {error && <span className="error-message">{error.message}</span>}
                    <p>New User ? <Link to={"/register"} className="sign-up-link">Register</Link></p>
                </div>

            </div>
        </div>
    )
}

export default Login
