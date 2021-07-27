import React, { useContext } from "react";
import Nav from "./Nav";
import { Link, useHistory } from "react-router-dom";
import { LoggedContext } from "../App.js";

const Question = () => {
  const loggedContext = useContext(LoggedContext);
  console.log(loggedContext.logState._id)
  const history = useHistory();
  const handleSubmit = (event) => {
    fetch("/match", {
      method: "POST",
      body: JSON.stringify({
        DBER: loggedContext.logState._id,
        maxOrders: event.target.maxOrders.value,
        pickupLocation: {
          street: event.target.pickup.value,
          postCode: event.target.postcode.value
        },
        timeAtPickUp: event.target.timeAtPickUp.value,
        orderLocation: { street: event.target.eating.value },

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
            <legend>Where are you Eating?</legend>
            <input type="text" name="eating" />
          </fieldset>
          <br />
          <fieldset>
            <legend>Where to Pick-up?</legend>
            <input type="text" name="pickup" />
          </fieldset>
          <br />
          <fieldset>
            <legend>Postal Code of Pick-up</legend>
            <input type="text" name="postcode" />
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
