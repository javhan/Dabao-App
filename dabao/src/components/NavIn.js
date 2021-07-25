import { PromiseProvider } from "mongoose";
import React from "react";
import {
    Link,
  } from "react-router-dom";

const NavIn = (props) => {
  return (
      <>
    <div className="nav">
    <img className="imgLeft" alt="" src="https://i.imgur.com/PKSYPMs.png"/>
    <div className="navLeft">
    <Link to="/">DabaoPls</Link>
      </div>
    <div className="navRight">
      <Link to="/logout">Log Out</Link>
    </div>
  </div>
  <div>{props.children}</div>
  {/* <main>
    <Switch>
      <Route exact path="/">
        <SignIn />
      </Route>
      <Route path="/logout">
        <LogOut />
      </Route>
      <Redirect to="/"/>
    </Switch>
  </main> */}
  </>
  );
};

export default NavIn;