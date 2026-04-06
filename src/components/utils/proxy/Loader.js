import { useEffect, useState } from "react";

// ─── Loader Component ─────────────────────────────────────────────────────────
//
// Usage:
//   import Loader from "./components/Loader";
//
//   // Full screen (default)
//   <Loader />
//
//   // With custom message
//   <Loader message="Placing your order..." />
//
//   // Inline / overlay over a section
//   <Loader fullScreen={false} />
//
//   // Controlled show/hide
//   {loading && <Loader message="Loading products..." />}

export default function Loader({ message = "Loading…", fullScreen = true }) {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setDots(d => (d + 1) % 4), 400);
    return () => clearInterval(t);
  }, []);

  const dotStr = ".".repeat(dots).padEnd(3, "\u00a0");

  const content = (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "0",
    }}>

      {/* ── Animated water drop SVG ── */}
      <div style={{ position: "relative", width: 96, height: 120 }}>
        <style>{`
          @keyframes drop-float {
            0%, 100% { transform: translateY(0px) scale(1); }
            50%       { transform: translateY(-8px) scale(1.04); }
          }
          @keyframes ripple-1 {
            0%   { transform: scale(0.6); opacity: 0.7; }
            100% { transform: scale(2.2); opacity: 0; }
          }
          @keyframes ripple-2 {
            0%   { transform: scale(0.6); opacity: 0.5; }
            100% { transform: scale(2.8); opacity: 0; }
          }
          @keyframes fill-rise {
            0%   { transform: translateY(100%); }
            100% { transform: translateY(-10%); }
          }
          @keyframes wave-move {
            0%   { d: path("M0,8 Q10,0 20,8 Q30,16 40,8 Q50,0 60,8 L60,30 L0,30 Z"); }
            50%  { d: path("M0,4 Q10,12 20,4 Q30,-4 40,4 Q50,12 60,4 L60,30 L0,30 Z"); }
            100% { d: path("M0,8 Q10,0 20,8 Q30,16 40,8 Q50,0 60,8 L60,30 L0,30 Z"); }
          }
          @keyframes shine-slide {
            0%   { opacity: 0; transform: translate(-10px, -10px); }
            30%  { opacity: 1; }
            100% { opacity: 0; transform: translate(30px, 30px); }
          }
          .drop-body    { animation: drop-float 2s ease-in-out infinite; }
          .ripple-1     { animation: ripple-1 2s ease-out infinite; }
          .ripple-2     { animation: ripple-2 2s ease-out infinite 0.35s; }
          .fill-water   { animation: fill-rise 2s ease-in-out infinite alternate; }
          .wave-top     { animation: wave-move 1.8s ease-in-out infinite; }
          .drop-shine   { animation: shine-slide 2s ease-in-out infinite 0.5s; }
        `}</style>

        <svg width="96" height="120" viewBox="0 0 96 120" fill="none" xmlns="http://www.w3.org/2000/svg">

          {/* Ripples at base */}
          <ellipse className="ripple-1" cx="48" cy="102" rx="18" ry="5" fill="none" stroke="#3b82f6" strokeWidth="1.5"/>
          <ellipse className="ripple-2" cx="48" cy="102" rx="18" ry="5" fill="none" stroke="#93c5fd" strokeWidth="1"/>

          {/* Drop body group — floats up/down */}
          <g className="drop-body">

            {/* Drop outline */}
            <path
              d="M48 10 C48 10 18 45 18 68 C18 84.6 31.4 98 48 98 C64.6 98 78 84.6 78 68 C78 45 48 10 48 10 Z"
              fill="white"
              stroke="#2563eb"
              strokeWidth="2.5"
            />

            {/* Clipping mask for water fill */}
            <defs>
              <clipPath id="drop-clip">
                <path d="M48 10 C48 10 18 45 18 68 C18 84.6 31.4 98 48 98 C64.6 98 78 84.6 78 68 C78 45 48 10 48 10 Z"/>
              </clipPath>
            </defs>

            {/* Water fill (rises) */}
            <g clipPath="url(#drop-clip)">
              <g className="fill-water">
                {/* Main water body */}
                <rect x="14" y="40" width="68" height="62" fill="#3b82f6" opacity="0.85"/>
                {/* Wave on top of water */}
                <path
                  className="wave-top"
                  d="M14,50 Q24,42 34,50 Q44,58 54,50 Q64,42 82,50 L82,110 L14,110 Z"
                  fill="#2563eb"
                  opacity="0.6"
                />
              </g>
            </g>

            {/* Shine highlight */}
            <g clipPath="url(#drop-clip)">
              <ellipse
                className="drop-shine"
                cx="36" cy="45"
                rx="6" ry="14"
                fill="white"
                opacity="0.35"
                transform="rotate(-25 36 45)"
              />
            </g>

            {/* Company logo inside drop */}
            <g clipPath="url(#drop-clip)">
              <image
                href="/anilenterpriselogo.png"
                x="24" y="58"
                width="48" height="24"
                preserveAspectRatio="xMidYMid meet"
                opacity="0.92"
              />
            </g>

            {/* Drop tip highlight */}
            <circle cx="42" cy="38" r="3" fill="white" opacity="0.5"/>

          </g>
        </svg>
      </div>

      {/* ── Brand name ── */}
      <p style={{
        fontSize: 18,
        fontWeight: 800,
        color: "#1d4ed8",
        letterSpacing: "-0.5px",
        marginTop: 4,
        fontFamily: "system-ui, sans-serif",
      }}>
        AquaApp
      </p>

      {/* ── Message with animated dots ── */}
      <p style={{
        fontSize: 13,
        color: "#64748b",
        fontFamily: "system-ui, sans-serif",
        marginTop: 6,
        fontWeight: 500,
        letterSpacing: "0.01em",
        minWidth: 160,
        textAlign: "center",
      }}>
        {message}{dotStr}
      </p>

      {/* ── Progress bar ── */}
      <div style={{
        marginTop: 16,
        width: 140,
        height: 3,
        background: "#dbeafe",
        borderRadius: 99,
        overflow: "hidden",
      }}>
        <style>{`
          @keyframes progress-slide {
            0%   { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
          .progress-bar-inner {
            width: 60%;
            height: 100%;
            background: linear-gradient(90deg, #3b82f6, #60a5fa);
            border-radius: 99px;
            animation: progress-slide 1.4s ease-in-out infinite;
          }
        `}</style>
        <div className="progress-bar-inner"/>
      </div>
    </div>
  );

  if (!fullScreen) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 0",
        width: "100%",
      }}>
        {content}
      </div>
    );
  }

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      background: "rgba(239,246,255,0.85)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {content}
    </div>
  );
}