"use client";
import { motion } from "framer-motion";
import { Ticket } from "lucide-react";
import {
  cn,
  DeckBody,
  DeckMeta,
  DeckTitle,
  InfoCard,
  MediaFrame,
  SectionIntro,
  SectionShell,
} from "@/components/presentation/DeckPrimitives";

export type SummitRewardData = {
  title: string;
  subtitle: string;
  highlights: string[];
  perks: string[];
};

export type MediaAsset = {
  title: string;
  subtitle?: string;
  src?: string;
  type?: "image" | "video" | "iframe";
  frameless?: boolean;
  naturalSize?: boolean;
};

export function SummitRewardSlide({ data }: { data: SummitRewardData }) {
  return (
    <SectionShell
      width="standard"
      contentClassName="grid grid-cols-1 items-center gap-10 lg:grid-cols-12"
    >
        <div className="lg:col-span-5">
          <SectionIntro
            label="Imsersão Presencial"
            title={data.title}
            subtitle={data.subtitle}
            showRule
            className="max-w-xl"
          />

          <div className="mt-8 space-y-3">
            {data.highlights.map((item, idx) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.12 + idx * 0.08 }}
                className="flex items-start gap-3 rounded-2xl border border-[#1E1E1E] bg-[#0D0D0D] px-5 py-4"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#C9A86C]/16 bg-[#C9A86C]/[0.06]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C9A86C]" />
                </div>
                <DeckBody as="span">
                  {item}
                </DeckBody>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-5">
            <InfoCard className="relative min-h-[420px] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(201,168,108,0.22),_transparent_40%),linear-gradient(140deg,_rgba(27,27,27,0.96),_rgba(8,8,8,0.96))]" />
              <div className="relative flex h-full flex-col gap-10">
                <div>
                  <div className="mb-10 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#C9A86C]/20 bg-[#C9A86C]/10">
                      <Ticket className="h-5 w-5 text-[#C9A86C]" />
                    </div>
                    <div>
                      <p className="holding-overline">Bravy Summit</p>
                      <DeckMeta className="text-[#8E877B]">
                        Imersão sobre Gestão & Tecnologia
                      </DeckMeta>
                    </div>
                  </div>

                  <DeckTitle
                    as="p"
                    variant="feature"
                    className="max-w-[640px] text-[clamp(2.15rem,3vw,2.5rem)]"
                  >
                    Evento que vai muito além do ClickUp, vamos falar sobre como você deve gerenciar seu negócio pensando em crescimento e organização.
                  </DeckTitle>
                </div>

                <div className="mt-auto">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-px w-10 bg-gradient-to-r from-[#C9A86C]/50 to-transparent" />
                    <p className="holding-overline text-[#6D675D]">O que entra</p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    {data.perks.map((perk, idx) => (
                    <div
                      key={perk}
                      className="rounded-2xl border border-[#1E1E1E] bg-[#101010]/92 px-4 py-4"
                    >
                      <p className="holding-overline text-[#6D675D]">Pilar 0{idx + 1}</p>
                      <DeckBody className="mt-3 text-[#C8C4BC]">
                        {perk}
                      </DeckBody>
                    </div>
                    ))}
                  </div>
                </div>
              </div>
            </InfoCard>
          </div>
        </div>
    </SectionShell>
  );
}

export function MediaShowcaseSlide({
  title,
  subtitle,
  featured,
  gallery,
}: {
  title: string;
  subtitle: string;
  featured: MediaAsset;
  gallery: MediaAsset[];
}) {
  const isPortraitShowcase = featured.type === "video";

  return (
    <SectionShell width="standard">
        <SectionIntro
          label="Ambiente"
          title={title}
          subtitle={subtitle}
          className="mb-8 max-w-3xl"
        />

        <div
          className={cn(
            "mx-auto grid gap-5",
            isPortraitShowcase
              ? "w-full max-w-[1040px] items-start justify-center"
              : "h-[calc(100vh-300px)] min-h-[480px] lg:grid-cols-[1.2fr_0.82fr]",
          )}
        >
          {isPortraitShowcase ? (
            <div className="mx-auto grid w-full max-w-[1040px] gap-6 lg:grid-cols-[320px_minmax(0,560px)] lg:items-start lg:justify-center">
              <MediaFrame
                title={featured.title}
                subtitle={featured.subtitle}
                src={featured.src}
                type={featured.type ?? "video"}
                className="mx-auto h-[360px] w-full max-w-[300px] sm:h-[420px] sm:max-w-[320px] lg:h-[520px] lg:max-w-none"
                mediaClassName="object-cover object-center"
                showOverlay={false}
              />

              <div className="mx-auto grid w-full max-w-[640px] gap-5 sm:grid-cols-2 lg:max-w-[560px]">
                {gallery.map((item, idx) => (
                  <motion.div
                    key={`${item.title}-${idx}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.08 * idx }}
                  >
                    <MediaFrame
                      title={item.title}
                      subtitle={item.subtitle}
                      src={item.src}
                      type={item.type ?? "image"}
                      className="h-[200px] w-full sm:h-[220px] lg:h-[248px]"
                      showOverlay={false}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <MediaFrame
                title={featured.title}
                subtitle={featured.subtitle}
                src={featured.src}
                type={featured.type ?? "video"}
                className="h-full"
                showOverlay={false}
              />
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-2">
                {gallery.map((item, idx) => (
                  <motion.div
                    key={`${item.title}-${idx}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.08 * idx }}
                  >
                    <MediaFrame
                      title={item.title}
                      subtitle={item.subtitle}
                      src={item.src}
                      type={item.type ?? "image"}
                      className="h-full min-h-[240px]"
                      showOverlay={false}
                    />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>

    </SectionShell>
  );
}
