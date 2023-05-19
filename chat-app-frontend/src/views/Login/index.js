import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Login = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleLogin = () => {
    localStorage.setItem("name", name);
    navigate("/chat-room");
  };

  return (
    <div className="login">
      <div className="login-form">
        <form onSubmit={handleLogin}>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          ></input>
          <button type="submit">Enter</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
