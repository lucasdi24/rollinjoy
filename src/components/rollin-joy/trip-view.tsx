"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Shell, Scroll, TopBar } from "./shell";
import { RJ, ASSET, Ico, Btn, Chip, Overline, JoyDice } from "./primitives";
import { CoverScene, DayThumb, ActThumb, StylizedMap } from "./scenes";
import { useTrip, type CrewMember } from "./trip-context";
import type { GenDay, GenStop, NavInfo } from "./data";

type Tab = "resumen" | "itin" | "mapa" | "gastos";

export default function TripView() {
  const router = useRouter();
  const { trip, ready, reset } = useTrip();
  const [tab, setTab] = React.useState<Tab>("resumen");
  const [day, setDay] = React.useState(1);

  React.useEffect(() => {
    if (ready && !trip) router.replace("/rollin-joy/nuevo");
  }, [ready, trip, router]);

  if (!trip) {
    return (
      <Shell tone="vanilla">
        <div style={{ flex: 1, display: "grid", placeItems: "center", color: RJ.teal, fontFamily: RJ.sans, fontSize: 14 }}>Cargando tu viaje…</div>
      </Shell>
    );
  }

  const newTrip = () => {
    reset();
    router.push("/rollin-joy/nuevo");
  };
  const goDay = (n: number) => {
    setDay(n);
    setTab("itin");
  };

  const TABS: { k: Tab; l: string }[] = [
    { k: "resumen", l: "Resumen" },
    { k: "itin", l: "Día a día" },
    { k: "mapa", l: "Mapa" },
    { k: "gastos", l: "Gastos" },
  ];

  return (
    <Shell tone="vanilla">
      <TopBar
        onBack={() => router.push("/rollin-joy")}
        title={trip.dest}
        subtitle={`${trip.nights} días · ${trip.people} ${trip.people === 1 ? "persona" : "personas"} · ${trip.budgetLabel}`}
        right={
          <button
            onClick={newTrip}
            title="Nuevo viaje"
            style={{ width: 38, height: 38, borderRadius: 999, background: RJ.vanillaAlt, border: `1px solid ${RJ.line}`, display: "flex", alignItems: "center", justifyContent: "center", color: RJ.teal, cursor: "pointer", flexShrink: 0 }}
          >
            <Ico n="rotate-ccw" s={17} />
          </button>
        }
      />

      {/* Tabs */}
      <div style={{ padding: "0 18px 10px", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 4, background: RJ.vanillaAlt, border: `1px solid ${RJ.line}`, borderRadius: 999, padding: 4 }}>
          {TABS.map((t) => {
            const on = tab === t.k;
            return (
              <div
                key={t.k}
                onClick={() => setTab(t.k)}
                style={{
                  flex: 1,
                  padding: "8px 6px",
                  borderRadius: 999,
                  background: on ? RJ.teal : "transparent",
                  color: on ? RJ.vanilla : RJ.teal,
                  fontFamily: RJ.display,
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "-0.005em",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 180ms",
                }}
              >
                {t.l}
              </div>
            );
          })}
        </div>
      </div>

      {tab === "resumen" && <ResumenTab key="r" onOpenDay={goDay} onTab={setTab} />}
      {tab === "itin" && <ItinTab key="i" day={day} setDay={setDay} onMap={() => setTab("mapa")} />}
      {tab === "mapa" && <MapaTab key="m" day={day} setDay={setDay} onShare={() => setTab("gastos")} />}
      {tab === "gastos" && <GastosTab key="g" />}
    </Shell>
  );
}

