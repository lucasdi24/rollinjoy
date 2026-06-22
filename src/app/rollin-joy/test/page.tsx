"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Shell, Scroll, TopBar, BottomBar } from "@/components/rollin-joy/shell";
import { RJ, Ico, Btn, Overline, Chip } from "@/components/rollin-joy/primitives";
import { CoverScene } from "@/components/rollin-joy/scenes";
import { useTrip } from "@/components/rollin-joy/trip-context";
import { QUIZ, DESTINATIONS, recommendFromQuiz, type QuizOption, type QuizResult } from "@/components/rollin-joy/data";

const MONTH_FULL = "abril";

export default function TestPage() {
  const router = useRouter();
  const { input, generate } = useTrip();

  const [step, setStep] = React.useState(0); // 0..QUIZ.length-1, then result
  const [answers, setAnswers] = React.useState<(QuizOption | null)[]>(() => QUIZ.map(() => null));
  const [chosenId, setChosenId] = React.useState<string | null>(null);

  const isResult = step >= QUIZ.length;

  const pick = (opt: QuizOption) => {
    const next = [...answers];
    next[step] = opt;
    setAnswers(next);
    window.setTimeout(() => setStep((s) => s + 1), 180);
  };

  const back = () => {
    if (step === 0) router.push("/rollin-joy/nuevo");
    else setStep((s) => s - 1);
  };

  const result: QuizResult | null = isResult ? recommendFromQuiz(answers.filter(Boolean) as QuizOption[]) : null;
  const finalId = chosenId ?? result?.destId ?? null;
  const dest = DESTINATIONS.find((d) => d.id === finalId) ?? null;

  const armar = () => {
    if (!result || !dest) return;
    const nights = Math.min(4, dest.days.length);
    generate({
      destId: dest.id,
      dateLabel: `15 al ${15 + nights} de ${MONTH_FULL}`,
      startDay: 15,
      month: "abr",
      nights,
      people: input.people || 2,
      budget: result.budget,
      interests: result.interests,
    });
    router.push("/rollin-joy/generando");
  };

  // ── Result screen ──────────────────────────────────────────
  if (isResult && result && dest) {
    const alternatives = result.scores.filter((s) => s.dest.id !== finalId).slice(0, 3);
    return (
      <Shell tone="vanilla">
        <TopBar onBack={() => setStep(QUIZ.length - 1)} title="Tu match" />
        <Scroll style={{ padding: "0 0 24px" }}>
          <div className="rj-anim" key={finalId}>
            <div style={{ padding: "0 16px" }}>
              <div style={{ position: "relative" }}>
                <CoverScene cover={dest.cover} rio={dest.rio} h={240} />
                <div style={{ position: "absolute", top: 12, left: 16 }}>
                  <span style={{ fontFamily: RJ.sans, fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", background: RJ.yellow, color: RJ.teal, padding: "5px 10px", borderRadius: 999 }}>
                    Joy te recomienda
                  </span>
                </div>
                <div style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
                  <div style={{ fontFamily: RJ.sans, fontSize: 12, fontWeight: 700, color: RJ.vanilla, opacity: 0.95 }}>
                    {dest.flag} {dest.country} · {dest.region}
                  </div>
                  <div style={{ fontFamily: RJ.display, fontWeight: 900, fontSize: 32, color: RJ.vanilla, letterSpacing: "-0.02em", lineHeight: 0.95, textTransform: "uppercase", marginTop: 6, textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
                    {dest.name}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ padding: "16px 20px 0" }}>
              <div style={{ fontFamily: RJ.sans, fontSize: 13.5, color: RJ.ink, lineHeight: 1.5 }}>{dest.blurb}</div>

              <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                <Chip kind="pop" icon="dollar-sign">
                  desde USD {dest.perPerson[result.budget]} pp
                </Chip>
                <Chip kind="paper" icon="map-pin">
                  {dest.country}
                </Chip>
              </div>

              <div style={{ marginTop: 16 }}>
                <Overline color={RJ.teal}>Pensado para vos</Overline>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}>
                  {result.interests.map((i) => (
                    <Chip key={i} kind="soft">
                      {i}
                    </Chip>
                  ))}
                </div>
              </div>

              {alternatives.length > 0 && (
                <div style={{ marginTop: 20 }}>
                  <Overline color={RJ.inkMuted}>Otras que te pueden gustar</Overline>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                    {alternatives.map((s) => (
                      <div
                        key={s.dest.id}
                        onClick={() => setChosenId(s.dest.id)}
                        style={{ display: "flex", alignItems: "center", gap: 12, background: RJ.vanillaAlt, border: `1px solid ${RJ.line}`, borderRadius: 14, padding: "9px 12px", cursor: "pointer" }}
                      >
                        <div style={{ position: "relative", flexShrink: 0 }}>
                          <div style={{ width: 38, height: 38, borderRadius: 10, background: s.dest.cover, boxShadow: "inset 0 0 0 1px rgba(14,42,48,0.08)" }} />
                          <span style={{ position: "absolute", bottom: -3, right: -3, fontSize: 13 }}>{s.dest.flag}</span>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontFamily: RJ.sans, fontSize: 13, fontWeight: 700, color: RJ.ink }}>{s.dest.name}</div>
                          <div style={{ fontFamily: RJ.sans, fontSize: 11, color: RJ.inkMuted }}>desde USD {s.dest.perPerson[result.budget]} pp</div>
                        </div>
                        <Ico n="arrow-right" s={16} c={RJ.teal} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  setChosenId(null);
                  setAnswers(QUIZ.map(() => null));
                  setStep(0);
                }}
                style={{ width: "100%", marginTop: 18, background: "transparent", border: "none", cursor: "pointer", fontFamily: RJ.sans, fontSize: 12.5, color: RJ.teal, fontWeight: 600 }}
              >
                ↺ Rehacer el test
              </button>
            </div>
          </div>
        </Scroll>

        <BottomBar fade>
          <Btn kind="pop" size="lg" block onClick={armar} iconRight="sparkles">
            Armá este viaje
          </Btn>
        </BottomBar>
      </Shell>
    );
  }

  // ── Question screen ────────────────────────────────────────
  const Q = QUIZ[step];
  const selected = answers[step];
  return (
    <Shell tone="vanilla">
      <TopBar onBack={back} title="¿Qué viaje sos?" />
      {/* progress */}
      <div style={{ padding: "0 20px 12px", display: "flex", gap: 6, flexShrink: 0 }}>
        {QUIZ.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 5, borderRadius: 999, background: i <= step ? RJ.teal : RJ.vanillaDk, transition: "background 200ms" }} />
        ))}
      </div>

      <Scroll style={{ padding: "8px 20px 16px" }}>
        <div className="rj-anim" key={Q.id}>
          <Overline color={RJ.inkMuted}>
            Pregunta {step + 1} de {QUIZ.length}
          </Overline>
          <div style={{ fontFamily: RJ.display, fontWeight: 800, fontSize: 25, color: RJ.teal, letterSpacing: "-0.015em", lineHeight: 1.12, marginTop: 6 }}>{Q.q}</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
            {Q.options.map((opt) => {
              const on = selected?.label === opt.label;
              return (
                <button
                  key={opt.label}
                  onClick={() => pick(opt)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    background: on ? RJ.teal : "#fff",
                    color: on ? RJ.vanilla : RJ.ink,
                    border: `1.5px solid ${on ? RJ.teal : RJ.line}`,
                    borderRadius: 16,
                    padding: "14px 16px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 140ms",
                  }}
                >
                  <span style={{ fontSize: 24, lineHeight: 1 }}>{opt.emoji}</span>
                  <span style={{ flex: 1, fontFamily: RJ.sans, fontSize: 14.5, fontWeight: 600 }}>{opt.label}</span>
                  <Ico n="chevron-right" s={18} c={on ? RJ.yellow : RJ.inkFaint} />
                </button>
              );
            })}
          </div>
        </div>
      </Scroll>
    </Shell>
  );
}
