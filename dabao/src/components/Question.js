import React from "react"
import Nav from "./NavIn"
import { Link } from "react-router-dom";

const Question = () =>{
    return(
        <Nav>
            <div className="box">
                <h1>DBer Questionnaire</h1>
            </div>
              <div>
                <Link to="/dashboard">
                To Dashboard
                </Link>
            </div>
        </Nav>
    )
}

export default Question