"use client";

import React from "react";
import { RJ } from "./primitives";
import { generateTrip, defaultInput, type Trip, type TripInput } from "./data";

export interface CrewMember {
  id: string;
  initial: string;
  name: string;
  color: string;
  fg: string;
  you?: boolean;
}

export interface Expense {
  id: string;
  by: string; // crew id
  title: string;
  amount: number;
  split: string[]; // crew ids
}

export interface Poll {
  id: string;
  day: number;
  label: string;
  title: string;
  detail: string;
  closesIn: string;
  up: number;
  down: number;
  myVote: "up" | "down" | null;
}

export interface Balance {
  member: CrewMember;
  net: number; // + means others owe them, - means they owe
}

const CREW: CrewMember[] = [
  { id: "lu", initial: "L", name: "Lu", color: RJ.yellow, fg: RJ.teal, you: true },
  { id: "ana", initial: "A", name: "Ana", color: RJ.teal, fg: RJ.yellow },
  { id: "mati", initial: "M", name: "Mati", color: RJ.tealSoft, fg: RJ.teal },
];

const CREW_PALETTE: { color: string; fg: string }[] = [
  { color: RJ.tealMid, fg: RJ.vanilla },
  { color: RJ.yellowSoft, fg: RJ.teal },
  { color: RJ.tealDk, fg: RJ.yellow },
  { color: RJ.vanillaDk, fg: RJ.teal },
];

export type StopStatus = "done" | "skip";

const SEED_EXPENSES: Expense[] = [
  { id: "e1", by: "ana", title: "Uber al hotel", amount: 25, split: ["lu", "ana", "mati"] },
  { id: "e2", by: "lu", title: "Caipis en Arpoador", amount: 18, split: ["lu", "ana", "mati"] },
  { id: "e3", by: "mati", title: "Entradas Pan de Azúcar", amount: 30, split: ["lu", "ana", "mati"] },
];

const SEED_POLLS: Poll[] = [
  {
    id: "p1",
    day: 3,
    label: "Día 3 · cena",
    title: "¿Cambiamos el restó del Día 3?",
    detail: "Ana propone Aprazível en Santa Teresa (~USD 45 pp)",
    closesIn: "Cierra en 2h",
    up: 2,
    down: 1,
    myVote: null,
  },
];

interface TripState {
  trip: Trip | null;
  input: TripInput;
  crew: CrewMember[];
  expenses: Expense[];
  polls: Poll[];
  stopState: Record<string, StopStatus>; // key `${day}:${idx}`
  savedTrips: Trip[];
}

interface TripCtx extends TripState {
  ready: boolean;
  generate: (input: TripInput) => Trip;
  reset: () => void;
  addExpense: (e: Omit<Expense, "id">) => void;
  removeExpense: (id: string) => void;
  addCrew: (name: string) => void;
  vote: (pollId: string, choice: "up" | "down") => void;
  setStop: (day: number, idx: number, status: StopStatus) => void;
  saveTrip: () => void;
  openSaved: (generatedAt: number) => void;
  isSaved: boolean;
  balances: Balance[];
  expensesTotal: number;
}

const Ctx = React.createContext<TripCtx | null>(null);
const KEY = "rj_app_v1";

function computeBalances(crew: CrewMember[], expenses: Expense[]): Balance[] {
  const paid: Record<string, number> = {};
  const owed: Record<string, number> = {};
  crew.forEach((c) => {
    paid[c.id] = 0;
    owed[c.id] = 0;
  });
  expenses.forEach((e) => {
    paid[e.by] = (paid[e.by] ?? 0) + e.amount;
    const share = e.amount / (e.split.length || 1);
    e.split.forEach((id) => {
      owed[id] = (owed[id] ?? 0) + share;
    });
  });
  return crew.map((c) => ({ member: c, net: Math.round((paid[c.id] ?? 0) - (owed[c.id] ?? 0)) }));
}

