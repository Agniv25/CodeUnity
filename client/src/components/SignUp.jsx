import { Link, useNavigate } from "react-router-dom";

import "../styles/authentication.css";
import axios from "axios";
import { useState } from "react";
export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const submit = (ev) => {
    ev.preventDefault();
    axios
      .post("http://localhost:3001/signup", {
        username: username,
        password: password,
        email: email,
      })
      .then((response) => console.log(response))
      .then(() => navigate("/login"))
      .catch((error) => alert("Username already exists"));
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
          <form onSubmit={(ev) => submit(ev)}>
            <label>Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Email Address</label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">SIGN UP</button>
            <p>
              Have an account? <Link to="/login">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
