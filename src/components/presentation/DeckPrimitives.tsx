"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type SectionWidth = "standard" | "media" | "narrow" | "wide";
type TitleVariant = "hero" | "section" | "feature" | "card";
type TextTag = "div" | "h1" | "h2" | "h3" | "p" | "span";
type DeckAssetKind = "image" | "video" | "iframe";

export type DeckAsset = {
  src: string;
  kind: DeckAssetKind;
  slideId: number | string;
  priority?: number;
};

type DeckPreloadConfig = {
  strategy: "progressive";
  include: DeckAssetKind[];
};

const SECTION_WIDTHS: Record<SectionWidth, string> = {
  standard: "max-w-[1440px]",
  media: "max-w-[1480px]",
  narrow: "max-w-[1280px]",
  wide: "max-w-[1600px]",
};

const TITLE_VARIANTS: Record<TitleVariant, string> = {
  hero: "holding-title-hero",
  section: "holding-title-section",
  feature: "holding-title-feature",
  card: "holding-title-card",
};

const DECK_PRELOAD_CONCURRENCY: Record<DeckAssetKind, number> = {
  image: 4,
  video: 1,
  iframe: 1,
};

const requestedDeckAssets = new Set<string>();

function getDeckAssetKey(asset: Pick<DeckAsset, "kind" | "src">) {
  return `${asset.kind}:${asset.src}`;
}

async function runDeckPreloadQueue<T>(
  items: T[],
  concurrency: number,
  task: (item: T) => Promise<void>,
  isCancelled: () => boolean,
) {
  const queue = [...items];

  const workers = Array.from(
    { length: Math.min(concurrency, queue.length) },
    async () => {
      while (!isCancelled()) {
        const next = queue.shift();

        if (!next) {
          return;
        }

        await task(next);
      }
    },
  );

  await Promise.all(workers);
}

function preloadDeckImage(asset: DeckAsset) {
  const key = getDeckAssetKey(asset);

  if (requestedDeckAssets.has(key)) {
    return Promise.resolve();
  }

  requestedDeckAssets.add(key);

  return new Promise<void>((resolve) => {
    const image = new Image();

    image.decoding = "async";
    image.fetchPriority = "low";
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = asset.src;
  });
}

function preloadDeckVideo(asset: DeckAsset, container: HTMLElement) {
  const key = getDeckAssetKey(asset);

  if (requestedDeckAssets.has(key)) {
    return Promise.resolve();
  }

  requestedDeckAssets.add(key);

  return new Promise<void>((resolve) => {
    const video = document.createElement("video");
    let settled = false;

    const finish = () => {
      if (settled) {
        return;
      }

      settled = true;
      video.removeEventListener("loadedmetadata", finish);
      video.removeEventListener("error", finish);
      window.clearTimeout(timeoutId);
      resolve();
    };

    const timeoutId = window.setTimeout(finish, 10000);

    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    video.tabIndex = -1;
    video.setAttribute("aria-hidden", "true");
    video.addEventListener("loadedmetadata", finish);
    video.addEventListener("error", finish);
    video.src = asset.src;
    container.appendChild(video);
    video.load();
  });
}

function preloadDeckIframe(asset: DeckAsset, container: HTMLElement) {
  const key = getDeckAssetKey(asset);

  if (requestedDeckAssets.has(key)) {
    return Promise.resolve();
  }

  requestedDeckAssets.add(key);

  return new Promise<void>((resolve) => {
    const iframe = document.createElement("iframe");
    let settled = false;

    const finish = () => {
      if (settled) {
        return;
      }

      settled = true;
      iframe.removeEventListener("load", finish);
      iframe.removeEventListener("error", finish);
      window.clearTimeout(timeoutId);
      resolve();
    };

    const timeoutId = window.setTimeout(finish, 10000);

    iframe.src = asset.src;
    iframe.tabIndex = -1;
    iframe.loading = "eager";
    iframe.setAttribute("aria-hidden", "true");
    iframe.style.border = "0";
    iframe.addEventListener("load", finish);
    iframe.addEventListener("error", finish);
    container.appendChild(iframe);
  });
}

