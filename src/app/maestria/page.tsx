import type { Metadata } from "next";
import MaestriaPresentation from "@/components/MaestriaPresentation";

export const metadata: Metadata = {
  title: "MAESTR.IA | Mentoria de Vibecoding",
  description: "Apresentação de vendas da mentoria MAESTR.IA — de empresário que trabalha muito para empresário que opera com inteligência.",
};

export default function MaestriaPage() {
  return (
    <main className="h-full w-full bg-black">
      <MaestriaPresentation />
    </main>
  );
}
