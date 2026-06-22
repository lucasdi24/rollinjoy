"use client";

import React from "react";
import { RJ } from "./primitives";

// ── Rio cover scene (Pão de Açúcar silhouette at sunset) ─────
export function RioCover({ h = 200, style = {} }: { h?: number; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: h,
        borderRadius: 24,
        overflow: "hidden",
        background: "linear-gradient(180deg, #FFB26B 0%, #FF8C6B 35%, #E9627A 70%, #5B4A78 100%)",
        ...style,
      }}
    >
      {/* sun */}
      <div
        style={{
          position: "absolute",
          top: "38%",
          left: "58%",
          width: 58,
          height: 58,
          borderRadius: 999,
          background: "#FFD67B",
          boxShadow: "0 0 40px 10px rgba(255,214,123,.6)",
        }}
      />
      {/* far mountains */}
      <svg
        viewBox="0 0 390 200"
        preserveAspectRatio="xMidYMax slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <path
          d="M0 150 Q 60 115 120 130 T 240 120 Q 300 100 390 130 L 390 200 L 0 200 Z"
          fill="rgba(60,30,60,0.38)"
        />
        <path
          d="M0 170 L 70 155 Q 110 135 150 150 Q 190 165 220 148 Q 250 128 280 142 Q 320 160 390 150 L 390 200 L 0 200 Z"
          fill="rgba(30,15,40,0.55)"
        />
        {/* Sugarloaf silhouette */}
        <path
          d="M 250 165 Q 260 120 285 118 Q 308 120 318 145 Q 324 163 320 175 L 255 175 Z"
          fill="rgba(15,5,25,0.72)"
        />
        {/* Christ the Redeemer silhouette (tiny) */}
        <g transform="translate(80,120)" fill="rgba(15,5,25,0.72)">
          <rect x="-0.8" y="0" width="1.6" height="10" />
          <rect x="-5" y="3" width="10" height="1.4" />
        </g>
        {/* foreground water */}
        <path d="M0 180 Q 100 175 200 180 T 390 178 L 390 200 L 0 200 Z" fill="rgba(10,5,30,0.6)" />
      </svg>
      {/* palm frond in corner */}
      <svg
        width="110"
        height="130"
        viewBox="0 0 110 130"
        style={{ position: "absolute", bottom: -6, left: -14 }}
      >
        <g stroke="rgba(10,5,25,0.75)" strokeWidth="2" strokeLinecap="round" fill="none">
          <path d="M30 130 Q 32 90 40 50" />
          <path d="M40 50 Q 15 35 0 20" />
          <path d="M40 50 Q 60 25 75 5" />
          <path d="M40 50 Q 20 50 0 55" />
          <path d="M40 50 Q 65 48 90 45" />
          <path d="M40 50 Q 30 75 20 95" />
          <path d="M40 50 Q 62 70 80 90" />
        </g>
      </svg>
    </div>
  );
}

// ── Day thumbnail scenes (small) ─────────────────────────────
export function DayThumb({ kind, size = 44 }: { kind: string; size?: number }) {
  const SCENES: Record<string, { bg: string; ico: string }> = {
    beach: { bg: "linear-gradient(180deg,#9ED8E0 0%, #FFE0A6 70%, #F0C678 100%)", ico: "☀" },
    mountain: { bg: "linear-gradient(180deg,#B8D4DC 0%, #7BA8A8 60%, #3A5A5E 100%)", ico: "⛰" },
    night: { bg: "linear-gradient(180deg,#3A2A5A 0%, #5B3D7A 60%, #E9627A 100%)", ico: "🌃" },
    food: { bg: "linear-gradient(180deg,#FFD6A6 0%, #FFA36E 100%)", ico: "🍽" },
  };
  const S = SCENES[kind] || SCENES.beach;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 12,
        background: S.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.5,
        flexShrink: 0,
        boxShadow: "inset 0 0 0 1px rgba(14,42,48,0.06)",
      }}
    >
      {S.ico}
    </div>
  );
}

