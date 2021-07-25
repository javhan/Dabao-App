import * as React from "react"
import Nav from "./Nav"

const LogOut = () => {
    return (
    <div className="flex">
    <div className="flex-child">
    <h1 className="DabaoLeft">Going Out To Dabao?</h1>
    <img className="icon" src="https://i.imgur.com/jOQsDlZ.png"/>
    </div>
    <div className="flex-child">
    <img className="icon" src="https://i.imgur.com/omGzAkg.png"/>
    <h1 className="DabaoRight">Too Busy To Head Out?</h1>
    </div>
    </div>
    )
}

export default LogOut