export function TripProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<TripState>({
    trip: null,
    input: defaultInput(),
    crew: CREW,
    expenses: SEED_EXPENSES,
    polls: SEED_POLLS,
    stopState: {},
    savedTrips: [],
  });
  const [ready, setReady] = React.useState(false);

  // hydrate
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<TripState>;
        setState((s) => ({
          trip: parsed.trip ?? s.trip,
          input: parsed.input ?? s.input,
          crew: parsed.crew ?? s.crew,
          expenses: parsed.expenses ?? s.expenses,
          polls: parsed.polls ?? s.polls,
          stopState: parsed.stopState ?? s.stopState,
          savedTrips: parsed.savedTrips ?? s.savedTrips,
        }));
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  // persist
  React.useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, ready]);

  const generate = React.useCallback((input: TripInput) => {
    const trip = generateTrip(input);
    trip.generatedAt = Date.now();
    setState((s) => ({ ...s, trip, input, expenses: SEED_EXPENSES, polls: SEED_POLLS, stopState: {}, crew: CREW }));
    return trip;
  }, []);

  const reset = React.useCallback(() => {
    setState((s) => ({ ...s, trip: null, input: defaultInput(s.input.destId) }));
  }, []);

  const setStop = React.useCallback((day: number, idx: number, status: StopStatus) => {
    const key = `${day}:${idx}`;
    setState((s) => {
      const next = { ...s.stopState };
      if (next[key] === status) delete next[key];
      else next[key] = status;
      return { ...s, stopState: next };
    });
  }, []);

  const addCrew = React.useCallback((name: string) => {
    const clean = name.trim();
    if (!clean) return;
    setState((s) => {
      const pal = CREW_PALETTE[(s.crew.length - 3 + CREW_PALETTE.length) % CREW_PALETTE.length];
      const member: CrewMember = {
        id: `c${Date.now()}`,
        initial: clean[0].toUpperCase(),
        name: clean,
        color: pal.color,
        fg: pal.fg,
      };
      return { ...s, crew: [...s.crew, member] };
    });
  }, []);

  const saveTrip = React.useCallback(() => {
    setState((s) => {
      if (!s.trip) return s;
      const exists = s.savedTrips.some((t) => t.generatedAt === s.trip!.generatedAt);
      const savedTrips = exists ? s.savedTrips : [s.trip, ...s.savedTrips].slice(0, 8);
      return { ...s, savedTrips };
    });
  }, []);

  const openSaved = React.useCallback((generatedAt: number) => {
    setState((s) => {
      const t = s.savedTrips.find((x) => x.generatedAt === generatedAt);
      if (!t) return s;
      return { ...s, trip: t, expenses: SEED_EXPENSES, polls: SEED_POLLS, stopState: {}, crew: CREW };
    });
  }, []);

  const addExpense = React.useCallback((e: Omit<Expense, "id">) => {
    setState((s) => ({ ...s, expenses: [...s.expenses, { ...e, id: `e${Date.now()}` }] }));
  }, []);

  const removeExpense = React.useCallback((id: string) => {
    setState((s) => ({ ...s, expenses: s.expenses.filter((x) => x.id !== id) }));
  }, []);

  const vote = React.useCallback((pollId: string, choice: "up" | "down") => {
    setState((s) => ({
      ...s,
      polls: s.polls.map((p) => {
        if (p.id !== pollId) return p;
        // remove previous vote
        let up = p.up - (p.myVote === "up" ? 1 : 0);
        let down = p.down - (p.myVote === "down" ? 1 : 0);
        const myVote = p.myVote === choice ? null : choice;
        if (myVote === "up") up += 1;
        if (myVote === "down") down += 1;
        return { ...p, up, down, myVote };
      }),
    }));
  }, []);

  const balances = React.useMemo(() => computeBalances(state.crew, state.expenses), [state.crew, state.expenses]);
  const expensesTotal = React.useMemo(() => state.expenses.reduce((a, e) => a + e.amount, 0), [state.expenses]);
  const isSaved = React.useMemo(
    () => (state.trip ? state.savedTrips.some((t) => t.generatedAt === state.trip!.generatedAt) : false),
    [state.trip, state.savedTrips]
  );

  const value: TripCtx = {
    ...state,
    ready,
    generate,
    reset,
    addExpense,
    removeExpense,
    addCrew,
    vote,
    setStop,
    saveTrip,
    openSaved,
    isSaved,
    balances,
    expensesTotal,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTrip() {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("useTrip must be used within TripProvider");
  return c;
}