// ─────────────────────────────────────────────────────────────
// RESUMEN
// ─────────────────────────────────────────────────────────────
function ResumenTab({ onOpenDay, onTab }: { onOpenDay: (n: number) => void; onTab: (t: Tab) => void }) {
  const { trip } = useTrip();
  if (!trip) return null;
  return (
    <Scroll style={{ padding: "0 0 24px" }}>
      <div className="rj-anim">
        <div style={{ padding: "0 16px" }}>
          <div style={{ position: "relative" }}>
            <CoverScene cover={trip.cover} rio={trip.rio} h={220} />
            <div style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
              <div
                style={{
                  fontFamily: RJ.sans,
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  background: RJ.vanilla,
                  color: RJ.teal,
                  padding: "5px 10px",
                  borderRadius: 999,
                  display: "inline-block",
                }}
              >
                Tu itinerario
              </div>
              <div
                style={{
                  fontFamily: RJ.display,
                  fontWeight: 900,
                  fontSize: 34,
                  color: RJ.vanilla,
                  letterSpacing: "-0.02em",
                  lineHeight: 0.95,
                  textTransform: "uppercase",
                  marginTop: 8,
                  textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                }}
              >
                {trip.dest}
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: "14px 20px 0", fontFamily: RJ.sans, fontSize: 13, color: RJ.inkMuted }}>
          {trip.nights} días · {trip.people} {trip.people === 1 ? "persona" : "personas"} · {trip.budgetLabel}
        </div>
        <div style={{ padding: "8px 20px 4px", display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Chip kind="pop" icon="dollar-sign">
            desde USD {trip.perPerson.toLocaleString("es")} pp
          </Chip>
          <Chip kind="paper" icon="map-pin">
            {trip.country}
          </Chip>
        </div>

        {trip.matchedInterests.length > 0 && (
          <div style={{ padding: "10px 20px 0" }}>
            <Overline color={RJ.teal}>Pensado para vos</Overline>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}>
              {trip.matchedInterests.map((i) => (
                <Chip key={i} kind="soft">
                  {i}
                </Chip>
              ))}
            </div>
          </div>
        )}

        <div style={{ padding: "14px 20px 0" }}>
          {trip.days.map((d) => (
            <div
              key={d.n}
              onClick={() => onOpenDay(d.n)}
              style={{ background: RJ.vanillaAlt, border: `1px solid ${RJ.line}`, borderRadius: 20, padding: 14, marginBottom: 10, cursor: "pointer", display: "flex", gap: 12, alignItems: "center" }}
            >
              <DayThumb kind={d.mood} size={54} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <Overline color={RJ.teal}>Día {d.n}</Overline>
                  <div style={{ fontFamily: RJ.sans, fontSize: 10, color: RJ.inkFaint }}>{d.date}</div>
                </div>
                <div style={{ fontFamily: RJ.display, fontWeight: 800, fontSize: 14.5, color: RJ.teal, letterSpacing: "-0.005em", lineHeight: 1.2, marginTop: 2 }}>{d.theme}</div>
                <div style={{ display: "flex", gap: 10, marginTop: 6, flexWrap: "wrap" }}>
                  {d.highlights.map((h, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: RJ.sans, fontSize: 11, color: RJ.inkMuted }}>
                      <Ico n={h.ico} s={12} c={RJ.teal} />
                      {h.l}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: RJ.display, fontWeight: 800, fontSize: 16, color: RJ.teal }}>${d.cost}</div>
                <div style={{ fontFamily: RJ.sans, fontSize: 10, color: RJ.inkFaint }}>del día</div>
              </div>
            </div>
          ))}

          {/* Grand total */}
          <div style={{ background: RJ.teal, color: RJ.vanilla, borderRadius: 20, padding: 16, marginTop: 4 }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <Overline color={RJ.tealSoft}>Total del viaje · {trip.people} personas</Overline>
              <div style={{ fontFamily: RJ.display, fontWeight: 900, fontSize: 26, color: RJ.yellow, letterSpacing: "-0.02em" }}>USD {trip.totalGroup.toLocaleString("es")}</div>
            </div>
            <div style={{ fontFamily: RJ.sans, fontSize: 11.5, color: RJ.tealSoft, marginTop: 4 }}>
              ≈ USD {trip.perPerson.toLocaleString("es")} por persona · sin vuelos ni hotel
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <JoyDice>Bancate: comé en los quiosques y ferias de cada día — están en el plan. Ahí está la diferencia de presupuesto.</JoyDice>
          </div>

          <div style={{ marginTop: 14 }}>
            <Btn kind="primary" size="lg" block onClick={() => onTab("itin")} iconRight="arrow-right">
              Ver día a día
            </Btn>
          </div>
        </div>
      </div>
    </Scroll>
  );
}

// ─────────────────────────────────────────────────────────────
// DÍA A DÍA
// ─────────────────────────────────────────────────────────────
function DaySelector({ days, day, setDay }: { days: GenDay[]; day: number; setDay: (n: number) => void }) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {days.map((d) => {
        const on = d.n === day;
        return (
          <div
            key={d.n}
            onClick={() => setDay(d.n)}
            style={{
              flex: 1,
              padding: "10px 4px",
              borderRadius: 14,
              background: on ? RJ.teal : RJ.vanillaAlt,
              border: on ? "none" : `1px solid ${RJ.line}`,
              color: on ? RJ.vanilla : RJ.teal,
              textAlign: "center",
              cursor: "pointer",
              transition: "all 180ms",
            }}
          >
            <div style={{ fontFamily: RJ.sans, fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.8 }}>Día</div>
            <div style={{ fontFamily: RJ.display, fontWeight: 900, fontSize: 22, lineHeight: 1, marginTop: 2 }}>{d.n}</div>
            <div style={{ fontFamily: RJ.sans, fontSize: 9, opacity: 0.8, marginTop: 3 }}>{d.date.split(" ")[0]}</div>
          </div>
        );
      })}
    </div>
  );
}

