import React from "react";
import ReactDOM from "react-dom";
import "./login.css";
import Registration from "../registration/registration.js";

function Login(props) {
  return (
    <form id="loginForm">
      <h1>Login</h1>
      <label>
        Email:
        <input type="text" name="Email" />
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <div>
        <p id="fgtPasswrd">Forget password?</p>
        <p id="signUp" onClick={handleSignup}>
          Signup
        </p>
      </div>
      <input id="login" type="submit" value="Login" />
    </form>
  );
}

function handleSignup(e) {
  ReactDOM.render(
    <React.StrictMode>
      <Registration update={false} />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

export default Login;