// ── Activity thumbnail (for timeline rows) ───────────────────
export function ActThumb({ kind, size = 46 }: { kind: string; size?: number }) {
  const palettes: Record<string, { a: string; b: string; line: string }> = {
    coffee: { a: "#E8C89B", b: "#8B6142", line: "#3D2B1A" },
    beach: { a: "#9ED8E0", b: "#FFE0A6", line: "#0E2A30" },
    food: { a: "#FFA36E", b: "#E06B4F", line: "#3D1A10" },
    cable: { a: "#B8D4DC", b: "#3A5A5E", line: "#0E2A30" },
    sunset: { a: "#FFB26B", b: "#E9627A", line: "#3D1A30" },
    dinner: { a: "#4B2A4F", b: "#8B3A5A", line: "#FFD6A6" },
    bar: { a: "#5B3D7A", b: "#E9627A", line: "#FFD21F" },
    taxi: { a: "#FFD21F", b: "#F2BE00", line: "#0E2A30" },
    hotel: { a: "#9ABDBF", b: "#00687A", line: "#FAEFC5" },
    walk: { a: "#C8E0A0", b: "#7BA87A", line: "#0E2A30" },
  };
  const p = palettes[kind] || palettes.beach;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 12,
        flexShrink: 0,
        background: `linear-gradient(135deg, ${p.a}, ${p.b})`,
        position: "relative",
        overflow: "hidden",
        boxShadow: "inset 0 0 0 1px rgba(14,42,48,0.06)",
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 46 46" style={{ position: "absolute", inset: 0 }}>
        <g fill="none" stroke={p.line} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          {kind === "coffee" && (
            <>
              <path d="M14 18 h16 v10 a6 6 0 0 1 -6 6 h-4 a6 6 0 0 1 -6 -6 z" />
              <path d="M30 21 h3 a3 3 0 0 1 0 6 h-3" />
              <path d="M18 10 q 2 3 0 6 M23 10 q 2 3 0 6" />
            </>
          )}
          {kind === "beach" && (
            <>
              <path d="M23 14 l10 14 h-20 z" />
              <path d="M23 14 v20" />
              <path d="M8 34 q 8 -3 15 0 t 15 0" />
            </>
          )}
          {kind === "food" && (
            <>
              <circle cx="23" cy="24" r="10" />
              <path d="M13 24 h20" />
              <path d="M23 24 l5 -5" />
            </>
          )}
          {kind === "cable" && (
            <>
              <path d="M6 14 L 40 22" />
              <rect x="16" y="20" width="14" height="10" rx="2" />
              <path d="M20 20 v-3 M26 20 v-3" />
            </>
          )}
          {kind === "sunset" && (
            <>
              <circle cx="23" cy="26" r="7" />
              <path d="M10 34 h26" />
              <path d="M23 12 v3 M12 18 l2 2 M34 18 l-2 2 M7 26 h3 M36 26 h3" />
            </>
          )}
          {kind === "dinner" && (
            <>
              <path d="M14 14 v16 M14 14 q 0 6 3 6 M14 14 q 0 6 -3 6" />
              <path d="M30 14 v20 M30 14 q 4 2 4 8 t -4 6" />
            </>
          )}
          {kind === "bar" && (
            <>
              <path d="M14 14 h18 l-7 8 v10" />
              <path d="M18 32 h14" />
              <path d="M20 18 l10 0" />
            </>
          )}
          {kind === "taxi" && (
            <>
              <rect x="8" y="20" width="30" height="12" rx="3" />
              <path d="M12 20 l3 -6 h16 l3 6" />
              <circle cx="15" cy="32" r="2" />
              <circle cx="31" cy="32" r="2" />
            </>
          )}
          {kind === "hotel" && (
            <>
              <rect x="10" y="14" width="26" height="20" rx="2" />
              <path d="M14 20 h4 M22 20 h4 M30 20 h4 M14 26 h4 M22 26 h4 M30 26 h4" />
            </>
          )}
          {kind === "walk" && (
            <>
              <circle cx="23" cy="13" r="3" />
              <path d="M23 16 l -4 8 l 3 3 l -2 7 M23 16 l 4 6 l 4 -2" />
            </>
          )}
        </g>
      </svg>
    </div>
  );
}

// ── Generic cover scene (used for non-Rio destinations) ──────
export function CoverScene({ cover, rio, h = 220, label, style = {} }: { cover: string; rio?: boolean; h?: number; label?: string; style?: React.CSSProperties }) {
  if (rio) return <RioCover h={h} style={style} />;
  return (
    <div style={{ position: "relative", width: "100%", height: h, borderRadius: 24, overflow: "hidden", background: cover, ...style }}>
      <div style={{ position: "absolute", top: "34%", left: "62%", width: 64, height: 64, borderRadius: 999, background: "rgba(255,235,200,0.85)", boxShadow: "0 0 50px 14px rgba(255,225,170,.45)" }} />
      <svg viewBox="0 0 390 220" preserveAspectRatio="xMidYMax slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <path d="M0 165 Q 70 120 140 145 T 270 130 Q 330 110 390 145 L 390 220 L 0 220 Z" fill="rgba(20,15,45,0.32)" />
        <path d="M0 185 Q 90 160 180 180 Q 270 200 330 178 Q 360 168 390 185 L 390 220 L 0 220 Z" fill="rgba(12,8,30,0.5)" />
        <path d="M0 200 Q 100 192 200 200 T 390 198 L 390 220 L 0 220 Z" fill="rgba(8,5,25,0.55)" />
      </svg>
      {label && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", padding: 16 }} />
      )}
    </div>
  );
}

