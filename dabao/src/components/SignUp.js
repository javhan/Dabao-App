import * as React from "react";
import {useState} from "react";
import { Redirect } from 'react-router'
import Nav from "./Nav"
const SignUp = () => {
  const [isConfirmPwdSame, setIsConfirmPwdSame] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)

  // need to make sure password and confirm password is same
  // the new user API is post method with /users route
  const handleRegisterUser = (event) => {
    event.preventDefault();
    if(event.target.password.value !== event.target.confirmPassword.value) {
      setIsConfirmPwdSame(false);
      return;
    }
    
    fetch("http://localhost:4000/users", {
      method: "POST",
      body: JSON.stringify({ 
        username: event.target.username.value,   
        password: event.target.password.value,
        address: { street: event.target.address.value,
                    postCode: event.target.postcode.value},
        contact: {hp: event.target.hp.value,
                  email: event.target.email.value},
      }),
      headers: {
      "Content-Type": "application/json",
      },
    })
    .then((res) => { 
      console.log(res)
      if(res.status === 200) {
        setIsSuccess(true)
        return res.json()
      }
        
    })
      .then((resJson) => {
        // props.handleAddHoliday(resJson);
        console.log("resJson",resJson)
        
      })
      .catch((error) => console.error({ Error: error }));

  }

  return (
      <Nav>
      <h1>Sign Up!</h1>
    <div className="SignUpForm">
      <form onSubmit={handleRegisterUser}>
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
            type="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
        </label>
        <label>
          Address:
          <br></br>
          <input type="text" name="address" placeholder="Address" />
        </label>
        <label>
          Postcode:
          <br></br>
          <input type="text" name="postcode" placeholder="postcode" />
        </label>
        <label>
          Email Address:
          <br></br>
          <input type="text" name="email" placeholder="Email Address" />
        </label>
        <label>
          Hp:
          <br></br>
          <input type="text" name="hp" placeholder="Hp" />
        </label>
        <br></br>
        <input type="submit" value="Register" />
      </form><br /><br />
      {!isConfirmPwdSame && <h3>Confirm Password Must Match</h3>}
      {isSuccess && <Redirect to="/signupsuccess" /> }
    </div>
    </Nav>
  );
};

export default SignUp;
