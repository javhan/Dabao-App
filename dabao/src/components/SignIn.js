import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { LoggedContext } from "../App.js";
import Nav from "./Nav";

const SignIn = () => {
  const loggedContext = useContext(LoggedContext);
  let history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
    fetch("/sessions", {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res)
        if (res.ok) {
          return res.json();
        }
        throw new Error("Error in network");
      })
      .then((resJson) => {
        loggedContext.setLogState(resJson);
        history.push("/home");
      });
  };
  return (
    <Nav>
      <h1>Login!</h1>
      <div className="SignInForm">
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input type="text" name="username" required/>
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" name="password" required/>
            <label>Password</label>
          </div>
          <button className="btstyle">Login</button>
        </form>
      </div>
    </Nav>
  );
};

export default SignIn;
