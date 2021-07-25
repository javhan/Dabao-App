import React from "react"
import NavIn from "./NavIn"
import { Link } from "react-router-dom";

const Dashboard = () =>{
    return(
        <NavIn>
            <h1>Dashboard</h1>
            <Link to="/home">
            <h1>Back to home</h1>
            </Link>
        </NavIn>
    )
}

export default Dashboard