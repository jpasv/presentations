"use client";
import React, { type CSSProperties } from "react";
import Image from "next/image";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { ShieldCheck } from "lucide-react";
import { slides } from "./MaestriaPresentation";

// ─── V3 slide set (same filter as V2) ─────────────────────────────────────

const REMOVE_IDS = new Set([2, 3, 6, 18, 19, 20, 30, 31, 32, 33]);
const slidesV3 = slides.filter((s) => !REMOVE_IDS.has(s.id));

// ─── Design tokens ────────────────────────────────────────────────────────

const gold = "#C9A86C";
const bgPage = "#080808";
const bgCard = "#0D0D0D";
const borderBase = "#1E1E1E";
const textMain = "#F2EFE9";
const textMuted = "#9C9589";
const textBody = "#DDD7CD";

const goldGradient = `linear-gradient(to right, ${gold}, transparent)`;

// ─── Background variants ───────────────────────────────────────────────────

const bgDefault: CSSProperties = { backgroundColor: "#080808" }
const bgElevated: CSSProperties = { backgroundColor: "#131313" }
const bgWarm: CSSProperties = { backgroundColor: "#130F08" }
const bgGlowTopRight: CSSProperties = {
  backgroundColor: "#080808",
  backgroundImage: "radial-gradient(ellipse at 90% -10%, rgba(201,168,108,0.28) 0%, transparent 55%)",
}
const bgGlowCenter: CSSProperties = {
  backgroundColor: "#080808",
  backgroundImage: "radial-gradient(ellipse at 50% 40%, rgba(201,168,108,0.22) 0%, transparent 60%)",
}
const bgGlowBottom: CSSProperties = {
  backgroundColor: "#080808",
  backgroundImage: "radial-gradient(ellipse at 20% 95%, rgba(201,168,108,0.32) 0%, transparent 50%)",
}

const slideBackground: Record<number, CSSProperties> = {
  1:  bgGlowTopRight,
  4:  bgDefault,
  5:  bgWarm,
  7:  bgWarm,
  8:  bgDefault,
  9:  bgDefault,
  10: bgElevated,
  11: bgDefault,
  12: bgElevated,
  13: bgDefault,
  14: bgElevated,
  19: bgWarm,
  20: bgDefault,
  21: bgElevated,
  22: bgDefault,
  23: bgElevated,
  24: bgDefault,
  25: bgElevated,
  26: bgDefault,
  27: bgElevated,
  28: bgDefault,
  29: bgGlowCenter,
  34: bgElevated,
  35: bgDefault,
  36: bgWarm,
  37: bgGlowBottom,
};
const tooltipStyle = {
  backgroundColor: bgCard,
  border: `1px solid ${borderBase}`,
  borderRadius: 8,
  fontSize: 12,
  color: textMain,
};

// ─── Chart data ────────────────────────────────────────────────────────────

const ceilingData = [
  { name: "Fundador\né a op.", crescimento: 6 },
  { name: "Fundador\nsupervisiona", crescimento: 18 },
  { name: "Processos\ndocumentados", crescimento: 41 },
  { name: "Op.\nsistematizada", crescimento: 89 },
];

// ─── Micro-components ─────────────────────────────────────────────────────

function Sec({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`px-5 py-12 border-b border-[#1A1A1A] ${className}`}
    >
      {children}
    </section>
  );
}

function Overline({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-3 text-[0.68rem] tracking-[0.25em] uppercase"
      style={{ color: gold, opacity: 0.78 }}
    >
      {children}
    </p>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-serif font-light text-[1.75rem] leading-[1.15] tracking-[-0.03em]"
      style={{ color: textMain }}
    >
      {children}
    </h2>
  );
}

function Body({ children, small = false }: { children: React.ReactNode; small?: boolean }) {
  return (
    <p
      className={`leading-[1.65] ${small ? "text-[0.82rem]" : "text-[0.92rem]"}`}
      style={{ color: textBody }}
    >
      {children}
    </p>
  );
}

function GoldRule() {
  return (
    <div className="mb-5 h-px w-12" style={{ background: goldGradient }} />
  );
}

function GoldDot() {
  return (
    <span
      className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full"
      style={{ backgroundColor: gold }}
    />
  );
}