// ── Stylized day map (pins drive the route) ──────────────────
type MapPin = { x: number; y: number; label: string; t: string };

function routePath(pins: MapPin[]) {
  const pts = pins.map((p) => ({ x: p.x * 390, y: p.y * 700 }));
  if (!pts.length) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1],
      cur = pts[i];
    const mx = (prev.x + cur.x) / 2,
      my = (prev.y + cur.y) / 2;
    d += ` Q ${prev.x} ${prev.y} ${mx} ${my}`;
    d += ` T ${cur.x} ${cur.y}`;
  }
  return d;
}

export function StylizedMap({ pins, selected, onSelect }: { pins: MapPin[]; selected: number; onSelect: (n: number) => void }) {
  const path = routePath(pins);
  return (
    <div style={{ position: "absolute", inset: 0, background: "#E6EEE8" }}>
      <svg viewBox="0 0 390 700" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <path d="M0 420 Q 80 390 160 415 Q 240 440 320 410 Q 370 395 390 420 L 390 700 L 0 700 Z" fill="#B8D6DC" />
        <path d="M0 420 Q 80 390 160 415 Q 240 440 320 410 Q 370 395 390 420" fill="none" stroke="#FAEFC5" strokeWidth="10" />
        <path d="M180 120 Q 220 100 260 130 Q 300 160 280 220 Q 260 270 200 250 Q 160 230 160 180 Q 165 140 180 120" fill="#C8D9B8" opacity="0.7" />
        <path d="M40 260 Q 80 250 100 290 Q 120 340 80 370 Q 40 380 20 340 Q 10 300 40 260" fill="#C8D9B8" opacity="0.6" />
        <g stroke="#FAEFC5" strokeWidth="6" fill="none" strokeLinecap="round">
          <path d="M 30 180 Q 140 200 230 180 Q 300 170 370 200" />
          <path d="M 60 300 Q 120 280 200 310 Q 280 340 350 310" />
          <path d="M 130 80 Q 150 180 160 280 Q 160 370 200 420" />
          <path d="M 280 100 Q 270 200 260 280 Q 260 360 300 420" />
        </g>
        <g stroke="#D7CA99" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7">
          <path d="M 30 180 Q 140 200 230 180 Q 300 170 370 200" />
          <path d="M 60 300 Q 120 280 200 310 Q 280 340 350 310" />
        </g>
        <g fill="#F3E6C8" opacity="0.75">
          <rect x="20" y="420" width="55" height="30" rx="3" />
          <rect x="85" y="430" width="60" height="25" rx="3" />
          <rect x="155" y="440" width="70" height="28" rx="3" />
          <rect x="235" y="430" width="60" height="26" rx="3" />
          <rect x="305" y="425" width="65" height="28" rx="3" />
          <rect x="40" y="475" width="50" height="20" rx="3" />
          <rect x="100" y="475" width="55" height="20" rx="3" />
          <rect x="165" y="480" width="60" height="20" rx="3" />
        </g>
        <g fill="none" stroke="#FFD21F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
          <path d={path} />
        </g>
        <g fill="none" stroke="#F2BE00" strokeWidth="1.5" opacity="0.6">
          <path d={path} />
        </g>
      </svg>

      {pins.map((p, i) => {
        const on = selected === i + 1;
        return (
          <div
            key={i}
            onClick={() => onSelect(i + 1)}
            style={{ position: "absolute", left: `${p.x * 100}%`, top: `${p.y * 100}%`, transform: "translate(-50%, -100%)", cursor: "pointer" }}
          >
            <div
              style={{
                background: on ? RJ.yellow : RJ.teal,
                color: on ? RJ.teal : RJ.yellow,
                width: on ? 38 : 30,
                height: on ? 38 : 30,
                borderRadius: "50% 50% 50% 0",
                transform: "rotate(-45deg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: on ? "0 6px 18px rgba(255,210,31,0.55)" : "0 3px 8px rgba(0,104,122,0.35)",
                border: `2px solid ${on ? RJ.teal : RJ.vanilla}`,
                transition: "all 220ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <span style={{ transform: "rotate(45deg)", fontFamily: RJ.display, fontWeight: 900, fontSize: on ? 14 : 11 }}>{i + 1}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
