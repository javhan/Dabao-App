import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoggedContext } from "../App.js";
import { useHistory } from "react-router-dom";

const Nav = (props) => {
  const loggedContext = useContext(LoggedContext);
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/sessions", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    history.push("/");
    loggedContext.setLogState();
  };

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
            <Link to="/">DabaoPls</Link>
          </div>
          <div className="navRight">
            <Link to="/login">Login</Link>
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
          <div>
            <h6>Welcome, {loggedContext.logState.username} </h6>
          </div>
          <div className="navRight" onClick={handleSubmit}>
            Log Out
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
};

export default Nav;
