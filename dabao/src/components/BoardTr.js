import React, { useState, useEffect, useContext } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import axios from "axios"
import { LoggedContext } from "../App.js";

const Board = () => {
  const loggedContext = useContext(LoggedContext);
  const [matches, setMatches] = useState([])
  const [toggleUpdate, settoggleUpdate] = useState(false)

  console.log("logcontext",loggedContext) 
  const postcode = loggedContext?.logState?.address?.postCode
   useEffect(() => {
    axios
      .get(`/match/postcode/${postcode}`)
      .then(function (response) {
        // handle success
        console.log(response.data);
        setMatches(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [postcode,toggleUpdate]);


  const handleAdd = (match) => {
    axios
    .put(`/match/insert/${match._id}`,{
      DBEE: loggedContext.logState._id,
      isCompleted: false,
      remarks: "MORE RICE",
      dishOrdered: { itemName: "Duck Rice", itemPrice: 3.00 },
    })
    .then(function (response) {
      // handle success
      console.log("Update Insert",response.data);
      settoggleUpdate(prev=>!prev)
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  const handleMinus = (match) => {
    console.log("minus")
    axios
    .put(`/match/remove/${match._id}/${loggedContext.logState._id}`)
    .then(function (response) {
      // handle success
      console.log("Update Remove",response.data);
      settoggleUpdate(prev=>!prev)
    })
    .catch(function (error) {
      console.log(error);
    })

  }

  if(matches.length === 0) {
    return (
      <Nav>
      <div className="box">
        {matches.length===0 && <h1>NO Dabao-Er AVAILABLE AT YOUR CURRENT LOCATION</h1>}
      </div>
      <div>
        <Link to="/dashboard">To Dashboard</Link>
      </div>
      </Nav>
    )
  } else {
  return (
    <Nav>
      <div className="board">
      <table className="boardTable">
        <tbody>
          <tr>
            <th>Dabao-Er</th>
            <th>ID </th>
            <th>Pickup-Location</th>
            <th>Order-Location</th>
            <th>Pickup-Time</th>
            <th>Avail-Slots</th>
            <th>Action</th>
            <th>Status</th>
          </tr>
          {matches.map((match) => {
            // const style = {backgroundColor: match.availOrder ? "orange" : "yellow"};
            const slotsAvail = match.maxOrders - match.Orders.length;
            let isConfirmedOrder = false;
            if(match.Orders.length > 0) {
              match.Orders.forEach(order => {
                if(order.DBEE === loggedContext.logState._id)
                  isConfirmedOrder = true;
              })
            }
            return (
              <tr key={match._id}>
                <td>{match.DBER.name}</td>
                <td>{match.DBER}</td>
                <td>{match.pickupLocation.street}</td>
                <td>{match.orderLocation.street}</td>
                <td>{match.timeAtPickUp}</td>
                <td>{slotsAvail}</td>
                <td>{!isConfirmedOrder && <button onClick={()=>handleAdd(match)}>+</button>}
                    {isConfirmedOrder && <button onClick={()=>handleMinus(match)}>-</button>}</td>
                <td>{isConfirmedOrder? "CONFIRMED":slotsAvail > 0 ? "AVAIL":"CLOSED"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      <div>
        <Link to="/dashboard">To Dashboard</Link>
      </div>
    </Nav>
  );
  }
};

export default Board;
