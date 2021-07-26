import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoggedContext } from "../App.js";

const Nav = (props) => {
  const loggedContext = useContext(LoggedContext);

  if (!loggedContext.logState) {
    return (
      <>
        <div className="nav">
          <img
            className="imgLeft"
            alt=""
            src="https://i.imgur.com/PKSYPMs.png"
          />
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
      </>
    );
  } else {
    return (
      <>
        <div className="nav">
          <img
            className="imgLeft"
            alt=""
            src="https://i.imgur.com/PKSYPMs.png"
          />
          <div className="navLeft">
            <Link to="/home">DabaoPls</Link>
          </div>
          <div className="navRight">
            <Link to="/logout">Log Out</Link>
          </div>
          <div className="navRight">
            <Link to="/profile">Update Profile</Link>
          </div>
          <div className="navRight">
            <Link to="/dashboard">Dashboard</Link>
          </div>
        </div>
        <div>{props.children}</div>
      </>
    );
  }
}

export default Nav;
