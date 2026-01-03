import { useState } from "react";
import { toggleMic, toggleSpeaker } from "../services/callService";

export default function CallControls({ onEndCall }) {
  const [micOn, setMicOn] = useState(true);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [videoOn, setVideoOn] = useState(false);

  return (
    <div className="flex items-center justify-center gap-6 pb-8">

      {/* 🎤 MIC */}
      <button
        onClick={() => {
          const newMic = !micOn;
          setMicOn(newMic);
          toggleMic(newMic);
        }}
        className={`w-12 h-12 rounded-full flex items-center justify-center
          ${micOn ? "bg-white/10" : "bg-red-500/80"}`}
        title={micOn ? "Mute Mic" : "Unmute Mic"}
      >
        {micOn ? "🎤" : "🔇"}
      </button>

      {/* 🔊 SPEAKER */}
      <button
        onClick={() => {
          const newSpeaker = !speakerOn;
          setSpeakerOn(newSpeaker);
          toggleSpeaker(newSpeaker);
        }}
        className={`w-12 h-12 rounded-full flex items-center justify-center
          ${speakerOn ? "bg-white/10" : "bg-red-500/80"}`}
        title={speakerOn ? "Speaker On" : "Speaker Off"}
      >
        {speakerOn ? "🔊" : "🔈"}
      </button>

      {/* 📹 VIDEO */}
      <button
        onClick={() => setVideoOn(!videoOn)}
        className={`w-12 h-12 rounded-full flex items-center justify-center
          ${videoOn ? "bg-cyan-500/80" : "bg-white/10"}`}
        title={videoOn ? "Turn Camera Off" : "Turn Camera On"}
      >
        {videoOn ? "📹" : "🚫"}
      </button>

      {/* 📞 END CALL */}
      <button
        onClick={onEndCall}
        className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-lg shadow-lg"
        title="End Call"
      >
        📞
      </button>

    </div>
  );
}
