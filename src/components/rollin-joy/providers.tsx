"use client";

import React from "react";
import { TripProvider } from "./trip-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TripProvider>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500;600;700;800;900&family=Montserrat:wght@300;400;500;600;700;800&display=swap"
      />
      {children}
      <style>{GLOBAL_CSS}</style>
    </TripProvider>
  );
}

const GLOBAL_CSS = `
.rj-backdrop {
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  background: radial-gradient(140% 90% at 50% 25%, #0E5664 0%, #063842 60%, #02222A 100%);
  font-family: 'Montserrat', system-ui, sans-serif;
}
.rj-frame {
  position: relative;
  width: 100%;
  max-width: 480px;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #FAEFC5;
}
.rj-tone-sky { background: linear-gradient(180deg, #C8DCDC 0%, #B4CFCF 60%, #9FBFBF 100%); }
.rj-tone-vanilla { background: #FAEFC5; }
.rj-scroll {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
}
.rj-scroll::-webkit-scrollbar { width: 0; }
@media (min-width: 540px) {
  .rj-backdrop { align-items: center; padding: 20px; }
  .rj-frame {
    height: calc(100dvh - 40px);
    border-radius: 40px;
    box-shadow: 0 50px 100px rgba(0,0,0,0.5), 0 0 0 10px #14313a;
  }
}
@keyframes rj-spin { to { transform: rotate(360deg); } }
@keyframes rj-fade-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.rj-anim { animation: rj-fade-up 380ms cubic-bezier(0.22, 0.61, 0.36, 1) both; }
`;
