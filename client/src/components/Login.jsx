import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "../styles/authentication.css";
export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    console.log(username);
    axios
      .get("http://localhost:3001/login", { params: { username, password } })
      .then(() => navigate(`/home/${username}`))
      .catch(() => alert("Invalid Username or Password"));

    // window.location.href = "/home";
  };
  return (
    <>
      <div className="login-page-card">
        <div className="info-section">
          <h1>
            <span>Code</span>Unity
          </h1>
          <div className="highlighter"></div>

          <p>Let the code do the talking</p>
        </div>
        <div className="login-section">
          <form>
            <label>Username</label>

            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Password</label>
            <input
              type="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleClick}>SIGN IN</button>
          </form>
        </div>
      </div>
    </>
  );
}
