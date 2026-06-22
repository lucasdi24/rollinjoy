import { redirect } from "next/navigation";

export default function Home() {
  // Rollin Joy lives at /rollin-joy — send the root straight there.
  redirect("/rollin-joy");
}
