import "./App.css";
import React, { useState, createContext, useEffect } from "react";
import SignIn from "./components/SignIn";
import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp";
import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Question from "./components/Question";
import Profile from "./components/Profile";
import SignUpSuccess from "./components/SignUpSuccess";
import UpdateSuccess from "./components/UpdateSuccess";
import BoardTr from "./components/BoardTr";
import "tailwindcss/tailwind.css"

export const LoggedContext = createContext();

function App() {
  const [logState, setLogState] = useState();
console.log(logState)

const PrivateRoute = ({component: Component, handleChildFunc, ...rest}) => {
  return <Route {...rest} render={(props) => (
    logState !== undefined
    ? <Component {...props} handleChildFunc={handleChildFunc}/>
    :<Redirect to={{pathname: '/login', state:{ from: props.location} }}/>  
  )}
  />
}

  useEffect(() => {
    fetch("/sessions")
    .then((res) => res.json())
    .then((data) => setLogState(data))
  }, [])

  const onOff = { logState, setLogState };

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
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/question" component={Question} />
            <PrivateRoute path="/board" component={BoardTr} />
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
