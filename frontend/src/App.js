// import "./App.css";
import Login from "./login/login";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Meetings from "./Meetings";
//import Registration from "./registration/registration";
import Container from "@material-ui/core/Container";

function App() {
  return (
    <Container fixed>
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/meetings" component={Meetings} />
      </Router>
    </Container>
  );
  //return <Registration update={true}/>;
}

export default App;
