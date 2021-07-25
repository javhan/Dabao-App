import React from "react";
import {
    Redirect,
    Switch,
    Route,
    Link,
    BrowserRouter as Router,
  } from "react-router-dom";
  import SignUp from "./SignUp";
  import SignIn from "./SignIn";

const Nav = () => {
  return (
      <>
      <Router>
    <div class="nav">
    <img class="imgLeft" src="https://i.imgur.com/PKSYPMs.png"/>
    <a class="navLeft">
    <Link to="/">DabaoPls</Link>
      </a>
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
  </Router>
  </>
  );
};

export default Nav;
