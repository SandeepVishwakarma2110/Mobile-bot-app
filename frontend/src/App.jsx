
import React from "react";
 

import IntroPage from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Chatpage from "./pages/Chatpage.jsx";
import Welcome from "./pages/Welcome.jsx";
import ActiveCall from "./components/ActiveCall";
import Dashboard from "./pages/Dashboard.jsx";
import ChatSelection from "./pages/ChatSelection.jsx";
import DoctorChatPage from "./pages/ChatpageDoc.jsx";
import { CallProvider } from "./context/CallContext";
import { BrowserRouter as Router, Routes, Route,   } from "react-router-dom";
export default function App() {
  return (
    <CallProvider>
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chatselection" element={<ChatSelection />} />
        <Route path="/chatpage" element={<Chatpage />} />
        <Route path="/chatpagedoc" element={<DoctorChatPage />} />
        <Route path="/call" element={<ActiveCall />} />
      </Routes>
    </Router>
    </CallProvider>
  );
}
