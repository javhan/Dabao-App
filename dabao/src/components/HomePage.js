import * as React from "react"
import NavIn from "./NavIn"

const HomePage = () => {
    return (
    <NavIn>
    <div className="flex">
    <a href="/question" className="flex-child">
    <div>
    <h1 className="DabaoLeft">Going Out To Dabao?</h1>
    <img className="icon" alt="" src="https://i.imgur.com/jOQsDlZ.png"/>
    </div>
    </a>
    <a href="/board" className="flex-child">
    <div >
    <img className="icon" alt="" src="https://i.imgur.com/omGzAkg.png"/>
    <h1 className="DabaoRight">Too Busy To Head Out?</h1>
    </div>
    </a>
    </div>
    </NavIn>
    )
}

export default HomePage