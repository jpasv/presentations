import type { Metadata } from "next";
import MaestriaV2Presentation from "@/components/MaestriaV2Presentation";

export const metadata: Metadata = {
  title: "MAESTR.IA v2 | Mentoria de Vibecoding",
  description: "Apresentação enxuta da mentoria MAESTR.IA.",
};

export default function MaestriaV2Page() {
  return (
    <main className="h-full w-full bg-black">
      <MaestriaV2Presentation />
    </main>
  );
}
