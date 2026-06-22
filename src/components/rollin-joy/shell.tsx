"use client";

import React from "react";
import { RJ, Ico, RJLogo } from "./primitives";

export function Shell({ tone = "vanilla", children }: { tone?: "vanilla" | "sky"; children: React.ReactNode }) {
  return (
    <div className="rj-backdrop">
      <div className={`rj-frame rj-tone-${tone}`}>{children}</div>
    </div>
  );
}

export function Scroll({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div className="rj-scroll" style={style}>{children}</div>;
}

export function TopBar({
  onBack,
  title,
  subtitle,
  logo,
  right,
}: {
  onBack?: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  logo?: boolean;
  right?: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "16px 18px 12px",
        flexShrink: 0,
      }}
    >
      {onBack && (
        <button
          onClick={onBack}
          style={{
            width: 38,
            height: 38,
            borderRadius: 999,
            background: RJ.vanillaAlt,
            border: `1px solid ${RJ.line}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: RJ.teal,
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <Ico n="chevron-left" s={18} />
        </button>
      )}
      {logo && <RJLogo size={18} />}
      {(title || subtitle) && (
        <div style={{ flex: 1, minWidth: 0 }}>
          {title && (
            <div style={{ fontFamily: RJ.display, fontWeight: 800, fontSize: 19, color: RJ.teal, letterSpacing: "-0.01em", lineHeight: 1.05 }}>
              {title}
            </div>
          )}
          {subtitle && <div style={{ fontFamily: RJ.sans, fontSize: 11.5, color: RJ.inkMuted, marginTop: 1 }}>{subtitle}</div>}
        </div>
      )}
      {!title && !subtitle && <div style={{ flex: 1 }} />}
      {right}
    </div>
  );
}

export function BottomBar({ children, fade = false }: { children: React.ReactNode; fade?: boolean }) {
  return (
    <div
      style={{
        flexShrink: 0,
        padding: "12px 18px max(18px, env(safe-area-inset-bottom))",
        background: fade ? `linear-gradient(to top, ${RJ.vanilla} 72%, rgba(250,239,197,0))` : "transparent",
      }}
    >
      {children}
    </div>
  );
}
