import React from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";

const Question = () => {
  const history = useHistory();
  const handleSubmit = (event) => {
    fetch("/match", {
      method: "POST",
      body: JSON.stringify({
        maxOrders: event.target.maxOrders.value,
        pickupLocation: {
          street: event.target.street.value,
          postCode: event.target.postCodeOrder.value,
        },
        timeAtPickUp: event.target.timeAtPickUp.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json();
      }
    });
    history.push("/dashboard");
  };
  return (
    <Nav>
      <div className="box">
        <h1>DBer Questionnaire</h1>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Where are you DB-ing?</legend>
            <input type="text" name="street" />
          </fieldset>
          <br />
          <fieldset>
            <legend>Postal Code of DB place</legend>
            <input type="text" name="postCodeOrder" />
          </fieldset>
          <br />
          <fieldset>
            <legend>Pick-Up Location</legend>
            <input
              type="text"
              name="postCodePickUp"
              placeholder="Postal Code"
            />
          </fieldset>
          <br />
          <fieldset>
            <legend>Pick-Up Time!</legend>
            <input type="datetime-local" name="timeAtPickUp" />
          </fieldset>
          <br />
          <fieldset>
            <legend>No. of Orders</legend>
            <select type="range" name="maxOrders">
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </fieldset>
          <br />
          <input type="submit" value="Confirm!" />
        </form>
      </div>
      <div>
        <Link to="/dashboard">To Dashboard</Link>
      </div>
    </Nav>
  );
};

export default Question;
