import React from "react";
import { Link } from "react-router-dom";

const Nav = (props) => {
  return (
    <>
      <div className="nav">
        <img className="imgLeft" alt="" src="https://i.imgur.com/PKSYPMs.png" />
        <div className="navLeft">
          <Link to="/home">DabaoPls</Link>
        </div>
        <div className="navRight">
          <Link to="/">Login</Link>
        </div>
        <div className="navRight">
          <Link to="/new">Sign Up</Link>
        </div>
      </div>
      <div>{props.children}</div>
      {/* <main>
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
          <Route path="/test">
            <HomePage />
          </Route>
          <Route path="/new">
            <SignUp />
          </Route>
          <Route path="/logout">
            <LogOut />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main> */}
    </>
  );
};

export default Nav;
