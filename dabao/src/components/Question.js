import React, { useContext,useState, useRef } from "react";
import Nav from "./Nav";
import { useHistory } from "react-router-dom";
import { LoggedContext } from "../App.js";
import axios from "axios";
import Option from "./Option"


const Question = () => {
  const loggedContext = useContext(LoggedContext);
  const history = useHistory();
  const handleSubmit = (event) => {
      event.preventDefault()
      console.log(event.target.shopname.value, event.target.DBpostcode.value )
    fetch("/match", {
      method: "POST",
      body: JSON.stringify({
        DBER: loggedContext.logState._id,
        maxOrders: event.target.maxOrders.value,
        pickupLocation: {
          street: event.target.pickup.value,
          postCode: event.target.postcode.value,
        },
        timeAtPickUp: event.target.timeAtPickUp.value,
        dishOrdered: {
          itemName: event.target.food.value,
          itemPrice: event.target.price.value,
        },
        orderLocation: {
             street: event.target.shopname.value, 
             postCode: event.target.DBpostcode.value},
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
  const postcode = useRef(null)
  const [info, setInfo] = useState([])
  
  
  const HandleQuery = () => {
  
      axios
      .get(`/shop/${postcode.current.value}`)
      .then(function (res) {
        // handle success
        setInfo(res.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  return (
    <Nav>
      <div className="box">
        <h1>DBer Questionnaire</h1>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Food</legend>
            <div className="user-box">
            <input type="text" name="food" required/>
            <label>What are you eating?</label>
            </div>
            <div className="user-box">
            <input type="number" name="price" min="0" step=".01" required/>
         <label>Whats the price?</label>
         </div> 
         </fieldset>
          <br />
          <fieldset>
            <legend>Dabao Location</legend>
            <div className="user-box">
            <input
              type="text"
              name="DBpostcode"
              onChange={HandleQuery}
              ref={postcode}
              required
            />
            <label>Postal Code</label>
            </div>
            <legend>Select closest store or fill in your own!</legend>
            <input type="text" list="hawker" name="shopname" className="hawker"/>
            <datalist id="hawker">
              <Option data={info} />
              </datalist>
          </fieldset>
          <br />
          <fieldset>
            <legend>Pick-Up</legend>
            <div className="user-box">
            <input type="text" name="pickup" required/>
            <label>Where to Pick-up?</label>
            </div>
            <div className="user-box">
            <input type="text" name="postcode" required/>
            <label>Postal Code of Pick-up?</label>
            </div>
            <legend>Pick-Up Time!</legend>
            <input type="datetime-local" name="timeAtPickUp" required/>
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
          <button className="btstyle">Submit</button>
        </form>
      </div>
    </Nav>
  );
};

export default Question;
