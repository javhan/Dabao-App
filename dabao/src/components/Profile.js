import React, { useContext, useState } from "react";
import Nav from "./Nav"
import { LoggedContext } from "../App.js";

const Profile = () => {
const loggedContext = useContext(LoggedContext);
const id = loggedContext?.logState?._id
console.log(loggedContext?.logState?.address?.street)
const base = {
    address: {
        street: loggedContext?.logState?.address?.street,
        postCode: loggedContext?.logState?.address?.postCode
    },
    contact: {
        hp: loggedContext?.logState?.contact?.hp,
        email: loggedContext?.logState?.contact?.email
    }
}

console.log(base)
const [info, setInfo] = useState(base)

console.log(info)

const handleSubmit = (event) => {
setInfo({
    address: {
        street: event?.target.street.value,
        postCode: event?.target.postcode.value
    },
    contact: {
        hp: event?.target.hp.value,
        email: event?.target.email.value
    }
 })

console.log(info)
fetch(`/users/edit/${id}`, {
    method: 'PUT',
    body: JSON.stringify(info),
    headers: {
            "Content-Type": "application/json",
          }
        }).then((res) => { 
              return res.json()
            })
            .then((resJson) => {
                console.log(resJson)
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
