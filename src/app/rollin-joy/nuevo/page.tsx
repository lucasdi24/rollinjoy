"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Shell, Scroll, TopBar, BottomBar } from "@/components/rollin-joy/shell";
import { RJ, Ico, Btn } from "@/components/rollin-joy/primitives";
import { useTrip } from "@/components/rollin-joy/trip-context";
import { DESTINATIONS, BUDGETS, ALL_INTERESTS, type Interest, type BudgetKey } from "@/components/rollin-joy/data";

const MONTH_FULL = "abril";

export default function NuevoPage() {
  const router = useRouter();
  const { input, generate } = useTrip();

  const [destId, setDestId] = React.useState(input.destId);
  const [nights, setNights] = React.useState(input.nights);
  const [people, setPeople] = React.useState(input.people);
  const [budget, setBudget] = React.useState<BudgetKey>(input.budget);
  const [picked, setPicked] = React.useState<Set<Interest>>(new Set(input.interests));

  const dest = DESTINATIONS.find((d) => d.id === destId) ?? DESTINATIONS[0];
  const maxNights = dest.days.length;
  const realNights = Math.min(nights, maxNights);
  const startDay = 15;
  const dateLabel = `${startDay} al ${startDay + realNights} de ${MONTH_FULL}`;
  const estPP = dest.perPerson[budget];

  const togglePick = (k: Interest) => {
    const s = new Set(picked);
    if (s.has(k)) s.delete(k);
    else s.add(k);
    setPicked(s);
  };

  const submit = () => {
    generate({
      destId,
      dateLabel,
      startDay,
      month: "abr",
      nights: realNights,
      people,
      budget,
      interests: [...picked],
    });
    router.push("/rollin-joy/generando");
  };

  return (
    <Shell tone="vanilla">
      <TopBar onBack={() => router.push("/rollin-joy")} logo />
      <Scroll style={{ padding: "0 20px 16px" }}>
        <div className="rj-anim">
          <div style={{ fontFamily: RJ.display, fontWeight: 800, fontSize: 26, color: RJ.teal, letterSpacing: "-0.015em", lineHeight: 1.08, marginTop: 4 }}>
            Contame a dónde querés ir
            <br />y yo armo el resto <span style={{ display: "inline-block" }}>🌎</span>
          </div>
          <div style={{ fontFamily: RJ.sans, fontSize: 13, color: RJ.inkMuted, marginTop: 8, lineHeight: 1.5 }}>
            Respondé 5 cosas. En 30 segundos tenés itinerario.
          </div>

          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 18 }}>
            {/* 1 destino */}
            <QField idx="1" q="¿A dónde vas?">
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {DESTINATIONS.map((d) => {
                  const on = d.id === destId;
                  return (
                    <div
                      key={d.id}
                      onClick={() => {
                        setDestId(d.id);
                        setNights(Math.min(nights, d.days.length));
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        background: on ? "#fff" : RJ.vanillaAlt,
                        border: `1.5px solid ${on ? RJ.teal : RJ.line}`,
                        borderRadius: 16,
                        padding: "11px 13px",
                        cursor: "pointer",
                        transition: "all 160ms",
                      }}
                    >
                      <div style={{ width: 42, height: 42, borderRadius: 12, background: d.cover, flexShrink: 0, boxShadow: "inset 0 0 0 1px rgba(14,42,48,0.08)" }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: RJ.sans, fontSize: 14, fontWeight: 700, color: RJ.ink }}>
                          {d.name}, {d.country}
                        </div>
                        <div style={{ fontFamily: RJ.sans, fontSize: 11.5, color: RJ.inkMuted, lineHeight: 1.35, marginTop: 1 }}>{d.blurb}</div>
                      </div>
                      <Ico n={on ? "check" : "chevron-right"} s={18} c={on ? RJ.teal : RJ.inkFaint} />
                    </div>
                  );
                })}
              </div>
            </QField>

            {/* 2 fechas / noches */}
            <QField idx="2" q="¿Cuándo y cuántas noches?">
              <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", border: `1.5px solid ${RJ.line}`, borderRadius: 14, padding: "8px 10px 8px 14px" }}>
                <Ico n="calendar" s={18} c={RJ.teal} />
                <div style={{ flex: 1, fontFamily: RJ.sans, fontSize: 13.5, fontWeight: 600, color: RJ.ink }}>{dateLabel}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <StepperBtn on={() => setNights(Math.max(1, realNights - 1))}>−</StepperBtn>
                  <div style={{ fontFamily: RJ.sans, fontWeight: 700, fontSize: 12, color: RJ.teal, minWidth: 58, textAlign: "center" }}>
                    {realNights} {realNights === 1 ? "noche" : "noches"}
                  </div>
                  <StepperBtn on={() => setNights(Math.min(maxNights, realNights + 1))}>+</StepperBtn>
                </div>
              </div>
            </QField>

            {/* 3 personas */}
            <QField idx="3" q="¿Cuántos son?">
              <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", border: `1.5px solid ${RJ.line}`, borderRadius: 14, padding: "8px 10px 8px 14px" }}>
                <Ico n="users" s={18} c={RJ.teal} />
                <div style={{ flex: 1, fontFamily: RJ.sans, fontSize: 14, fontWeight: 600, color: RJ.ink }}>
                  {people} {people === 1 ? "persona" : "personas"}
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <StepperBtn on={() => setPeople(Math.max(1, people - 1))}>−</StepperBtn>
                  <StepperBtn on={() => setPeople(Math.min(10, people + 1))}>+</StepperBtn>
                </div>
              </div>
            </QField>

            {/* 4 budget */}
            <QField idx="4" q="¿Cuánto querés gastar?">
              <div style={{ display: "flex", gap: 6 }}>
                {BUDGETS.map((b) => {
                  const on = b.key === budget;
                  return (
                    <div
                      key={b.key}
                      onClick={() => setBudget(b.key)}
                      style={{
                        flex: 1,
                        padding: "10px 6px",
                        borderRadius: 14,
                        background: on ? RJ.teal : "#fff",
                        color: on ? RJ.vanilla : RJ.teal,
                        border: on ? "none" : `1.5px solid ${RJ.line}`,
                        textAlign: "center",
                        cursor: "pointer",
                        fontFamily: RJ.display,
                        fontWeight: 800,
                        fontSize: 13,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {b.k}
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: 8, fontFamily: RJ.sans, fontSize: 12, color: RJ.inkMuted, display: "flex", alignItems: "center", gap: 6 }}>
                <Ico n="wallet" s={13} c={RJ.teal} />
                Estimación: <b style={{ color: RJ.teal, fontWeight: 700 }}>USD {estPP} pp</b>
              </div>
            </QField>

            {/* 5 interests */}
            <QField idx="5" q="¿Qué te copa?">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {ALL_INTERESTS.map(({ k, e }) => {
                  const on = picked.has(k);
                  return (
                    <span
                      key={k}
                      onClick={() => togglePick(k)}
                      style={{
                        fontFamily: RJ.sans,
                        fontWeight: 600,
                        fontSize: 12.5,
                        padding: "8px 13px",
                        borderRadius: 999,
                        cursor: "pointer",
                        background: on ? RJ.teal : "#fff",
                        color: on ? RJ.vanilla : RJ.teal,
                        border: on ? "none" : `1.5px solid ${RJ.line}`,
                        display: "inline-flex",
                        gap: 6,
                        alignItems: "center",
                        transition: "all 160ms",
                      }}
                    >
                      <span style={{ fontSize: 13 }}>{e}</span>
                      {k}
                    </span>
                  );
                })}
              </div>
              {picked.size === 0 && (
                <div style={{ marginTop: 8, fontFamily: RJ.sans, fontSize: 11.5, color: RJ.inkFaint }}>Elegí al menos uno para que Joy afine el plan.</div>
              )}
            </QField>
          </div>
        </div>
      </Scroll>

      <BottomBar fade>
        <Btn kind="pop" size="lg" block onClick={submit} iconRight="sparkles">
          Armar mi itinerario
        </Btn>
      </BottomBar>
    </Shell>
  );
}

function QField({ idx, q, children }: { idx: string; q: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 999,
            background: RJ.yellow,
            color: RJ.teal,
            fontFamily: RJ.display,
            fontWeight: 900,
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {idx}
        </div>
        <div style={{ fontFamily: RJ.sans, fontSize: 14, fontWeight: 700, color: RJ.ink }}>{q}</div>
      </div>
      {children}
    </div>
  );
}

function StepperBtn({ children, on }: { children: React.ReactNode; on: () => void }) {
  return (
    <div
      onClick={on}
      style={{
        width: 32,
        height: 32,
        borderRadius: 999,
        background: RJ.teal,
        color: RJ.vanilla,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: RJ.display,
        fontWeight: 800,
        fontSize: 18,
        cursor: "pointer",
        userSelect: "none",
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}
