import React, { useContext } from "react";
import Nav from "./Nav";
import { useHistory } from "react-router-dom";
import { LoggedContext } from "../App.js";
import Shop from "./Shop"

const Question = () => {
  const loggedContext = useContext(LoggedContext);
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
        dishOrdered: { 
            itemName: event.target.food.value,
            itemPrice: event.target.price.value
         },
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
            <legend>Food</legend>
            <legend>What are you eating?</legend>
            <input type="text" name="food" />
            <legend>Whats the price?</legend>
            <input type="number" name="price" min="0" step=".01"/>
          </fieldset>
          <br />
          <Shop />
          <br />
          <fieldset>
          <legend>Pick-Up</legend>
            <legend>Where to Pick-up?</legend>
            <input type="text" name="pickup" />
            <legend>Postal Code of Pick-up?</legend>
            <input type="text" name="postcode" />
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
    </Nav>
  );
};

export default Question;
