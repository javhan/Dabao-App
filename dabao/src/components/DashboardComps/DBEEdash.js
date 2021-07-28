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
      <div key={index}>
        <span>From: {data.DBER.username}</span>
        <br />
        <span>
          Pickup Point: {data.pickupLocation.street},{" "}
          {data.pickupLocation.postCode}
        </span>
        <br />
        <span>Pickup Time: {moment(data.timeAtPickUp).format("LLL")}</span>
        <br />
        {data.Orders.map((inner, indexIn) => {
          if (inner.DBEE === loggedContext?.logState?._id)
            return (
              <button
                onClick={() =>
                  handleChat(inner.messages, data.DBER.username, inner._id)
                }
              >
                Chat
              </button>
            );
        })}

        <button onClick={() => handleDeleteOrder(data._id)}>Delete</button>
      </div>
    );
  });

  return (
    <div className="holder">
      <div>
        <h2>Order</h2>
        <div className="jobDetails">{activeOrder}</div>
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
