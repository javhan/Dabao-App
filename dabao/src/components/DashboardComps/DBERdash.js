import React, { useEffect, useContext, useState } from "react";
import { LoggedContext } from "../../App.js";
import { Link } from "react-router-dom";
import Chatbox from "./Chatbox";
import "../Dashboard.css";
import moment from "moment";

function DBERdash() {
  const [dashboard, setDashboard] = useState([]);
  const [chatbox, setChatbox] = useState([]);
  const loggedContext = useContext(LoggedContext);
  const [convoOpp, setConvoOpp] = useState("");
  const [orderID, setOrderID] = useState();
  const [toggle, setToggle] = useState([]);

  // Delete the Order from DBER dashboard
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
  }, [loggedContext?.logState?._id, chatbox]);

  const handleChat = (cb, user, order_id) => {
    setChatbox(cb);
    setConvoOpp(user);
    setOrderID(order_id);
  };
  // Sending Message in Chatbox
  const sendMessage = (message) => {
    if (message === "" || convoOpp === "") {
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

  const toggleShown = (id) => {
    const shownState = toggle.slice();
    const index = shownState.indexOf(id);
    if (index >= 0) {
      shownState.splice(index, 1);
      setToggle(shownState);
    } else {
      shownState.push(id);
      setToggle(shownState);
    }
  };

  const activeJobs = dashboard.map((data, index) => {
    return (
      <React.Fragment key ={index}>
        <tr key={index}>
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
          <td>
            <Link
              to={{
                pathname: "/dashboard/edit",
                props: {
                  data: data,
                },
              }}
            >
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDeleteJob(data._id)}>Delete</button>
          </td>
          <td>
            <button onClick={() => toggleShown(data._id)}>
              Toggle Details
            </button>
          </td>
        </tr>
        {toggle.includes(data._id) &&
          data.Orders.map((inner, indexIn) => (
            <>
              <tr className="innerHeaders">
                <th>DBEE</th>
                <th>Contact</th>
              </tr>
              <tr key={indexIn} className="innerHeaders">
                <td>{inner?.DBEE?.username}</td>
                <td>
                  <span className="chat">
                    <button
                      onClick={() =>
                        handleChat(
                          inner.messages,
                          inner.DBEE.username,
                          inner._id
                        )
                      }
                    >
                      Chat
                    </button>
                  </span>
                </td>
              </tr>
            </>
          ))}
      </React.Fragment>
    );
  });

  return (
    <div className="holder">
      <div>
        <h2>Jobs</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Dish</th>
              <th>Ordered From</th>
              <th>Pickup Point</th>
              <th>Pickup Time</th>
              <th>Actions</th>
              <th>Toggle</th>
            </tr>
          </thead>
          <tbody>{activeJobs}</tbody>
        </table>
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
