"use client";
import { DeckShell } from "@/components/presentation/DeckPrimitives";
import { slides, getMaestriaSlideAssets, renderMaestriaSlide } from "./MaestriaPresentation";

const REMOVE_IDS = new Set([2, 3, 6, 18, 30, 31, 32, 33]);
const slidesV2 = slides.filter((s) => !REMOVE_IDS.has(s.id));

export default function MaestriaV2Presentation() {
  return (
    <DeckShell
      brand="MAESTR.IA"
      slides={slidesV2}
      getSlideAssets={getMaestriaSlideAssets}
      preload={{ strategy: "progressive", include: ["image"] }}
      renderSlide={renderMaestriaSlide}
    />
  );
}
