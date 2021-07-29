import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { LoggedContext } from "../App.js";
import Nav from "./Nav";
import setPos from '../map'

const SignIn = () => {
  const loggedContext = useContext(LoggedContext);
  let history = useHistory();
  const [userNotFound, setUserNotFound] = useState(false)
  const [passwordWrong, setPasswordWrong] = useState(false)

  // const setPos = () => {
  //   const successCallback = (position) => {
  //     // console.log(position);
  //     console.log(position.coords.latitude)
  //     console.log(position.coords.longitude)
  //     loggedContext.setCurrentPos({lat:position.coords.latitude, long:position.coords.longitude})
  //   }

  //   const errorCallback = (error) => {
  //     console.error(error)
  //   }
    
  //   navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserNotFound(false)
    setPasswordWrong(false)
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
        if (res.status === 200) {
          return res.json();
        }
        else if(res.status === 409) {
          setUserNotFound(true)
        } else if (res.status === 401) {
          setPasswordWrong(true)
        }
      })
      .then((resJson) => {
        if (resJson) {
          setPos(loggedContext.setCurrentPos)
          loggedContext.setLogState(resJson);
          history.push("/")
        }
      }
      );
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
        {userNotFound && <h3>User Not Found</h3>}
        {passwordWrong && <h3>User/Password Wrong!</h3>}
    </Nav>
  );
};

export default SignIn;
