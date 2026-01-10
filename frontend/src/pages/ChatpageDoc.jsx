
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MicrophoneIcon } from "@heroicons/react/24/solid";

const synth = window.speechSynthesis;
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export default function DoctorChatPage() {
  const [mode, setMode] = useState("text");
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [listening, setListening] = useState(false);
  const [typing, setTyping] = useState(false);
  const [threadId, setThreadId] = useState(null);
  const [DocAssServerUrl, setDocAssServerUrl] = useState("");
  const recognitionRef = useRef(null);
  const bottomRef = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    if (typeof window !== "undefined") {
      const DocAssStoredUrl = localStorage.getItem("DocAss_server_url");
      if (DocAssStoredUrl) {
        setDocAssServerUrl(DocAssStoredUrl);
        //console.log("✅ DocAss_server_url retrieved:", DocAssStoredUrl);
      }
    }
  }, []);
  /* ================= THREAD ID INIT ================= */
  useEffect(() => {
    const savedId = localStorage.getItem("chat_thread_id");
    if (savedId) {
      setThreadId(savedId);
    } else {
      const newId = "user-" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("chat_thread_id", newId);
      setThreadId(newId);
    }
  }, []);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, listening, typing]);

  /* ================= TEXT TO SPEECH ================= */
  const speak = (text) => {
    if (!synth) return;

    synth.cancel(); // stop any previous speech
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 1;
    utter.pitch = 1;
    synth.speak(utter);
  };

  /* ================= SEND MESSAGE ================= */
  const sendMessage = async (msg) => {
    if (!msg.trim()) return;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setChat((prev) => [...prev, { from: "user", text: msg, time }]);
    setInput("");
    setTyping(true);

    try {
      const response = await fetch(
        `${DocAssServerUrl}/chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: msg,
            threadId: threadId,
          }),
        }
      );

      const data = await response.json();

      const aiTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setChat((prev) => [
        ...prev,
        { from: "ai", text: data.response, time: aiTime },
      ]);

      // 🔊 Speak response ONLY in voice mode
      if (mode === "voice") {
        speak(data.response);
      }

      // 🔁 Session ended → reset thread
      if (
        data.sessionStatus === "completed" ||
        data.sessionStatus === "expired"
      ) {
        localStorage.removeItem("chat_thread_id");
        const newId =
          "user-" + Math.random().toString(36).substr(2, 9);
        localStorage.setItem("chat_thread_id", newId);
        setThreadId(newId);
      }
    } catch (error) {
      setChat((prev) => [
        ...prev,
        {
          from: "ai",
          text: "Error: Could not connect to server.",
          time,
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  /* ================= VOICE INPUT ================= */
  const startListening = () => {
    if (!SpeechRecognition) return;

    if (recognitionRef.current) recognitionRef.current.abort();

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = (e) => {
      sendMessage(e.results[0][0].transcript);
      setListening(false);
    };

    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };

  return (
    // <div className="min-h-screen bg-[#0B0F14] text-white flex flex-col">
    <div className="h-screen overflow-hidden bg-[#0B0F14] text-white flex flex-col">
      {/* ================= HEADER ================= */}
      {/* <div className="px-4 py-3 border-b border-white/10"> */}
      <div className="px-4 py-3 border-b border-white/10 sticky top-0 z-20 bg-[#0B0F14]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/chatselection")}
              className="text-2xl text-white/70 hover:text-white"
            >
              ←
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center">
              🩺
            </div>
            <p className="font-medium text-emerald-400">
              Doctor AI Assistant
            </p>
          </div>

          <div className="flex bg-white/10 rounded-full p-1">
            <button
              onClick={() => setMode("text")}
              className={`px-3 py-1 text-xs rounded-full ${
                mode === "text"
                  ? "bg-emerald-400 text-black"
                  : "text-white/70"
              }`}
            >
              Text
            </button>
            <button
              onClick={() => setMode("voice")}
              className={`px-3 py-1 text-xs rounded-full ${
                mode === "voice"
                  ? "bg-emerald-400 text-black"
                  : "text-white/70"
              }`}
            >
              Voice
            </button>
          </div>
        </div>
      </div>

      {/* ================= CHAT ================= */}
      <div className="flex-1 px-6 py-4 overflow-y-auto space-y-4">
        {/* Bot Info Message */}
        <div className="mb-4">
          <div className="bg-[#1a202c] border-l-4 border-emerald-400 p-4 rounded shadow text-white/90">
            <div className="font-semibold text-emerald-400 mb-1">Welcome to Doctor Smith's AI Assistant!</div>
            <div className="text-sm">
              Welcome to the Doctor Smith's AI Assistant! Here I am to help book appointments with Dr. Smith, Type or speak your query below to get started!
            </div>
          </div>
        </div>
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
                  : "bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30"
              }`}
            >
              <p>{msg.text}</p>
              <p className="text-[10px] text-gray-400 text-right mt-1">
                {msg.time}
              </p>
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-2xl bg-[#121820] border border-white/10 flex gap-1">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-100" />
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-200" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ================= INPUT ================= */}
      {mode === "text" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="px-6 py-4 border-t border-white/10 flex gap-3"
        >
          <input
            className="flex-1 bg-[#121820] border border-white/10 rounded-full px-5 py-3"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your symptoms..."
          />
          <button className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 text-black font-bold">
            ➤
          </button>
        </form>
      )}

      {mode === "voice" && (
        <div className="px-6 py-6 border-t border-white/10 flex flex-col items-center">
          {/* <button
              onClick={startListening}
              disabled={listening}
              className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center
                transition-all duration-300 w-16 h-16 rounded-full
                ${
                  listening
                    ? "bg-red-500 shadow-lg shadow-red-500/40 scale-110"
                    : "bg-gradient-to-r from-orange-400 to-orange-700 hover:scale-105 shadow-lg shadow-orange-500/40"
                }`}
            >
               <MicrophoneIcon className="w-6 h-6" />
            </button> */}
          <button
            onClick={startListening}
            className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center
                transition-all duration-300 ${
              listening
                ? "bg-red-500 animate-pulse"
                : "bg-gradient-to-r from-emerald-400 to-green-500"
            }`}
          >
             <MicrophoneIcon className="w-6 h-6" />
          </button>
          <p className="text-sm text-gray-400 mt-3">
            Speak your health concern
          </p>
        </div>
      )}
    </div>
  );
}
