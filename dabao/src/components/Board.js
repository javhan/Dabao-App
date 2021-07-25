import React from "react"
import NavIn from "./NavIn"
import { Link } from "react-router-dom";

const Board = () =>{
    return(
        <NavIn>
            <div>
                <Link to="/dashboard">
                To Dashboard
                </Link>
            </div>
            <h1>Board</h1>
        </NavIn>
    )
}

export default Board