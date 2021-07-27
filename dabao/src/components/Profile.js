import React, { useContext } from "react";
import Nav from "./Nav"
import { LoggedContext } from "../App.js";
import { useHistory } from "react-router-dom"

const Profile = () => {
const loggedContext = useContext(LoggedContext);
const id = loggedContext?.logState?._id
let history = useHistory()

const handleSubmit = (event) => {
fetch(`/users/edit/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
        address: {
            street: event?.target.street.value,
            postCode: event?.target.postcode.value
        },
        contact: {
            hp: event?.target.hp.value,
            email: event?.target.email.value
        }
     }),
    headers: {
            "Content-Type": "application/json",
          }
        }).then((res) => { 
              return res.json()
            })
            .then((resJson) => {
                console.log(resJson)
            })
        history.push("/updatesuccess")
}

    return (
        <Nav>
            <h1>Update Profile</h1>
            <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Address</legend>
            <input type="text" name="street" defaultValue={loggedContext?.logState?.address?.street}/>
          </fieldset>
          <br />
          <fieldset>
            <legend>Postal Code</legend>
            <input type="number" name="postcode" defaultValue={loggedContext?.logState?.address?.postCode}/>
          </fieldset>
          <br />
          <fieldset>
            <legend>Phone Number</legend>
            <input type="number" name="hp" defaultValue={loggedContext?.logState?.contact?.hp}/>
          </fieldset>
          <br />
          <fieldset>
            <legend>E-mail Address</legend>
            <input type="text" name="email" defaultValue={loggedContext?.logState?.contact?.email}/>
          </fieldset>
          <br />
          <input type="submit" value="Confirm!" />
        </form>
        </Nav>
    )
}

export default Profile
