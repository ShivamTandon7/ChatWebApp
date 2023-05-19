import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SockJS from "sockjs-client";
import { Stomp } from "stomp-websocket/lib/stomp.min";
import "./index.css";
import { addMessage } from "../../actions/messagesActions";
import { useNavigate } from "react-router-dom";

let stompClient = null;

function ChatRoom() {
  const [inputMessage, setInputMessage] = useState("");
  const messages = useSelector((state) => state.messages);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendMessage = (e) => {
    e.preventDefault();
    let payload = {
      senderName: localStorage.getItem("name"),
      content: inputMessage,
    };
    stompClient.send("/app/message", {}, JSON.stringify(payload));
  };

  const handleLogout = () => {
    localStorage.removeItem("name");
    if (stompClient) {
      stompClient.disconnect();
      navigate("/");
    }
  };

  useEffect(() => {
    (function connectHandler() {
      let socket = new SockJS("http://localhost:9090/server");
      stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame) {
        console.log("Connected : " + frame);
        stompClient.subscribe("/topic/return-to", (response) => {
          dispatch(addMessage(JSON.parse(response.body)));
        });
      });
    })();
  }, [dispatch]);
  return (
    <div className="chat-room">
      <div>
        <h1>Welcome {localStorage.getItem("name")}</h1>
      </div>
      <div className="header">
        <div className="postMessage">
          <form onSubmit={(e) => sendMessage(e)}>
            <input
              type="text"
              id="messageInput"
              placeholder="Enter message"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            ></input>
            <button type="submit">Send</button>
            <button onClick={handleLogout}>Logout</button>
          </form>
        </div>
      </div>
      <div className="body">
        <table className="data-table">
          <thead></thead>
          <tbody>
            {messages.map((message, index) => {
              return (
                <tr key={index}>
                  <td>
                    <b>{message.senderName} :</b> {message.content}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ChatRoom;
