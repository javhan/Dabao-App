import React, { useEffect, useContext, useState } from "react";
import Nav from "./Nav";
import { LoggedContext } from "../App.js";
import "./Dashboard.css";

const Dashboard = () => {
  const loggedContext = useContext(LoggedContext);
  const [dashboard, setDashboard] = useState([]);
  const [DBEEdashboard, setDBEEdashboard] = useState([]);

  const handleDeleteJob = (id) => {
    console.log(id);

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
      .then((data) => setDashboard(data));
  }, [loggedContext.logState._id]);

  useEffect(() => {
    fetch(`/match/DBEE/${loggedContext?.logState?._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setDBEEdashboard(data));
  }, [loggedContext.logState._id]);

  const activeJobs = dashboard.map((data, index) => {
    return (
      <div index={index}>
        <span>Pickup Point: {data.pickupLocation.street}</span>
        <br />
        <span>Pickup Time: {data.timeAtPickUp}</span>
        <br />
        <span>Pickup Time: {data._id}</span>
        <br />
        <button>Edit</button>
        <button onClick={() => handleDeleteJob(data._id)}>Delete</button>
      </div>
    );
  });

  const activeOrder = DBEEdashboard.map((data, index) => {
    return (
      <div index={index}>
        <span>Pickup Point: {data.pickupLocation.street}</span>
        <span>Pickup Time: {data.timeAtPickUp}</span>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    );
  });

  return (
    <Nav>
      <h1>Dashboard</h1>
      <div className="jobsNorders">
        <div className="activeJobs">
          <h2>Your Jobs</h2>
          <div>{activeJobs}</div>
        </div>
        <div className="activeOrders">
          <h2>Your Orders</h2>
          {activeOrder}
        </div>
      </div>
      <div>
        <h1>Chatbox</h1>
      </div>
    </Nav>
  );
};

export default Dashboard;
