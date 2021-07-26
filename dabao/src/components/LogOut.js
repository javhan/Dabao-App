import * as React from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
const LogOut = () => {
  return (
    <Nav>
      <div className="flex">
        <Link to="/" className="flex-child">
          <div>
            <h1 className="DabaoLeft">Going Out To Dabao?</h1>
            <img
              className="icon"
              alt=""
              src="https://i.imgur.com/jOQsDlZ.png"
            />
          </div>
        </Link>
        <Link to="/" className="flex-child">
          <div>
            <img
              className="icon"
              alt=""
              src="https://i.imgur.com/omGzAkg.png"
            />
            <h1 className="DabaoRight">Too Busy To Head Out?</h1>
          </div>
        </Link>
      </div>
    </Nav>
  );
};

export default LogOut;
