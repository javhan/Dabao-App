import React, { useState } from "react";
import Nav from "./Nav";
import "./Dashboard.css";
import DBERdash from "./DashboardComps/DBERdash"
import DBEEdash from "./DashboardComps/DBEEdash"


const Dashboard = () => {
  const [type, setType] = useState(true)
  const handleToggle = (boolean) => {
    setType(boolean);
  }

  return (
    <Nav>
      <div className="toggletype">
        <div className="selection" onClick={() => handleToggle(true)}>
          Dabao-ER
        </div>
        <div className="selection" onClick={() => handleToggle(false)}>
          Dabao-EE
        </div>
      </div>
      <div>
        {type? 
          <DBERdash />
         : <DBEEdash />
        }
      </div>
    </Nav>
  );
};

export default Dashboard;
