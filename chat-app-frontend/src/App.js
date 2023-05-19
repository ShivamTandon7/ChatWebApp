import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import ChatRoom from "./views/ChatRoom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/chat-room" element={<ChatRoom />} />
      </Routes>
    </div>
  );
}

export default App;
