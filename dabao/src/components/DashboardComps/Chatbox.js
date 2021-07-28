import React, { useState, useContext } from "react";
import { LoggedContext } from "../../App.js";
import "../Dashboard.css";

const Chatbox = (props) => {
  console.log(props)
  const [comment, setComment] = useState("")
  const loggedContext = useContext(LoggedContext);
  
  const handleClick = () => {
      props.sendMessage(comment, props.convoOpp?._id)
  }

  return (
    <div>
      <h1>Chatbox</h1>
      <div className="container">
        <div className="chat-header">
          <h5>You're now chatting with {props.convoOpp}</h5>
        </div>
        <div className="chat-body">
          {props.chatbox?.map((messages, index) => {
              <p>{messages?.message}</p>
          })}
        </div>
        <div className="chat-field">
          <br></br>
          <textarea name="text" cols="50" onChange={(e) => setComment(e.target.value)}/>
          <button onClick = {handleClick}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
