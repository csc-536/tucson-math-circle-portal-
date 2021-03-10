// import "./App.css";
import Login from "./login/login";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Meetings from "./Meetings";
//import Registration from "./registration/registration";
import Container from "@material-ui/core/Container";
import Registration from "./registration/registration";
import NavBar from "./components/NavBar";
function App() {
    return (
        <Router>
            <NavBar />
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
                <Route exact path="/meetings" component={Meetings} />
            </Container>
        </Router>
    );
    //return <Registration update={true}/>;
}

export default App;
