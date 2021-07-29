import "./App.css";
import React, { useState, createContext, useEffect } from "react";
import SignIn from "./components/SignIn";
import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import EditEvent from "./components/EditEvent"
import Question from "./components/Question";
import Profile from "./components/Profile";
import SignUpSuccess from "./components/SignUpSuccess";
import UpdateSuccess from "./components/UpdateSuccess";
import Board from "./components/Board";
import setPos from "./map"

export const LoggedContext = createContext();

function App() {
  const [logState, setLogState] = useState();
  const [currentPos, setCurrentPos] = useState();

console.log("logState",logState)
console.log("Pos",currentPos)

const PrivateRoute = ({component: Component, handleChildFunc, ...rest}) => {
  return <Route {...rest} render={(props) => (
    logState !== undefined
    ? <Component {...props} handleChildFunc={handleChildFunc}/>
    :<div className="center">Please Login To Access<br/><button className="btstyle"><Link to="/login">Login</Link></button></div>
  )}
  />
}

  useEffect(() => {
    fetch("/sessions")
    .then((res) => res.json())
    .then((data) => {
      if(data)
        setPos(setCurrentPos)
      setLogState(data)})
  }, [])

  const onOff = { logState, setLogState, currentPos, setCurrentPos };

useEffect(()=> {
  fetch("/")
}, [])

  return (
    <div className="App">
      <LoggedContext.Provider value={onOff}>
        <main>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={SignIn} />
            <Route path="/new" component={SignUp} />
            <PrivateRoute path="/dashboard/edit" component={EditEvent} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/question" component={Question} />
            <PrivateRoute path="/board" component={Board} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/signupsuccess" component={SignUpSuccess} />
            <PrivateRoute path="/updatesuccess" component={UpdateSuccess} />
            <Redirect to="/" />
          </Switch>
        </main>
      </LoggedContext.Provider>
    </div>
  );
}

export default App;
