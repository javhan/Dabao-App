import React, { useState } from "react";
import "../Dashboard.css";
import moment from "moment";

const Chatbox = (props) => {
  const [comment, setComment] = useState("");

  const handleClick = () => {
    props.sendMessage(comment, props.convoOpp?._id);
  };

  const style = (index) => {
    if (index % 2 !== 0) {
      return { "backgroundColor" : "white"}
    } else {
      return { "backgroundColor" : "#FFFACD" }
    }
  }

  const messageBox = props.chatbox?.map((messages, index) => {
    return (
      <div className="messageCard" key={index} style={style(index)}>
        <div>
          <span>{messages.user}</span>
          <span id="timestamp">{moment(messages.timePosted).format("LLL")}</span>
        </div>
        <div>
          <span>{messages.message}</span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="container">
        <div className="chat-header">
          <h5>You're now chatting with {props.convoOpp}</h5>
        </div>
        <div className="chat-body">{messageBox}</div>
        <div className="chat-field">
          <br></br>
          <textarea
            name="text"
            cols="50"
            style={{ resize: "none" }}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="send" onClick={handleClick}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
