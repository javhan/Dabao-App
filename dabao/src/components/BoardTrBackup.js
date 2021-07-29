import React, { useState, useEffect, useContext } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import axios from "axios"
import { LoggedContext } from "../App.js";
import moment from "moment"
import debounce from 'lodash.debounce';
import CollapsibleTable from './Board';

const Board = () => {
  const loggedContext = useContext(LoggedContext);
  const [matches, setMatches] = useState(["loading"])
  const [toggleUpdate, settoggleUpdate] = useState(false)

  // console.log("logcontext",loggedContext) 
  const postcode = loggedContext?.logState?.address.postCode
   useEffect(() => {
    axios
      .get(`/match/postcode/${postcode}`)
      .then(function (response) {
        // handle success
        // console.log(response.data);
        setMatches(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [postcode,toggleUpdate]);

  const debouncedSavePlus = debounce(nextValue => handleAdd(nextValue), 500)
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

  const debouncedSaveMinus = debounce(nextValue => handleMinus(nextValue), 500)
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

  if(matches[0] === "loading")
    return (<h1>Loading ..... </h1>)

  if(matches?.length === 0) {
    return (
      <Nav>
      <div className="box">
        {matches.length===0 && <h1>NO Dabao-Er AVAILABLE AT YOUR CURRENT LOCATION</h1>}
      </div>
      {/* <div>
        <Link to="/dashboard">To Dashboard</Link>
      </div> */}
      </Nav>
    )
  } else {
  return (
    <Nav>
      <div >
      <table>
        <thead>
          <tr>
            <th>Dabao-Er</th>
            {/* <th>ID </th> */}
            <th>Dish</th>
            <th>Price</th>
            <th>Pickup-Location</th>
            <th>PostCode</th>
            <th>Order-Location</th>
            <th>Pickup-Time</th>
            <th>Avail-Slots</th>
            <th>Action</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {matches?.map((match,index) => {
            
            const slotsAvail = match.maxOrders - match.Orders.length;
            
            let isConfirmedOrder = false;
            if(match.Orders.length > 0) {
              match.Orders.forEach(order => {
                if(order.DBEE === loggedContext.logState._id)
                  isConfirmedOrder = true;
              })
            }
            if((slotsAvail === 0 && !isConfirmedOrder) || 
              (loggedContext?.logState?._id === match.DBER._id))
                return (<></>)
            return (
              <tr className="bg-emerald-200" key={match._id}>
                <td>{match.DBER.username}</td>
                {/* <td>{match.DBER._id}</td> */}
                <td>{match.dishOrdered?.itemName}</td>
                <td>${match.dishOrdered?.itemPrice}</td>
                <td>{match.pickupLocation?.street}</td>
                <td>{match.pickupLocation?.postCode}</td>
                <td>{match.orderLocation?.street}</td>
                <td>{moment(match.timeAtPickUp).format("lll")}</td>
                <td>{slotsAvail}</td>
                <td>{!isConfirmedOrder && <button onClick={()=>debouncedSavePlus(match)}>+</button>}
                    {isConfirmedOrder && <button onClick={()=>debouncedSaveMinus(match)}>-</button>}</td>
                <td>{isConfirmedOrder? "CONFIRMED":slotsAvail > 0 ? "AVAIL":"CLOSED"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      {/* <div><br/><br/>
        <Link to="/dashboard"><button>To Dashboard</button></Link>
      </div> */}
    </Nav>
  );
  }
};

export default Board;
