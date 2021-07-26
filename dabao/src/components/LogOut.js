import * as React from "react";
import Nav from "./Nav";
const LogOut = () => {
  return (
    <Nav>
      <div className="flex">
        <a href="/" className="flex-child">
          <div>
            <h1 className="DabaoLeft">Going Out To Dabao?</h1>
            <img
              className="icon"
              alt=""
              src="https://i.imgur.com/jOQsDlZ.png"
            />
          </div>
        </a>
        <a href="/" className="flex-child">
          <div>
            <img
              className="icon"
              alt=""
              src="https://i.imgur.com/omGzAkg.png"
            />
            <h1 className="DabaoRight">Too Busy To Head Out?</h1>
          </div>
        </a>
      </div>
    </Nav>
  );
};

export default LogOut;
