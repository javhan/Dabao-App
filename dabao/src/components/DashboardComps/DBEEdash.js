import React, { useEffect, useContext, useState } from "react";
import { LoggedContext } from "../../App.js";
import Chatbox from "./Chatbox";
import "../Dashboard.css";
import moment from "moment";
import axios from "axios";

function DBEEdash() {
  const [DBEEdashboard, setDBEEdashboard] = useState([]);
  const [chatbox, setChatbox] = useState([]);
  const loggedContext = useContext(LoggedContext);
  const [convoOpp, setConvoOpp] = useState("");
  const [orderID, setOrderID] = useState();

  // Delete the Order from DBEE dashboard
  const handleDeleteOrder = (match) => {
    axios
      .put(`/match/remove/${match}/${loggedContext.logState._id}`)
      .then(function (response) {
        setDBEEdashboard(DBEEdashboard.filter((data) => data._id !== match));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Set the DBEE dashboard with live orders
  useEffect(() => {
    fetch(`/match/DBEE/${loggedContext?.logState?._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("DBEEdashboard", data);
        setDBEEdashboard(data);
      });
  }, [loggedContext?.logState?._id, chatbox]);

  //Toggle Who you're chatting with
  const handleChat = (cb, user, order_id) => {
    setChatbox(cb);
    setConvoOpp(user);
    setOrderID(order_id);
  };
  // Sending Message in Chatbox
  const sendMessage = (message) => {
    if (message === "") {
      return;
    }
    fetch(`/match/message/${orderID}`, {
      method: "PUT",
      body: JSON.stringify({
        message: message,
        timePosted: Date.now(),
        user: loggedContext.logState.username,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setChatbox([
        ...chatbox,
        {
          message: message,
          timePosted: Date.now(),
          user: loggedContext?.logState?.username,
        },
      ]);
    });
  };

  //Map DBEEdashboard out
  const activeOrder = DBEEdashboard.map((data, index) => {
    return (
      <tr key={index}>
        <td>{data.DBER.username}</td>
        <td>
          {data?.dishOrdered?.itemName} - ${data?.dishOrdered?.itemPrice}
        </td>

        <td>
          {data.orderLocation.street}, {data.orderLocation.postCode}
        </td>

        <td>
          {data.pickupLocation.street}, {data.pickupLocation.postCode}
        </td>
        <td>{moment(data.timeAtPickUp).format("LLL")}</td>
        {data.Orders.map((inner, indexIn) => {
          if (inner.DBEE === loggedContext?.logState?._id)
            return (
              <td>
                <button
                  onClick={() =>
                    handleChat(inner.messages, data.DBER.username, inner._id)
                  }
                >
                  Chat
                </button>
                <button onClick={() => handleDeleteOrder(data._id)}>
                  Delete
                </button>
              </td>
            );
        })}
      </tr>
    );
  });

  return (
    <div className="holder">
      <div>
        <h2>Orders</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>From</th>
              <th>Dish</th>
              <th>Ordered From</th>
              <th>Pickup Point</th>
              <th>Pickup Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{activeOrder}</tbody>
        </table>
      </div>
      <Chatbox
        chatbox={chatbox}
        sendMessage={sendMessage}
        convoOpp={convoOpp}
      />
    </div>
  );
}

export default DBEEdash;
