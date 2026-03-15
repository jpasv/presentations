"use client";

import React from "react";
import {
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  CirclePlay,
  LayoutDashboard,
  Rocket,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import {
  cn,
  type DeckAsset,
  DeckBody,
  DeckMeta,
  DeckShell,
  DeckSubtitle,
  DeckTitle,
  InfoCard,
  SectionIntro,
  SectionShell,
} from "@/components/presentation/DeckPrimitives";
import {
  MediaShowcaseSlide,
  type MediaAsset,
  SummitRewardSlide,
} from "@/components/presentation/ClosingModules";

type BaseSlide = {
  id: number;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  footnote?: string;
};

type CoverSlide = BaseSlide & {
  type: "cover";
  description?: string;
};

type ContextSlide = BaseSlide & {
  type: "context";
  problems: string[];
  layout?: "roadmap" | "cards";
};

type PillarSlide = BaseSlide & {
  type: "pillars";
  pillars: Array<{
    title: string;
    text: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
};

type ComparisonSlide = BaseSlide & {
  type: "comparison";
  leftTitle: string;
  leftItems: string[];
  rightTitle: string;
  rightItems: string[];
};

type CadenceSlide = BaseSlide & {
  type: "cadence";
  steps: Array<{
    label: string;
    text: string;
    emphasis?: boolean;
  }>;
};

type DeliverySlide = BaseSlide & {
  type: "delivery";
  sections: Array<{
    title: string;
    items: string[];
  }>;
};

type CaseStudySlide = BaseSlide & {
  type: "case-study";
  label: string;
  outcomes: string[];
  asset?: MediaAsset;
  ctaLabel?: string;
  ctaHref?: string;
  ctaHint?: string;
};

type InvestmentSlide = BaseSlide & {
  type: "investment";
  items: string[];
  payment?: string[];
  tone?: "default" | "highlight";
  value?: string;
  description?: string;
};

type SummitSlide = BaseSlide & {
  type: "summit";
  highlights: string[];
  perks: string[];
};

type MediaSlide = BaseSlide & {
  type: "media";
  featured: MediaAsset;
  gallery: MediaAsset[];
};

type ClosingSlide = BaseSlide & {
  type: "closing";
  cta: string;
};

type HoldingSlide =
  | CoverSlide
  | ContextSlide
  | PillarSlide
  | ComparisonSlide
  | CadenceSlide
  | DeliverySlide
  | CaseStudySlide
  | InvestmentSlide
  | SummitSlide
  | MediaSlide
  | ClosingSlide;

const bravyMedia = {
  featured: {
    title: "Bravy School ao vivo",
    subtitle: "Vídeo vertical do evento presencial.",
    type: "video" as const,
    src: "https://t9013332252.p.clickup-attachments.com/t9013332252/d00007a5-2105-44b3-bf3e-962aedccbcb2/BRVY%20SUMMIT%202%20FORMATO%20REELS.mp4",
  },
  gallery: [
    {
      title: "Momento 01",
      subtitle: "Ambiente e presença no evento",
      type: "image" as const,
      src: "https://t9013332252.p.clickup-attachments.com/t9013332252/500a5c1d-8931-43ba-bbf8-1ccfd092bb3b/summit-foto1.jpg",
    },
    {
      title: "Momento 02",
      subtitle: "Experiência e atmosfera da imersão",
      type: "image" as const,
      src: "https://t9013332252.p.clickup-attachments.com/t9013332252/6e4e8b9b-3ea9-4341-ad18-98d5973c4798/summit-foto2.jpg",
    },
    {
      title: "Momento 03",
      subtitle: "Networking e bastidores do Summit",
      type: "image" as const,
      src: "https://t9013332252.p.clickup-attachments.com/t9013332252/ea340759-579e-4d9f-a5f4-163128211e1e/summit-foto3.jpg",
    },
    {
      title: "Momento 04",
      subtitle: "Experiência e interação do público",
      type: "image" as const,
      src: "https://t9013332252.p.clickup-attachments.com/t9013332252/768366a8-7308-46bb-9b4f-c60fb6234ca0/summit-foto4.jpg",
    },
  ],
};

const sharedSystemPreview = {
  src: "https://t9013332252.p.clickup-attachments.com/t9013332252/3db8d888-42cd-4a83-9f37-e9d573c59940/sistema-holding.png",
  frameless: true,
  naturalSize: true,
} as const;

const caseAssets: Record<string, MediaAsset> = {
  garcez: {
    title: "ClickUp comercial com lead score",
    subtitle: "Visual do processo comercial com lead score aplicado.",
    src: "https://t9013332252.p.clickup-attachments.com/t9013332252/fe78b25e-2d2d-4bfe-b5c2-13082e03db8c/lead-score-garcez.png",
  },
  ats: {
    title: "Agente de IA para triagem",
    subtitle: "Visual da triagem automatizada com agente de IA.",
    src: "https://t9013332252.p.clickup-attachments.com/t9013332252/19d26e88-1a78-429a-9651-8e4cebf38628/agente-ia-rh.png",
  },
  forecast: {
    title: "Sistema de Holding",
    subtitle: "Visual direto do ambiente principal do sistema.",
    ...sharedSystemPreview,
  },
  pages: {
    title: "Página Cris Leal",
    subtitle: "Criada pelo gestor e +80% de connect rate",
    src: "https://lealferraz.com",
    type: "iframe",
  },
  campaigns: {
    title: "Gestão de tráfego com IA",
    subtitle: "Exemplo de acompanhamento de campanhas com apoio de IA.",
    src: "https://t9013332252.p.clickup-attachments.com/t9013332252/d39db36b-3bf0-44aa-bb1d-a576658bfae3/agente-ia-trafego.png",
    frameless: true,
  },
  disparos: {
    title: "Agente de IA Disparos",
    subtitle: "Visual do agente de IA para disparos.",
    src: "https://t9013332252.p.clickup-attachments.com/t9013332252/aff647d4-4a3d-4d0a-bfb5-5b1c55671796/agente-ia-disparos.png",
    frameless: true,
  },
  rhSystem: {
    title: "Sistema de RH",
    subtitle: "Visual do sistema proprietário de RH.",
    src: "https://t9013332252.p.clickup-attachments.com/t9013332252/2e79a0a6-61d9-46a6-bca8-cf1188c1f7c8/sistema-ats.png",
    frameless: true,
  },
  officialApiService: {
    title: "Sistema de Atendimento API oficial",
    subtitle: "Visual do sistema de atendimento via API oficial.",
    src: "https://t9013332252.p.clickup-attachments.com/t9013332252/f569837c-b593-493e-a042-38287774913d/atendimento-api-oficial.png",
    frameless: true,
  },
  willianLaunch: {
    title: "Estratégia de lançamento pago",
    subtitle: "Alinhamento da venda de ingressos para maior conversão",
    src: "https://link.excalidraw.com/readonly/qR95Vfs82nqLC7m9w2xh?darkMode=true",
    type: "iframe",
  },
  nairioSeminar: {
    title: "Estratégia de seminario Nairio",
    subtitle: "Planejamento estratégico dos e-mails para aumentar taxa de cliques",
    src: "https://link.excalidraw.com/readonly/PMJuSCDMpgp9RG8M8Ozx?darkMode=true",
    type: "iframe",
  },
};

const slidesData: HoldingSlide[] = [
  {
    id: 1,
    type: "cover",
    title: "Assessor.IA",
    subtitle: "A evolução do ClickUp começa quando a equipe passa a operar dentro dele todos os dias.",
    description:
      "Depois da implementação, o desafio real deixa de ser tecnologia e passa a ser adoção, ajustes finos e evolução contínua da operação.",
  },
  {
    id: 2,
    type: "context",
    title: "O que é a Assessor.IA?",
    subtitle:
      "Um programa de acompanhamento para implementar IA, Estratégia e Gestão nos processos do seu escritório e evoluir a gestão do seu negócio.",
    layout: "roadmap",
    problems: [
      "A implementação estrutura o sistema.",
      "A assessoria garante uso correto pela equipe.",
      "A operação evolui com novos dashboards, fluxos, automações e IA.",
    ],
  },
  {
    id: 3,
    type: "pillars",
    title: "Como evoluímos o seu escritório",
    subtitle: "Cinco frentes coordenadas para fazer o sistema acompanhar o crescimento da operação.",
    pillars: [
      {
        title: "Otimização do ClickUp",
        text: "Estrutura, dashboards, fluxos e ajustes operacionais de uso real.",
        icon: LayoutDashboard,
      },
      {
        title: "Automação",
        text: "Automações internas, integrações e redução de trabalho manual.",
        icon: Workflow,
      },
      {
        title: "Inteligência artificial",
        text: "Automações com IA, agentes autônomos e análises inteligentes.",
        icon: BrainCircuit,
      },
      {
        title: "Growth e marketing",
        text: "Funis, páginas com IA, campanhas e consultoria comercial.",
        icon: Rocket,
      },
      {
        title: "Sistemas proprietários",
        text: "Atendimento comercial, forecast financeiro e contratação com IA.",
        icon: BriefcaseBusiness,
      },
    ],
  },
  {
    id: 4,
    type: "comparison",
    title: "Evolução após a implementação",
    subtitle: "A implementação organiza o começo. A Assessor.IA transforma isso em sistema operacional do escritório.",
    leftTitle: "Implementação",
    leftItems: [
      "Estruturação dos processos no ClickUp",
      "Configuração do sistema",
      "Organização inicial da operação",
    ],
    rightTitle: "Assessor.IA",
    rightItems: [
      "Acompanhamento do uso real pela equipe",
      "Melhorias contínuas na estrutura",
      "Novas automações, integrações e IA",
      "Construção de Agentes de IA",
      "Sistema de Holding",
      "Consultoria Estratégica (Marketing e Vendas)",
    ],
  },
  {
    id: 5,
    type: "case-study",
    title: "ClickUp comercial com lead score",
    subtitle: "O processo comercial deixa de ser só cadastro e passa a guiar decisão operacional.",
    label: "Otimização + automação",
    outcomes: [
      "Priorização automática de oportunidades mais quentes.",
      "Leitura mais clara do pipeline e do gargalo comercial.",
      "Estrutura que melhora gestão e velocidade de resposta.",
    ],
    asset: caseAssets.garcez,
  },
  {
    id: 6,
    type: "case-study",
    title: "Páginas geradas por IA",
    subtitle: "Consultoria de como gerar páginas com IA apenas no modo conversacional (chat).",
    label: "Growth + marketing",
    outcomes: [
      "Páginas geradas com mais velocidade e consistência.",
      "Sem custo de webdesigner desnecessário.",
      "Maior connect rate + possibilidade de integrações.",
    ],
    asset: caseAssets.pages,
  },
  {
    id: 7,
    type: "case-study",
    title: "Agente de IA para triagem de colaboradores",
    subtitle: "IA aplicada no início do funil para reduzir esforço manual e acelerar seleção.",
    label: "IA aplicada",
    outcomes: [
      "Pré-triagem automatizada e mais consistente.",
      "Menos esforço operacional do time humano.",
      "Tomada de decisão mais rápida sobre candidatos.",
    ],
    asset: caseAssets.ats,
  },
  {
    id: 8,
    type: "case-study",
    title: "Agente de IA Gestor de Tráfego",
    subtitle: "Uma forma mais rápida de acompanhar campanhas, investimentos e oportunidades de ajuste com apoio de IA.",
    label: "Growth + marketing",
    outcomes: [
      "Visão mais clara dos dados das campanhas.",
      "Mais agilidade para acompanhar investimento e desempenho.",
      "Mais clareza para decidir os próximos ajustes.",
    ],
    asset: caseAssets.campaigns,
  },
  {
    id: 9,
    type: "case-study",
    title: "Agente de IA Disparos",
    subtitle: "Uma operação mais consistente de disparos e follow-up com apoio de IA, reduzindo atraso manual e aumentando cadência.",
    label: "IA aplicada",
    outcomes: [
      "Automatiza disparos e follow-ups com mais consistência.",
      "Mantém o ritmo operacional sem depender de execução manual.",
      "Cria mais velocidade para campanhas, ativações e contato com leads.",
    ],
    asset: caseAssets.disparos,
  },
  {
    id: 10,
    type: "case-study",
    title: "Sistema de RH",
    subtitle: "Um sistema proprietário para organizar processos de RH, acompanhar etapas e dar previsibilidade à operação interna.",
    label: "Sistema proprietário",
    outcomes: [
      "Centraliza etapas e informações do RH em um só ambiente.",
      "Organiza triagem, onboarding e acompanhamento operacional.",
      "Reduz retrabalho e melhora a visibilidade do time sobre o processo.",
    ],
    asset: caseAssets.rhSystem,
  },
  {
    id: 11,
    type: "case-study",
    title: "Sistema de Atendimento API oficial",
    subtitle: "Uma estrutura proprietária para atendimento com API oficial, mais controle de fluxo e rastreabilidade da operação.",
    label: "Sistema proprietário",
    outcomes: [
      "Padroniza o atendimento em um fluxo operacional mais confiável.",
      "Cria rastreabilidade das interações e do status de cada contato.",
      "Facilita escala com mais controle sobre execução e resposta.",
    ],
    asset: caseAssets.officialApiService,
  },
  {
    id: 12,
    type: "case-study",
    title: "Sistema de Holding",
    subtitle: "Um ambiente central para organizar estruturas, famílias e informações críticas da operação, com uso liberado durante o contrato ativo.",
    label: "Uso incluído no contrato",
    outcomes: [
      "Centraliza famílias, variáveis e estrutura operacional.",
      "Organiza informações críticas em um só ambiente.",
      "Pode ser usado gratuitamente enquanto o contrato estiver ativo.",
    ],
    asset: caseAssets.forecast,
    ctaLabel: "Acessar sistema",
    ctaHref: "https://holding.bravy.com.br/families",
    ctaHint: "Abre o ambiente real em uma nova aba.",
  },
  {
    id: 13,
    type: "case-study",
    title: "Estratégia de lançamento pago Willian Loro",
    subtitle: "Planejamento visual da campanha, narrativa e estrutura de execução em um quadro único.",
    label: "Growth + estratégia",
    outcomes: [
      "Organiza a campanha antes da execução virar retrabalho.",
      "Alinha oferta, paginas, criativos e fluxo comercial.",
      "Dá clareza operacional para acelerar a entrega.",
    ],
    asset: caseAssets.willianLaunch,
  },
  {
    id: 14,
    type: "case-study",
    title: "Estratégia de seminário Naírio",
    subtitle: "Mapa visual do raciocínio estratégico para posicionar e estruturar o seminário.",
    label: "Growth + estratégia",
    outcomes: [
      "Transforma planejamento abstrato em execução visível.",
      "Facilita alinhamento entre marketing, oferta e operação.",
      "Cria clareza para decisões rápidas ao longo da campanha.",
    ],
    asset: caseAssets.nairioSeminar,
  },
  {
    id: 15,
    type: "delivery",
    title: "Como começa a entrega",
    subtitle: "A entrada organiza três frentes práticas de ativação: diagnóstico, setup técnico e treinamento da operação.",
    footnote:
      "PS: Caso você esteja com um projeto em andamento, tudo isso vai acontecer em paralelo a sua estruturação.",
    sections: [
      {
        title: "Diagnóstico",
        items: [
          "Diagnóstico de uso.",
          "Diagnóstico de IA.",
          "Diagnóstico de Growth (Marketing/Comercial).",
        ],
      },
      {
        title: "SetUps",
        items: [
          "Instalação da VPS (servidor).",
          "Instalação dos Agentes de IA.",
          "Instalação dos Sistemas.",
        ],
      },
      {
        title: "Treinamentos",
        items: [
          "Treinamento de LP com IA.",
          "Treinamento de Agente de IA: Disparos",
          "Treinamento de Agente de IA: Campanhas",
        ],
      },
    ],
  },
  {
    id: 16,
    type: "cadence",
    title: "Como funciona o acompanhamento",
    subtitle:
      "Uma cadência semanal para evoluir a estrutura, implementar IA na operação e melhorar continuamente os processos.",
    footnote:
      "PS: Caso você esteja com um projeto em andamento, tudo isso vai acontecer em paralelo a sua estruturação.",
    steps: [
      {
        label: "Acompanhamento",
        text: "Reunião semanal para alinhar prioridades, avanços e próximos passos.",
        emphasis: true,
      },
      {
        label: "Melhorias e IA",
        text: "Sprint semanal de melhorias, automações e implementação de IA.",
      },
      {
        label: "Análise de uso",
        text: "Análise semanal do uso do ClickUp pela equipe.",
      },
      {
        label: "Manutenção",
        text: "Manutenção contínua da estrutura implementada.",
      },
      {
        label: "Suporte",
        text: "SOS para apoio com sistemas e agentes.",
      },
      {
        label: "Marketing",
        text: "Encontro para planejar as próximas ações de marketing.",
      },
    ],
  },
  {
    id: 17,
    type: "summit",
    title: "Bravy Summit",
    subtitle: "Um encontro presencial exclusivo para fortalecer a parceria e viver a experiência Bravy.",
    highlights: [
      "Proximidade com a Bravy.",
      "Networking qualificado.",
      "Uma experiência premium.",
    ],
    perks: [
      "Gestão Empresarial",
      "Cultura",
      "Liderança",
      "Tecnologia",
    ],
  },
  {
    id: 18,
    type: "media",
    title: "Vídeo e imagens do Bravy Summit",
    subtitle: "Um recorte visual do evento, com vídeo principal e duas imagens em formato story.",
    featured: bravyMedia.featured,
    gallery: bravyMedia.gallery,
  },
  {
    id: 19,
    type: "investment",
    title: "Investimento",
    subtitle: "Condição de entrada para novos clientes e ex-clientes sem contrato ativo.",
    value: "R$ 70.000",
    description:
      "Programa anual para transformar a implementação em rotina operacional, automação e inteligência contínua.",
    items: [
      "Contratação após a finalização do projeto.",
      "Entrada de R$ 10.000.",
      "12x de R$ 5.000 por mês.",
    ],
    tone: "default",
  },
  {
    id: 20,
    type: "investment",
    title: "Condição especial para pagamento",
    subtitle:
      "Uma condição exclusiva para clientes que avançarem para a assessoria na fase final da implementação.",
    items: [
      "Sem taxa de entrada",
      "12x de R$ 3.000 por mês",
    ],
    payment: [
      "Cartão recorrente",
      "Sem consumir o limite total",
    ],
    tone: "highlight",
  },
  {
    id: 21,
    type: "closing",
    title: "Assessor.IA",
    subtitle: "O objetivo não é apenas implementar o ClickUp. É fazer o escritório operar, evoluir e escalar dentro dele.",
    cta: "A próxima etapa é transformar a implementação em rotina operacional, automação real e inteligência contínua.",
  },
];

function getHoldingSlideAssets(slide: HoldingSlide): DeckAsset[] {
  switch (slide.type) {
    case "case-study":
      return slide.asset?.src
        ? [
            {
              src: slide.asset.src,
              kind: slide.asset.type ?? "image",
              slideId: slide.id,
              priority: 100,
            },
          ]
        : [];

    case "media":
      return [
        ...(slide.featured.src
          ? [
              {
                src: slide.featured.src,
                kind: slide.featured.type ?? "image",
                slideId: slide.id,
                priority: 100,
              },
            ]
          : []),
        ...slide.gallery.flatMap((asset, index) =>
          asset.src
            ? [
                {
                  src: asset.src,
                  kind: asset.type ?? "image",
                  slideId: slide.id,
                  priority: 90 - index,
                },
              ]
            : [],
        ),
      ];

    default:
      return [];
  }
}

function renderCaseAsset(asset?: MediaAsset) {
  if (asset?.src && asset.type === "iframe") {
    return (
      <div className="relative h-full min-h-[420px] overflow-hidden rounded-[32px] border border-[#1E1E1E] bg-[#0D0D0D]">
        <iframe
          src={asset.src}
          title={asset.title ?? "Case embed"}
          className="h-full w-full"
          style={{ border: "none" }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#080808] via-[#080808]/72 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-8">
          <DeckTitle as="h3" variant="card" className="mt-4 max-w-md">
            {asset.title ?? "Case visual"}
          </DeckTitle>
          {asset.subtitle ? (
            <DeckMeta className="mt-3 max-w-md text-[#DDD7CD]">
              {asset.subtitle}
            </DeckMeta>
          ) : null}
        </div>
      </div>
    );
  }

  if (asset?.src) {
    if (asset.frameless) {
      if (asset.naturalSize) {
        return (
          <img
            src={asset.src}
            alt={asset.title ?? "Case visual"}
            loading="eager"
            fetchPriority="high"
          />
        );
      }

      return (
        <div className="relative flex h-full min-h-[420px] items-center justify-center lg:min-h-[calc(100vh-220px)]">
          <img
            src={asset.src}
            alt={asset.title ?? "Case visual"}
            className="h-full w-full object-contain object-center"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      );
    }

    return (
      <div className="relative h-full min-h-[420px] overflow-hidden rounded-[32px] border border-[#1E1E1E] bg-[#0D0D0D] lg:min-h-[calc(100vh-220px)]">
        <img
          src={asset.src}
          alt={asset.title ?? "Case visual"}
          className="absolute inset-0 h-full w-full object-cover object-top"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/18 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 max-w-[380px] rounded-[20px] border border-[#1E1E1E] bg-[#080808]/78 px-5 py-4 backdrop-blur-sm">
          <DeckTitle as="h3" variant="card" className="max-w-sm text-[clamp(1.5rem,2vw,1.75rem)]">
            {asset.title ?? "Case visual"}
          </DeckTitle>
          {asset.subtitle ? (
            <DeckMeta className="mt-2 max-w-sm text-[#DDD7CD]">
              {asset.subtitle}
            </DeckMeta>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[420px] overflow-hidden rounded-[32px] border border-[#1E1E1E] bg-[#0D0D0D]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(201,168,108,0.15),_transparent_35%),linear-gradient(145deg,_#101010,_#0A0A0A)]" />
      <div className="relative flex h-full flex-col justify-between p-8">
        <div>
          <div className="inline-flex items-center rounded-full border border-[#C9A86C]/20 bg-[#C9A86C]/8 px-3 py-1.5 holding-overline">
            Futuro
          </div>
          <DeckTitle as="h3" variant="card" className="mt-4 max-w-md">
            {asset?.title ?? "Case visual"}
          </DeckTitle>
          {asset?.subtitle ? (
            <DeckMeta className="mt-3 max-w-md text-[#8E877B]">
              {asset.subtitle}
            </DeckMeta>
          ) : null}
        </div>
        <div className="rounded-[24px] border border-dashed border-[#2A2A2A] bg-[#0A0A0A]/80 px-6 py-10 text-center">
          <CirclePlay className="mx-auto h-10 w-10 text-[#C9A86C] opacity-60" />
          <DeckMeta className="mt-4 text-[#DDD7CD]">
            Área pronta para screenshot dominante do case.
          </DeckMeta>
        </div>
      </div>
    </div>
  );
}

export default function HoldingPresentation() {
  return (
    <DeckShell
      brand="ASSESSOR.IA"
      slides={slidesData}
      getSlideAssets={getHoldingSlideAssets}
      preload={{ strategy: "progressive", include: ["image", "video", "iframe"] }}
      renderSlide={(slide) => {
        switch (slide.type) {
          case "cover":
            return (
              <SectionShell
                width="standard"
                centerY
                contentClassName="flex flex-col justify-center"
              >
                <SectionIntro
                  label="Apresentação Comercial"
                  title={slide.title}
                  subtitle={slide.subtitle}
                  description={slide.description}
                  titleVariant="hero"
                  titleAs="h1"
                  showRule
                  className="max-w-[1100px]"
                  subtitleClassName="max-w-4xl"
                  descriptionClassName="max-w-3xl text-[#A59E91]"
                />
              </SectionShell>
            );

          case "context":
            if (slide.layout === "roadmap") {
              return (
                <SectionShell
                  width="standard"
                  contentClassName="grid grid-cols-1 items-center gap-14 lg:grid-cols-12"
                >
                    <div className="lg:col-span-4">
                      <SectionIntro
                        label={slide.eyebrow ?? "Visão Geral"}
                        title={slide.title}
                        subtitle={slide.subtitle}
                        showRule
                        className="max-w-lg"
                      />
                    </div>

                    <div className="lg:col-span-8">
                      <div className="rounded-[30px] border border-[#1E1E1E] bg-[linear-gradient(160deg,_rgba(201,168,108,0.05),_rgba(10,10,10,1)_28%)] p-6 md:p-8">
                        <div className="mb-8 flex items-center justify-between gap-4">
                          <div>
                            <p className="holding-overline">Roadmap de evolução</p>
                            <DeckMeta className="mt-2 text-[#9A9387]">
                              Da estrutura inicial até a operação inteligente.
                            </DeckMeta>
                          </div>
                          <div className="hidden rounded-full border border-[#2A2A2A] px-4 py-2 md:block">
                            <span className="holding-overline text-[#6D675D]">
                            Evolução contínua
                            </span>
                          </div>
                        </div>

                        <div className="relative grid gap-4 md:grid-cols-3">
                          <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-7 hidden h-px bg-gradient-to-r from-[#C9A86C]/15 via-[#C9A86C]/45 to-[#C9A86C]/15 md:block" />
                          {slide.problems.map((item, idx) => (
                            <div
                              key={item}
                              className="relative rounded-[24px] border border-[#1E1E1E] bg-[#0D0D0D] p-6"
                            >
                              <div className="mb-6 flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A86C]/25 bg-[#C9A86C]/10 text-sm font-medium text-[#C9A86C]">
                                  0{idx + 1}
                                </div>
                                <div className="h-px flex-1 bg-gradient-to-r from-[#C9A86C]/30 to-transparent md:hidden" />
                              </div>
                              <DeckBody className="holding-body-lg text-[#F2EFE9]">
                                {item}
                              </DeckBody>
                              <p className="holding-overline mt-6 text-[#7F786E]">
                                {idx === 0
                                  ? "Base"
                                  : idx === 1
                                    ? "Adoção"
                                    : "Expansão"}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                </SectionShell>
              );
            }

            return (
              <SectionShell
                width="standard"
                contentClassName="grid grid-cols-1 items-center gap-14 lg:grid-cols-12"
              >
                  <div className="lg:col-span-4">
                    <SectionIntro
                      label={slide.eyebrow ?? "Visão Geral"}
                      title={slide.title}
                      subtitle={slide.subtitle}
                      showRule
                      className="max-w-lg"
                    />
                  </div>
                  <div className="lg:col-span-8">
                    <div className="grid gap-4 md:grid-cols-2">
                      {slide.problems.map((item, idx) => (
                        <InfoCard key={item} className={idx === 0 ? "md:col-span-2" : ""}>
                          <div className="flex items-start gap-4">
                            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#2A2A2A]">
                              <ArrowRight className="h-4 w-4 text-[#C9A86C]" />
                            </div>
                            <DeckBody>{item}</DeckBody>
                          </div>
                        </InfoCard>
                      ))}
                    </div>
                  </div>
              </SectionShell>
            );

          case "pillars":
            return (
              <SectionShell width="standard">
                  <SectionIntro
                    label="Oferta"
                    title={slide.title}
                    subtitle={slide.subtitle}
                    className="mb-6 max-w-[1040px] [@media(max-height:1180px)]:mb-5 [@media(max-height:980px)]:mb-4"
                    titleClassName="max-w-[960px] text-[clamp(2.35rem,3.3vw,2.95rem)] leading-[1.02] [@media(max-height:1180px)]:text-[clamp(2.1rem,3vw,2.55rem)] [@media(max-height:980px)]:text-[clamp(1.9rem,2.6vw,2.25rem)]"
                    subtitleClassName="max-w-[760px] text-[clamp(1rem,1.4vw,1.18rem)] leading-[1.4] [@media(max-height:1180px)]:max-w-[700px] [@media(max-height:980px)]:max-w-[660px] [@media(max-height:980px)]:text-[0.98rem]"
                  />

                  <div className="mb-4 grid gap-3 md:grid-cols-[1.38fr_0.81fr_0.81fr] [@media(max-height:980px)]:gap-2.5">
                    <div className="relative overflow-hidden rounded-[24px] border border-[#1E1E1E] bg-[radial-gradient(circle_at_top_left,_rgba(201,168,108,0.12),_transparent_40%),linear-gradient(135deg,_rgba(201,168,108,0.08),_rgba(11,11,11,1)_38%)] px-5 py-4 [@media(max-height:980px)]:px-4 [@media(max-height:980px)]:py-3.5">
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#C9A86C]/0 via-[#C9A86C]/35 to-[#C9A86C]/0" />
                      <div className="mb-2.5 flex items-center justify-between gap-4">
                        <p className="holding-overline">Arquitetura de evolução</p>
                        <div className="h-px w-12 bg-gradient-to-r from-[#C9A86C]/35 to-transparent" />
                      </div>
                      <DeckMeta className="max-w-xl text-[#A7A092] [@media(max-height:980px)]:text-[0.82rem]">
                        Cada frente amplia a capacidade operacional do escritório sem desmontar o que já foi implementado.
                      </DeckMeta>
                    </div>
                    <div className="relative overflow-hidden rounded-[24px] border border-[#1E1E1E] bg-[linear-gradient(180deg,_rgba(14,14,14,1),_rgba(8,8,8,1))] px-5 py-4 [@media(max-height:980px)]:px-4 [@media(max-height:980px)]:py-3.5">
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A86C]/20 to-transparent" />
                      <p className="holding-overline text-[#6D675D]">Entregas</p>
                      <DeckTitle as="p" variant="card" className="mt-1.5 text-[clamp(1.55rem,2.15vw,1.8rem)] [@media(max-height:980px)]:text-[clamp(1.35rem,1.8vw,1.55rem)]">
                        5 frentes
                      </DeckTitle>
                    </div>
                    <div className="relative overflow-hidden rounded-[24px] border border-[#1E1E1E] bg-[linear-gradient(180deg,_rgba(14,14,14,1),_rgba(8,8,8,1))] px-5 py-4 [@media(max-height:980px)]:px-4 [@media(max-height:980px)]:py-3.5">
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A86C]/20 to-transparent" />
                      <p className="holding-overline text-[#6D675D]">Objetivo</p>
                      <DeckTitle as="p" variant="card" className="mt-1.5 text-[clamp(1.55rem,2.15vw,1.8rem)] [@media(max-height:980px)]:text-[clamp(1.35rem,1.8vw,1.55rem)]">
                        Evolução contínua
                      </DeckTitle>
                    </div>
                  </div>

                  {(() => {
                    const primary = slide.pillars.find(
                      (pillar) => pillar.title === "Inteligência artificial",
                    );
                    const secondary = slide.pillars.filter(
                      (pillar) => pillar.title !== "Inteligência artificial",
                    );

                    if (!primary) return null;

                    const PrimaryIcon = primary.icon;

                    return (
                      <div className="grid gap-3 xl:grid-cols-[1.02fr_1fr] [@media(max-height:980px)]:gap-2.5">
                        <InfoCard className="relative min-h-[430px] overflow-hidden border-[#C9A86C]/12 bg-[radial-gradient(circle_at_top_left,_rgba(201,168,108,0.12),_transparent_35%),linear-gradient(160deg,_rgba(201,168,108,0.09),_rgba(13,13,13,1)_38%)] p-5 [@media(max-height:1180px)]:min-h-[390px] [@media(max-height:1180px)]:p-[18px] [@media(max-height:980px)]:min-h-[340px] [@media(max-height:980px)]:p-4">
                          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A86C]/35 to-transparent" />
                          <div className="absolute inset-y-0 left-0 w-16 bg-[linear-gradient(90deg,_rgba(201,168,108,0.05),_transparent)]" />
                          <div className="relative flex h-full flex-col">
                            <div className="mb-7 flex items-center justify-between [@media(max-height:1180px)]:mb-6 [@media(max-height:980px)]:mb-5">
                              <div className="flex h-10 w-10 items-center justify-center rounded-[18px] border border-[#C9A86C]/24 bg-[linear-gradient(180deg,_rgba(201,168,108,0.12),_rgba(201,168,108,0.05))] shadow-[inset_0_1px_0_rgba(201,168,108,0.08)] [@media(max-height:980px)]:h-9 [@media(max-height:980px)]:w-9">
                                <PrimaryIcon className="h-[18px] w-[18px] text-[#C9A86C] [@media(max-height:980px)]:h-4 [@media(max-height:980px)]:w-4" />
                              </div>
                              <div className="rounded-full border border-[#C9A86C]/14 bg-[#0F0F0F]/80 px-2.5 py-1">
                                <p className="holding-overline text-[#8A7450]">03</p>
                              </div>
                            </div>

                            <div className="mt-auto">
                              <DeckTitle as="h3" variant="feature" className="max-w-sm text-[clamp(1.95rem,2.45vw,2.2rem)] [@media(max-height:1180px)]:text-[clamp(1.75rem,2.15vw,1.95rem)] [@media(max-height:980px)]:text-[clamp(1.55rem,1.9vw,1.7rem)]">
                                {primary.title}
                              </DeckTitle>
                              <DeckBody className="mt-3.5 max-w-md text-[0.98rem] leading-[1.5] text-[#B1A99B] [@media(max-height:1180px)]:text-[0.94rem] [@media(max-height:980px)]:text-[0.9rem]">
                                {primary.text}
                              </DeckBody>
                            </div>

                            <div className="mt-6 flex items-center gap-3 [@media(max-height:980px)]:hidden">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A86C]" />
                              <span className="holding-overline text-[#6B644F]">
                                Camada de expansão inteligente
                              </span>
                            </div>
                          </div>
                        </InfoCard>

                        <div className="grid auto-rows-fr gap-3 md:grid-cols-2 [@media(max-height:980px)]:gap-2.5">
                          {secondary.map((pillar, idx) => {
                            const Icon = pillar.icon;
                            const displayIndex = idx >= 2 ? idx + 2 : idx + 1;

                            return (
                              <InfoCard
                                key={pillar.title}
                                className="relative min-h-[205px] overflow-hidden border-[#1A1A1A] bg-[radial-gradient(circle_at_top_left,_rgba(201,168,108,0.05),_transparent_34%),linear-gradient(180deg,_rgba(12,12,12,1),_rgba(8,8,8,1))] p-5 [@media(max-height:1180px)]:min-h-[185px] [@media(max-height:1180px)]:p-[18px] [@media(max-height:980px)]:min-h-[165px] [@media(max-height:980px)]:p-4"
                              >
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A86C]/18 to-transparent" />
                                <div className="relative flex h-full flex-col">
                                  <div className="mb-5 flex items-center justify-between [@media(max-height:1180px)]:mb-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-[18px] border border-[#C9A86C]/20 bg-[linear-gradient(180deg,_rgba(201,168,108,0.1),_rgba(201,168,108,0.04))] [@media(max-height:980px)]:h-9 [@media(max-height:980px)]:w-9">
                                      <Icon className="h-[18px] w-[18px] text-[#C9A86C] [@media(max-height:980px)]:h-4 [@media(max-height:980px)]:w-4" />
                                    </div>
                                    <p className="holding-overline text-[#6D675D]">0{displayIndex}</p>
                                  </div>

                                  <div className="mt-auto">
                                    <DeckTitle as="h3" variant="card" className="text-[clamp(1.42rem,1.85vw,1.62rem)] leading-[1.08] [@media(max-height:980px)]:text-[clamp(1.25rem,1.55vw,1.42rem)]">
                                      {pillar.title}
                                    </DeckTitle>
                                    <DeckBody className="mt-3 text-[0.95rem] leading-[1.5] text-[#9B9488] [@media(max-height:1180px)]:text-[0.9rem] [@media(max-height:980px)]:text-[0.85rem]">
                                      {pillar.text}
                                    </DeckBody>
                                  </div>
                                </div>
                              </InfoCard>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}
              </SectionShell>
            );

          case "comparison":
            return (
              <SectionShell width="standard">
                  <SectionIntro
                    label="Comparativo"
                    title={slide.title}
                    subtitle={slide.subtitle}
                    className="mb-8 max-w-3xl"
                  />
                  <div className="grid gap-4 lg:grid-cols-2">
                    <InfoCard className="min-h-[360px]">
                      <p className="holding-overline text-[#6D675D]">Projeto atual</p>
                      <DeckTitle as="h3" variant="card" className="mt-4">
                        {slide.leftTitle}
                      </DeckTitle>
                      <div className="mt-8 space-y-3">
                        {slide.leftItems.map((item) => (
                          <div
                            key={item}
                            className="rounded-xl border border-[#1A1A1A] bg-[#101010] px-4 py-4"
                          >
                            <DeckBody className="text-[#C8C4BC]">{item}</DeckBody>
                          </div>
                        ))}
                      </div>
                    </InfoCard>
                    <InfoCard className="min-h-[360px] border-[#C9A86C]/20 bg-[linear-gradient(140deg,_rgba(201,168,108,0.08),_rgba(13,13,13,1)_35%)]">
                      <p className="holding-overline">Etapa de evolução</p>
                      <DeckTitle as="h3" variant="card" className="mt-4">
                        {slide.rightTitle}
                      </DeckTitle>
                      <div className="mt-8 space-y-3">
                        {slide.rightItems.map((item) => (
                          <div
                            key={item}
                            className="rounded-xl border border-[#C9A86C]/15 bg-[#101010] px-4 py-4"
                          >
                            <DeckBody className="text-[#F2EFE9]">{item}</DeckBody>
                          </div>
                        ))}
                      </div>
                    </InfoCard>
                  </div>
              </SectionShell>
            );

          case "cadence":
            return (
              <SectionShell
                width="standard"
                contentClassName="grid grid-cols-1 items-center gap-14 lg:grid-cols-12"
              >
                  <div className="lg:col-span-4">
                    <SectionIntro
                      label="Cadência"
                      title={slide.title}
                      subtitle={slide.subtitle}
                      className="max-w-lg"
                    />
                  </div>
                  <div className="lg:col-span-8">
                    <div className="mb-8 grid gap-4 md:grid-cols-[1.3fr_0.9fr]">
                      <div className="rounded-[24px] border border-[#1E1E1E] bg-[linear-gradient(135deg,_rgba(201,168,108,0.06),_rgba(11,11,11,1)_42%)] px-6 py-5">
                        <p className="holding-overline">Estrutura do acompanhamento</p>
                        <DeckMeta className="mt-2 max-w-xl text-[#A59E91]">
                          Uma rotina contínua para acompanhar a operação, destravar gargalos e acelerar a implementação de IA.
                        </DeckMeta>
                      </div>
                      <div className="rounded-[24px] border border-[#1E1E1E] bg-[#0D0D0D] px-6 py-5">
                        <p className="holding-overline text-[#6D675D]">Ritmo</p>
                        <DeckTitle as="p" variant="card" className="mt-2 text-[clamp(1.8rem,2.6vw,2rem)]">
                          Semanal e iterativo
                        </DeckTitle>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                      {slide.steps.map((step) => (
                        <InfoCard
                          key={`${step.label}-${step.text}`}
                          className={
                            step.emphasis
                              ? "border-[#C9A86C]/18 bg-[linear-gradient(160deg,_rgba(201,168,108,0.06),_rgba(13,13,13,1)_45%)]"
                              : ""
                          }
                        >
                          <p
                            className={cn(`holding-overline ${
                              step.emphasis ? "text-[#C9A86C]" : "text-[#4A4745]"
                            }`)}
                          >
                            {step.label}
                          </p>
                          <DeckBody className="mt-6 holding-body-lg text-[#F2EFE9]">
                            {step.text}
                          </DeckBody>
                        </InfoCard>
                      ))}
                    </div>
                    {slide.footnote ? (
                      <DeckMeta className="mt-6 max-w-3xl text-[#8E877B]">
                        {slide.footnote}
                      </DeckMeta>
                    ) : null}
                  </div>
              </SectionShell>
            );

          case "delivery":
            return (
              <SectionShell width="standard">
                  <SectionIntro
                    label="Primeira etapa"
                    title={slide.title}
                    subtitle={slide.subtitle}
                    className="mb-8 max-w-3xl"
                  />

                  <div className="grid gap-4 lg:grid-cols-3">
                    {slide.sections.map((section, idx) => (
                      <InfoCard
                        key={section.title}
                        className={
                          idx === 1
                            ? "min-h-[420px] border-[#C9A86C]/18 bg-[linear-gradient(160deg,_rgba(201,168,108,0.06),_rgba(13,13,13,1)_42%)]"
                            : "min-h-[420px]"
                        }
                      >
                        <p
                          className={cn(`holding-overline ${
                            idx === 1 ? "text-[#C9A86C]" : "text-[#4A4745]"
                          }`)}
                        >
                          {section.title}
                        </p>
                        <div className="mt-8 space-y-3">
                          {section.items.map((item) => (
                            <div
                              key={item}
                              className={`rounded-xl px-4 py-4 ${
                                idx === 1
                                  ? "border border-[#C9A86C]/15 bg-[#101010] text-[#F2EFE9]"
                                  : "border border-[#1A1A1A] bg-[#101010] text-[#C8C4BC]"
                              }`}
                            >
                              <DeckBody className={idx === 1 ? "text-[#F2EFE9]" : "text-[#C8C4BC]"}>
                                {item}
                              </DeckBody>
                            </div>
                          ))}
                        </div>
                      </InfoCard>
                    ))}
                  </div>
                  {slide.footnote ? (
                    <DeckMeta className="mt-6 max-w-3xl text-[#8E877B]">
                      {slide.footnote}
                    </DeckMeta>
                  ) : null}
              </SectionShell>
            );

          case "case-study":
            return (
              <SectionShell
                width="media"
                contentClassName="grid h-full grid-cols-1 items-stretch gap-8 lg:grid-cols-[0.8fr_1.2fr]"
              >
                  <div className="flex flex-col justify-center py-4">
                    <SectionIntro
                      label={slide.label}
                      title={slide.title}
                      subtitle={slide.subtitle}
                      className="max-w-xl"
                    />
                    <div className="mt-8 space-y-3">
                      {slide.outcomes.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-4 rounded-xl border border-[#1E1E1E] bg-[#0D0D0D] px-5 py-4"
                        >
                          <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#C9A86C]/40">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#C9A86C]" />
                          </div>
                          <DeckBody as="span">
                            {item}
                          </DeckBody>
                        </div>
                      ))}
                    </div>
                    {slide.ctaLabel && slide.ctaHref ? (
                      <div className="mt-7">
                        <a
                          href={slide.ctaHref}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-3 rounded-full border border-[#C9A86C]/30 bg-[linear-gradient(135deg,_rgba(201,168,108,0.16),_rgba(201,168,108,0.04))] px-6 py-3 text-xs font-medium tracking-[0.2em] text-[#F2EFE9] transition-all duration-300 hover:border-[#C9A86C]/55 hover:bg-[linear-gradient(135deg,_rgba(201,168,108,0.24),_rgba(201,168,108,0.08))]"
                        >
                          <span className="uppercase">{slide.ctaLabel}</span>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C9A86C]/20 bg-[#0D0D0D]/70 transition-transform duration-300 group-hover:translate-x-0.5">
                            <ArrowRight className="h-4 w-4 text-[#C9A86C]" />
                          </span>
                        </a>
                        {slide.ctaHint ? (
                          <DeckMeta className="mt-3 pl-1 text-[#8E877B]">
                            {slide.ctaHint}
                          </DeckMeta>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                  {renderCaseAsset(slide.asset)}
              </SectionShell>
            );

          case "investment":
            if (slide.tone === "highlight") {
              return (
                <SectionShell
                  width="standard"
                  contentClassName="grid grid-cols-1 items-center gap-14 lg:grid-cols-12"
                >
                    <div className="lg:col-span-5">
                      <SectionIntro
                        label="Condição Exclusiva"
                        title={slide.title}
                        subtitle={slide.subtitle}
                        showRule
                        className="max-w-lg"
                      />
                    </div>

                    <div className="lg:col-span-7">
                      <InfoCard className="relative min-h-[360px] overflow-hidden border-[#C9A86C]/20 bg-[linear-gradient(160deg,_rgba(201,168,108,0.1),_rgba(13,13,13,1)_34%)]">
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A86C]/30 to-transparent" />
                        <div className="relative flex h-full flex-col">
                          <div className="mb-8 flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#C9A86C]/20 bg-[#C9A86C]/10">
                              <ShieldCheck className="h-5 w-5 text-[#C9A86C]" />
                            </div>
                            <div>
                              <p className="holding-overline">Condição ativa</p>
                              <DeckMeta className="text-[#8E877B]">
                                Oferta e pagamento organizados em um único bloco.
                              </DeckMeta>
                            </div>
                          </div>

                          <div className="grid gap-8 lg:grid-cols-2">
                            <div className="flex flex-col gap-4">
                              <p className="holding-overline">Oferta</p>
                              <div className="grid auto-rows-fr gap-3">
                                {slide.items.map((item) => (
                                  <div
                                    key={item}
                                    className="flex min-h-[88px] items-center rounded-xl border border-[#1E1E1E] bg-[#101010]/95 px-5 py-4"
                                  >
                                    <DeckBody className="holding-body-lg text-[#F2EFE9]">
                                      {item}
                                    </DeckBody>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {slide.payment ? (
                              <div className="flex flex-col gap-4 border-t border-[#1E1E1E] pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                                <p className="holding-overline text-[#6D675D]">Pagamento</p>
                                <div className="grid auto-rows-fr gap-3">
                                  {slide.payment.map((item) => (
                                    <div
                                      key={item}
                                      className="flex min-h-[88px] items-center rounded-xl border border-[#1E1E1E] bg-[#101010]/95 px-5 py-4"
                                    >
                                      <DeckBody className="holding-body-lg text-[#DDD7CD]">
                                        {item}
                                      </DeckBody>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </InfoCard>
                    </div>
                </SectionShell>
              );
            }

            return (
              <SectionShell width="narrow" centerY>
                  <SectionIntro
                    label="Condição padrão"
                    title={slide.title}
                    subtitle={slide.subtitle}
                    className="mx-auto mb-10 max-w-3xl items-center text-center"
                    titleClassName="text-[clamp(3.25rem,5vw,4.5rem)]"
                    subtitleClassName="max-w-3xl"
                  />

                  <div className="mx-auto w-full max-w-[1120px] overflow-hidden rounded-[28px] border border-[#1E1E1E] bg-[#0D0D0D] px-8 py-9 md:px-10 md:py-10">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C9A86C]/35 to-transparent" />

                    <div className="py-8 text-center">
                      <p className="holding-overline mb-4 text-[#6D675D]">Valor do programa</p>
                      <span
                        className="font-serif text-6xl font-light tracking-tighter text-[#F2EFE9] md:text-8xl"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {slide.value ?? slide.title}
                      </span>
                    </div>

                    {slide.description ? (
                      <DeckSubtitle className="mx-auto max-w-3xl text-center">
                        {slide.description}
                      </DeckSubtitle>
                    ) : null}

                    <div className="mt-8 border-t border-[#1E1E1E] pt-6">
                      <div className="space-y-4">
                        {slide.items.map((item) => (
                          <div key={item} className="flex items-center gap-4">
                            <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#C9A86C]/40">
                              <div className="h-1.5 w-1.5 rounded-full bg-[#C9A86C]" />
                            </div>
                            <DeckBody as="span" className="text-[#C8C4BC] md:text-lg">
                              {item}
                            </DeckBody>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
              </SectionShell>
            );

          case "summit":
            return (
              <SummitRewardSlide
                data={{
                  title: slide.title,
                  subtitle: slide.subtitle ?? "",
                  highlights: slide.highlights,
                  perks: slide.perks,
                }}
              />
            );

          case "media":
            return (
              <MediaShowcaseSlide
                title={slide.title}
                subtitle={slide.subtitle ?? ""}
                featured={slide.featured}
                gallery={slide.gallery}
              />
            );

          case "closing":
            return (
              <SectionShell
                width="standard"
                centerY
                contentClassName="flex flex-col justify-center"
              >
                  <SectionIntro
                    label="Próxima etapa"
                    title={slide.title}
                    subtitle={slide.subtitle}
                    titleVariant="hero"
                    showRule
                    className="max-w-[1100px]"
                    titleClassName="max-w-4xl text-[clamp(3.8rem,6vw,5rem)]"
                    subtitleClassName="max-w-4xl"
                  />
                  <div className="mt-10 max-w-3xl rounded-[28px] border border-[#1E1E1E] bg-[#0D0D0D] px-8 py-8">
                    <DeckBody className="holding-body-lg text-[#F2EFE9]">
                      {slide.cta}
                    </DeckBody>
                  </div>
              </SectionShell>
            );
        }
      }}
    />
  );
}
