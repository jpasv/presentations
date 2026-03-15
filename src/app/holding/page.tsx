import type { Metadata } from "next";
import HoldingPresentation from "@/components/HoldingPresentation";

export const metadata: Metadata = {
  title: "ASSESSOR.IA | Holding",
  description: "Apresentacao comercial Assessor.IA para evolucao pos-implementacao do ClickUp.",
};

export default function HoldingPage() {
  return (
    <main className="h-full w-full bg-black">
      <HoldingPresentation />
    </main>
  );
}
