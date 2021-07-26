import * as React from "react";
import Nav from "./Nav";
const SignIn = () => {
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
