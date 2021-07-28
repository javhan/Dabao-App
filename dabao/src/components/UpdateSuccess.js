import React from 'react'
import Nav from "./Nav"
import { Link } from "react-router-dom";

const UpdateSuccess = () => {
    return (
        <Nav>
        <div>
            <h3>Update success!</h3>
            <Link to ="/">
                <button className="btstyle">
                    Home
                    </button>
            </Link>
        </div>
        </Nav>
    )
}

export default UpdateSuccess