import React, { useContext } from "react";
import Nav from "./Nav"
import { LoggedContext } from "../App.js";

const Profile = () => {
const loggedContext = useContext(LoggedContext);
const id = loggedContext?.logState?._id
console.log(id)
const handleSubmit = (event) => {
fetch(`/users/edit/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
        address: {
            street: event.target.street.value,
            postCode: event.target.postcode.value
        },
        contact: {
            hp: event.target.hp.value,
            email: event.target.email.value
        }
     }),
    headers: {
            "Content-Type": "application/json",
          }
        })
}

    return (
        <Nav>
            <h1>Update Profile</h1>
            <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Address</legend>
            <input type="text" name="street" />
          </fieldset>
          <br />
          <fieldset>
            <legend>Postal Code</legend>
            <input type="number" name="postcode" />
          </fieldset>
          <br />
          <fieldset>
            <legend>Phone Number</legend>
            <input type="number" name="hp" />
          </fieldset>
          <br />
          <fieldset>
            <legend>E-mail Address</legend>
            <input type="text" name="email" />
          </fieldset>
          <br />
          <input type="submit" value="Confirm!" />
        </form>
        </Nav>
    )
}

export default Profile
