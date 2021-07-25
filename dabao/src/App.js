import logo from "./logo.svg";
import "./App.css";
import {
  Redirect,
  Switch,
  Route,
  Link,
  BrowserRouter as Router,
} from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Nav from "./Nav"

function App() {
  return (
    <div className="App">
      {/* <div class="nav">
        <img class="imgLeft" src="https://i.imgur.com/PKSYPMs.png"/>
        <a class="navLeft">
        <Link to="/">DabaoPls</Link>
          </a>
        <a class="navRight">Login</a>
        <a class="navRight">
          <Link to="/new">Sign Up</Link>
        </a>
      </div> */}
      <Nav />
      {/* <main>
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
          <Route path="/new">
            <SignUp />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main> */}
    </div>
  );
}

export default App;