export function GoldRule({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-px w-12 bg-gradient-to-r from-[#C9A86C] to-transparent",
        className,
      )}
    />
  );
}

export function SlideLabel({ children }: { children: React.ReactNode }) {
  return <p className="holding-overline">{children}</p>;
}

export function DeckTitle({
  children,
  variant = "section",
  as = "h2",
  className,
}: {
  children: React.ReactNode;
  variant?: TitleVariant;
  as?: TextTag;
  className?: string;
}) {
  const Component = as;

  return (
    <Component
      className={cn(
        "font-serif text-[#F2EFE9]",
        TITLE_VARIANTS[variant],
        className,
      )}
      style={{ fontFamily: "var(--font-serif)" }}
    >
      {children}
    </Component>
  );
}

export function DeckSubtitle({
  children,
  as = "p",
  className,
}: {
  children: React.ReactNode;
  as?: TextTag;
  className?: string;
}) {
  const Component = as;

  return <Component className={cn("holding-subtitle", className)}>{children}</Component>;
}

export function DeckBody({
  children,
  as = "p",
  className,
}: {
  children: React.ReactNode;
  as?: TextTag;
  className?: string;
}) {
  const Component = as;

  return <Component className={cn("holding-body", className)}>{children}</Component>;
}

export function DeckMeta({
  children,
  as = "p",
  className,
}: {
  children: React.ReactNode;
  as?: TextTag;
  className?: string;
}) {
  const Component = as;

  return <Component className={cn("holding-meta", className)}>{children}</Component>;
}

export function SectionShell({
  children,
  width = "standard",
  className,
  contentClassName,
  centerY = false,
}: {
  children: React.ReactNode;
  width?: SectionWidth;
  className?: string;
  contentClassName?: string;
  centerY?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full justify-center px-12 md:px-24",
        centerY && "items-center",
        className,
      )}
    >
      <div className={cn("w-full", SECTION_WIDTHS[width], contentClassName)}>
        {children}
      </div>
    </div>
  );
}

export function SectionIntro({
  label,
  title,
  subtitle,
  description,
  titleVariant = "section",
  titleAs = "h2",
  className,
  titleClassName,
  subtitleClassName,
  descriptionClassName,
  showRule = false,
}: {
  label?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  titleVariant?: TitleVariant;
  titleAs?: TextTag;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
  showRule?: boolean;
}) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {label ? <SlideLabel>{label}</SlideLabel> : null}
      <DeckTitle as={titleAs} variant={titleVariant} className={titleClassName}>
        {title}
      </DeckTitle>
      {showRule ? <GoldRule className="w-20" /> : null}
      {subtitle ? (
        <DeckSubtitle className={subtitleClassName}>{subtitle}</DeckSubtitle>
      ) : null}
      {description ? (
        <DeckBody className={cn("text-[#BEB7AC]", descriptionClassName)}>
          {description}
        </DeckBody>
      ) : null}
    </div>
  );
}

