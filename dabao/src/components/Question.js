import React from "react"
import NavIn from "./NavIn"
import { Link } from "react-router-dom";

const Question = () =>{
    return(
        <NavIn>
            <div className="box">
                <h1>DBer Questionnaire</h1>
            </div>
              <div>
                <Link to="/dashboard">
                To Dashboard
                </Link>
            </div>
        </NavIn>
    )
}

export default Question