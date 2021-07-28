import React, { useEffect, useContext, useState } from "react";
import Nav from "./Nav";
import { LoggedContext } from "../App.js";
import "./Dashboard.css";
import DBERdash from "./DashboardComps/DBERdash"
import DBEEdash from "./DashboardComps/DBERdash"
import Chatbox from "./DashboardComps/Chatbox";
import moment from "moment"
import axios from "axios"

const Dashboard = () => {
  const loggedContext = useContext(LoggedContext);
  const [dashboard, setDashboard] = useState([]);
  const [DBEEdashboard, setDBEEdashboard] = useState([]);
  const [chatbox, setChatbox] = useState();

  const handleDeleteJob = (id) => {
    fetch(`/match/${id}`, {
      method: "DELETE",
    }).then((response) => {
      setDashboard(dashboard.filter((data) => data._id !== id));
    });
  };

  const handleDeleteOrder = (match) => {
    axios
    .put(`/match/remove/${match}/${loggedContext.logState._id}`)
    .then(function (response) {
      // handle success
      setDBEEdashboard(DBEEdashboard.filter((data) => data._id !== match))
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  const handleChat = (chatbox) => {
    setChatbox(chatbox);
  }

  const handleEdit = () => {
    console.log("Edit")
  }

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
        setDashboard(data)
        console.log("dashboard", data)
      });
  }, [loggedContext?.logState?._id]);

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
        console.log("DBEEdashboard", data)
        setDBEEdashboard(data)
      });
  }, [loggedContext?.logState?._id]);

  const activeJobs = dashboard.map((data, index) => {
    return (
      <div key={index}>
        <span>Pickup Point: {data.pickupLocation.street}, {data.pickupLocation.postCode}</span>
        <br />
        <span>Pickup Time: {moment(data.timeAtPickUp).format("LLL")}</span>
        <br />
        <button>Edit</button>
        <button onClick={() => handleDeleteJob(data._id)}>Delete</button>
        <ul>
          {data.Orders.map((inner, indexIn) => (
            <li key={indexIn}>
              {inner.DBEE.username}
              <span className="chat">
                <button onClick={() => handleChat(inner.DBEE.messages)}>Chat</button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  });

  const activeOrder = DBEEdashboard.map((data, index) => {
    return (
      <div key={index}>
        <span>Pickup Point: {data.pickupLocation.street}, {data.pickupLocation.postCode}</span>
        <br />
        <span>Pickup Time: {moment(data.timeAtPickUp).format("LLL")}</span>
        <br />
        <button onClick={() => handleDeleteOrder(data._id)}>Delete</button>
      </div>
    );
  });

  return (
    <Nav>
      <div className="toggletype">
        <div className="selection">
          Dabao-ER
        </div>
        <div className="selection">
          Dabao-EE
        </div>
      </div>
      <div className="jobsNorders">
        <div >
         <DBERdash />
        </div>
        <div className="activeOrders">
          <h2>Orders</h2>
          <div className="jobDetails">{activeOrder}</div>
        </div>
      </div>
    </Nav>
  );
};

export default Dashboard;
