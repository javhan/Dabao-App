import React, { useEffect, useContext, useState } from "react";
import { LoggedContext } from "../../App.js";
import Chatbox from "./Chatbox";
import "../Dashboard.css";
import moment from "moment";

function DBERdash() {
  const [dashboard, setDashboard] = useState([]);
  const [chatbox, setChatbox] = useState();
  const loggedContext = useContext(LoggedContext);
  const [convoOpp, setConvoOpp] = useState("");
  const [orderID, setOrderID] = useState();

  const handleDeleteJob = (id) => {
    fetch(`/match/${id}`, {
      method: "DELETE",
    }).then((response) => {
      setDashboard(dashboard.filter((data) => data._id !== id));
    });
  };

  useEffect(() => {
    fetch(`/match/DBER/${loggedContext?.logState?._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDashboard(data);
        console.log("dashboard", data);
      });
  }, [loggedContext?.logState?._id]);

  const handleChat = (cb, user, order_id) => {
    console.log(cb);
    console.log(user);
    console.log(order_id)
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

  const handleEdit = () => {
    console.log("Edit");
  };

  const activeJobs = dashboard.map((data, index) => {
    return (
      <div key={index}>
        <span>
          Pickup Point: {data.pickupLocation.street},{" "}
          {data.pickupLocation.postCode}
        </span>
        <br />
        <span>Pickup Time: {moment(data.timeAtPickUp).format("LLL")}</span>
        <br />
        <button>Edit</button>
        <button onClick={() => handleDeleteJob(data._id)}>Delete</button>
        <ul>
          {data.Orders.map((inner, indexIn) => (
            <li key={indexIn}>
              {inner?.DBEE?.username}
              <span className="chat">
                <button onClick={() => handleChat(inner?.messages, inner?.DBEE?.username, inner?._id)}>
                  Chat
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  });

  return (
    <div className="holder">
      <div>
        <h2>Jobs</h2>
        <div className="jobDetails">{activeJobs}</div>
      </div>
      <div>
        <Chatbox
          chatbox={chatbox}
          sendMessage={sendMessage}
          convoOpp={convoOpp}
        />
      </div>
    </div>
  );
}

export default DBERdash;
