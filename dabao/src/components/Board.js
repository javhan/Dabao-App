import React, {useState, useEffect} from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
const Board = () => {
    const [list, setList] = useState([])
    useEffect(() => {
    fetch("/match")
    .then((res)=> {
        if 
        (res.ok) {
            return res.json()
        }
    })
    .then((data)=> {
        if (data === undefined){
            return "Loading.."
        } else {
            return setList(data)
        }
    })
}, []);

console.log(list)

  const row = list.map((data) => {
       return (
        <tr>
           <td>{data.orderLocation?.street}</td>
           <td>{data.pickupLocation?.street}</td>
           <td>{data.timeAtPickUp}</td>
        </tr>
           );
   })

   console.log("Row", row)

  return (
    <Nav>
      <div className="box">
          <table>
              <thead>
              <tr>
                  <th>Food</th>
                  <th>Pick Up Location</th>
                  <th>Pick Up Time</th>
              </tr>
              </thead>
              <tbody>
                  {row}
            </tbody>
          </table>
      </div>
      <div>
        <Link to="/dashboard">To Dashboard</Link>
      </div>
    </Nav>
  );
};

export default Board;
