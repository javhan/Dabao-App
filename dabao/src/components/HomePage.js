import * as React from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    <Nav>
      <div className="flex">
        <Link to="/question" className="flex-child">
          <div >
            <h1 className="DabaoLeft">Going Out To Dabao?</h1>
            <img
              alt=""
              src="https://i.imgur.com/jOQsDlZ.png"
            />
          </div>
        </Link>
        <Link to="/board" className="flex-child2">
          <div className="icon">
            <img
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

export default HomePage;
