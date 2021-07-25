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
  import LogOut from "./LogOut"

const Nav = () => {
  return (
      <>
    <div class="nav">
    <img class="imgLeft" src="https://i.imgur.com/PKSYPMs.png"/>
    <a class="navLeft">
    <Link to="/">DabaoPls</Link>
      </a>
    <a class="navRight">
      <Link to="/">Login</Link>
      </a>
    <a class="navRight">
      <Link to="/new">Sign Up</Link>
    </a>
    <a class="navRight">
      <Link to="/logout">Log Out</Link>
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
      <Route path="/logout">
        <LogOut />
      </Route>
      <Redirect to="/"/>
    </Switch>
  </main>
  </>
  );
};

export default Nav;
