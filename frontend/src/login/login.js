import "./login.css";
function Login(props) {
  return (
    <form>
      <h1>Login</h1>
      <label>
        Email:
        <input type="text" name="Email" />
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <p className="col1" id="fgtPasswrd">
        Forget password?
      </p>
      <p className="col2" id="signUp">
        Signup
      </p>
      <input id="login" type="submit" value="Login" />
    </form>
  );
}

export default Login;
