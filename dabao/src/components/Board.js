import React from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";

const Board = () => {
  return (
    <Nav>
      <div className="box">
        <h1>Board</h1>
      </div>
      <div>
        <Link to="/dashboard">To Dashboard</Link>
      </div>
    </Nav>
  );
};

export default Board;
