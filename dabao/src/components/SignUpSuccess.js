import React from 'react'
import Nav from "./Nav"
import {Link} from "react-router-dom"

const SignUpSuccess = () => {
    return (
        <Nav>
        <div>
            <h3>You are successfully signed up</h3>
            <h3>Please login to proceed</h3>
            <Link to ="/">
                <button className="btstyle">
                    Login Page
                    </button>
                </Link>
        </div>
        </Nav>
    )
}

export default SignUpSuccess
