"use client";

import React from "react";
import {
  ArrowRight,
  MapPin,
  Calendar,
  Users,
  Check,
  Wallet,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  DollarSign,
  Download,
  Map as MapIcon,
  Clock,
  Navigation,
  Layers,
  Locate,
  Footprints,
  CarTaxiFront,
  Bus,
  Plus,
  MessageCircle,
  Instagram,
  Link2,
  FileDown,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Umbrella,
  Utensils,
  Sunset,
  Building,
  Landmark,
  Music,
  Mountain,
  ShoppingBag,
  Wine,
  Trash2,
  X,
  RotateCcw,
  Pencil,
  type LucideIcon,
} from "lucide-react";

// ── Brand tokens ─────────────────────────────────────────────
export const RJ = {
  vanilla: "#FAEFC5",
  vanillaAlt: "#FDF7E0",
  vanillaDk: "#E8D897",
  teal: "#00687A",
  tealDk: "#00525F",
  tealMid: "#0C8498",
  tealSoft: "#9ABDBF",
  tealWash: "#DCE9EA",
  yellow: "#FFD21F",
  yellowDk: "#F2BE00",
  yellowSoft: "#FFE377",
  ink: "#0E2A30",
  inkMuted: "#4B6166",
  inkFaint: "#7B8E92",
  line: "#E6DDB8",
  display: "'League Spartan', system-ui, sans-serif",
  sans: "'Montserrat', system-ui, sans-serif",
} as const;

// Mascot / asset paths (served from public/rollin-joy)
export const ASSET = {
  mascot: "/rollin-joy/mascot-joy-reclining.png",
  logo: "/rollin-joy/logo-rollin-joy-color-transparent.png",
};

// ── Icon (lucide-react wrapper, kebab-case names like the prototype) ──
const ICONS: Record<string, LucideIcon> = {
  "arrow-right": ArrowRight,
  "map-pin": MapPin,
  calendar: Calendar,
  users: Users,
  check: Check,
  wallet: Wallet,
  sparkles: Sparkles,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  heart: Heart,
  "share-2": Share2,
  "dollar-sign": DollarSign,
  download: Download,
  map: MapIcon,
  clock: Clock,
  navigation: Navigation,
  layers: Layers,
  locate: Locate,
  footprints: Footprints,
  "car-taxi-front": CarTaxiFront,
  bus: Bus,
  plus: Plus,
  "message-circle": MessageCircle,
  instagram: Instagram,
  "link-2": Link2,
  "file-down": FileDown,
  "thumbs-up": ThumbsUp,
  "thumbs-down": ThumbsDown,
  bookmark: Bookmark,
  umbrella: Umbrella,
  utensils: Utensils,
  sunset: Sunset,
  building: Building,
  landmark: Landmark,
  music: Music,
  mountain: Mountain,
  "shopping-bag": ShoppingBag,
  wine: Wine,
  "trash-2": Trash2,
  x: X,
  "rotate-ccw": RotateCcw,
  pencil: Pencil,
};

export function Ico({
  n,
  s = 20,
  c = "currentColor",
  sw = 1.75,
}: {
  n: string;
  s?: number;
  c?: string;
  sw?: number;
}) {
  const Cmp = ICONS[n];
  if (!Cmp) return <span style={{ width: s, height: s, display: "inline-flex" }} />;
  return (
    <span style={{ display: "inline-flex", width: s, height: s, color: c, flexShrink: 0 }}>
      <Cmp width={s} height={s} stroke={c} strokeWidth={sw} />
    </span>
  );
}

// ── Logo lockup ──────────────────────────────────────────────
export function RJLogo({
  color = RJ.teal,
  yellow = RJ.yellow,
  size = 28,
  withMascot = false,
}: {
  color?: string;
  yellow?: string;
  size?: number;
  withMascot?: boolean;
}) {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div
        style={{
          fontFamily: RJ.display,
          fontWeight: 900,
          letterSpacing: "-0.03em",
          lineHeight: 0.85,
          fontSize: size,
          color,
          textAlign: "left",
        }}
      >
        ROLLIN
        <br />
        J<span style={{ color: yellow }}>O</span>Y
      </div>
      {withMascot && (
        <img
          src={ASSET.mascot}
          style={{
            position: "absolute",
            width: size * 1.9,
            top: -size * 0.42,
            left: size * 0.36,
            pointerEvents: "none",
          }}
          alt=""
        />
      )}
    </div>
  );
}

// ── Button ───────────────────────────────────────────────────
type BtnKind = "primary" | "pop" | "ghost" | "text" | "inverse" | "softTeal";
type BtnSize = "sm" | "md" | "lg";

