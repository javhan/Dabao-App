import "./App.css";
import React, { useState, createContext, useEffect } from "react";
import SignIn from "./components/SignIn";
import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp";
import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Question from "./components/Question";
import Board from "./components/Board";
import Profile from "./components/Profile";
import SignUpSuccess from "./components/SignUpSuccess";

export const LoggedContext = createContext();

function App() {
  const [logState, setLogState] = useState();

  useEffect(() => {
    fetch("/sessions").then((res) => res.json()).then((data) => setLogState(data))
  }, [])

  const onOff = { logState, setLogState };

  return (
    <div className="App">
      <LoggedContext.Provider value={onOff}>
        <main>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={SignIn} />
            <Route path="/new" component={SignUp} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/question" component={Question} />
            <Route path="/board" component={Board} />
            <Route path="/profile" component={Profile} />
            <Route path="/signupsuccess" component={SignUpSuccess} />
            <Redirect to="/" />
          </Switch>
        </main>
      </LoggedContext.Provider>
    </div>
  );
}

export default App;
