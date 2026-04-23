"use client";

import { useEffect,  useState } from "react";
import { Link } from "react-router-dom";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
}

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    opacity: Math.random() * 0.6 + 0.2,
    duration: Math.random() * 8 + 5,
    delay: Math.random() * 6,
    drift: (Math.random() - 0.5) * 30,
  }));
}

export default function SplashPage() {
  const [stars] = useState<Star[]>(() => generateStars(140));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#080b12] flex items-center justify-center">

      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] rounded-full bg-[#0d1f3c] opacity-60 blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[50%] h-[50%] rounded-full bg-[#0a1628] opacity-50 blur-[100px]" />
        <div className="absolute top-[40%] left-[50%] w-[30%] h-[30%] rounded-full bg-[#0f2244] opacity-30 blur-[80px] -translate-x-1/2" />
      </div>

      {/* Stars */}
      <div className="pointer-events-none absolute inset-0">
        {stars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `floatStar ${star.duration}s ease-in-out ${star.delay}s infinite alternate, twinkle ${star.duration * 0.6}s ease-in-out ${star.delay}s infinite alternate`,
              "--drift": `${star.drift}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main content */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-6"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(18px)",
          transition: "opacity 1.1s ease, transform 1.1s ease",
        }}
      >
        {/* Eyebrow label */}
        <p
          className="mb-5 tracking-[0.35em] text-[11px] font-medium uppercase text-slate-500"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 1.4s ease 0.2s",
          }}
        >
          est. 2026
        </p>

        {/* Blog name */}
        <h1
          className="text-white font-bold leading-none select-none"
          style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: "clamp(3.5rem, 10vw, 8rem)",
            letterSpacing: "-0.03em",
            textShadow:
              "0 0 60px rgba(100,160,255,0.15), 0 2px 30px rgba(0,0,0,0.8)",
            opacity: mounted ? 1 : 0,
            transition: "opacity 1.2s ease 0.35s",
          }}
        >
          <span style={{ color: "#c8d8f0" }}>the</span>
          <span
            style={{
              color: "#ffffff",
              fontStyle: "italic",
            }}
          >
            Blog
          </span>
        </h1>

        {/* Decorative line */}
        <div
          className="mt-7 mb-7 flex items-center gap-4"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 1.2s ease 0.55s",
          }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-slate-600" />
          <div className="w-1 h-1 rounded-full bg-slate-500" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-slate-600" />
        </div>

        {/* Description */}
        <p
          className="max-w-md text-slate-400 leading-relaxed"
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            opacity: mounted ? 1 : 0,
            transition: "opacity 1.2s ease 0.7s",
          }}
        >
          Thoughts on technology, design, and the things that make us think
          twice. Written slowly, read whenever.
        </p>

        {/* Enter button */}
        <Link to="/home">
            <button
            className="group mt-12 relative px-10 py-3.5 text-sm tracking-widest uppercase font-medium text-slate-300 border-2 border-slate-700 rounded-full overflow-hidden transition-all duration-300 hover:text-white hover:border-slate-400"
            style={{
                fontFamily: "'Georgia', serif",
                letterSpacing: "0.2em",
                opacity: mounted ? 1 : 0,
                transition:
                "opacity 1.2s ease 0.9s, color 0.3s ease, border-color 0.3s ease",
                background: "transparent",
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 30px rgba(100,160,255,0.12), inset 0 0 30px rgba(100,160,255,0.05)";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
            >
            {/* hover shimmer */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            Enter
            </button>
        </Link>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#080b12] to-transparent" />

      {/* Keyframe styles */}
      <style>{`
        @keyframes floatStar {
          from { transform: translateY(0px) translateX(0px); }
          to   { transform: translateY(-18px) translateX(var(--drift)); }
        }
        @keyframes twinkle {
          0%   { opacity: var(--base-op, 0.3); }
          50%  { opacity: 0.9; }
          100% { opacity: var(--base-op, 0.3); }
        }
      `}</style>
    </div>
  );
}