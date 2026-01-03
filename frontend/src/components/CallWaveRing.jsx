export default function CallWaveRing() {
  return (
    <div className="relative flex items-center justify-center">

      {/* Outer Pulsing Ring */}
      <div className="absolute w-56 h-56 rounded-full border-2 border-cyan-500/40 animate-pulse" />

      {/* Dashed Ring */}
      <div className="absolute w-48 h-48 rounded-full border-2 border-dashed border-cyan-400 animate-spin-slow" />

      {/* Avatar */}
      <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center text-5xl">
        👩‍🦱
      </div>

      {/* Voice Bars */}
      <div className="absolute -bottom-3 bg-[#0B1F2A] px-4 py-2 rounded-full flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className="w-1 bg-cyan-400 animate-pulse"
            style={{ height: `${8 + i * 4}px` }}
          />
        ))}
      </div>
    </div>
  );
}
