import React from "react"
import Nav from "./Nav"
import { Link } from "react-router-dom";

const Dashboard = () =>{
    return(
        <Nav>
            <h1>Dashboard</h1>
            <Link to="/home">
            <h1>Back to home</h1>
            </Link>
        </Nav>
    )
}

export default Dashboard