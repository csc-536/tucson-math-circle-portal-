/*
 * File: login.js
 * Author: Athan Walker
 * Purpose: Provide a login page for students and coordinators.
 */
import React from "react";
import "./login.css";
import { useHistory } from "react-router";

function Login(props) {
  /*
   * Allows the page path to be modified.
   */
  const history = useHistory();

  /*
   * Modify the page path to the registration page.
   */
  function handleSignup(e) {
    history.push("/signup");
  }

  /*
   * Modify the page path to the meetings page.
   */
  function handleLogin(e) {
    history.push("/meetings");
  }

  /*
   * Return a form for inputting email and a password.
   */
  return (
    <form id="loginForm" onSubmit={handleLogin}>
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

export default Login;
