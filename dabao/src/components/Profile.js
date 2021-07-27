import React, { useContext } from "react";
import Nav from "./Nav"
import { LoggedContext } from "../App.js";

const Profile = () => {
const loggedContext = useContext(LoggedContext);
console.log(loggedContext.logState._id)

const handleSubmit = (event) => {
fetch("/id/:id", {
    method: 'POST',
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
        </Nav>
    )
}

export default Profile
