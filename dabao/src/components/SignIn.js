import * as React from "react"
import Nav from "./Nav"
const SignIn = () => {
    return (
<Nav>
<h1>Sign In!</h1>
<div className="SignInForm">
<form>
  <form>
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
</form>
</div>
</Nav>
)
}   

export default SignIn