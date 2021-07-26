
import "./App.css";
import React from "react";
import SignIn from "./components/SignIn";
import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp";
import LogOut from "./components/LogOut";
import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Question from "./components/Question";
import Board from "./components/Board";
import Profile from "./components/Profile";


function App() {
  const data = "hello"
  return (
    <div className="App">

      <main>
        <Switch>
          <Route exact path="/">
          <SignIn />
          </Route>
          <Route path="/home" component={HomePage} />
          <Route path="/new">
            <SignUp data={data}/>
          </Route>
          <Route path="/logout" component={LogOut} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/question" component={Question} />
          <Route path="/board" component={Board} />
          <Route path="/profile" component={Profile} />
          <Redirect to="/" />
        </Switch>
      </main>

    </div>
  );
}

export default App;
