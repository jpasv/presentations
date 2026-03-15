"use client";

import { useState } from "react";
import PhoneModal from "@/components/PhoneModal";
import MaestriaV3Presentation from "@/components/MaestriaV3Presentation";

export default function MaestriaV3Page() {
  const [unlocked, setUnlocked] = useState(false);
  return (
    <main className="w-full bg-[#080808]">
      {!unlocked && <PhoneModal onSuccess={() => setUnlocked(true)} />}
      <MaestriaV3Presentation />
    </main>
  );
}
