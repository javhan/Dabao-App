import * as React from "react"

const SignIn = () => {
    return (
        <>
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
</>
)
}   

export default SignIn