import { useState, useRef , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useCall } from "../context/CallContext";
import { startWebCall } from "../services/callService";
const synth = window.speechSynthesis;
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export default function Chatpage() {
  const [mode, setMode] = useState("text"); // "text" or "voice"
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]); // { from: 'user' | 'ai', text: string }
  const [listening, setListening] = useState(false);
 const [typing, setTyping] = useState(false);
  const recognitionRef = useRef(null);
const bottomRef = useRef(null);
const navigate = useNavigate();
const { setInCall } = useCall();
const [aiServerUrl, setAiServerUrl] = useState("")

useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUrl = localStorage.getItem("Rag_server_url");
      if (storedUrl) {
        setAiServerUrl(storedUrl);
        //console.log("✅ Rag_server_url retrieved:", storedUrl);
      }
    }
  }, []);

 useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, listening, typing]);
  // Send message to backend
  const sendMessage = async (msg) => {
	const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  setChat((prev) => [...prev, { from: "user", text: msg, time }]);
  setInput("");
  setTyping(true);
  const botname = "Test";

  try {
    const res = await fetch(`${aiServerUrl}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: msg, userName: botname }),
    });
    console.log("🌐 Server response status:", res.status);

    const data = await res.json();
    console.log("📥 Response JSON:", data);

    const aiTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setChat((prev) => [...prev, { from: "ai", text: data.answer, time: aiTime }]);

    if (mode === "voice") {
      speak(data.answer);
    }
  } catch (error) {
    setChat((prev) => [
      ...prev,
      { from: "ai", text: "Error contacting server." },
    ]);
  } finally {
    setTyping(false);
  }
};

  // Text-to-speech
  const speak = (text) => {
    if (synth) {
      const utter = new window.SpeechSynthesisUtterance(text);
      synth.speak(utter);
    }
  };

  // Voice input
  const startListening = () => {
    if (!SpeechRecognition) return;

    if (recognitionRef.current) recognitionRef.current.abort();

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      sendMessage(transcript);
      setListening(false);
    };

    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] text-white flex flex-col">
      {/* Top Call Bar */}
      

      {/* Header */}
    <div className="px-4 py-3 border-b border-white/10">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

    {/* LEFT: USER INFO */}
    <div className="flex items-center gap-3">
      <button
            onClick={() => navigate("/chatselection")}
            className="text-2xl text-white/70 hover:text-white"
          >
            ←
          </button>
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-800 flex items-center justify-center">
        🤖
      </div>
      <div>

        <p className="font-medium leading-tight text-orange-300">Ramayana AI Assistant</p>
      </div>
    </div>

    {/* RIGHT: CONTROLS */}
    <div className="flex items-center justify-between md:justify-end gap-3">

      {/* WEB CALL BUTTON */}
      {/* <button
        onClick={async () => {
         try {
  await startWebCall();
  setInCall(true);
  navigate("/call");
} catch (err) {
  alert("Failed to start call");
  console.error(err);
}

        }}
        className="px-3 py-1.5 bg-green-300 rounded-full text-xs md:text-sm text-black font-medium hover:opacity-90 transition whitespace-nowrap"
      >
        📞 Web Call
      </button> */}

      {/* MODE TOGGLE */}
      <div className="flex items-center bg-white/10 rounded-full p-1">
        <button
          onClick={() => setMode("text")}
          className={`px-3 py-1 text-xs md:text-sm rounded-full transition ${
            mode === "text"
              ? "bg-orange-400 text-black"
              : "text-white/70 hover:text-white"
          }`}
        >
          Text
        </button>

        <button
          onClick={() => setMode("voice")}
          className={`px-3 py-1 text-xs md:text-sm rounded-full transition ${
            mode === "voice"
              ? "bg-orange-400 text-black"
              : "text-white/70 hover:text-white"
          }`}
        >
          Voice
        </button>
      </div>

    </div>
  </div>
</div>



      {/* Chat Area */}
      <div className="flex-1 px-6 py-4 overflow-y-auto space-y-4">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm ${
                msg.from === "user"
                  ? "bg-[#2A2F35]"
                  : "bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30"
              }`}
            >
              <p>{msg.text}</p>
              <p className="text-[10px] text-gray-400 text-right mt-1">
                {msg.time}
              </p>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {typing && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-2xl bg-[#121820] border border-white/10 flex gap-1">
              <span className="w-2 h-2 bg-orange-300 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-orange-300 rounded-full animate-bounce delay-100" />
              <span className="w-2 h-2 bg-orange-300 rounded-full animate-bounce delay-200" />
            </div>
          </div>
        )}

        {/* Auto Scroll Anchor */}
        <div ref={bottomRef} />
      </div>

      {/* Text Mode Input */}
      {mode === "text" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) sendMessage(input.trim());
          }}
          className="px-6 py-4 border-t border-white/10 flex gap-3"
        >
          <input
            className="flex-1 bg-[#121820] border border-white/10 rounded-full px-5 py-3 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Text them via voice note..."
          />
          <button
            type="submit"
            className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-orange-700 text-black font-bold"
          >
            ➤
          </button>
        </form>
      )}

       {/* ================= VOICE MODE   ================= */}
      {mode === "voice" && (
        <div className="px-6 py-6 border-t border-white/10 flex flex-col items-center">

          <div className="relative flex items-center justify-center">
            {listening && (
              <span className="absolute w-24 h-24 rounded-full bg-orange-400/30 animate-ping" />
            )}
            {listening && (
              <span className="absolute w-20 h-20 rounded-full bg-orange-400/20 animate-pulse" />
            )}

            <button
              onClick={startListening}
              disabled={listening}
              className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center
                transition-all duration-300
                ${
                  listening
                    ? "bg-red-500 shadow-lg shadow-red-500/40 scale-110"
                    : "bg-gradient-to-r from-orange-400 to-orange-700 hover:scale-105 shadow-lg shadow-orange-500/40"
                }`}
            >
              🎤
            </button>
          </div>

          <p className="text-sm text-gray-400 mt-4">
            Speak your doubts clearly
          </p>
        </div>
      )}
    </div>
  );
}