export function InfoCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[24px] border border-[#1E1E1E] bg-[#0D0D0D] p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function MediaFrame({
  title,
  subtitle,
  src,
  type = "image",
  className,
  mediaClassName,
  showOverlay = true,
}: {
  title: string;
  subtitle?: string;
  src?: string;
  type?: "image" | "video" | "iframe";
  className?: string;
  mediaClassName?: string;
  showOverlay?: boolean;
}) {
  const hasMedia = Boolean(src);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px] border border-[#1E1E1E] bg-[#0B0B0B]",
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A86C]/30 to-transparent" />
      {hasMedia ? (
        type === "video" ? (
          <video
            className={cn(
              "h-full w-full bg-[#050505] object-contain",
              mediaClassName,
            )}
            src={src}
            controls
            playsInline
            muted
            preload="auto"
          />
        ) : type === "iframe" ? (
          <iframe
            className="h-full w-full"
            src={src}
            title={title}
            style={{ border: "none" }}
          />
        ) : (
          <img
            className={cn("h-full w-full object-cover", mediaClassName)}
            src={src}
            alt={title}
            loading="eager"
            fetchPriority="high"
          />
        )
      ) : (
        <div className="flex h-full min-h-[240px] w-full items-center justify-center bg-[radial-gradient(circle_at_top_right,_rgba(201,168,108,0.18),_transparent_45%),linear-gradient(135deg,_#111,_#090909)]">
          <div className="px-8 text-center">
            <p className="holding-overline opacity-80">Asset modular</p>
            <DeckTitle as="p" variant="card" className="mt-3">
              {title}
            </DeckTitle>
            {subtitle ? (
              <DeckMeta className="mt-2 text-[#8E877B]">{subtitle}</DeckMeta>
            ) : null}
          </div>
        </div>
      )}
      {showOverlay ? (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#080808] via-[#080808]/88 to-transparent px-6 py-5">
          <p className="holding-overline text-[#C9A86C]">{title}</p>
          {subtitle ? (
            <DeckMeta className="mt-1 text-[#DDD7CD]">{subtitle}</DeckMeta>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function DeckShell<T extends { id: number | string }>({
  brand,
  slides,
  renderSlide,
  getSlideAssets,
  preload,
}: {
  brand: string;
  slides: T[];
  renderSlide: (slide: T) => React.ReactNode;
  getSlideAssets?: (slide: T) => DeckAsset[];
  preload?: DeckPreloadConfig;
}) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const preloadContainerRef = useRef<HTMLDivElement | null>(null);
  const preloadEnabled =
    preload?.strategy === "progressive" &&
    preload.include.length > 0 &&
    Boolean(getSlideAssets);

  const slideAssets = useMemo(
    () =>
      getSlideAssets
        ? slides.map((slide) => ({
            assets: (getSlideAssets(slide) ?? [])
              .filter((asset) => Boolean(asset?.src))
              .map((asset) => ({
                ...asset,
                slideId: asset.slideId ?? slide.id,
                priority: asset.priority ?? 0,
              })),
          }))
        : [],
    [getSlideAssets, slides],
  );

  const handleNext = useCallback(() => {
    setCurrentSlideIndex((current) =>
      current < slides.length - 1 ? current + 1 : current,
    );
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setCurrentSlideIndex((current) => (current > 0 ? current - 1 : current));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleNext, handlePrev]);

  useEffect(() => {
    if (!preloadEnabled) {
      return;
    }

    const container = document.createElement("div");

    container.setAttribute("aria-hidden", "true");
    container.style.position = "fixed";
    container.style.width = "1px";
    container.style.height = "1px";
    container.style.overflow = "hidden";
    container.style.opacity = "0";
    container.style.pointerEvents = "none";
    container.style.left = "-9999px";
    container.style.top = "-9999px";

    document.body.appendChild(container);
    preloadContainerRef.current = container;

    return () => {
      preloadContainerRef.current = null;
      container.remove();
    };
  }, [preloadEnabled]);

  useEffect(() => {
    if (!preloadEnabled || !preloadContainerRef.current) {
      return;
    }

    let cancelled = false;
    let firstFrameId = 0;
    let secondFrameId = 0;

    const includedKinds = new Set(preload.include);
    const orderedSlides = [
      ...slideAssets.slice(currentSlideIndex + 1),
      ...slideAssets.slice(0, currentSlideIndex),
    ];

    const imageAssets: DeckAsset[] = [];
    const videoAssets: DeckAsset[] = [];
    const iframeAssets: DeckAsset[] = [];

    for (const slideEntry of orderedSlides) {
      const prioritizedAssets = [...slideEntry.assets]
        .filter((asset) => includedKinds.has(asset.kind))
        .sort((left, right) => (right.priority ?? 0) - (left.priority ?? 0));

      for (const asset of prioritizedAssets) {
        if (asset.kind === "image") {
          imageAssets.push(asset);
        } else if (asset.kind === "video") {
          videoAssets.push(asset);
        } else {
          iframeAssets.push(asset);
        }
      }
    }

    const runPreload = async () => {
      const container = preloadContainerRef.current;

      if (!container) {
        return;
      }

      await runDeckPreloadQueue(
        imageAssets,
        DECK_PRELOAD_CONCURRENCY.image,
        preloadDeckImage,
        () => cancelled,
      );

      if (cancelled) {
        return;
      }

      await runDeckPreloadQueue(
        videoAssets,
        DECK_PRELOAD_CONCURRENCY.video,
        (asset) => preloadDeckVideo(asset, container),
        () => cancelled,
      );

      if (cancelled) {
        return;
      }

      await runDeckPreloadQueue(
        iframeAssets,
        DECK_PRELOAD_CONCURRENCY.iframe,
        (asset) => preloadDeckIframe(asset, container),
        () => cancelled,
      );
    };

    firstFrameId = window.requestAnimationFrame(() => {
      secondFrameId = window.requestAnimationFrame(() => {
        void runPreload();
      });
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(firstFrameId);
      window.cancelAnimationFrame(secondFrameId);
    };
  }, [currentSlideIndex, preload, preloadEnabled, slideAssets]);

  const slide = slides[currentSlideIndex];

  return (
    <div
      className="relative flex h-screen w-full flex-col overflow-hidden text-[#F2EFE9]"
      style={{ backgroundColor: "#080808" }}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full blur-[120px] opacity-[0.035]"
          style={{
            background: "radial-gradient(circle, #C9A86C 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full blur-[100px] opacity-[0.025]"
          style={{
            background: "radial-gradient(circle, #C9A86C 0%, transparent 70%)",
          }}
        />
      </div>

      <header className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-12 py-8 md:px-24">
        <div className="flex items-center gap-3">
          <div className="h-1.5 w-1.5 rounded-full bg-[#C9A86C]" />
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-[#F2EFE9] opacity-80">
            {brand}
          </span>
        </div>
        <div className="tabular-nums text-xs font-medium uppercase tracking-[0.2em] text-[#6D675D]">
          {String(currentSlideIndex + 1).padStart(2, "0")}
          <span className="mx-2 text-[#2A2A2A]">/</span>
          {String(slides.length).padStart(2, "0")}
        </div>
      </header>

      <main className="relative z-10 flex h-full w-full flex-1 pt-24 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
            className="flex h-full w-full"
          >
            {renderSlide(slide)}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="absolute bottom-0 left-0 right-0 z-20">
        <div className="flex items-center justify-between px-12 pb-6 md:px-24">
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              disabled={currentSlideIndex === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#080808] text-[#4A4745] transition-all hover:border-[#4A4745] hover:text-[#F2EFE9] disabled:pointer-events-none disabled:opacity-20"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentSlideIndex === slides.length - 1}
              className="flex h-10 items-center gap-2.5 rounded-full border border-[#2A2A2A] bg-[#080808] px-6 text-[#F2EFE9] transition-all hover:border-[#C9A86C]/50 hover:bg-[#C9A86C]/5 disabled:pointer-events-none disabled:opacity-20"
              aria-label="Próximo slide"
            >
              <span className="text-xs font-medium uppercase tracking-[0.2em]">
                Avançar
              </span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="h-px w-full overflow-hidden bg-[#141414]">
          <motion.div
            className="h-full"
            style={{ background: "linear-gradient(90deg, #8A7148, #C9A86C)" }}
            initial={{ width: 0 }}
            animate={{ width: `${((currentSlideIndex + 1) / slides.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </footer>
    </div>
  );
}
