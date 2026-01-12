import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F14] px-4 text-white">
      <div className="relative w-full max-w-lg text-center">
        {/* Background Glow */}
        <div className="absolute -inset-10 bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-indigo-500/30 blur-3xl -z-10" />

        {/* Card */}
        <div className="bg-[#121820] border border-white/10 rounded-3xl px-8 py-14 shadow-2xl">
          {/* App Icon */}
          <div className="flex justify-center mb-3">
            <img src={logo} alt="Voxa Logo" className="w-20 h-20" />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-blue-400 mb-2 ">
            Voxa
          </h1>

          {/* Tagline */}
          <p className="text-gray-400 mb-8">
            Connect. Communicate. Everywhere.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate("/login")}
            className="px-10 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold hover:opacity-90 transition"
          >
            Get Started Now
          </button>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              AI Voice Calls
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              Hybrid Mode
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              Instant Messaging
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
