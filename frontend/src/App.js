import "./App.css";
import Login from "./login/login";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Meetings from "./Meetings";
import Container from "@material-ui/core/Container";
import Registration from "./registration/registration";
import AllStudents from "./allStudentsPage/allStudents";
import NavBar from "./components/NavBar";
import NewMeeting from "./NewMeeting";
import { useMemo, useState } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { isLoggedIn, loggedInRole } from "./utils";

function App() {
  const [auth, setAuth] = useState({
    userLoggedIn: isLoggedIn(),
    role: loggedInRole(),
  });
  const providerUser = useMemo(() => ({ auth, setAuth }));
  return (
    <AuthContext.Provider value={providerUser}>
      <Router>
        <NavBar />
        <br />
        <br />
        <br />
        <br />
        <Container fixed>
          <Route exact path="/" component={Login} />
          <Route
            exact
            path="/signup"
            render={() => <Registration update={false} />}
          />
          <Route
            exact
            path="/profile"
            render={() => <Registration update={true} />}
          />
          <Route exact path="/new-meeting" component={NewMeeting} />
          <Route exact path="/meetings" component={Meetings} />
          <Route exact path="/allStudents" component={AllStudents} />
        </Container>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
