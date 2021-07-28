import React, {useRef, useState} from "react";
import axios from "axios";
import Option from "./Option"

const Shop = () => {
const postcode = useRef(null)
const [info, setInfo] = useState([])


const HandleQuery = () => {
    console.log(postcode.current.value)

    axios
    .get(`/shop/${postcode.current.value}`)
    .then(function (res) {
      // handle success
      setInfo(res.data);
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}

console.log(info)

  return (
    <fieldset>
      <legend>Dabao Location</legend>
      <legend>Postal Code</legend>
      <input type="text" name="DBpostcode" onChange={HandleQuery} ref={postcode}/>
    <legend>Select closest Hawker!</legend>
      <select name="">
          <Option data={info}/>
      </select>
      </fieldset>
  );
};

export default Shop;
