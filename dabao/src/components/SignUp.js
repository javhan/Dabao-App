import * as React from "react";
import Nav from "./Nav"
const SignUp = () => {
  return (
      <Nav>
      <h1>Sign Up!</h1>
    <div className="SignUpForm">
      <form>
        <label>
          Username:
          <br></br>
          <input type="text" name="username" placeholder="Username" />
        </label>
        <label>
          Password:
          <br></br>
          <input type="password" name="password" placeholder="Password" />
        </label>
        <label>
          Confirm Password:
          <br></br>
          <input
            type="password"
            name="password"
            placeholder="Confirm Password"
          />
        </label>
        <label>
          Email Address:
          <br></br>
          <input type="text" name="email" placeholder="Email Address" />
        </label>
        <br></br>
        <input type="submit" value="Register" />
      </form>
    </div>
    </Nav>
  );
};

export default SignUp;
