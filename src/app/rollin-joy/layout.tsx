import type { Metadata } from "next";
import Providers from "@/components/rollin-joy/providers";

export const metadata: Metadata = {
  title: "Rollin Joy — Armá tu viaje",
  description: "Contá a dónde vas y Joy te arma un itinerario día a día con costos, mapa y gastos compartidos.",
};

export default function RollinJoyLayout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
