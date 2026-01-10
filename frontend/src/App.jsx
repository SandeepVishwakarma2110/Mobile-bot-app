
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
import ComingSoon from "./pages/comingsoon.jsx";
import { CallProvider } from "./context/CallContext";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
function DeviceBasedRoute() {
  const [isMobile, setIsMobile] = useState(null);
  useEffect(() => {
    // Basic device detection: mobile/tablet or desktop
    const checkMobile = () => {
      const ua = navigator.userAgent;
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) || window.innerWidth < 900;
      setIsMobile(isMobileDevice);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile === null) return null; // or a loading spinner
  return isMobile ? <Welcome /> : <IntroPage />;
}



export default function App() {
  return (
    <CallProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><DeviceBasedRoute /></ProtectedRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/chatselection" element={<ProtectedRoute><ChatSelection /></ProtectedRoute>} />
          <Route path="/chatpage" element={<ProtectedRoute><Chatpage /></ProtectedRoute>} />
          <Route path="/chatpagedoc" element={<ProtectedRoute><DoctorChatPage /></ProtectedRoute>} />
          <Route path="/call" element={<ProtectedRoute><ActiveCall /></ProtectedRoute>} />
          <Route path="/comingsoon" element={<ComingSoon />} />
          <></>
        </Routes>
      </Router>
    </CallProvider>
  );
}
