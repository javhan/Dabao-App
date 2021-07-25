import React from "react"
import NavIn from "./NavIn"
import { Link } from "react-router-dom";

const Question = () =>{
    return(
        <NavIn>
            <div>
                <Link to="/dashboard">
                To Dashboard
                </Link>
            </div>
            <h1>Question</h1>
        </NavIn>
    )
}

export default Question