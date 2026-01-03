import { useEffect, useState } from "react";
import CallWaveRing from "./CallWaveRing";
import CallControls from "./CallControls";
import { useNavigate } from "react-router-dom";
import { useCall } from "../context/CallContext"; // ✅ add this
import { endWebCall } from "../services/callService";
 
export default function ActiveCall() {
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();
  const { setInCall } = useCall(); // ✅ global call state


 


  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);


    

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(
      s % 60
    ).padStart(2, "0")}`;

  // ✅ END CALL HANDLER
 const handleEndCall = async () => {
    await endWebCall();       // 📞 End Twilio WebRTC call
    setInCall(false);         // ❌ call ended
    navigate("/chatpage");   // 🔙 back to chat
  };

  return (
    <div className="h-screen w-full bg-gradient-to-b from-[#05080D] via-[#081B24] to-[#020406] text-white flex flex-col">

      <button
        onClick={() => navigate("/chatpage")}
        className="absolute top-6 left-6 text-white/70 hover:text-white text-2xl"
      >
        ←
      </button>

      {/* Header */}
      <div className="flex items-center justify-center py-6 text-sm text-gray-300">
        Active Call
      </div>

      {/* Center */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <CallWaveRing />

        <h2 className="mt-12 text-xl font-semibold ">Sarah Jenkins</h2>
        <p className="text-cyan-400 text-sm mt-1">AI Assistant Active</p>

        <p className="mt-3 text-gray-400 text-sm">{formatTime(seconds)}</p>

        <div className="mt-4 px-4 py-2 bg-black/30 rounded-full text-xs text-gray-300">
          Voice call in progress...
        </div>
      </div>

      {/* ✅ Controls with End Call */}
      <CallControls onEndCall={handleEndCall} />

      {/* Bottom Chat Bar */}
      <div className="px-6 pb-6">
        <button
          onClick={() => navigate("/chatpage")}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-500 flex items-center justify-center gap-2 text-sm font-medium"
        >
          💬 Open Chat
        </button>
      </div>
    </div>
  );
}
