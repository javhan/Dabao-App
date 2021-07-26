import React, { useState, useEffect, useContext } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import axios from "axios"
import { LoggedContext } from "../App.js";

const Board = () => {
  const loggedContext = useContext(LoggedContext);
  const [matches, setMatches] = useState([])
   console.log("logcontext",loggedContext) 
   useEffect(() => {
    axios
      .get(`/match/postcode/${loggedContext.logState.address.postCode}`)
      .then(function (response) {
        // handle success
        console.log(response.data);
        setMatches(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  return (
    <Nav>
      <div className="box">
        {matches.length===0 && <h1>NO DBER AVAILABLE AT YOUR CURRENT LOCATION</h1>}
      </div>
      <div>
        <Link to="/dashboard">To Dashboard</Link>
      </div>
    </Nav>
  );
};

export default Board;
