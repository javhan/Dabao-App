import * as React from "react";
import {useState} from "react";
import Nav from "./Nav"
const SignUp = () => {
  const [isConfirmPwdSame, setIsConfirmPwdSame] = useState(true)

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
        email: event.target.email.value,

      }),
      headers: {
      "Content-Type": "application/json",
      },
    })
    .then((res) => { 
      res.json()
      console.log(res)
    })
      .then((resJson) => {
        // props.handleAddHoliday(resJson);
        console.log(resJson)
      })
      .catch((error) => console.error({ Error: error }));

  }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   fetch("/holidays", {
  //     method: "POST",
  //     body: JSON.stringify({ name: event.target.name.value }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((resJson) => {
  //       props.handleAddHoliday(resJson);
  //     })
  //     .catch((error) => console.error({ Error: error }));
  // }


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
          Email Address:
          <br></br>
          <input type="text" name="email" placeholder="Email Address" />
        </label>
        <br></br>
        <input type="submit" value="Register" />
      </form><br /><br />
      {!isConfirmPwdSame && <h3>Password Difference</h3>}
    </div>
    </Nav>
  );
};

export default SignUp;
