import axios from 'axios'
require("dotenv").config();


const getPostcode = (lat,long, setCurrentPos) => {

    // let postcode;
    const baseURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
    // const apiKey = "&key=" + process.env.GOOGLE_MAP_API_KEY;
    const apiKey = "&key=AIzaSyDzMoyE6vJ1ZE8TcpQeIbUSew8ShVSqmm0"
    const URL = `${baseURL}${lat},${long}${apiKey}`;

    console.log("URL",URL)
    axios.get(URL)
    .then(function (response) {
      console.log("MAP DATA",response.data);
      const length = response.data.results[0].address_components.length
      const postcode = response.data.results[0].address_components[length-1].long_name

    //   console.log("Poscode6",response.data.results[0].address_components[6]?.long_name)
    //   console.log("Poscode5",response.data.results[0].address_components[5]?.long_name)
    //   const postcode6 = response.data.results[0].address_components[6]?.long_name;
    //   const postcode5 = response.data.results[0].address_components[5]?.long_name;
    //   const postcode = postcode6 === undefined ? postcode5:postcode6
      setCurrentPos({lat,long,postcode})
    })
    .catch(function (error) {
      console.log(error);
    })

}

const setPos = (setCurrentPos) => {

    const successCallback = (position) => {
    //   console.log(position.coords.latitude)
    //   console.log(position.coords.longitude)
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