function Card({
  children,
  accent = false,
  className = "",
}: {
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl p-4 ${className}`}
      style={{
        backgroundColor: bgCard,
        border: `1px solid ${accent ? gold + "40" : borderBase}`,
      }}
    >
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <div key={item} className="flex items-start gap-2">
          <GoldDot />
          <Body>{item}</Body>
        </div>
      ))}
    </div>
  );
}

// ─── Slide renderers ───────────────────────────────────────────────────────

type Slide = (typeof slidesV3)[number];

function renderSlide(slide: Slide): React.ReactNode {
  switch (slide.type) {
    // ── COVER ──────────────────────────────────────────────────────────────
    case "cover":
      return (
        <section
          className="flex min-h-[100svh] flex-col justify-center border-b border-[#1A1A1A] px-5 py-16"
        >
          <Overline>{slide.overline}</Overline>
          <h1
            className="mb-5 font-serif font-light text-[4.5rem] leading-none tracking-[-0.05em]"
            style={{ color: textMain }}
          >
            {slide.title}
          </h1>
          <GoldRule />
          <p
            className="mb-8 text-[1rem] leading-[1.6]"
            style={{ color: textBody }}
          >
            {slide.subtitle}
          </p>
          <span
            className="inline-block self-start rounded-full px-4 py-1.5 text-[0.65rem] tracking-[0.2em] uppercase"
            style={{ border: `1px solid ${gold}50`, color: gold }}
          >
            {slide.badge}
          </span>
        </section>
      );

    // ── STATEMENT ──────────────────────────────────────────────────────────
    case "statement":
      return (
        <Sec>
          {slide.overline && <Overline>{slide.overline}</Overline>}
          <H2>{slide.title}</H2>
          {slide.showCeilingChart && (
            <div className="my-6 h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ceilingData}
                  margin={{ top: 4, right: 0, left: -24, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E1E1E" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: textMuted, fontSize: 9 }}
                    interval={0}
                  />
                  <YAxis tick={{ fill: textMuted, fontSize: 9 }} />
                  <RechartsTooltip contentStyle={tooltipStyle} />
                  <Bar
                    dataKey="crescimento"
                    fill={gold}
                    opacity={0.85}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          <div className="mt-4">
            <Body>{slide.body}</Body>
          </div>
        </Sec>
      );

    // ── VOLTA ──────────────────────────────────────────────────────────────
    case "volta": {
      if (slide.tags) {
        return (
          <Sec>
            <H2>{slide.line1}</H2>
            {slide.tagLabel && (
              <p
                className="mt-4 mb-3 text-[0.68rem] tracking-[0.2em] uppercase"
                style={{ color: textMuted }}
              >
                {slide.tagLabel}
              </p>
            )}
            <div className="grid grid-cols-2 gap-2">
              {slide.tags.map((tag) => (
                <div
                  key={tag}
                  className="rounded-xl px-3 py-2.5 text-[0.78rem] leading-tight"
                  style={{
                    border: `1px solid ${borderBase}`,
                    color: textBody,
                    backgroundColor: bgCard,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </Sec>
        );
      }
      if (slide.subtitle) {
        return (
          <Sec>
            <h2
              className="font-serif font-light text-[2rem] leading-[1.1] tracking-[-0.03em]"
              style={{ color: textMain }}
            >
              {slide.line1}
            </h2>
            {slide.line2 && (
              <h2
                className="mb-5 font-serif font-light text-[2rem] leading-[1.1] tracking-[-0.03em]"
                style={{ color: slide.line2Gold ? gold : textMain }}
              >
                {slide.line2}
              </h2>
            )}
            <GoldRule />
            <Body>{slide.subtitle}</Body>
          </Sec>
        );
      }
      return (
        <Sec className="flex items-center">
          <div>
            <h2
              className="font-serif font-light text-[2.25rem] leading-[1.1] tracking-[-0.03em]"
              style={{ color: textMain }}
            >
              {slide.line1}
            </h2>
            {slide.line2 && (
              <h2
                className="font-serif font-light text-[2.25rem] leading-[1.1] tracking-[-0.03em]"
                style={{ color: slide.line2Gold ? gold : textMain }}
              >
                {slide.line2}
              </h2>
            )}
          </div>
        </Sec>
      );
    }

    // ── PROOF INTRO ────────────────────────────────────────────────────────
    case "proof-intro":
      return (
        <section
          className="px-5 py-16 border-b border-[#1A1A1A]"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(201,168,108,0.13) 0%, transparent 70%), #0A0A0A",
          }}
        >
          <p
            className="mb-6 font-serif font-light text-[1.55rem] leading-[1.4] tracking-[-0.02em]"
            style={{ color: textMain }}
          >
            {slide.body}
          </p>
          <div className="h-px w-10" style={{ background: goldGradient }} />
        </section>
      );

    // ── CASE STUDY ─────────────────────────────────────────────────────────
    case "case-study":
      return (
        <Sec>
          <p
            className="mb-2 text-[0.62rem] tracking-[0.25em] uppercase"
            style={{ color: gold }}
          >
            {slide.caseType}
          </p>
          <H2>{slide.title}</H2>
          <div className="my-4 h-px w-12" style={{ background: goldGradient }} />
          {slide.imageSrc && (
            <div
              className="relative mb-5 w-full overflow-hidden rounded-2xl"
              style={{
                aspectRatio: "16/9",
                border: `1px solid ${borderBase}`,
              }}
            >
              <Image
                src={slide.imageSrc}
                alt={slide.title}
                fill
                className="object-contain"
              />
            </div>
          )}
          <Body>{slide.description}</Body>
          <div className="mt-4 flex flex-col gap-2">
            {slide.outcomes.map((o) => (
              <div key={o} className="flex items-start gap-2">
                <GoldDot />
                <Body>{o}</Body>
              </div>
            ))}
          </div>
        </Sec>
      );

    // ── AGENTS ORG ─────────────────────────────────────────────────────────
    case "agents-org":
      return (
        <Sec>
          <Overline>{slide.overline}</Overline>
          <H2>{slide.title}</H2>
          <div className="mt-6 flex flex-col gap-3">
            {(
              [
                {
                  label: "ORQUESTRADOR",
                  desc: "O cérebro da operação. Define prioridades e distribui tarefas para os líderes de squad.",
                  accent: true,
                },
                {
                  label: "LÍDERES DE SQUAD",
                  desc: "Coordenam grupos de agentes especializados por área — Atendimento, Comercial, Operações.",
                  accent: false,
                },
                {
                  label: "AGENTES",
                  desc: "Executam com autonomia dentro do squad. Cada agente tem suas próprias Skills, Rotinas e Tarefas.",
                  accent: false,
                },
              ] as const
            ).map((layer) => (
              <Card key={layer.label} accent={layer.accent}>
                <p
                  className="mb-1.5 text-[0.62rem] tracking-widest uppercase"
                  style={{ color: gold }}
                >
                  {layer.label}
                </p>
                <Body small>{layer.desc}</Body>
              </Card>
            ))}
          </div>
        </Sec>
      );

    // ── IMPACT ─────────────────────────────────────────────────────────────
    case "impact":
      return (
        <Sec>
          <Overline>{slide.overline}</Overline>
          <H2>{slide.title}</H2>
          <div className="mt-6 flex flex-col gap-3">
            {slide.cards.map((c) => {
              const Icon = c.icon;
              return (
                <Card key={c.metric}>
                  <div className="mb-2 flex items-center gap-2">
                    <Icon className="h-4 w-4 text-[#C9A86C]" />
                    <span
                      className="text-[0.62rem] tracking-widest uppercase"
                      style={{ color: gold }}
                    >
                      {c.metric}
                    </span>
                  </div>
                  <p
                    className="mb-1 text-[1rem] font-light"
                    style={{ color: textMain }}
                  >
                    {c.heading}
                  </p>
                  <Body small>{c.description}</Body>
                </Card>
              );
            })}
          </div>
        </Sec>
      );

    // ── DELIVERABLES OVERVIEW ──────────────────────────────────────────────
    case "deliverables-over":
      return (
        <Sec>
          <Overline>{slide.overline}</Overline>
          <H2>{slide.title}</H2>
          <div className="mt-6 grid grid-cols-3 gap-2">
            {slide.cards.map((c) => {
              const Icon = c.icon;
              return (
                <Card
                  key={c.label}
                  className="flex flex-col items-center gap-2 py-5 text-center"
                >
                  <Icon className="h-5 w-5 text-[#C9A86C]" />
                  <span
                    className="text-[0.7rem] leading-tight"
                    style={{ color: textMuted }}
                  >
                    {c.label}
                  </span>
                </Card>
              );
            })}
          </div>
        </Sec>
      );

    // ── DELIVERABLES SECTION ───────────────────────────────────────────────
    case "deliverables-section": {
      const ModIcon = slide.icon;
      return (
        <Sec>
          <div className="mb-4 flex items-center gap-2.5">
            <ModIcon className="h-4 w-4 text-[#C9A86C]" />
            <span
              className="text-[0.62rem] tracking-widest uppercase"
              style={{ color: gold }}
            >
              {slide.moduleNumber}
            </span>
          </div>
          <H2>{slide.title}</H2>
          <p
            className="mt-1.5 mb-5 text-[0.88rem] leading-[1.5]"
            style={{ color: textMuted }}
          >
            {slide.subtitle}
          </p>
          {slide.buildCards ? (
            <div className="flex flex-col gap-3">
              {slide.buildCards.map((bc) => (
                <Card key={bc.title}>
                  <p
                    className="mb-1.5 text-[0.62rem] tracking-widest uppercase"
                    style={{ color: gold }}
                  >
                    {bc.title}
                  </p>
                  <Body small>{bc.description}</Body>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              {slide.items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-2.5 border-b py-3 last:border-b-0"
                  style={{ borderColor: borderBase }}
                >
                  {item.category && (
                    <span
                      className="shrink-0 pt-[1px] text-[0.58rem] tracking-wide uppercase"
                      style={{ color: gold }}
                    >
                      {item.category}
                    </span>
                  )}
                  <Body small>{item.label}</Body>
                </div>
              ))}
              {slide.badge && (
                <span
                  className="mt-3 inline-block self-start rounded-full px-3 py-1 text-[0.62rem] tracking-wide uppercase"
                  style={{ border: `1px solid ${gold}40`, color: gold }}
                >
                  {slide.badge}
                </span>
              )}
            </div>
          )}
        </Sec>
      );
    }

    // ── BONUS ──────────────────────────────────────────────────────────────
    case "bonus":
      return (
        <Sec>
          <p
            className="mb-1 text-[0.62rem] tracking-widest uppercase"
            style={{ color: gold }}
          >
            {slide.bonusNumber}
          </p>
          <H2>{slide.title}</H2>
          <p
            className="mt-1.5 mb-5 text-[0.88rem] leading-[1.5]"
            style={{ color: textMuted }}
          >
            {slide.subtitle}
          </p>
          <Card>
            <div className="flex flex-col">
              {slide.items.map((item) => (
                <div
                  key={item.label}
                  className="border-b py-3 last:border-b-0"
                  style={{ borderColor: borderBase }}
                >
                  <p className="text-[0.9rem]" style={{ color: textMain }}>
                    {item.label}
                  </p>
                  {item.description && (
                    <p
                      className="mt-0.5 text-[0.78rem] leading-[1.5]"
                      style={{ color: textMuted }}
                    >
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </Sec>
      );

    // ── GUARANTEE ─────────────────────────────────────────────────────────
    case "guarantee":
      return (
        <Sec className="text-center">
          <div className="mb-4 flex justify-center">
            <ShieldCheck className="h-11 w-11" style={{ color: gold }} />
          </div>
          <Overline>{slide.overline}</Overline>
          <p
            className="text-[0.98rem] leading-[1.65]"
            style={{ color: textBody }}
          >
            {slide.text}
          </p>
        </Sec>
      );

    // ── INVESTMENT ─────────────────────────────────────────────────────────
    case "investment":
      return (
        <Sec>
          <Overline>{slide.overline}</Overline>
          <H2>{slide.title}</H2>
          <p
            className="mt-1.5 mb-6 text-[0.88rem] leading-[1.5]"
            style={{ color: textMuted }}
          >
            {slide.subtitle}
          </p>
          <Card accent>
            <div
              className="border-b pb-4"
              style={{ borderColor: borderBase + "80" }}
            >
              <p
                className="mb-1 text-[0.62rem] tracking-widest uppercase"
                style={{ color: textMuted }}
              >
                {slide.entryLabel}
              </p>
              <p
                className="font-serif font-light text-[1.6rem]"
                style={{ color: textMain }}
              >
                {slide.entryValue}
              </p>
            </div>
            <div
              className="border-b py-4"
              style={{ borderColor: borderBase + "80" }}
            >
              <p
                className="mb-1 text-[0.62rem] tracking-widest uppercase"
                style={{ color: textMuted }}
              >
                {slide.monthlyLabel}
              </p>
              <p
                className="font-serif font-light text-[1.6rem]"
                style={{ color: textMain }}
              >
                {slide.monthlyValue}
              </p>
              <p className="mt-1 text-[0.72rem]" style={{ color: textMuted }}>
                {slide.note}
              </p>
            </div>
            <div className="pt-4">
              <p
                className="mb-1 text-[0.62rem] tracking-widest uppercase"
                style={{ color: textMuted }}
              >
                Total
              </p>
              <p
                className="font-serif font-light text-[2rem]"
                style={{ color: gold }}
              >
                R$17.000
              </p>
            </div>
          </Card>
        </Sec>
      );

    // ── PAYMENT STEPS ──────────────────────────────────────────────────────
    case "payment-steps":
      return (
        <Sec>
          <Overline>{slide.overline}</Overline>
          <H2>{slide.title}</H2>
          <div className="mt-6 flex flex-col gap-3">
            {slide.steps.map((step) => (
              <Card key={step.number}>
                <div className="flex items-start gap-3">
                  <span
                    className="w-7 shrink-0 font-serif font-light text-[1.2rem]"
                    style={{ color: gold }}
                  >
                    {step.number}
                  </span>
                  <div>
                    <p
                      className="mb-0.5 text-[0.72rem] tracking-wide uppercase"
                      style={{ color: textMuted }}
                    >
                      {step.label}
                    </p>
                    <p
                      className="text-[1.05rem] font-light"
                      style={{ color: textMain }}
                    >
                      {step.value}
                    </p>
                    <Body small>{step.note}</Body>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Sec>
      );

    // ── SCARCITY ────────────────────────────────────────────────────────────
    case "scarcity":
      return (
        <Sec>
          <Overline>{slide.overline}</Overline>
          <H2>{slide.title}</H2>
          <div className="mt-5">
            <BulletList items={slide.bullets} />
          </div>
        </Sec>
      );

    // ── CTA ────────────────────────────────────────────────────────────────
    case "cta-qr":
      return (
        <section
          className="flex min-h-[100svh] flex-col justify-center border-b border-[#1A1A1A] px-5 py-16"
        >
          <Overline>{slide.overline}</Overline>
          <h2
            className="mb-6 font-serif font-light text-[2.25rem] leading-tight tracking-[-0.03em]"
            style={{ color: textMain }}
          >
            {slide.headline}
          </h2>
          <Card accent className="mb-6">
            <p
              className="mb-1 text-[0.62rem] tracking-widest uppercase"
              style={{ color: textMuted }}
            >
              {slide.commitLabel}
            </p>
            <p
              className="mb-3 font-serif font-light text-[2rem]"
              style={{ color: gold }}
            >
              {slide.commitValue}
            </p>
            <BulletList items={slide.benefits} />
          </Card>
          <div className="mb-7 flex flex-col gap-3">
            {slide.steps.map((step, i) => (
              <div key={step} className="flex items-start gap-3">
                <span
                  className="w-6 shrink-0 font-serif text-[0.88rem]"
                  style={{ color: gold }}
                >
                  0{i + 1}
                </span>
                <Body small>{step}</Body>
              </div>
            ))}
          </div>
          <a
            href="https://app.lightforms.io/TIJCSHK?utm_source=apresentacao&utm_medium=slide&utm_campaign=maestria&utm_content=v3"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-2xl py-4 text-center text-[0.8rem] font-medium tracking-[0.15em] uppercase"
            style={{ backgroundColor: gold, color: bgPage }}
          >
            {slide.action}
          </a>
        </section>
      );

    default:
      return null;
  }
}

// ─── Main component ────────────────────────────────────────────────────────

export default function MaestriaV3Presentation() {
  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: bgPage, color: textMain }}
    >
      {slidesV3.map((slide) => (
        <div key={slide.id} style={slideBackground[slide.id] ?? bgDefault}>
          {renderSlide(slide)}
        </div>
      ))}
    </div>
  );
}
