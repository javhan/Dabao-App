import React from "react";
import NavIn from "./NavIn";
import { Link } from "react-router-dom";

const Board = () => {
  return (
    <NavIn>
      <div className="box">
        <h1>Board</h1>
      </div>
      <div>
        <Link to="/dashboard">To Dashboard</Link>
      </div>
    </NavIn>
  );
};

export default Board;
