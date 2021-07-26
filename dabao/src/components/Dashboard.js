import React, { useEffect, useContext, useState } from "react";
import Nav from "./Nav";
import { LoggedContext } from "../App.js";

const Dashboard = () => {
  const loggedContext = useContext(LoggedContext);
  const [dashboard, setDashboard] = useState([]);
  //   console.log(loggedContext.logState._id);

  useEffect(() => {
    fetch(`/match/${loggedContext.logState._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setDashboard(data));
  }, []);

  const activeJobs = dashboard.map((data, index) => {
    return (
      <div>
        <h1>Pickup Point: {data.pickupLocation.street}</h1>
      </div>
    )
  })

  return (
    <Nav>
      <h1>Dashboard</h1>
      {activeJobs}
    </Nav>
  );
};

export default Dashboard;