function ItinTab({ day, setDay, onMap }: { day: number; setDay: (n: number) => void; onMap: () => void }) {
  const { trip, stopState, setStop } = useTrip();
  if (!trip) return null;
  const D = trip.days[Math.min(day, trip.days.length) - 1];

  const statusOf = (i: number) => stopState[`${D.n}:${i}`];
  const doneCount = D.stops.filter((_, i) => statusOf(i) === "done").length;
  const skipCount = D.stops.filter((_, i) => statusOf(i) === "skip").length;
  const active = D.stops.length - skipCount;
  const liveCost = D.stops.reduce((a, s, i) => a + (statusOf(i) === "skip" ? 0 : s.costNum), 0);
  const livePct = D.cost > 0 ? Math.max(4, Math.min(100, Math.round((liveCost / (D.cost / (D.budgetPct / 100))) * 100))) : 0;
  const progressPct = active > 0 ? Math.round((doneCount / active) * 100) : 0;

  return (
    <>
      <div style={{ padding: "0 18px 10px", flexShrink: 0 }}>
        <DaySelector days={trip.days} day={D.n} setDay={setDay} />
      </div>
      <Scroll style={{ padding: "8px 20px 16px" }}>
        <div className="rj-anim">
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, background: RJ.yellow, borderRadius: 20, padding: "12px 14px" }}>
            <DayThumb kind={D.mood} size={44} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <Overline color={RJ.teal}>
                Día {D.n} · {D.date}
              </Overline>
              <div style={{ fontFamily: RJ.display, fontWeight: 800, fontSize: 16, color: RJ.teal, letterSpacing: "-0.005em", lineHeight: 1.15, marginTop: 2 }}>{D.theme}</div>
            </div>
          </div>

          {/* Day progress */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ flex: 1, height: 8, background: RJ.vanillaDk, borderRadius: 999, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progressPct}%`, background: RJ.teal, borderRadius: 999, transition: "width 300ms" }} />
            </div>
            <div style={{ fontFamily: RJ.sans, fontSize: 11, fontWeight: 700, color: RJ.teal, whiteSpace: "nowrap" }}>
              {doneCount}/{active} hecho{skipCount > 0 ? ` · ${skipCount} saltado${skipCount === 1 ? "" : "s"}` : ""}
            </div>
          </div>

          <div style={{ position: "relative" }}>
            {D.stops.map((s, i) => (
              <React.Fragment key={i}>
                <StopCard s={s} num={i + 1} status={statusOf(i)} onDone={() => setStop(D.n, i, "done")} onSkip={() => setStop(D.n, i, "skip")} />
                {i < D.stops.length - 1 && s.nav && <NavGap nav={s.nav} />}
              </React.Fragment>
            ))}

            <div style={{ marginTop: 16, background: RJ.teal, color: RJ.vanilla, borderRadius: 20, padding: 16 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                <Overline color={RJ.tealSoft}>Total del día · {trip.people} personas</Overline>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: RJ.display, fontWeight: 900, fontSize: 26, color: RJ.yellow, letterSpacing: "-0.02em" }}>USD {liveCost}</div>
                  {liveCost !== D.cost && <div style={{ fontFamily: RJ.sans, fontSize: 10, color: RJ.tealSoft, textDecoration: "line-through" }}>USD {D.cost}</div>}
                </div>
              </div>
              <div style={{ height: 6, background: "rgba(250,239,197,0.18)", borderRadius: 999, marginTop: 10 }}>
                <div style={{ height: "100%", width: `${livePct}%`, background: RJ.yellow, borderRadius: 999, transition: "width 300ms" }} />
              </div>
              <div style={{ fontFamily: RJ.sans, fontSize: 11, color: RJ.tealSoft, marginTop: 6 }}>
                {skipCount > 0 ? `Ajustado: salteaste ${skipCount} parada${skipCount === 1 ? "" : "s"}` : `${livePct}% del presupuesto diario · ${livePct < 85 ? "te queda margen" : "ajustado pero entra"}`}
              </div>
            </div>

            <div style={{ marginTop: 14 }}>
              <Btn kind="primary" size="lg" block onClick={onMap} iconRight="map">
                Ver mapa del día
              </Btn>
            </div>
          </div>
        </div>
      </Scroll>
    </>
  );
}

function StopCard({ s, num, status, onDone, onSkip }: { s: GenStop; num: number; status?: "done" | "skip"; onDone: () => void; onSkip: () => void }) {
  const done = status === "done";
  const skip = status === "skip";
  return (
    <div
      style={{
        background: done ? RJ.tealWash : RJ.vanillaAlt,
        border: `1px solid ${done ? RJ.teal : s.matched ? RJ.tealSoft : RJ.line}`,
        borderRadius: 18,
        padding: 12,
        display: "flex",
        gap: 12,
        position: "relative",
        opacity: skip ? 0.55 : 1,
        transition: "all 200ms",
      }}
    >
      <div style={{ position: "relative", flexShrink: 0 }}>
        <ActThumb kind={s.kind} size={52} />
        {skip && <div style={{ position: "absolute", inset: 0, borderRadius: 12, background: "rgba(14,42,48,0.12)" }} />}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
          <div style={{ fontFamily: RJ.display, fontWeight: 900, fontSize: 14, color: RJ.teal, letterSpacing: "-0.01em", background: RJ.yellow, padding: "2px 8px", borderRadius: 999 }}>{s.t}</div>
          <div style={{ fontFamily: RJ.sans, fontSize: 10, color: RJ.inkFaint }}>{s.dur}</div>
          {s.matched && !skip && (
            <span style={{ fontFamily: RJ.sans, fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: RJ.teal, background: RJ.tealWash, padding: "2px 7px", borderRadius: 999 }}>
              tu vibe
            </span>
          )}
          {skip && (
            <span style={{ fontFamily: RJ.sans, fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: RJ.inkFaint, background: RJ.vanillaDk, padding: "2px 7px", borderRadius: 999 }}>
              saltado
            </span>
          )}
        </div>
        <div style={{ fontFamily: RJ.sans, fontWeight: 700, fontSize: 14, color: RJ.ink, marginTop: 4, lineHeight: 1.25, textDecoration: skip ? "line-through" : "none" }}>{s.place}</div>
        <div style={{ fontFamily: RJ.sans, fontSize: 11.5, color: RJ.inkMuted, marginTop: 2, lineHeight: 1.4 }}>{s.desc}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
          <div style={{ fontFamily: RJ.sans, fontSize: 11, fontWeight: 700, color: RJ.teal }}>{s.cost}</div>
          <div style={{ flex: 1 }} />
          <button onClick={onDone} title="Marcar como hecho" style={iconBtn(done ? RJ.teal : "transparent", done ? RJ.yellow : RJ.teal, done ? RJ.teal : RJ.line)}>
            <Ico n="check" s={14} c={done ? RJ.yellow : RJ.teal} />
          </button>
          <button onClick={onSkip} title="Saltar" style={iconBtn(skip ? RJ.inkMuted : "transparent", RJ.vanilla, skip ? RJ.inkMuted : RJ.line)}>
            <Ico n="x" s={14} c={skip ? RJ.vanilla : RJ.inkMuted} />
          </button>
        </div>
      </div>
      <div style={{ position: "absolute", top: -8, right: -4, width: 24, height: 24, borderRadius: 999, background: done ? RJ.yellow : RJ.teal, color: done ? RJ.teal : RJ.yellow, fontFamily: RJ.display, fontWeight: 900, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(0,104,122,0.3)" }}>
        {done ? <Ico n="check" s={13} c={RJ.teal} /> : num}
      </div>
    </div>
  );
}

function iconBtn(bg: string, fg: string, border: string): React.CSSProperties {
  return {
    width: 30,
    height: 30,
    borderRadius: 999,
    background: bg,
    border: `1.5px solid ${border}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: fg,
    flexShrink: 0,
    transition: "all 160ms",
  };
}

