import React, { useEffect, useContext, useState } from "react";
import Nav from "./Nav";
import { LoggedContext } from "../App.js";

const Dashboard = () => {
  const loggedContext = useContext(LoggedContext);
  const [dashboard, setDashboard] = useState([]);
  //   console.log(loggedContext.logState._id);

  useEffect(() => {
    fetch("/match/60fbae8c71401c1521d7027c", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  return (
    <Nav>
      <h1>Dashboard</h1>
    </Nav>
  );
};

export default Dashboard;
