"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Shell, Scroll, BottomBar } from "@/components/rollin-joy/shell";
import { RJ, ASSET, Btn, CloudsTexture } from "@/components/rollin-joy/primitives";
import { useTrip } from "@/components/rollin-joy/trip-context";

export default function SplashPage() {
  const router = useRouter();
  const { trip, ready, savedTrips, openSaved } = useTrip();

  return (
    <Shell tone="sky">
      <Scroll style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <CloudsTexture color="rgba(0,104,122,0.22)" />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(90% 60% at 50% 38%, rgba(250,239,197,0.45), transparent 70%)",
          }}
        />
        <div
          className="rj-anim"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 32px",
            position: "relative",
            zIndex: 2,
            minHeight: 420,
          }}
        >
          <div style={{ position: "relative", marginBottom: 8, filter: "drop-shadow(0 10px 28px rgba(0,104,122,0.18))" }}>
            <img src={ASSET.logo} alt="Rollin Joy" style={{ width: 260, maxWidth: "70vw", height: "auto", display: "block" }} />
          </div>
          <div
            style={{
              fontFamily: RJ.sans,
              fontSize: 16,
              color: RJ.teal,
              fontStyle: "italic",
              textAlign: "center",
              lineHeight: 1.45,
              marginTop: 48,
              maxWidth: 280,
              fontWeight: 500,
            }}
          >
            Porque la vida no se planifica
            <br />
            para después.
          </div>
        </div>
      </Scroll>

      <BottomBar>
        <div style={{ position: "relative", zIndex: 3 }}>
          {ready && savedTrips.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: RJ.sans, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: RJ.teal, opacity: 0.7, marginBottom: 8, paddingLeft: 2 }}>
                Mis viajes
              </div>
              <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
                {savedTrips.map((t) => (
                  <button
                    key={t.generatedAt}
                    onClick={() => {
                      openSaved(t.generatedAt);
                      router.push("/rollin-joy/viaje");
                    }}
                    style={{
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "rgba(250,239,197,0.85)",
                      border: `1.5px solid ${RJ.teal}`,
                      borderRadius: 14,
                      padding: "8px 12px 8px 8px",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ width: 30, height: 30, borderRadius: 9, background: t.cover, flexShrink: 0 }} />
                    <span style={{ textAlign: "left" }}>
                      <span style={{ display: "block", fontFamily: RJ.display, fontWeight: 800, fontSize: 13, color: RJ.teal, lineHeight: 1 }}>{t.dest}</span>
                      <span style={{ display: "block", fontFamily: RJ.sans, fontSize: 10.5, color: RJ.inkMuted, marginTop: 2 }}>
                        {t.nights} días · USD {t.perPerson} pp
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
          <Btn kind="pop" size="lg" block onClick={() => router.push("/rollin-joy/nuevo")} iconRight="arrow-right">
            Empezá tu viaje
          </Btn>
          {ready && trip && (
            <button
              onClick={() => router.push("/rollin-joy/viaje")}
              style={{
                width: "100%",
                marginTop: 12,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontFamily: RJ.sans,
                fontSize: 13,
                color: RJ.teal,
                fontWeight: 600,
              }}
            >
              Seguir con tu viaje a <b>{trip.dest}</b> →
            </button>
          )}
          <div style={{ textAlign: "center", marginTop: ready && trip ? 10 : 14, fontFamily: RJ.sans, fontSize: 12, color: RJ.teal, opacity: 0.75 }}>
            Ya tengo cuenta · <u>Entrar</u>
          </div>
        </div>
      </BottomBar>
    </Shell>
  );
}