function NavGap({ nav }: { nav: NavInfo }) {
  const ico = nav.mode === "walk" ? "footprints" : nav.mode === "taxi" ? "car-taxi-front" : "bus";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "0 0 0 26px", padding: "8px 0" }}>
      <div style={{ width: 2, height: 26, backgroundImage: `linear-gradient(to bottom, ${RJ.tealSoft} 50%, transparent 0)`, backgroundSize: "2px 5px", backgroundRepeat: "repeat-y" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: RJ.sans, fontSize: 11, color: RJ.inkMuted }}>
        <Ico n={ico} s={13} c={RJ.teal} />
        <span>{nav.min} min</span>
        {nav.cost != null && (
          <>
            <span style={{ color: RJ.inkFaint }}>·</span>
            <span style={{ color: RJ.teal, fontWeight: 700 }}>${nav.cost}</span>
          </>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAPA
// ─────────────────────────────────────────────────────────────
function MapaTab({ day, setDay, onShare }: { day: number; setDay: (n: number) => void; onShare: () => void }) {
  const { trip } = useTrip();
  const [sel, setSel] = React.useState(1);
  React.useEffect(() => setSel(1), [day]);
  if (!trip) return null;
  const D = trip.days[Math.min(day, trip.days.length) - 1];
  const pins = D.stops.map((s) => s.pin);
  const stop = D.stops[Math.min(sel, D.stops.length) - 1];

  return (
    <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <StylizedMap pins={pins} selected={sel} onSelect={setSel} />
      </div>

      {/* Day pill */}
      <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", zIndex: 5 }}>
        <div style={{ background: RJ.vanilla, border: `1.5px solid ${RJ.teal}`, borderRadius: 999, padding: "7px 10px", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 14px rgba(14,42,48,0.12)" }}>
          <button onClick={() => setDay(Math.max(1, D.n - 1))} disabled={D.n === 1} style={{ background: "none", border: "none", cursor: D.n === 1 ? "default" : "pointer", opacity: D.n === 1 ? 0.3 : 1, display: "flex", color: RJ.teal }}>
            <Ico n="chevron-left" s={16} c={RJ.teal} />
          </button>
          <div style={{ fontFamily: RJ.display, fontWeight: 800, fontSize: 13, color: RJ.teal, letterSpacing: "-0.005em", minWidth: 86, textAlign: "center" }}>
            Día {D.n} · {D.date}
          </div>
          <button onClick={() => setDay(Math.min(trip.days.length, D.n + 1))} disabled={D.n === trip.days.length} style={{ background: "none", border: "none", cursor: D.n === trip.days.length ? "default" : "pointer", opacity: D.n === trip.days.length ? 0.3 : 1, display: "flex", color: RJ.teal }}>
            <Ico n="chevron-right" s={16} c={RJ.teal} />
          </button>
        </div>
      </div>

      {/* Offline FAB */}
      <div style={{ position: "absolute", right: 16, top: 64, zIndex: 6 }}>
        <div style={{ background: RJ.yellow, color: RJ.teal, borderRadius: 999, padding: "9px 14px", display: "flex", alignItems: "center", gap: 7, fontFamily: RJ.display, fontWeight: 800, fontSize: 11.5, cursor: "pointer", boxShadow: "0 6px 18px rgba(255,210,31,0.5), 0 2px 6px rgba(14,42,48,0.2)" }}>
          <Ico n="download" s={14} />
          Offline
        </div>
      </div>

      {/* Sheet */}
      <div style={{ position: "absolute", left: 12, right: 12, bottom: 14, zIndex: 8, background: RJ.vanilla, border: `1px solid ${RJ.line}`, borderRadius: 24, padding: 16, boxShadow: "0 -4px 20px rgba(14,42,48,0.12)" }}>
        <div style={{ width: 40, height: 4, borderRadius: 999, background: RJ.vanillaDk, margin: "0 auto 12px" }} />
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ width: 44, height: 44, borderRadius: "50% 50% 50% 0", background: RJ.yellow, color: RJ.teal, display: "flex", alignItems: "center", justifyContent: "center", transform: "rotate(-45deg)", flexShrink: 0 }}>
            <span style={{ transform: "rotate(45deg)", fontFamily: RJ.display, fontWeight: 900, fontSize: 18 }}>{sel}</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Overline color={RJ.teal}>{stop.t} · Día {D.n}</Overline>
            <div style={{ fontFamily: RJ.display, fontWeight: 800, fontSize: 17, color: RJ.teal, letterSpacing: "-0.01em", lineHeight: 1.15, marginTop: 2 }}>{stop.place}</div>
            <div style={{ fontFamily: RJ.sans, fontSize: 11.5, color: RJ.inkMuted, marginTop: 2 }}>{stop.desc}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          <Chip kind="paper" icon="clock">
            {stop.dur}
          </Chip>
          <Chip kind="pop" icon="dollar-sign">
            {stop.cost.split("·")[0].trim()}
          </Chip>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <Btn kind="primary" size="md" block icon="navigation">
            Cómo llegar
          </Btn>
          <Btn kind="softTeal" size="md" onClick={onShare} icon="share-2" />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// GASTOS
// ─────────────────────────────────────────────────────────────
function buildSummary(trip: NonNullable<ReturnType<typeof useTrip>["trip"]>): string {
  let s = `🌎 ${trip.dest}, ${trip.country} · ${trip.nights} días · ${trip.people} personas\n`;
  trip.days.forEach((d) => {
    s += `\n📅 Día ${d.n} (${d.date}) — ${d.theme}\n`;
    d.stops.forEach((st) => {
      s += `  ${st.t}  ${st.place}\n`;
    });
  });
  s += `\n💰 ≈ USD ${trip.perPerson} pp · armado con Rollin Joy`;
  return s;
}

function GastosTab() {
  const { trip, crew, expenses, addExpense, removeExpense, addCrew, balances, expensesTotal, polls, vote, saveTrip, isSaved } = useTrip();
  const [adding, setAdding] = React.useState(false);
  const [addingCrew, setAddingCrew] = React.useState(false);
  const [crewName, setCrewName] = React.useState("");
  const [toast, setToast] = React.useState<string | null>(null);
  const [showSaved, setShowSaved] = React.useState(false);
  if (!trip) return null;

  const crewById = (id: string) => crew.find((c) => c.id === id);

  const flash = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  };

  const copyText = async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      /* fall through to legacy */
    }
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  };

  const share = async (kind: string) => {
    if (kind === "PDF") {
      window.print();
      return;
    }
    const text = kind === "Link" ? window.location.href : buildSummary(trip);
    const ok = await copyText(text);
    if (ok) flash(kind === "Link" ? "Link copiado ✓" : `Resumen copiado ✓ Pegalo en ${kind}`);
    else flash("No se pudo copiar 😕");
  };

  const commitCrew = () => {
    if (crewName.trim()) addCrew(crewName);
    setCrewName("");
    setAddingCrew(false);
  };

  return (
    <Scroll style={{ padding: "0 20px 24px" }}>
      <div className="rj-anim">
        {/* Members */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "8px 0 14px", flexWrap: "wrap" }}>
          {crew.map((a, i) => (
            <div
              key={a.id}
              title={a.name}
              style={{ width: 36, height: 36, borderRadius: 999, background: a.color, color: a.fg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: RJ.display, fontWeight: 900, fontSize: 15, marginLeft: i > 0 ? -8 : 0, border: `2.5px solid ${RJ.vanilla}`, zIndex: 20 - i }}
            >
              {a.initial}
            </div>
          ))}
          <button
            onClick={() => setAddingCrew((v) => !v)}
            title="Sumar a alguien"
            style={{ width: 34, height: 34, borderRadius: 999, background: "transparent", border: `1.5px dashed ${RJ.teal}`, color: RJ.teal, display: "flex", alignItems: "center", justifyContent: "center", marginLeft: -4, cursor: "pointer" }}
          >
            <Ico n="plus" s={16} />
          </button>
          {!addingCrew && <div style={{ fontFamily: RJ.sans, fontSize: 12, color: RJ.inkMuted, marginLeft: 6 }}>{crew.map((c) => c.name).join(", ")}</div>}
        </div>

        {addingCrew && (
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            <input
              autoFocus
              value={crewName}
              onChange={(e) => setCrewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && commitCrew()}
              placeholder="Nombre de quien se suma"
              style={{ flex: 1, boxSizing: "border-box", background: "#fff", border: `1.5px solid ${RJ.teal}`, borderRadius: 12, padding: "10px 12px", fontFamily: RJ.sans, fontSize: 13.5, color: RJ.ink, outline: "none" }}
            />
            <Btn kind="primary" size="md" onClick={commitCrew}>
              Sumar
            </Btn>
          </div>
        )}

        {/* Share grid */}
        <SectionBlock title="Compartilo con tu crew">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
            {[
              { k: "WhatsApp", ico: "message-circle", bg: "#25D366", fg: "#fff" },
              { k: "Instagram", ico: "instagram", bg: "linear-gradient(135deg,#E06B4F,#8B3A5A)", fg: "#fff" },
              { k: "Link", ico: "link-2", bg: RJ.teal, fg: RJ.vanilla },
              { k: "PDF", ico: "file-down", bg: RJ.vanillaAlt, fg: RJ.teal, border: `1px solid ${RJ.line}` },
            ].map((s) => (
              <div key={s.k} onClick={() => share(s.k)} style={{ textAlign: "center", cursor: "pointer" }}>
                <div style={{ width: "100%", aspectRatio: "1", borderRadius: 18, background: s.bg, color: s.fg, display: "flex", alignItems: "center", justifyContent: "center", border: s.border, marginBottom: 6 }}>
                  <Ico n={s.ico} s={22} c={s.fg} />
                </div>
                <div style={{ fontFamily: RJ.sans, fontSize: 11, color: RJ.ink, fontWeight: 600 }}>{s.k}</div>
              </div>
            ))}
          </div>
        </SectionBlock>

        {/* Expenses */}
        <SectionBlock title="Gastos del grupo" hint={`USD ${expensesTotal} · ${expenses.length} gasto${expenses.length === 1 ? "" : "s"}`}>
          <div style={{ background: RJ.vanillaAlt, border: `1px solid ${RJ.line}`, borderRadius: 18, overflow: "hidden" }}>
            {expenses.map((x, i) => {
              const m = crewById(x.by);
              return (
                <div key={x.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderTop: i > 0 ? `1px solid ${RJ.line}` : "none" }}>
                  <div style={{ width: 30, height: 30, borderRadius: 999, background: m?.color ?? RJ.teal, color: m?.fg ?? RJ.vanilla, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: RJ.display, fontWeight: 900, fontSize: 12, flexShrink: 0 }}>
                    {m?.initial ?? "?"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: RJ.sans, fontSize: 13, fontWeight: 700, color: RJ.ink }}>{x.title}</div>
                    <div style={{ fontFamily: RJ.sans, fontSize: 11, color: RJ.inkMuted }}>
                      Pagó {m?.name ?? "?"} · ÷ {x.split.length}
                    </div>
                  </div>
                  <div style={{ fontFamily: RJ.display, fontWeight: 800, fontSize: 15, color: RJ.teal }}>${x.amount}</div>
                  <button onClick={() => removeExpense(x.id)} title="Borrar" style={{ background: "none", border: "none", cursor: "pointer", color: RJ.inkFaint, display: "flex", padding: 2 }}>
                    <Ico n="trash-2" s={15} c={RJ.inkFaint} />
                  </button>
                </div>
              );
            })}
            {expenses.length === 0 && <div style={{ padding: "16px 14px", fontFamily: RJ.sans, fontSize: 12.5, color: RJ.inkMuted }}>Todavía no cargaron gastos.</div>}
          </div>

          {adding ? (
            <AddExpenseForm
              crew={crew}
              onCancel={() => setAdding(false)}
              onAdd={(e) => {
                addExpense(e);
                setAdding(false);
              }}
            />
          ) : (
            <div style={{ marginTop: 10 }}>
              <Btn kind="ghost" size="md" block icon="plus" onClick={() => setAdding(true)}>
                Agregar gasto
              </Btn>
            </div>
          )}

          {/* Balances */}
          <div style={{ marginTop: 12, background: RJ.teal, color: RJ.vanilla, borderRadius: 18, padding: 14 }}>
            <Overline color={RJ.tealSoft}>Saldos por persona</Overline>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, gap: 10 }}>
              {balances.map((b) => {
                const neg = b.net < 0;
                const zero = b.net === 0;
                return (
                  <div key={b.member.id} style={{ textAlign: "center", flex: 1 }}>
                    <div style={{ fontFamily: RJ.sans, fontSize: 11, color: RJ.tealSoft }}>{b.member.name}</div>
                    <div style={{ fontFamily: RJ.display, fontWeight: 900, fontSize: 18, color: zero ? RJ.tealSoft : neg ? "#FFB5A6" : RJ.yellow, marginTop: 2 }}>
                      {zero ? "$0" : `${neg ? "−" : "+"}$${Math.abs(b.net)}`}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ fontFamily: RJ.sans, fontSize: 10.5, color: RJ.tealSoft, marginTop: 10 }}>+ le deben · − debe. Se salda al final del viaje.</div>
          </div>
        </SectionBlock>

        {/* Polls */}
        {polls.length > 0 && (
          <SectionBlock title="Votaciones pendientes">
            {polls.map((p) => (
              <div key={p.id} style={{ background: RJ.vanilla, borderRadius: 20, padding: 16, border: `1.5px solid ${RJ.teal}`, marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 999, background: RJ.yellow, boxShadow: `0 0 0 3px ${RJ.yellow}33` }} />
                  <Overline color={RJ.teal}>{p.label}</Overline>
                </div>
                <div style={{ fontFamily: RJ.display, fontWeight: 800, fontSize: 17, color: RJ.teal, letterSpacing: "-0.01em", lineHeight: 1.2, marginTop: 4 }}>{p.title}</div>
                <div style={{ fontFamily: RJ.sans, fontSize: 12, color: RJ.teal, opacity: 0.85, marginTop: 4 }}>{p.detail}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 12, alignItems: "center" }}>
                  <VoteBtn ico="thumbs-up" active={p.myVote === "up"} count={p.up} onClick={() => vote(p.id, "up")} />
                  <VoteBtn ico="thumbs-down" active={p.myVote === "down"} count={p.down} onClick={() => vote(p.id, "down")} />
                  <div style={{ flex: 1 }} />
                  <div style={{ fontFamily: RJ.sans, fontSize: 11, color: RJ.teal, opacity: 0.75 }}>{p.closesIn}</div>
                </div>
              </div>
            ))}
          </SectionBlock>
        )}

        <div style={{ marginTop: 14 }}>
          <JoyDice title="Tu Joy dice">Cargá los gastos a medida que pasan y al final cada uno paga lo justo — sin cuentas con servilleta.</JoyDice>
        </div>

        <div style={{ marginTop: 16 }}>
          <Btn kind="pop" size="lg" block iconRight={isSaved ? "check" : "bookmark"} onClick={() => { saveTrip(); setShowSaved(true); }}>
            {isSaved ? "Itinerario guardado" : "Guardar itinerario"}
          </Btn>
        </div>
      </div>

      {toast && (
        <div style={{ position: "fixed", left: "50%", bottom: 28, transform: "translateX(-50%)", zIndex: 400, background: RJ.ink, color: RJ.vanilla, fontFamily: RJ.sans, fontSize: 13, fontWeight: 600, padding: "11px 18px", borderRadius: 999, boxShadow: "0 10px 30px rgba(0,0,0,0.35)", maxWidth: 320, textAlign: "center" }}>
          {toast}
        </div>
      )}
      {showSaved && <SavedToast onClose={() => setShowSaved(false)} dest={trip.dest} />}
    </Scroll>
  );
}

