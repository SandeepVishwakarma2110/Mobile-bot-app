import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Phone } from "lucide-react";
import { useEffect } from "react";
import logo from "../assets/logo.png";
export default function Dashboard() {

  const navigate = useNavigate();


  useEffect(() => {
    fetch("/config")
      .then((res) => res.json())
      .then((data) => {
        if (data.Rag_server_url) {
          localStorage.setItem("Rag_server_url", data.Rag_server_url);
          //console.log("✅ Rag server URL stored:", data.Rag_server_url);
        }
        if (data.DocAss_server_url) {
          localStorage.setItem("DocAss_server_url", data.DocAss_server_url);
          //console.log("✅ DocAss server URL stored:", data.DocAss_server_url);
        }
      })
      .catch((err) => console.error("Error fetching config:", err));
  }, []);

  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Rag_server_url");
    localStorage.removeItem("DocAss_server_url");
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white px-6 py-5 "
    style={{
        height: "100vh",
        overflow: "auto",
        overscrollBehavior: "contain",
      }}>

      {/* HEADER */}
      <div className="flex items-center justify-between gap-1 mb-8">
        <div className="flex items-center gap-1">
          <button
            onClick={() => navigate("/")}
            className="text-2xl text-white/70 hover:text-white"
          >
            ←
          </button>
          <h1 className="text-xl font-semibold text-cyan-400 flex flex-row items-center gap-2">
            <img src={logo} alt="Voxa Logo" className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center" />
            Voxa</h1>
        </div>
        <button
          onClick={() => handlelogout()}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold transition"
        >
          Logout
        </button>
      </div>


      {/* FEATURE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10 align-items: center">
        <div onClick={() => navigate("/chatselection")} className="rounded-2xl bg-[#121821] border border-cyan-500 h-44 flex flex-col items-center justify-center hover:border-cyan-500/30 transition">
          <MessageCircle className="text-cyan-500 " />
          <p

            className="text-sm text-gray-300">Chats</p>
        </div>

        <div onClick={() => navigate("/comingsoon")} className="rounded-2xl bg-[#121821] border border-cyan-500 h-44 flex flex-col items-center justify-center hover:border-cyan-500/30 transition">
          <Phone className="text-cyan-500" />
          <p

            className="text-sm text-gray-300">SIP Calls</p>
        </div>

        <div onClick={() => navigate("/comingsoon")} className="rounded-2xl bg-[#121821] border border-cyan-500 h-44 flex flex-col items-center justify-center hover:border-cyan-500/30 transition">
          <div className="flex flex-row">
            <Phone className="text-cyan-800" />
            <Phone className="text-cyan-500" />
          </div>
          <p className="text-sm text-gray-300">PSTN Calls</p>
        </div>

        <div onClick={() => navigate("/comingsoon")} className="rounded-2xl bg-[#121821] border border-cyan-500 h-44 flex flex-col items-center justify-center hover:border-cyan-500/30 transition">
          <div className="text-3xl mb-3">⚙️</div>
          <p className="text-sm text-gray-300">Settings</p>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      {/* <div>
        <p className="text-sm text-gray-400 mb-4">Recent Activity</p>

        <div className="space-y-3">

        
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#121821] border border-white/5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-cyan-500 flex items-center justify-center">
                🤖
              </div>
              <div>
                <p className="text-sm font-medium">AI Assistant</p>
                <p className="text-xs text-gray-400">
                  💬 How can I help you today
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500">2m ago</p>
          </div>

         
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#121821] border border-white/5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center">
                👩
              </div>
              <div>
                <p className="text-sm font-medium">Sarah Jenkir</p>
                <p className="text-xs text-gray-400">
                  📞 Voice call - 08:11
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500">1h ago</p>
          </div>

        
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#121821] border border-white/5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center">
                👨
              </div>
              <div>
                <p className="text-sm font-medium">Michael Chei</p>
                <p className="text-xs text-gray-400">
                  💬 Received via the email
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500">3h ago</p>
          </div>

         
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#121821] border border-white/5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-red-500 flex items-center justify-center">
                🎙
              </div>
              <div>
                <p className="text-sm font-medium">AI Voice Assistant</p>
                <p className="text-xs text-gray-400">
                  📞 Missed call
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500">5h ago</p>
          </div>

        </div>
      </div> */}
    </div>
  );
}