export function Btn({
  kind = "primary",
  size = "md",
  children,
  onClick,
  block = false,
  icon,
  iconRight,
}: {
  kind?: BtnKind;
  size?: BtnSize;
  children?: React.ReactNode;
  onClick?: () => void;
  block?: boolean;
  icon?: string;
  iconRight?: string;
}) {
  const S = {
    sm: { p: "9px 16px", fs: 12, ico: 14 },
    md: { p: "13px 22px", fs: 14, ico: 16 },
    lg: { p: "17px 28px", fs: 15, ico: 18 },
  }[size];
  const KINDS: Record<BtnKind, { bg: string; fg: string; border: string; shadow: string }> = {
    primary: { bg: RJ.teal, fg: RJ.vanilla, border: "none", shadow: "0 2px 6px rgba(0,104,122,0.18)" },
    pop: { bg: RJ.yellow, fg: RJ.teal, border: "none", shadow: "0 2px 0 rgba(0,104,122,0.25)" },
    ghost: { bg: "transparent", fg: RJ.teal, border: `1.5px solid ${RJ.teal}`, shadow: "none" },
    text: { bg: "transparent", fg: RJ.teal, border: "none", shadow: "none" },
    inverse: { bg: RJ.vanilla, fg: RJ.teal, border: "none", shadow: "none" },
    softTeal: { bg: RJ.tealWash, fg: RJ.teal, border: "none", shadow: "none" },
  };
  const K = KINDS[kind];
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: RJ.display,
        fontWeight: 800,
        letterSpacing: "-0.01em",
        textTransform: "uppercase",
        padding: S.p,
        fontSize: S.fs,
        borderRadius: 999,
        background: K.bg,
        color: K.fg,
        border: K.border,
        boxShadow: K.shadow,
        display: block ? "flex" : "inline-flex",
        width: block ? "100%" : undefined,
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        cursor: "pointer",
        transition: "transform 120ms, box-shadow 120ms",
        WebkitTapHighlightColor: "transparent",
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {icon && <Ico n={icon} s={S.ico} />}
      {children}
      {iconRight && <Ico n={iconRight} s={S.ico} />}
    </button>
  );
}

// ── Chip ─────────────────────────────────────────────────────
type ChipKind = "solid" | "pop" | "outline" | "soft" | "mutedSoft" | "paper";

export function Chip({
  children,
  kind = "outline",
  icon,
  onClick,
}: {
  children?: React.ReactNode;
  kind?: ChipKind;
  icon?: string;
  onClick?: () => void;
}) {
  const KINDS: Record<ChipKind, { bg: string; fg: string; border: string }> = {
    solid: { bg: RJ.teal, fg: RJ.vanilla, border: "none" },
    pop: { bg: RJ.yellow, fg: RJ.teal, border: "none" },
    outline: { bg: "transparent", fg: RJ.teal, border: `1.5px solid ${RJ.teal}` },
    soft: { bg: RJ.tealWash, fg: RJ.teal, border: "none" },
    mutedSoft: { bg: RJ.vanillaAlt, fg: RJ.teal, border: `1px solid ${RJ.line}` },
    paper: { bg: RJ.vanillaAlt, fg: RJ.teal, border: `1.5px solid ${RJ.line}` },
  };
  const K = KINDS[kind] || KINDS.outline;
  return (
    <span
      onClick={onClick}
      style={{
        fontFamily: RJ.sans,
        fontWeight: 700,
        fontSize: 12,
        padding: "7px 13px",
        borderRadius: 999,
        background: K.bg,
        color: K.fg,
        border: K.border,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        whiteSpace: "nowrap",
        cursor: onClick ? "pointer" : "default",
        transition: "all 180ms",
      }}
    >
      {icon && <Ico n={icon} s={13} />}
      {children}
    </span>
  );
}

// ── Card ─────────────────────────────────────────────────────
type CardTone = "paper" | "white" | "teal" | "yellow" | "soft";

