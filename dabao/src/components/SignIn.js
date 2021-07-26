import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { LoggedContext } from "../App.js"
import Nav from "./Nav";


const SignIn = () => {
  const loggedContext = useContext(LoggedContext)
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
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      throw new Error("Error in network")
    })
    .then((resJson) => {
        loggedContext.setLogState(resJson)
        history.push("/home")
    });
  };
  return (
    <Nav>
      <h1>Sign In!</h1>
      <div className="SignInForm">
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <br></br>
            <input type="text" name="username" placeholder="Username" />
          </label>
          <br></br>
          <label>
            Password:
            <br></br>
            <input type="password" name="password" placeholder="Password" />
          </label>
          <br></br>
          <input type="submit" value="Login" />
        </form>
      </div>
    </Nav>
  );
};

export default SignIn;
