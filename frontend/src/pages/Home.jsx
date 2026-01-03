import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function IntroPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0B0F14] text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-16 py-5">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
            💬
          </div>
          <span className="font-semibold text-lg">CommuniLink</span>
        </div>

        <div className="hidden md:flex gap-8 text-sm text-gray-300">
          <a href="#" className="hover:text-cyan-400">About</a>
          <a href="#" className="hover:text-cyan-400">Features</a>
          <a href="#" className="hover:text-cyan-400">Support</a>
        </div>

         
      </nav>

      {/* Hero Section */}
      <section className="px-6 md:px-16 py-20 grid md:grid-cols-2 gap-14 items-center">
        {/* Left Content */}
        <div>
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm mb-6">
            ⚡ Powered by AI
          </span>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Your World Connected.
            <br />
            <span className="text-cyan-400">Instantly.</span>
          </h1>

          <p className="mt-6 text-gray-400 max-w-xl">
            Experience the future of communication with AI-powered voice calls,
            real-time chat, and seamless hybrid interactions. Connect with
            anyone, anywhere.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <button onClick={() => navigate("/login")} className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-green-400 text-black font-medium hover:opacity-90 transition">
              Get Started Now
            </button>
            <button onClick={() => navigate("/login")} className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 font-medium hover:opacity-90 transition">
              Request Demo
            </button>
          </div>
        </div>

        {/* Right Mock UI */}
        <div className="relative">
          <div className="rounded-2xl bg-[#121820] border border-white/10 p-6 shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
              <div className="flex-1 h-2 rounded-full bg-white/20" />
            </div>

            <div className="space-y-4">
              <div className="w-3 h-3 rounded-full bg-cyan-400" />
              <div className="w-3 h-3 rounded-full bg-indigo-400" />
            </div>
          </div>

          {/* Glow */}
          <div className="absolute -inset-6 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 blur-3xl -z-10" />
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-16 py-20">
        <h2 className="text-center text-3xl font-semibold mb-3">Key Features</h2>
        <p className="text-center text-gray-400 mb-12">
          Everything you need for modern, AI-powered communication
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl bg-[#121820] border border-white/10 p-6 hover:border-cyan-400/40 transition"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${f.gradient} flex items-center justify-center text-xl mb-4`}
              >
                {f.icon}
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 py-20">
        <div className="rounded-3xl bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 p-12 text-center border border-white/10">
          <h2 className="text-3xl font-semibold mb-4">
            Ready to transform your communication?
          </h2>
          <p className="text-gray-300 mb-8">
            Join millions of users worldwide who are already experiencing the
            future of AI-powered communication.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-green-400 text-black font-medium">
              <Link to="/login" className="text-black font-medium">
                Get Started Now
              </Link>
            </button>

            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 font-medium">
              
              <Link to="/login" className="text-black font-medium">
                Request Demo
              </Link>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-6 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <span>© 2025 CommuniLink. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: "💬",
    title: "Rich Chat & Instant Voice Messages",
    desc: "Seamless text and voice messaging with AI-powered responses",
    gradient: "from-cyan-400 to-teal-400",
  },
  {
    icon: "🎙️",
    title: "Talk & Type: Seamless Hybrid Mode",
    desc: "AI speaks while you type – the future of communication",
    gradient: "from-blue-400 to-indigo-400",
  },
  {
    icon: "🛡️",
    title: "Secure Enterprise SIP Calling",
    desc: "Bank-grade encryption for all your business communications",
    gradient: "from-indigo-400 to-purple-400",
  },
  {
    icon: "🌍",
    title: "Global PSTN Connectivity",
    desc: "Connect with anyone, anywhere in the world instantly",
    gradient: "from-cyan-400 to-blue-400",
  },
];
