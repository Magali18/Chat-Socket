import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

const ChatClient = () => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [listMessages, setListMessages] = useState([
    {
      body: "Bienvenido al chat",
      user: "CPU",
    },
  ]);
  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("message", {
      body: message,
      user: "username",
    });
    const newMsg = {
      body: message,
      user: username,
    };
    setListMessages([...listMessages, newMsg]);
    setMessage("");
  };
  useEffect(()=>{
    const reciveMessage = msg=>{
        setListMessages(...listMessages, msg)
    }
    socket.on('message', reciveMessage)
    return ()=> socket.off('message',reciveMessage)
  },[listMessages])
  return (
    <div>
      <input
        onChange={(event) => setUsername(event.target.value)}
        placeholder="username"
        type="text"
      />
      <div>
        {listMessages.map((message, idx) => (
          <p key={message + idx}>
            {" "}
            {message.user}:{message.body}
          </p>
        ))}
        <form onSubmit={handleSubmit}>
          <span> Chat-io</span>
          <p> Type your menssage.</p>
          <div>
           

            <input
              value={message}
              placeholder={"Type your message"}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              name="text"
              id="chat-message"
            />
            <button type="sebmit"> Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ChatClient;
