import React from "react";
import "./login.css";
import { useHistory } from "react-router";

function Login(props) {
    const history = useHistory();

    function handleSignup(e) {
        history.push("/signup");
    }

    function handleLogin(e) {
        history.push("/meetings");
    }

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
