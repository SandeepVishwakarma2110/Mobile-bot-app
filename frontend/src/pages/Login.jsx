import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        setMessage("");
        setUsername("");
        setPassword("");
        navigate("/welcome");
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      setMessage("Error connecting to server");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F14] px-4 text-white">
      <div className="relative w-full max-w-md">
        {/* Glow Effect */}
        <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/30 to-indigo-500/30 blur-3xl -z-10" />

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#121820] border border-white/10 rounded-3xl p-8 shadow-xl"
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-black font-bold">
              💬
            </div>
            <span className="text-lg font-semibold">CommuniLink</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-center mb-2">
            Sign in to your account
          </h2>
          <p className="text-center text-sm text-gray-400 mb-8">
            Welcome back! Please enter your credentials
          </p>

          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full mb-4 px-4 py-3 rounded-xl bg-[#0B0F14] border border-white/10 focus:border-cyan-400 focus:outline-none text-white placeholder-gray-500"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mb-6 px-4 py-3 rounded-xl bg-[#0B0F14] border border-white/10 focus:border-cyan-400 focus:outline-none text-white placeholder-gray-500"
          />


          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-400 to-green-400 text-black font-medium hover:opacity-90 transition"
          >
            Login
          </button>

          {/* Message */}
          {message && (
            <div className="mt-4 text-center text-sm text-red-400">
              {message}
            </div>
          )}

          {/* Footer text */}
          <p className="text-xs text-center text-gray-500 mt-6">
            Secured AI-powered communication platform
          </p>
        </form>
      </div>
    </div>
  );
}
