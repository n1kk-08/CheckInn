import { useContext, useState } from "react"
import "./register.css"
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";


const Register = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        email:"",
        country: "",
        city: "",
        phone: "",
        password: ""
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const [registerError, setRegisterError] = useState(null);

    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
        setRegisterError(null); // clear error once user starts typing
    }

    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault();

        // ✅ Check empty fields
        if (!credentials.username || !credentials.password) {
            setRegisterError("Please fill all the details first to continue");
            return;
        }

        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post("/auth/register", credentials)
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
                    <h2>Sign Up to continue..</h2>
                    <label htmlFor="username" className="input-label">Username</label>
                    <input
                        type="text"
                        className="login-input"
                        placeholder="Username"
                        id="username"
                        value={credentials.username}
                        onChange={handleChange}
                    />

<label htmlFor="email" className="input-label">Email</label>
                    <input
                        type="email"
                        className="login-input"
                        placeholder="Enter Your Email"
                        id="email"
                        value={credentials.email}
                        onChange={handleChange}
                    />
                    <label htmlFor="country" className="input-label">Country</label>
                    <input
                        type="text"
                        className="login-input"
                        placeholder="Country"
                        id="country"
                        value={credentials.country}
                        onChange={handleChange}
                    />
                    <label htmlFor="city" className="input-label">City</label>
                    <input
                        type="text"
                        className="login-input"
                        placeholder="City"
                        id="city"
                        value={credentials.city}
                        onChange={handleChange}
                    />
                    <label htmlFor="phone" className="input-label">Phone No.</label>
                    <input
                        type="phone"
                        className="login-input"
                        placeholder="Enter Your Phone Number"
                        id="phone"
                        value={credentials.phone}
                        onChange={handleChange}
                    />
                    <label htmlFor="password" className="input-label">Password</label>
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
                    {registerError && <span>{registerError}</span>}
                    {error && <span>{error.message}</span>}
                <p>Already a User ? <Link to={"/login"} className="sign-up-link">Sign In</Link></p>
                </div>

            </div>
        </div>
    )
}

export default Register;