function AddExpenseForm({ crew, onAdd, onCancel }: { crew: CrewMember[]; onAdd: (e: { by: string; title: string; amount: number; split: string[] }) => void; onCancel: () => void }) {
  const [title, setTitle] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [by, setBy] = React.useState(crew[0]?.id ?? "lu");
  const [split, setSplit] = React.useState<Set<string>>(new Set(crew.map((c) => c.id)));

  const valid = title.trim().length > 0 && Number(amount) > 0 && split.size > 0;
  const toggleSplit = (id: string) => {
    const s = new Set(split);
    if (s.has(id)) s.delete(id);
    else s.add(id);
    setSplit(s);
  };
  const inputStyle: React.CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    background: "#fff",
    border: `1.5px solid ${RJ.line}`,
    borderRadius: 12,
    padding: "10px 12px",
    fontFamily: RJ.sans,
    fontSize: 13.5,
    color: RJ.ink,
    outline: "none",
  };

  return (
    <div style={{ marginTop: 10, background: RJ.vanillaAlt, border: `1.5px solid ${RJ.teal}`, borderRadius: 18, padding: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <Overline color={RJ.teal}>Nuevo gasto</Overline>
        <button onClick={onCancel} style={{ background: "none", border: "none", cursor: "pointer", color: RJ.inkFaint, display: "flex" }}>
          <Ico n="x" s={16} c={RJ.inkFaint} />
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="¿Qué fue? Ej: Cena en Lapa" style={inputStyle} />
        <div style={{ display: "flex", gap: 8 }}>
          <input value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))} placeholder="USD" inputMode="decimal" style={{ ...inputStyle, width: 110, flexShrink: 0 }} />
          <select value={by} onChange={(e) => setBy(e.target.value)} style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}>
            {crew.map((c) => (
              <option key={c.id} value={c.id}>
                Pagó {c.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: 2 }}>
          <div style={{ fontFamily: RJ.sans, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: RJ.inkMuted, marginBottom: 6 }}>
            Dividir entre {split.size > 0 && Number(amount) > 0 ? `· $${(Number(amount) / split.size).toFixed(2)} c/u` : ""}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {crew.map((c) => {
              const on = split.has(c.id);
              return (
                <span
                  key={c.id}
                  onClick={() => toggleSplit(c.id)}
                  style={{
                    fontFamily: RJ.sans,
                    fontWeight: 700,
                    fontSize: 12,
                    padding: "6px 11px",
                    borderRadius: 999,
                    cursor: "pointer",
                    background: on ? RJ.teal : "#fff",
                    color: on ? RJ.vanilla : RJ.teal,
                    border: on ? "none" : `1.5px solid ${RJ.line}`,
                    transition: "all 140ms",
                  }}
                >
                  {c.name}
                </span>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 4, alignItems: "center" }}>
          <Btn kind="text" size="sm" onClick={onCancel}>
            Cancelar
          </Btn>
          <div style={{ flex: 1 }} />
          <button
            disabled={!valid}
            onClick={() => onAdd({ by, title: title.trim(), amount: Math.round(Number(amount)), split: [...split] })}
            style={{
              fontFamily: RJ.display,
              fontWeight: 800,
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
              padding: "9px 18px",
              fontSize: 12,
              borderRadius: 999,
              border: "none",
              background: valid ? RJ.teal : RJ.vanillaDk,
              color: valid ? RJ.vanilla : RJ.inkFaint,
              cursor: valid ? "pointer" : "default",
            }}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

function SavedToast({ onClose, dest }: { onClose: () => void; dest: string }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(14,42,48,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300, padding: 24 }}>
      <div className="rj-anim" style={{ background: RJ.vanilla, borderRadius: 28, padding: 24, maxWidth: 320, width: "100%", textAlign: "center", position: "relative", boxShadow: "0 20px 50px rgba(0,0,0,0.25)" }}>
        <img src={ASSET.mascot} style={{ width: 130, position: "absolute", top: -58, left: "50%", transform: "translateX(-50%)" }} alt="" />
        <div style={{ height: 60 }} />
        <div style={{ fontFamily: RJ.display, fontWeight: 900, fontSize: 26, color: RJ.teal, letterSpacing: "-0.02em", textTransform: "uppercase", lineHeight: 0.95 }}>
          ¡Dale que
          <br />
          vamos!
        </div>
        <div style={{ fontFamily: RJ.sans, fontSize: 13, color: RJ.inkMuted, marginTop: 10, lineHeight: 1.5 }}>
          {dest} quedó guardado. Te aviso 3 días antes para que empecés a armar la valija.
        </div>
        <div style={{ marginTop: 18 }}>
          <Btn kind="pop" block onClick={onClose}>
            Listo
          </Btn>
        </div>
      </div>
    </div>
  );
}

function VoteBtn({ ico, count, active, onClick }: { ico: string; count: number; active: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: active ? RJ.teal : RJ.vanilla,
        color: active ? RJ.yellow : RJ.teal,
        padding: "8px 14px",
        borderRadius: 999,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: RJ.display,
        fontWeight: 800,
        fontSize: 13,
        cursor: "pointer",
        border: active ? "none" : `1.5px solid ${RJ.teal}`,
        transition: "all 180ms",
      }}
    >
      <Ico n={ico} s={14} />
      <span>{count}</span>
    </div>
  );
}

function SectionBlock({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
        <div style={{ fontFamily: RJ.display, fontWeight: 800, fontSize: 16, color: RJ.teal, letterSpacing: "-0.005em" }}>{title}</div>
        {hint && <div style={{ fontFamily: RJ.sans, fontSize: 11, color: RJ.inkFaint }}>{hint}</div>}
      </div>
      {children}
    </div>
  );
}
