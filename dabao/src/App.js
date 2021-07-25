import "./App.css";
import React from "react";
import Nav from "./components/Nav";
import SignIn from "./components/SignIn";
import HomePage from "./components/HomePage"
import SignUp from "./components/SignUp"
import LogOut from "./components/LogOut";
import {render} from "react-dom"
import { Route, Link, Switch, Redirect } from 'react-router-dom'
import Dashboard from "./components/Dashboard"
import Question from "./components/Question"
import Board from "./components/Board"

function App() {
  return (
    <div className="App">
          <main>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/home" component={HomePage}/>
          <Route path="/new" component={SignUp}/>
          <Route path="/logout" component={LogOut}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/question" component={Question}/>
          <Route path="/board" component={Board}/>
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
