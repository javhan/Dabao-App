// import React, { useContext } from "react";
// import { LoggedContext } from "./App.js";



const setPos = (setCurrentPos) => {

    const successCallback = (position) => {
      // console.log(position);
    //   const loggedContext = useContext(LoggedContext);
      console.log(position.coords.latitude)
      console.log(position.coords.longitude)
      setCurrentPos({lat:position.coords.latitude, long:position.coords.longitude})
    }

    const errorCallback = (error) => {
      console.error(error)
    }
    
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
  }

export default setPos;