import * as React from "react";
import { useState } from "react";
import { Redirect } from "react-router";
import Nav from "./Nav";
const SignUp = () => {
  const [isConfirmPwdSame, setIsConfirmPwdSame] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [valid, setValid] = useState(false)
  // need to make sure password and confirm password is same
  // the new user API is post method with /users route
  const handleRegisterUser = (event) => {
    event.preventDefault();
    setIsConfirmPwdSame(true);
    setValid(false);
    if (event.target.password.value !== event.target.confirmPassword.value) {
      setIsConfirmPwdSame(false);
      return;
    }
    fetch("/users", {
      method: "POST",
      body: JSON.stringify({
        username: event.target.username.value,
        password: event.target.password.value,
        address: {
          street: event.target.address.value,
          postCode: event.target.postcode.value,
        },
        contact: { hp: event.target.hp.value, email: event.target.email.value },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setIsSuccess(true);
          return res.json();
        } else if (res.status === 409) {
          setValid(true);
        }
      })
      .then((resJson) => {})
      .catch((error) => console.error({ Error: error }));
  };
  return (
    <Nav>
      <h1>Sign Up!</h1>
      <div className="SignUpForm">
        <form onSubmit={handleRegisterUser}>
          <div className="user-box">
            <input type="text" name="username" required />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" name="password" required />
            <label>Password</label>
          </div>
          <div className="user-box">
            <input type="password" name="confirmPassword" required />
            <label>Confirm Password</label>
          </div>
          <div className="user-box">
            <input type="text" name="address" required />
            <label>Address</label>
          </div>
          <div className="user-box">
            <input type="text" name="postcode" required />
            <label>Postcode</label>
          </div>
          <div className="user-box">
            <input type="text" name="email" required />
            <label>Email Address</label>
          </div>
          <div className="user-box">
            <input type="text" name="hp" required />
            <label>Hp</label>
          </div>
          <button className="btstyle">Register</button>
        </form>
        {!isConfirmPwdSame && <h3>Confirm Password Must Match</h3>}
        {valid && <h3>Username Taken!</h3>}
        {isSuccess && <Redirect to="/signupsuccess" />}
      </div>
    </Nav>
  );
};
export default SignUp;
