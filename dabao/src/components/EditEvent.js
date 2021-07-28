import React from "react";
import Nav from "./Nav";
import { Link, useHistory } from "react-router-dom"

function EditEvent(prop) {
    let history = useHistory();

  const handleSubmit = (event) => {
      event.preventDefault()
      if (event.target.street.value === "" || event.target.postCode.value === "" || event.target.timeAtPickUp.value === "" ) {
          return;
      }

      fetch(`/match/order/edit/${prop.location.props.data._id}`, {
          method: "PUT",
          body: JSON.stringify({
              pickupLocation: {
                  street: event?.target.street.value,
                  postCode: event?.target.postCode.value
              },
              timeAtPickUp : event?.target.timeAtPickUp.value
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
    history.push("/dashboard");
  };

  console.log(prop.location.props.data._id);

  return (
    <Nav>
      <form onSubmit={handleSubmit} className="box">
        <fieldset>
          <legend>
            <h1>Update Order</h1>
          </legend>
          <h3>Pickup Location</h3>
          <div className="user-box">
            <input
              type="text"
              name="street"
              defaultValue={prop.location.props.data.pickupLocation.street}
              required
            />
            <label>Street</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              name="postCode"
              defaultValue={prop.location.props.data.pickupLocation.postCode}
              required
            />
            <label>Postal Code</label>
          </div>
          <h3>Time</h3>
          <div className="user-box">
            <input
              type="datetime-local"
              name="timeAtPickUp"
              defaultValue={prop.location.props.data.timeAtPickUp}
            />
            <label>Time At Pickup</label>
          </div>
          <br />
          <Link to="/dashboard">
            <span id="backLink">Back</span>
          </Link>
          <button className="btstyle">Confirm</button>
        </fieldset>
      </form>
    </Nav>
  );
}

export default EditEvent;
