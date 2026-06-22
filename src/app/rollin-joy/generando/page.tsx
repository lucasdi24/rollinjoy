"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Shell } from "@/components/rollin-joy/shell";
import { RJ, ASSET, Overline, CloudsTexture } from "@/components/rollin-joy/primitives";
import { useTrip } from "@/components/rollin-joy/trip-context";

const LINES = ["Buscando los mejores planes...", "Optimizando rutas...", "Calculando presupuestos...", "¡Listo!"];

export default function GenerandoPage() {
  const router = useRouter();
  const { trip, ready } = useTrip();
  const [i, setI] = React.useState(0);
  const [bop, setBop] = React.useState(0);

  React.useEffect(() => {
    const t1 = setTimeout(() => setI(1), 650);
    const t2 = setTimeout(() => setI(2), 1300);
    const t3 = setTimeout(() => setI(3), 1950);
    const bopper = setInterval(() => setBop((x) => x + 1), 550);
    return () => {
      [t1, t2, t3].forEach(clearTimeout);
      clearInterval(bopper);
    };
  }, []);

  React.useEffect(() => {
    const t = setTimeout(() => {
      if (ready && !trip) router.replace("/rollin-joy/nuevo");
      else router.replace("/rollin-joy/viaje");
    }, 2650);
    return () => clearTimeout(t);
  }, [router, ready, trip]);

  return (
    <Shell tone="sky">
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "0 32px" }}>
        <CloudsTexture color="rgba(0,104,122,0.22)" />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(90% 60% at 50% 40%, rgba(250,239,197,0.45), transparent 70%)" }} />

        <div style={{ position: "relative", marginBottom: 40, zIndex: 2 }}>
          <svg width="180" height="180" viewBox="0 0 180 180" style={{ animation: "rj-spin 2.6s linear infinite" }}>
            <circle cx="90" cy="90" r="78" fill="none" stroke={RJ.teal} strokeWidth="2" strokeDasharray="4 8" opacity="0.3" />
            <circle cx="90" cy="90" r="70" fill="none" stroke={RJ.teal} strokeWidth="1.4" strokeDasharray="90 400" />
          </svg>
          <div style={{ position: "absolute", top: 38, left: 38, width: 104, height: 104, borderRadius: 999, background: RJ.yellow, boxShadow: "0 10px 30px rgba(255,210,31,0.5)" }} />
          <img
            src={ASSET.mascot}
            style={{
              position: "absolute",
              width: 150,
              top: -16,
              left: "50%",
              transform: `translateX(-48%) translateY(${bop % 2 === 0 ? 0 : -4}px)`,
              transition: "transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            alt="Joy"
          />
        </div>

        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Overline color={RJ.teal}>Joy está armando{trip ? ` ${trip.dest}` : ""}</Overline>
          <div style={{ marginTop: 8, fontFamily: RJ.display, fontWeight: 800, fontSize: 22, color: RJ.teal, textAlign: "center", letterSpacing: "-0.015em", lineHeight: 1.2, minHeight: 54 }}>
            {LINES[i]}
          </div>
          <div style={{ marginTop: 24, width: 220, height: 4, background: RJ.vanillaDk, borderRadius: 999, overflow: "hidden" }}>
            <div style={{ height: "100%", background: RJ.teal, width: `${((i + 1) / LINES.length) * 100}%`, transition: "width 400ms ease" }} />
          </div>
        </div>
      </div>
    </Shell>
  );
}
