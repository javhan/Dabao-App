import "./App.css";
import React, { useState, createContext } from "react";
import SignIn from "./components/SignIn";
import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp";
import LogOut from "./components/LogOut";
import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Question from "./components/Question";
import Board from "./components/Board";
import Profile from "./components/Profile";

export const LoggedContext = createContext();

function App() {
  const [logState, setLogState] = useState();
  const onOff = { logState, setLogState };

  return (
    <div className="App">
      <LoggedContext.Provider value={onOff}>
        <main>
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/home" component={HomePage} />
            <Route path="/new" component={SignUp} />
            <Route path="/logout" component={LogOut} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/question" component={Question} />
            <Route path="/board" component={Board} />
            <Route path="/profile" component={Profile} />
            <Redirect to="/" />
          </Switch>
        </main>
      </LoggedContext.Provider>
    </div>
  );
}

export default App;
