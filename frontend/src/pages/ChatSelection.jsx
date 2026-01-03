import { useNavigate } from "react-router-dom";

export default function ChatSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white px-6 py-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-2xl text-white/70 hover:text-white"
          >
            ←
          </button>
          <h1 className="text-lg font-semibold text-cyan-400">
            Select Assistant
          </h1>
        </div>

         
      </div>

      

      {/* CHAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* RAMAYANA ASSISTANT */}
        <div
          onClick={() => navigate("/chatpage")}
          className="group cursor-pointer rounded-2xl border border-orange-400/30 bg-gradient-to-br from-orange-500/10 to-yellow-500/5 p-6 hover:scale-[1.02] transition"
        >
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-orange-400 text-black flex items-center justify-center text-2xl">
              📜
            </div>
            <div>
              <h2 className="text-lg font-semibold">
                Ramayana Assistant
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Ask about Ramayana stories, characters & lessons
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-xs text-orange-300">
              Spiritual • Knowledge
            </span>
            <span className="text-xs bg-orange-500/20 px-3 py-1 rounded-full text-orange-300">
              Start Chat →
            </span>
          </div>
        </div>

        {/* DOCTOR ASSISTANT */}
        <div
          onClick={() => navigate("/chatpagedoc")}
          className="group cursor-pointer rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 p-6 hover:scale-[1.02] transition"
        >
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-cyan-400 text-black flex items-center justify-center text-2xl">
              🩺
            </div>
            <div>
              <h2 className="text-lg font-semibold">
                Doctor Assistant
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Health advice, symptoms & precautions
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-xs text-cyan-300">
              Medical • AI Support
            </span>
            <span className="text-xs bg-cyan-500/20 px-3 py-1 rounded-full text-cyan-300">
              Start Chat →
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
