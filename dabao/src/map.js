import axios from 'axios'
require("dotenv").config();


const getPostcode = (lat,long, setCurrentPos) => {

    // let postcode;
    const baseURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
    // const apiKey = "&key=" + process.env.GOOGLE_MAP_API_KEY;
    const apiKey = "INPUT YOUR OWN API KEY"
    const URL = `${baseURL}${lat},${long}${apiKey}`;
    
    console.log("URL",URL)
    axios.get(URL)
    .then(function (response) {
      console.log("MAP DATA",response.data);
      let postcode;
      for(let result of response.data.results) {
        // console.log("result",result)
        const length = result.address_components.length
        postcode = result.address_components[length-1].long_name
        // console.log(postcode)
        // postcode = "abc"
        // console.log(parseInt(postcode))
        // console.log(typeof(parseInt(postcode)))
        if(!isNaN(parseInt(postcode)))
            break;
      }

      if(isNaN(postcode))
        postcode = "999999"
      setCurrentPos({lat,long,postcode})
    })
    .catch(function (error) {
      console.log(error);
    })

}

const setPos = (setCurrentPos) => {

    const successCallback = (position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      getPostcode(lat,long,setCurrentPos);      
    }

    const errorCallback = (error) => {
      console.error(error)
    }
    
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
  }

export default setPos;
