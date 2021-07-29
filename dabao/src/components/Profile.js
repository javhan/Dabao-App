import React, { useContext } from "react";
import Nav from "./Nav";
import { LoggedContext } from "../App.js";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const loggedContext = useContext(LoggedContext);
  const id = loggedContext?.logState?._id;
  let history = useHistory();

  const handleSubmit = (event) => {
    fetch(`/users/edit/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        address: {
          street: event?.target.street.value,
          postCode: event?.target.postcode.value,
        },
        contact: {
          hp: event?.target.hp.value,
          email: event?.target.email.value,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resJson) => {
        console.log(resJson);
      });
    history.push("/updatesuccess");
  };

  return (
    <Nav>
      <form onSubmit={handleSubmit} className="box">
        <fieldset className="zero">
          <legend>
            <h1>Update Profile</h1>
          </legend>
          <div className="user-box">
          <input
            type="text"
            name="street"
            defaultValue={loggedContext?.logState?.address?.street}
          required
          />
          <label>Address</label>
          </div>
          <div className="user-box">
          <input
            type="number"
            name="postcode"
            defaultValue={loggedContext?.logState?.address?.postCode}
          required
          />
        <label>Postal Code</label>
        </div>
        <div className="user-box">
          <input
            type="number"
            name="hp"
            defaultValue={loggedContext?.logState?.contact?.hp}
          required
          />
          <label>Phone Number</label>
          </div>
          <div className="user-box">
          <input
            type="text"
            name="email"
            defaultValue={loggedContext?.logState?.contact?.email}
          />
          <label>E-mail Address</label>
          </div>
          <br />
          <button className="btstyle">Confirm</button>
        </fieldset>
      </form>
    </Nav>
  );
};

export default Profile;