export function Card({
  children,
  pad = 18,
  tone = "paper",
  style = {},
  onClick,
}: {
  children?: React.ReactNode;
  pad?: number;
  tone?: CardTone;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const TONES: Record<CardTone, { bg: string; fg: string; border: string }> = {
    paper: { bg: RJ.vanillaAlt, fg: RJ.ink, border: `1px solid ${RJ.line}` },
    white: { bg: "#fff", fg: RJ.ink, border: `1px solid ${RJ.line}` },
    teal: { bg: RJ.teal, fg: RJ.vanilla, border: "none" },
    yellow: { bg: RJ.yellow, fg: RJ.teal, border: "none" },
    soft: { bg: RJ.tealWash, fg: RJ.teal, border: "none" },
  };
  const T = TONES[tone];
  return (
    <div
      onClick={onClick}
      style={{
        background: T.bg,
        color: T.fg,
        border: T.border,
        borderRadius: 22,
        padding: pad,
        boxShadow: "0 1px 2px rgba(14,42,48,.05)",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Overline ─────────────────────────────────────────────────
export function Overline({ children, color }: { children?: React.ReactNode; color?: string }) {
  return (
    <div
      style={{
        fontFamily: RJ.sans,
        fontSize: 10,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: color || RJ.inkMuted,
        fontWeight: 700,
      }}
    >
      {children}
    </div>
  );
}

// ── Joy-dice card (tip callout) ──────────────────────────────
export function JoyDice({ title = "Tu Joy dice", children }: { title?: string; children?: React.ReactNode }) {
  return (
    <div
      style={{
        background: RJ.vanillaAlt,
        border: `1.5px dashed ${RJ.tealSoft}`,
        borderRadius: 20,
        padding: "14px 14px 14px 70px",
        position: "relative",
      }}
    >
      <img
        src={ASSET.mascot}
        style={{
          position: "absolute",
          left: 6,
          top: "50%",
          transform: "translateY(-50%) scaleX(-1)",
          height: 54,
        }}
        alt=""
      />
      <Overline color={RJ.teal}>{title}</Overline>
      <div style={{ fontFamily: RJ.sans, fontSize: 12.5, color: RJ.ink, lineHeight: 1.5, marginTop: 4 }}>
        {children}
      </div>
    </div>
  );
}

// ── Status bar (iOS-like, inline in mock phone) ──────────────
export function StatusBar({ dark = false, time = "9:41" }: { dark?: boolean; time?: string }) {
  const c = dark ? "#fff" : "#0E2A30";
  return (
    <div
      style={{
        height: 44,
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: '-apple-system, "SF Pro", system-ui',
        fontWeight: 600,
        fontSize: 15,
        color: c,
        position: "relative",
        zIndex: 20,
      }}
    >
      <span style={{ paddingTop: 4 }}>{time}</span>
      <div style={{ display: "flex", gap: 6, alignItems: "center", paddingTop: 4 }}>
        <svg width="17" height="11" viewBox="0 0 17 11">
          <g fill={c}>
            <rect x="0" y="7" width="3" height="4" rx="0.6" />
            <rect x="4.5" y="5" width="3" height="6" rx="0.6" />
            <rect x="9" y="2.5" width="3" height="8.5" rx="0.6" />
            <rect x="13.5" y="0" width="3" height="11" rx="0.6" />
          </g>
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path
            d="M7.5 3C9.6 3 11.5 3.8 13 5.2L14 4.1C12.3 2.4 10 1.3 7.5 1.3S2.7 2.4 1 4.1l1 1.1C2.5 3.8 5.4 3 7.5 3z"
            fill={c}
          />
          <circle cx="7.5" cy="9" r="1.3" fill={c} />
        </svg>
        <svg width="24" height="11" viewBox="0 0 24 11">
          <rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke={c} strokeOpacity="0.4" fill="none" />
          <rect x="2" y="2" width="17" height="7" rx="1.5" fill={c} />
          <path d="M22 3.5v4c0.7-0.2 1.2-1 1.2-2s-0.5-1.8-1.2-2z" fill={c} fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

// ── Home indicator ───────────────────────────────────────────
export function HomeIndicator({ dark = false }: { dark?: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 34,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingBottom: 8,
        pointerEvents: "none",
        zIndex: 60,
      }}
    >
      <div
        style={{
          width: 134,
          height: 5,
          borderRadius: 999,
          background: dark ? "rgba(255,255,255,0.7)" : "rgba(14,42,48,0.35)",
        }}
      />
    </div>
  );
}

// ── Hand-drawn cloud texture (for splash) ────────────────────
export function CloudsTexture({ color = "rgba(0,104,122,0.16)" }: { color?: string }) {
  return (
    <svg
      viewBox="0 0 390 844"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <g fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 20 120 q 18 -22 42 -14 q 10 -22 36 -18 q 14 -20 40 -10 q 12 2 14 14 q 16 2 14 18 q -8 8 -22 6 l -100 0 q -18 0 -24 -6 z" />
        <path
          d="M 210 70 q 12 -16 30 -10 q 8 -18 28 -14 q 12 -14 32 -6 q 10 2 12 12 q 14 2 10 16 q -6 6 -18 4 l -80 0 q -14 0 -18 -4 z"
          opacity="0.7"
        />
        <path d="M 260 280 q 16 -20 38 -12 q 10 -22 34 -16 q 14 -18 38 -8 q 10 4 12 14 q 16 4 12 20 q -8 6 -22 4 l -96 0 q -18 0 -24 -4 z" />
        <path
          d="M 40 420 q 14 -18 34 -12 q 10 -18 30 -12 q 12 -16 32 -8 q 10 2 12 12 q 14 4 10 18 q -6 6 -20 4 l -84 0 q -16 0 -20 -4 z"
          opacity="0.8"
        />
        <path d="M 180 560 q 16 -20 40 -12 q 10 -22 36 -14 q 14 -20 40 -10 q 12 2 14 14 q 16 2 14 18 q -8 8 -22 6 l -100 0 q -18 0 -24 -6 z" />
        <path
          d="M 20 700 q 12 -16 30 -10 q 8 -16 26 -12 q 10 -12 28 -6 q 10 2 12 10 q 14 4 10 18 q -6 6 -18 4 l -72 0 q -16 0 -20 -4 z"
          opacity="0.7"
        />
        <path d="M 80 240 q 6 -5 12 0 q 6 -5 12 0" />
        <path d="M 310 430 q 5 -4 10 0 q 5 -4 10 0" />
        <path d="M 150 330 q 4 -3 8 0 q 4 -3 8 0" />
      </g>
    </svg>
  );
}
