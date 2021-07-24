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


function App() {
  return (
    <div className="App">
      <div class="nav">
        <a class="navLeft">DabaoPls</a>
        <a class="navRight">Login</a>
        <a class="navRight">
          <Link to="/new">Sign Up</Link>
        </a>
      </div>
      <main>
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
          <Route path="/new">
            <SignUp />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
