import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  let navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [data, setData] = useState([]);

  const Submit = (e) => {
    const msg = { username, password };
    e.preventDefault();
    fetch(`http://localhost:5000/login`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(msg),
    })
      .then((reponse) => {
        if (reponse.ok) {
          return reponse.json();
        }
        throw reponse;
      })
      .then((data) => {
        setData(data);
        if (data.token) {
          console.log(data);
          localStorage.setItem("token", data.token);
          navigate("dashboard/");
        } else {
          return alert("incorrect username and password");
        }
      }, []);
  };

  return (
    <div class="center11">
      <h1>Login</h1>
      <form method="post" onSubmit={Submit}>
        <div class="txt_field">
          <input
            type="text"
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <span></span>
          <label>Username</label>
        </div>
        <div class="txt_field">
          <input
            type="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <span></span>
          <label>Password</label>
        </div>
        <input className="tu" type="submit" value="Login" />
      </form>
    </div>
  );
}
export default Login;
