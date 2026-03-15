"use client";

import React, { useEffect } from "react";
import {
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, Legend,
} from "recharts";
import {
  BarChart3,
  BookOpen,
  Calendar,
  CirclePlay,
  Clock,
  Cpu,
  FileText,
  Gauge,
  Layers,
  MessageSquare,
  Network,
  Send,
  ShieldCheck,
  Terminal,
  Timer,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import {
  cn,
  type DeckAsset,
  DeckBody,
  DeckMeta,
  DeckShell,
  DeckSubtitle,
  DeckTitle,
  GoldRule,
  InfoCard,
  SectionIntro,
  SectionShell,
} from "@/components/presentation/DeckPrimitives";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type BaseSlide = { id: number };

type CoverSlide = BaseSlide & {
  type: "cover";
  overline: string;
  title: string;
  subtitle: string;
  badge: string;
};

type StatementSlide = BaseSlide & {
  type: "statement";
  overline: string;
  title: string;
  body: string;
  diagnostic?: boolean; // gold-border treatment
  centered?: boolean;
  quoteText?: string; // for centered quote style
  showChart?: boolean; // shows efficiency area chart
  showBarChart?: boolean; // shows empresa mortality bar chart
  showCeilingChart?: boolean; // shows growth ceiling bar chart
};

type VoltaSlide = BaseSlide & {
  type: "volta";
  line1: string;
  line2?: string;
  line2Gold?: boolean;
  subtitle?: string;
  tags?: string[];
  tagLabel?: string;
};

type ProofIntroSlide = BaseSlide & {
  type: "proof-intro";
  body: string;
  previews: Array<{ icon: React.ComponentType<{ className?: string }>; label: string }>;
};

type CaseStudySlide = BaseSlide & {
  type: "case-study";
  caseType: string;
  title: string;
  description: string;
  outcomes: string[];
  imageSrc?: string;
  imageFit?: "contain" | "cover";
};

type CapabilitiesSlide = BaseSlide & {
  type: "capabilities";
  overline: string;
  title: string;
  description: string;
  tags: string[];
};

type OrgImageSlide = BaseSlide & {
  type: "org-image";
  overline: string;
  title: string;
  imageSrc?: string;
};

type AgentsOrgSlide = BaseSlide & {
  type: "agents-org";
  overline: string;
  title: string;
  quote: string;
};

type ImpactSlide = BaseSlide & {
  type: "impact";
  overline: string;
  title: string;
  cards: Array<{
    icon: React.ComponentType<{ className?: string }>;
    metric: string;
    heading: string;
    description: string;
  }>;
};

type DeliverablesOverSlide = BaseSlide & {
  type: "deliverables-over";
  overline: string;
  title: string;
  cards: Array<{
    icon: React.ComponentType<{ className?: string }>;
    label: string;
  }>;
};

type DeliverablesSectionSlide = BaseSlide & {
  type: "deliverables-section";
  moduleNumber: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  items: Array<{ label: string; category?: string }>;
  buildCards?: Array<{ title: string; description: string }>;
  badge?: string;
};

type BonusSlide = BaseSlide & {
  type: "bonus";
  bonusNumber: string;
  title: string;
  subtitle: string;
  items: Array<{ code?: string; label: string; description?: string }>;
};

type AnchorIntroSlide = BaseSlide & {
  type: "anchor-intro";
  overline: string;
  title: string;
};

type AnchorSlide = BaseSlide & {
  type: "anchor";
  scenario: string;
  title: string;
  items: string[];
  urgent?: boolean;
};

type InvestmentSlide = BaseSlide & {
  type: "investment";
  overline: string;
  title: string;
  subtitle: string;
  entryLabel: string;
  entryValue: string;
  monthlyLabel: string;
  monthlyValue: string;
  note: string;
  footer: string;
};

type ScarcitySlide = BaseSlide & {
  type: "scarcity";
  overline: string;
  title: string;
  bullets: string[];
};

type CtaQrSlide = BaseSlide & {
  type: "cta-qr";
  overline: string;
  headline: string;
  commitLabel: string;
  commitValue: string;
  benefits: string[];
  steps: string[];
  action: string;
};

type GuaranteeSlide = BaseSlide & {
  type: "guarantee";
  overline: string;
  text: string;
};

type PaymentStepsSlide = BaseSlide & {
  type: "payment-steps";
  overline: string;
  title: string;
  steps: Array<{
    number: string;
    label: string;
    value: string;
    note: string;
  }>;
};

type MaestriaSlide =
  | CoverSlide
  | StatementSlide
  | VoltaSlide
  | ProofIntroSlide
  | CaseStudySlide
  | CapabilitiesSlide
  | OrgImageSlide
  | AgentsOrgSlide
  | ImpactSlide
  | DeliverablesOverSlide
  | DeliverablesSectionSlide
  | BonusSlide
  | AnchorIntroSlide
  | AnchorSlide
  | InvestmentSlide
  | PaymentStepsSlide
  | ScarcitySlide
  | CtaQrSlide
  | GuaranteeSlide;

// ─── IMAGE ASSETS ─────────────────────────────────────────────────────────────

const CDN = {
  atendimento:
    "https://t9013332252.p.clickup-attachments.com/t9013332252/f569837c-b593-493e-a042-38287774913d/atendimento-api-oficial.png",
  rhSystem:
    "https://t9013332252.p.clickup-attachments.com/t9013332252/2e79a0a6-61d9-46a6-bca8-cf1188c1f7c8/sistema-ats.png",
  triagem:
    "https://t9013332252.p.clickup-attachments.com/t9013332252/19d26e88-1a78-429a-9651-8e4cebf38628/agente-ia-rh.png",
  trafego:
    "https://t9013332252.p.clickup-attachments.com/t9013332252/d39db36b-3bf0-44aa-bb1d-a576658bfae3/agente-ia-trafego.png",
  disparos:
    "https://t9013332252.p.clickup-attachments.com/t9013332252/aff647d4-4a3d-4d0a-bfb5-5b1c55671796/agente-ia-disparos.png",
};

const efficiencyData = [
  { name: "Mês 1", manual: 180, automacao: 150 },
  { name: "Mês 2", manual: 190, automacao: 120 },
  { name: "Mês 3", manual: 200, automacao: 80 },
  { name: "Mês 4", manual: 210, automacao: 50 },
  { name: "Mês 5", manual: 220, automacao: 35 },
  { name: "Mês 6", manual: 230, automacao: 20 },
];

const empresasData = [
  { name: "2021", abertas: 4026000, fechadas: 1400000 },
  { name: "2022", abertas: 3840000, fechadas: 1712000 },
  { name: "2023", abertas: 3868000, fechadas: 2153000 },
  { name: "2024 (Proj.)", abertas: 4254000, fechadas: 2436000 },
];

const ceilingData = [
  { name: "Fundador é\na operação", crescimento: 6 },
  { name: "Fundador\nsupervisiona tudo", crescimento: 18 },
  { name: "Processos\ndocumentados", crescimento: 41 },
  { name: "Operação\nsistematizada", crescimento: 89 },
];

const tooltipStyle = {
  backgroundColor: "#0D0D0D",
  border: "1px solid #1E1E1E",
  borderRadius: 8,
  fontSize: 13,
  color: "#F2EFE9",
};

// ─── SLIDE DATA ───────────────────────────────────────────────────────────────

export const slides: MaestriaSlide[] = [
  // ── BLOCO 1: DOR ──────────────────────────────────────────────────────────
  {
    id: 1,
    type: "cover",
    overline: "MENTORIA EXCLUSIVA",
    title: "MAESTR.IA",
    subtitle:
      "De empresário que trabalha muito com equipe improdutiva para empresário que opera com inteligência.",
    badge: "Orquestrador · Agentes de IA",
  },
  {
    id: 2,
    type: "statement",
    overline: "O CENÁRIO",
    title: "Você trabalha muito. E o negócio ainda depende de você para quase tudo.",
    body: "Não é falta de esforço. É que um certo nível de crescimento exige uma nova camada — e essa camada não é mais gente. É inteligência operacional.",
    showChart: true,
  },
  {
    id: 3,
    type: "statement",
    overline: "A MORTALIDADE",
    title: "Em 3 anos, 1 milhão a mais de empresas fecharam por ano. A maioria não faltou gente — faltou sistema.",
    body: "Abertura vs. Fechamento de Empresas no Brasil (Fonte: IBGE / Gov.br). Operações engessadas perdem a corrida silenciosamente.",
    showBarChart: true,
  },
  {
    id: 4,
    type: "statement",
    overline: "DIAGNÓSTICO",
    title: "Se a operação precisa de você para funcionar, o crescimento tem teto.",
    body: "E esse teto aparece exatamente quando você mais precisa de velocidade. O empresário que é o sistema não consegue escalar — ele só consegue trabalhar mais.",
    diagnostic: true,
    showCeilingChart: true,
  },
  // ── BLOCO 2: VIRADA ───────────────────────────────────────────────────────
  {
    id: 5,
    type: "volta",
    line1: "IA não é mais ferramenta.",
    line2: "É mão de obra.",
    line2Gold: true,
  },
  {
    id: 6,
    type: "volta",
    line1: "Vibecoding",
    subtitle:
      "A prática de construir sistemas com IA sem escrever uma linha de código. Você descreve o que precisa — a IA executa.",
  },
  {
    id: 7,
    type: "volta",
    line1: "Com vibecoding, qualquer empresário pode construir o que antes precisava de um time técnico inteiro.",
    tagLabel: "Exemplos que você pode construir",
    tags: [
      "Atendimento automatizado",
      "Agente de triagem",
      "Sistema de RH",
      "Gestão de tráfego",
      "Disparo inteligente",
      "CRM proprietário",
      "Área de membros",
      "Funil comercial",
      "Relatórios com IA",
    ],
  },
  // ── BLOCO 3: PROVA REAL ───────────────────────────────────────────────────
  {
    id: 8,
    type: "proof-intro",
    body: "Alguns dos projetos que a equipe da Bravy desenvolveu, sem programadores.",
    previews: [],
  },
  {
    id: 9,
    type: "case-study",
    caseType: "Sistema",
    title: "Atendimento via API Oficial",
    description:
      "Atendimento padronizado com rastreabilidade de ponta a ponta e controle total do fluxo operacional — sem risco de banimento.",
    outcomes: [
      "API oficial — sem risco de banimento.",
      "Fluxo com etapas, status e rastreabilidade.",
      "Escalável sem aumentar a equipe.",
    ],
    imageSrc: CDN.atendimento,
    imageFit: "contain",
  },
  {
    id: 10,
    type: "case-study",
    caseType: "Sistema",
    title: "Sistema Proprietário de RH",
    description:
      "Da triagem ao onboarding: um ambiente central para toda a operação de pessoas.",
    outcomes: [
      "Centraliza etapas de seleção e contratação.",
      "Reduz tempo e retrabalho no processo.",
      "Visibilidade real sobre o pipeline de pessoas.",
    ],
    imageSrc: CDN.rhSystem,
    imageFit: "contain",
  },
  {
    id: 11,
    type: "case-study",
    caseType: "Agente de IA",
    title: "Agente de Triagem de Candidatos",
    description:
      "IA que pré-qualifica candidatos automaticamente, reduzindo o esforço do time humano antes de qualquer entrevista.",
    outcomes: [
      "Triagem automática com critérios configuráveis.",
      "Menos tempo com candidatos desqualificados.",
      "Decisões mais rápidas com dados objetivos.",
    ],
    imageSrc: CDN.triagem,
    imageFit: "contain",
  },
  {
    id: 12,
    type: "case-study",
    caseType: "Agente de IA",
    title: "Agente Gestor de Tráfego",
    description:
      "Acompanhamento de campanhas e investimentos com apoio de IA para decisões mais ágeis.",
    outcomes: [
      "Análise de campanhas em linguagem natural.",
      "Identifica oportunidades de ajuste automaticamente.",
      "Mais agilidade na tomada de decisão.",
    ],
    imageSrc: CDN.trafego,
    imageFit: "contain",
  },
  {
    id: 13,
    type: "case-study",
    caseType: "Agente de IA",
    title: "Agente de Disparos Inteligentes",
    description:
      "Automatização de disparos e follow-ups com consistência e ritmo operacional sem execução manual.",
    outcomes: [
      "Disparos automáticos no momento certo.",
      "Follow-up cadenciado sem depender do time.",
      "Mais velocidade para campanhas e ativações.",
    ],
    imageSrc: CDN.disparos,
    imageFit: "contain",
  },
  {
    id: 14,
    type: "case-study",
    caseType: "Sistema",
    title: "Área de Membros",
    description:
      "Sistema proprietário para entrega de conteúdo e gestão de alunos — sem plataforma de terceiros.",
    outcomes: [
      "Identidade visual própria.",
      "Controle total do acesso e conteúdo.",
      "Sem mensalidade de plataforma externa.",
    ],
    imageSrc: "https://t9013332252.p.clickup-attachments.com/t9013332252/be0c3ea7-bc52-43cf-8e3a-36466d90c6f8/portal-bravy.png",
    imageFit: "contain",
  },
  // ── BLOCO 4: O QUE VOCÊ PODE CONSTRUIR ───────────────────────────────────
  {
    id: 18,
    type: "org-image",
    overline: "ARQUITETURA",
    title: "Seu negócio com uma camada de inteligência em cada processo.",
    imageSrc: "https://t9013332252.p.clickup-attachments.com/t9013332252/4962cad6-4a0e-4a25-8787-fe6596f29e18/organograma-ia.png",
  },
  {
    id: 19,
    type: "agents-org",
    overline: "ARQUITETURA DE AGENTES",
    title: "3 camadas. 1 operação inteligente.",
    quote: "",
  },
  {
    id: 20,
    type: "impact",
    overline: "IMPACTO REAL",
    title: "O que muda na prática",
    cards: [
      {
        icon: Timer,
        metric: "VELOCIDADE",
        heading: "10× mais rápido",
        description:
          "Sistemas que levariam meses para desenvolver, construídos em dias.",
      },
      {
        icon: TrendingUp,
        metric: "MARGEM",
        heading: "Menos custo operacional",
        description:
          "Substitui horas de trabalho manual por automação inteligente.",
      },
      {
        icon: Gauge,
        metric: "CAIXA",
        heading: "Mais resultado, mesmo time",
        description:
          "Capacidade de escalar operação sem escalar folha de pagamento.",
      },
    ],
  },
  // ── BLOCO 5: ENTREGÁVEIS ─────────────────────────────────────────────────
  {
    id: 21,
    type: "deliverables-over",
    overline: "O QUE ESTÁ INCLUÍDO",
    title: "Tudo o que você recebe na MAESTR.IA",
    cards: [
      { icon: BookOpen, label: "Treinamento" },
      { icon: Users, label: "Encontros" },
      { icon: FileText, label: "Sistemas prontos" },
      { icon: Terminal, label: "Prompts" },
      { icon: Layers, label: "Build" },
      { icon: MessageSquare, label: "Comunidade" },
    ],
  },
  {
    id: 22,
    type: "deliverables-section",
    moduleNumber: "MÓDULO 01",
    icon: BookOpen,
    title: "Treinamento",
    subtitle: "10 aulas gravadas com fundamentos de Vibecoding.",
    items: [
      { label: "Stacks recomendadas" },
      { label: "Ferramentas necessárias" },
      { label: "Como instalar depedências" },
      { label: "Como iniciar um projeto" },
    ],
  },
  {
    id: 23,
    type: "deliverables-section",
    moduleNumber: "MÓDULO 02",
    icon: Users,
    title: "Encontros ao Vivo",
    subtitle: "Acompanhamento semanal com a equipe Bravy.",
    items: [
      { label: "2 encontros semanais ao vivo" },
      { label: "Gravações de todos os encontros" },
      { label: "Hotseat mensal" },
      { label: "SOS Individual para problemas críticos" },
    ],
  },
  {
    id: 24,
    type: "deliverables-section",
    moduleNumber: "MÓDULO 03",
    icon: Terminal,
    title: "Biblioteca de Prompts",
    subtitle: "Prompts prontos para cada processo do seu negócio.",
    items: [
      { category: "ARQUITETURA", label: "Como iniciar um projeto" },
      { category: "INFRA", label: "Velocidade, segurança e escalabilidade" },
      { category: "UI/UX", label: "Design System" },
      { category: "GESTÃO", label: "Squads para operacionalizar" },
      { category: "VENDAS", label: "Abordagem, proposta, fechamento" },
    ],
  },
  {
    id: 25,
    type: "deliverables-section",
    moduleNumber: "MÓDULO 04",
    icon: Layers,
    title: "Sua empresa 100% automatizada",
    subtitle: "IAs autônomas, conectadas, operando seu negócio em um único sistema.",
    items: [],
    buildCards: [
      {
        title: "ORQUESTRADOR",
        description: "O cérebro da operação. Define prioridades e distribui tarefas para os líderes de squad.",
      },
      {
        title: "LÍDERES DE SQUAD",
        description: "Coordenam grupos de agentes especializados por área — Atendimento, Comercial, Operações.",
      },
      {
        title: "AGENTES",
        description: "Executam com autonomia dentro do squad. Cada agente tem suas próprias Skills, Rotinas e Tarefas.",
      },
    ],
  },
  {
    id: 26,
    type: "deliverables-section",
    moduleNumber: "MÓDULO 05",
    icon: MessageSquare,
    title: "Comunidade Exclusiva",
    subtitle: "Acesso ao grupo de empresários que vibcodam.",
    items: [
      { label: "Grupo VIP no WhatsApp" },
      { label: "Troca de builds entre membros" },
      { label: "Suporte direto da equipe Bravy" },
      { label: "Acesso por 6 meses" }    ],
    badge: "WhatsApp",
  },
  // ── BLOCO 6: BÔNUS ────────────────────────────────────────────────────────
  {
    id: 27,
    type: "bonus",
    bonusNumber: "SISTEMAS PRONTOS PARA USAR",
    title: "Sistemas que investimos +R$20K em cada sistema",
    subtitle: "Você recebe +R$120.000,00 em códigos completos dos sistemas que a Bravy usa internamente.",
    items: [
      { label: "Sistema de Atendimento com IA" },
      { label: "Área de Membros" },
      { label: "Sistema de ATS" },
      { label: "Sistema de Forecasting" },
      { label: "Diagnóstico / Briefing" },
      { label: "Agente Meta Ads" },
    ],
  },
  {
    id: 28,
    type: "bonus",
    bonusNumber: "COMERCIAL",
    title: "Comercial",
    subtitle: "Tudo que você precisa para escalar seus sistemas.",
    items: [
      {
        label: "Estratégia de vendas da Bravy",
        description: "Masterclass ensinando como vendemos sistemas integrados aos nossos produtos",
      },
      {
        label: "Consultoria de Oferta e Posicionamento",
        description: "3 treinamentos de vendas para você vender sistemas de IA",
      },
    ],
  },
  // ── BLOCO 7: GARANTIA E OFERTA ────────────────────────────────────────────
  {
    id: 29,
    type: "guarantee",
    overline: "GARANTIA TOTAL",
    text: "Se ao final do programa você não tiver nenhuma aplicação rodando, devolvemos 100% do seu investimento.",
  },
  {
    id: 30,
    type: "anchor-intro",
    overline: "ANTES DO INVESTIMENTO",
    title: "O custo real de não decidir agora.",
  },
  {
    id: 31,
    type: "anchor",
    scenario: "CENÁRIO 01",
    title: "Aprender sozinho",
    items: [
      "Meses testando sem direção clara",
      "Custo do tempo do próprio empresário",
      "Erros caros sem mentoria para corrigi-los",
      "Sem comunidade de suporte",
    ],
  },
  {
    id: 32,
    type: "anchor",
    scenario: "CENÁRIO 02",
    title: "Contratar Dev ou Agência",
    items: [
      "R$ 8k–30k por sistema desenvolvido",
      "Dependência técnica permanente",
      "Sem conhecimento interno para evoluir",
      "Sem agilidade para mudanças rápidas",
    ],
  },
  {
    id: 33,
    type: "anchor",
    scenario: "CENÁRIO 03",
    title: "Continuar sem sistemas",
    items: [
      "Operação que depende de pessoas para tudo",
      "Crescimento com teto claro",
      "Custo de equipe crescendo junto com a receita",
      "Velocidade limitada pelo volume de gente",
    ],
    urgent: true,
  },
  {
    id: 34,
    type: "investment",
    overline: "INVESTIMENTO",
    title: "Menor custo que 1 colaborador CLT",
    subtitle:
      "6 meses para transformar a sua operação com inteligência artificial — e sair com sistemas rodando.",
    entryLabel: "Entrada",
    entryValue: "R$5.000",
    monthlyLabel: "Mensalidade",
    monthlyValue: "6x R$2.000/mês",
    note: "No cartão — sem consumir limite total",
    footer: "Total: R$17.000",
  },
  {
    id: 35,
    type: "payment-steps",
    overline: "COMO FUNCIONA O PAGAMENTO",
    title: "3 momentos, tudo no cartão",
    steps: [
      {
        number: "01",
        label: "Hoje",
        value: "R$2.000",
        note: "Taxa de compromisso — garante sua vaga e abate da entrada",
      },
      {
        number: "02",
        label: "Na entrada",
        value: "R$3.000",
        note: "Saldo da entrada (R$5.000 − R$2.000 já pagos)",
      },
      {
        number: "03",
        label: "Todo mês",
        value: "R$2.000",
        note: "6 mensalidades durante a mentoria",
      },
    ],
  },
  {
    id: 36,
    type: "scarcity",
    overline: "OFERTA VÁLIDA ATÉ SEGUNDA-FEIRA ÀS 18H",
    title: "Após isso, sem bônus e sem SOS.",
    bullets: [
      "6 Sistemas Prontos incluídos apenas nessa condição",
      "Kit Comercial incluído apenas nessa condição",
      "SOS Individual removido após segunda-feira",
      "A mentoria continua aberta, mas o pacote muda",
    ],
  },
  {
    id: 37,
    type: "cta-qr",
    overline: "PRÓXIMO PASSO",
    headline: "Garanta sua vaga agora",
    commitLabel: "TAXA DE COMPROMISSO",
    commitValue: "R$2.000",
    benefits: [
      "Abate integralmente da sua entrada ao iniciar",
      "Reembolso de 100% garantido se desistir",
    ],
    steps: [
      "Preencha a aplicação",
      "Pague a taxa de R$2.000",
      "Reunião com nosso time para negociar o restante",
    ],
    action: "Aplicar agora",
  },
];

// ─── ASSET PRELOAD ────────────────────────────────────────────────────────────

export function getMaestriaSlideAssets(slide: MaestriaSlide): DeckAsset[] {
  if (slide.type === "case-study" && slide.imageSrc) {
    return [{ src: slide.imageSrc, kind: "image", slideId: slide.id, priority: 100 }];
  }
  if (slide.type === "org-image" && slide.imageSrc) {
    return [{ src: slide.imageSrc, kind: "image", slideId: slide.id, priority: 80 }];
  }
  if (slide.type === "cta-qr") {
    return [{
      src: "https://t9013332252.p.clickup-attachments.com/t9013332252/ed8bc645-3882-472a-a0b7-6d02fb7e36d0/QR-CODE-MAESTRIA.png",
      kind: "image",
      slideId: slide.id,
      priority: 50,
    }];
  }
  return [];
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function GoldDot() {
  return <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#C9A86C]" />;
}

function OutcomeItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A86C]" />
      <DeckBody className="text-[#DDD7CD]">{children}</DeckBody>
    </div>
  );
}

function CasePlaceholder({ title }: { title: string }) {
  return (
    <div className="relative flex h-full min-h-[420px] flex-col justify-between overflow-hidden rounded-[32px] border border-[#1E1E1E] bg-[#0D0D0D] p-8 lg:min-h-[calc(100vh-220px)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(201,168,108,0.12),_transparent_40%)]" />
      <div className="relative">
        <div className="inline-flex items-center rounded-full border border-[#C9A86C]/20 bg-[#C9A86C]/8 px-3 py-1.5">
          <span className="holding-overline">Em construção</span>
        </div>
        <DeckTitle as="p" variant="card" className="mt-4 max-w-md">
          {title}
        </DeckTitle>
      </div>
      <div className="relative rounded-[24px] border border-dashed border-[#2A2A2A] bg-[#0A0A0A]/80 px-6 py-10 text-center">
        <CirclePlay className="mx-auto h-10 w-10 text-[#C9A86C] opacity-60" />
        <DeckMeta className="mt-4 text-[#DDD7CD]">
          Screenshot do sistema será adicionado aqui.
        </DeckMeta>
      </div>
    </div>
  );
}

// ─── RENDER ───────────────────────────────────────────────────────────────────

export function renderMaestriaSlide(slide: MaestriaSlide): React.ReactNode {
  switch (slide.type) {
    // ── COVER ────────────────────────────────────────────────────────────────
    case "cover":
      return (
        <SectionShell width="standard" centerY contentClassName="flex flex-col justify-center">
          <div className="relative max-w-[1100px]">
            <p className="holding-overline mb-6">{slide.overline}</p>
            <DeckTitle
              as="h1"
              variant="hero"
              className="font-serif text-[#F2EFE9]"
             
            >
              {slide.title}
            </DeckTitle>
            <GoldRule className="my-6 w-20" />
            <DeckSubtitle className="max-w-2xl">{slide.subtitle}</DeckSubtitle>
            <div className="mt-10">
              <span className="inline-flex items-center rounded-full border border-[#C9A86C]/25 bg-[#C9A86C]/6 px-4 py-2">
                <span className="holding-overline text-[#C9A86C]/80">{slide.badge}</span>
              </span>
            </div>
          </div>
        </SectionShell>
      );

    // ── STATEMENT ────────────────────────────────────────────────────────────
    case "statement": {
      if (slide.centered && slide.quoteText) {
        return (
          <SectionShell width="narrow" centerY contentClassName="flex flex-col items-center justify-center text-center">
            <p className="holding-overline mb-8">{slide.overline}</p>
            <span className="mb-4 block font-serif text-[7rem] leading-none text-[#C9A86C]/15">"</span>
            <DeckTitle
              as="p"
              variant="feature"
              className="max-w-[860px]"
            >
              {slide.quoteText}
            </DeckTitle>
            <GoldRule className="mx-auto mt-8 w-16" />
          </SectionShell>
        );
      }

      if (slide.showChart) {
        return (
          <SectionShell
            width="standard"
            centerY
            contentClassName="flex flex-col justify-center gap-8"
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="holding-overline mb-4">{slide.overline}</p>
                <DeckTitle as="h2" variant="section" className="max-w-2xl">
                  {slide.title}
                </DeckTitle>
                <GoldRule className="mt-5 w-16" />
              </div>
              <p className="holding-body max-w-sm text-[#9C9589] lg:text-right">{slide.body}</p>
            </div>
            <div className="w-full rounded-2xl border border-[#1E1E1E] bg-[#0D0D0D] p-8" style={{ height: "46vh" }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={efficiencyData} margin={{ top: 16, right: 24, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="mGManual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3A3A3A" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#3A3A3A" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="mGAuto" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C9A86C" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#C9A86C" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="#1E1E1E" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#4A4745", fontSize: 12 }} dy={12} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#4A4745", fontSize: 12 }} dx={-10} />
                  <RechartsTooltip contentStyle={tooltipStyle} itemStyle={{ color: "#F2EFE9" }} />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: "20px", color: "#9C9589", fontSize: 13 }} />
                  <Area type="monotone" name="Operação Tradicional" dataKey="manual" stroke="#3A3A3A" strokeWidth={2} fillOpacity={1} fill="url(#mGManual)" />
                  <Area type="monotone" name="Operação MAESTR.IA" dataKey="automacao" stroke="#C9A86C" strokeWidth={2.5} fillOpacity={1} fill="url(#mGAuto)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-[#4A4745] font-light">Tempo em Operações Manuais vs. Automações MAESTR.IA (Horas/Mês) — primeiros 6 meses.</p>
          </SectionShell>
        );
      }

      if (slide.showBarChart) {
        return (
          <SectionShell
            width="standard"
            centerY
            contentClassName="flex flex-col justify-center gap-8"
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="holding-overline mb-4">{slide.overline}</p>
                <DeckTitle as="h2" variant="section">
                  {slide.title}
                </DeckTitle>
                <GoldRule className="mt-5 w-16" />
              </div>
            </div>
            <div className="w-full rounded-2xl border border-[#1E1E1E] bg-[#0D0D0D] p-8" style={{ height: "46vh" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={empresasData} margin={{ top: 16, right: 24, left: 0, bottom: 0 }} barGap={12}>
                  <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="#1E1E1E" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#4A4745", fontSize: 12 }} dy={12} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#4A4745", fontSize: 11 }} dx={-10} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                  <RechartsTooltip cursor={{ fill: "#141414" }} contentStyle={tooltipStyle} itemStyle={{ color: "#F2EFE9" }} formatter={(v) => typeof v === "number" ? v.toLocaleString("pt-BR") : v} />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: "20px", color: "#9C9589", fontSize: 13 }} />
                  <Bar dataKey="abertas" name="Empresas Abertas" fill="#2A2A2A" radius={[4, 4, 0, 0]} maxBarSize={44} />
                  <Bar dataKey="fechadas" name="Empresas Fechadas" fill="#C9A86C" radius={[4, 4, 0, 0]} maxBarSize={44} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-[#4A4745] font-light">{slide.body}</p>
          </SectionShell>
        );
      }

      if (slide.showCeilingChart) {
        return (
          <SectionShell
            width="standard"
            centerY
            contentClassName="grid grid-cols-1 items-center gap-10 lg:grid-cols-12"
          >
            <div className="lg:col-span-5">
              <p className="holding-overline mb-6">{slide.overline}</p>
              <DeckTitle as="h2" variant="section">
                {slide.title}
              </DeckTitle>
              <GoldRule className="mt-6 w-16" />
              <p className="holding-body mt-6 text-[#9C9589]">{slide.body}</p>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-3">
              <div className="w-full rounded-2xl border border-[#C9A86C]/20 bg-[radial-gradient(circle_at_top_right,_rgba(201,168,108,0.08),_transparent_50%),#0D0D0D] p-8" style={{ height: "52vh" }}>
                <p className="holding-overline mb-6">Crescimento Anual Médio (%) por Nível de Dependência</p>
                <ResponsiveContainer width="100%" height="85%">
                  <BarChart data={ceilingData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }} barGap={8}>
                    <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="#1E1E1E" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#4A4745", fontSize: 11 }} dy={12} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#4A4745", fontSize: 12 }} dx={-10} tickFormatter={(v) => `${v}%`} />
                    <RechartsTooltip cursor={{ fill: "#141414" }} contentStyle={tooltipStyle} itemStyle={{ color: "#F2EFE9" }} formatter={(v) => [`${v}%`, "Crescimento"]} />
                    <Bar dataKey="crescimento" name="Crescimento" fill="#C9A86C" radius={[4, 4, 0, 0]} maxBarSize={56} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </SectionShell>
        );
      }

      return (
        <SectionShell
          width="standard"
          centerY
          contentClassName="grid grid-cols-1 items-center gap-14 lg:grid-cols-12"
        >
          <div className="lg:col-span-5">
            <p className="holding-overline mb-6">{slide.overline}</p>
            <DeckTitle as="h2" variant="section">
              {slide.title}
            </DeckTitle>
            <GoldRule className="mt-6 w-16" />
          </div>
          <div className="lg:col-span-7">
            <InfoCard
              className={cn(
                "min-h-[220px] flex items-center",
                slide.diagnostic &&
                  "border-[#C9A86C]/20 bg-[radial-gradient(circle_at_top_left,_rgba(201,168,108,0.10),_transparent_40%),linear-gradient(160deg,rgba(201,168,108,0.05),rgba(13,13,13,1)_40%)]",
              )}
            >
              <p className="holding-body-lg text-[#DDD7CD]">{slide.body}</p>
            </InfoCard>
          </div>
        </SectionShell>
      );
    }

    // ── VOLTA ────────────────────────────────────────────────────────────────
    case "volta": {
      // Slide 7: stacked — headline on top, tag grid below
      if (slide.tags && slide.tags.length > 0) {
        return (
          <SectionShell
            width="standard"
            centerY
            contentClassName="flex flex-col justify-center gap-8"
          >
            <div>
              <DeckTitle
                as="h2"
                variant="section"
                className="max-w-3xl"
              >
                {slide.line1}
              </DeckTitle>
              <GoldRule className="mt-5 w-16" />
            </div>
            <div>
              {slide.tagLabel && (
                <p className="holding-overline mb-4">{slide.tagLabel}</p>
              )}
              <div className="grid grid-cols-3 gap-2">
                {slide.tags.map((tag) => (
                  <div
                    key={tag}
                    className="rounded-xl border border-[#1E1E1E] bg-[#0D0D0D] px-4 py-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A86C]" />
                      <DeckMeta className="text-[#DDD7CD]">{tag}</DeckMeta>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionShell>
        );
      }

      // Slide 6: Vibecoding with definition
      if (slide.subtitle) {
        return (
          <SectionShell width="narrow" centerY contentClassName="flex flex-col items-start justify-center">
            <DeckTitle
              as="h2"
              variant="hero"
              className="text-[#F2EFE9]"
             
            >
              {slide.line1}
            </DeckTitle>
            <GoldRule className="my-6 w-20" />
            <DeckSubtitle className="max-w-2xl">{slide.subtitle}</DeckSubtitle>
          </SectionShell>
        );
      }

      // Slide 5: Two lines, line2 in gold
      return (
        <SectionShell width="narrow" centerY contentClassName="flex flex-col items-start justify-center">
          <DeckTitle
            as="h2"
            variant="hero"
            className="text-[#F2EFE9]"
           
          >
            {slide.line1}
          </DeckTitle>
          {slide.line2 && (
            <DeckTitle
              as="p"
              variant="hero"
              className={cn(
                "mt-2",
                slide.line2Gold ? "text-[#C9A86C]" : "text-[#F2EFE9]",
              )}
             
            >
              {slide.line2}
            </DeckTitle>
          )}
        </SectionShell>
      );
    }

    // ── PROOF INTRO ───────────────────────────────────────────────────────────
    case "proof-intro":
      if (slide.previews.length === 0) {
        return (
          <SectionShell width="narrow" centerY contentClassName="flex flex-col justify-center">
            <p className="holding-overline mb-6">PROVA REAL</p>
            <DeckTitle as="h2" variant="section" className="max-w-2xl">
              {slide.body}
            </DeckTitle>
            <GoldRule className="mt-6 w-16" />
          </SectionShell>
        );
      }
      return (
        <SectionShell
          width="standard"
          centerY
          contentClassName="grid grid-cols-1 items-center gap-14 lg:grid-cols-12"
        >
          <div className="lg:col-span-5">
            <p className="holding-overline mb-6">PROVA REAL</p>
            <DeckTitle
              as="h2"
              variant="section"
              className="max-w-md"
            >
              {slide.body}
            </DeckTitle>
            <GoldRule className="mt-6 w-16" />
          </div>
          <div className="lg:col-span-7">
            <div className="flex flex-col gap-3">
              {slide.previews.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-[20px] border border-[#1E1E1E] bg-[#0D0D0D] px-5 py-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-[#C9A86C]/20 bg-[#C9A86C]/8">
                    <Icon className="h-5 w-5 text-[#C9A86C]" />
                  </div>
                  <DeckBody className="text-[#DDD7CD]">{label}</DeckBody>
                </div>
              ))}
            </div>
          </div>
        </SectionShell>
      );

    // ── CASE STUDY ────────────────────────────────────────────────────────────
    case "case-study":
      return (
        <SectionShell
          width="media"
          centerY
          contentClassName="grid grid-cols-1 items-center gap-10 lg:grid-cols-12"
        >
          <div className="flex flex-col gap-6 lg:col-span-4">
            <div>
              <p className="holding-overline mb-3">{slide.caseType}</p>
              <DeckTitle as="h2" variant="section">
                {slide.title}
              </DeckTitle>
              <GoldRule className="mt-4 w-14" />
            </div>
            <DeckBody className="text-[#BEB7AC]">{slide.description}</DeckBody>
            <div className="flex flex-col gap-3">
              {slide.outcomes.map((outcome) => (
                <OutcomeItem key={outcome}>{outcome}</OutcomeItem>
              ))}
            </div>
          </div>
          <div className="lg:col-span-8 flex items-center justify-center">
            {slide.imageSrc ? (
              <img
                src={slide.imageSrc}
                alt={slide.title}
                className="max-h-[60vh] w-full object-contain object-center"
                loading="eager"
              />
            ) : (
              <CasePlaceholder title={slide.title} />
            )}
          </div>
        </SectionShell>
      );

    // ── CAPABILITIES ─────────────────────────────────────────────────────────
    case "capabilities":
      return (
        <SectionShell
          width="standard"
          centerY
          contentClassName="grid grid-cols-1 items-center gap-14 lg:grid-cols-12"
        >
          <div className="lg:col-span-4">
            <p className="holding-overline mb-6">{slide.overline}</p>
            <DeckTitle as="h2" variant="section">
              {slide.title}
            </DeckTitle>
            <GoldRule className="my-5 w-16" />
            <DeckBody className="text-[#BEB7AC]">{slide.description}</DeckBody>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-3 gap-2">
              {slide.tags.map((tag) => (
                <div
                  key={tag}
                  className="rounded-xl border border-[#1E1E1E] bg-[#0D0D0D] px-4 py-3"
                >
                  <div className="flex items-start gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A86C]" />
                    <DeckBody className="text-[#DDD7CD] leading-snug">{tag}</DeckBody>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionShell>
      );

    // ── ORG IMAGE ─────────────────────────────────────────────────────────────
    case "org-image":
      return (
        <SectionShell width="standard" centerY contentClassName="flex flex-col justify-center gap-8">
          <div>
            <p className="holding-overline mb-4">{slide.overline}</p>
            <DeckTitle as="h2" variant="section">
              {slide.title}
            </DeckTitle>
          </div>
          <div className="relative flex-1 overflow-hidden rounded-[28px] border border-[#1E1E1E] bg-[#0B0B0B]">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A86C]/30 to-transparent" />
            {slide.imageSrc ? (
              <img
                src={slide.imageSrc}
                alt="Organograma operacional"
                className="h-full w-full object-contain"
                loading="eager"
              />
            ) : (
              <div className="flex min-h-[380px] items-center justify-center bg-[radial-gradient(circle_at_center,_rgba(201,168,108,0.08),_transparent_55%)]">
                <div className="text-center">
                  <Network className="mx-auto h-12 w-12 text-[#C9A86C] opacity-30" />
                  <DeckMeta className="mt-4 text-[#6D675D]">
                    Organograma — adicione via prop imageSrc
                  </DeckMeta>
                </div>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#080808] to-transparent" />
          </div>
        </SectionShell>
      );

    // ── AGENTS ORG ────────────────────────────────────────────────────────────
    case "agents-org":
      return (
        <SectionShell width="standard" centerY contentClassName="flex flex-col justify-center gap-5">
          <div>
            <p className="holding-overline mb-3">{slide.overline}</p>
            <DeckTitle as="h2" variant="section">
              {slide.title}
            </DeckTitle>
          </div>

          {/* Camada 1 — Orquestrador */}
          <InfoCard className="relative border-[#C9A86C]/20 bg-[radial-gradient(circle_at_top_left,_rgba(201,168,108,0.12),_transparent_40%)] px-6 py-5">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A86C]/40 to-transparent" />
            <div className="flex items-center gap-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-[#C9A86C]/25 bg-[#C9A86C]/10">
                <Network className="h-5 w-5 text-[#C9A86C]" />
              </div>
              <div>
                <p className="holding-overline mb-0.5 text-[#6D675D]">Camada 01</p>
                <DeckTitle as="h3" variant="card">Orquestrador</DeckTitle>
              </div>
              <DeckBody className="ml-auto max-w-sm text-right text-[#A59E91]">
                Define prioridades e distribui tarefas para os líderes de squad.
              </DeckBody>
            </div>
          </InfoCard>

          {/* Conector */}
          <div className="mx-auto h-3 w-px bg-gradient-to-b from-[#C9A86C]/40 to-transparent" />

          {/* Camada 2 — Líderes de Squad */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Squad Atendimento", desc: "Qualificação, suporte e follow-up", icon: MessageSquare },
              { label: "Squad Comercial",   desc: "Prospecção, proposta e fechamento", icon: Users },
              { label: "Squad Operações",   desc: "RH, tráfego, disparos e relatórios", icon: Layers },
            ].map(({ label, desc, icon: Icon }) => (
              <InfoCard key={label} className="border-[#1E1E1E] p-5">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-[12px] border border-[#1E1E1E] bg-[#121212]">
                  <Icon className="h-4 w-4 text-[#C9A86C]" />
                </div>
                <p className="holding-overline mb-1 text-[#6D675D]">Camada 02</p>
                <DeckTitle as="h3" variant="card" className="text-[1.05rem] leading-snug">{label}</DeckTitle>
                <DeckBody className="mt-2 text-[0.875rem] text-[#7A7570]">{desc}</DeckBody>
              </InfoCard>
            ))}
          </div>

          {/* Conector */}
          <div className="mx-auto h-3 w-px bg-gradient-to-b from-[#C9A86C]/25 to-transparent" />

          {/* Camada 3 — Agentes */}
          <InfoCard className="border-[#1E1E1E] bg-[#0A0A0A] px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border border-[#1E1E1E] bg-[#121212]">
                  <Cpu className="h-4 w-4 text-[#C9A86C]" />
                </div>
                <div>
                  <p className="holding-overline mb-0.5 text-[#6D675D]">Camada 03</p>
                  <DeckTitle as="h3" variant="card" className="text-[1.05rem]">Agentes</DeckTitle>
                </div>
              </div>
              <div className="flex gap-2">
                {["Skills", "Rotinas", "Tarefas"].map((tag) => (
                  <div key={tag} className="flex items-center gap-2 rounded-full border border-[#2A2A2A] bg-[#111] px-4 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C9A86C]" />
                    <DeckMeta className="text-[#DDD7CD]">{tag}</DeckMeta>
                  </div>
                ))}
              </div>
              <DeckBody className="max-w-xs text-right text-[#7A7570]">
                Cada agente executa com autonomia dentro do seu squad.
              </DeckBody>
            </div>
          </InfoCard>
        </SectionShell>
      );

    // ── IMPACT ────────────────────────────────────────────────────────────────
    case "impact":
      return (
        <SectionShell width="standard" centerY contentClassName="flex flex-col justify-center gap-8">
          <div>
            <p className="holding-overline mb-4">{slide.overline}</p>
            <DeckTitle as="h2" variant="section">
              {slide.title}
            </DeckTitle>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {slide.cards.map(({ icon: Icon, metric, heading, description }) => (
              <InfoCard
                key={metric}
                className="relative min-h-[260px] flex flex-col overflow-hidden border-[#1E1E1E] p-6"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A86C]/35 to-transparent" />
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-[14px] border border-[#C9A86C]/20 bg-[#C9A86C]/8">
                  <Icon className="h-5 w-5 text-[#C9A86C]" />
                </div>
                <p className="holding-overline mb-2 text-[#6D675D]">{metric}</p>
                <DeckTitle as="h3" variant="card" className="mb-3">
                  {heading}
                </DeckTitle>
                <DeckBody className="mt-auto text-[#A59E91]">{description}</DeckBody>
              </InfoCard>
            ))}
          </div>
        </SectionShell>
      );

    // ── DELIVERABLES OVERVIEW ─────────────────────────────────────────────────
    case "deliverables-over":
      return (
        <SectionShell width="standard" centerY contentClassName="flex flex-col justify-center gap-8">
          <div>
            <p className="holding-overline mb-4">{slide.overline}</p>
            <DeckTitle as="h2" variant="section">
              {slide.title}
            </DeckTitle>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {slide.cards.map(({ icon: Icon, label }) => (
              <InfoCard
                key={label}
                className="flex items-center gap-4 border-[#1E1E1E] px-5 py-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-[#C9A86C]/20 bg-[#C9A86C]/8">
                  <Icon className="h-5 w-5 text-[#C9A86C]" />
                </div>
                <DeckBody className="text-[#DDD7CD]">{label}</DeckBody>
              </InfoCard>
            ))}
          </div>
        </SectionShell>
      );

    // ── DELIVERABLES SECTION ──────────────────────────────────────────────────
    case "deliverables-section": {
      const Icon = slide.icon;
      return (
        <SectionShell
          width="standard"
          centerY
          contentClassName="grid grid-cols-1 items-center gap-14 lg:grid-cols-12"
        >
          {/* Left */}
          <div className="lg:col-span-5">
            <InfoCard className="flex flex-col gap-5 border-[#C9A86C]/15 bg-[radial-gradient(circle_at_top_left,_rgba(201,168,108,0.10),_transparent_40%)] p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-[16px] border border-[#C9A86C]/25 bg-[#C9A86C]/10">
                <Icon className="h-6 w-6 text-[#C9A86C]" />
              </div>
              <div>
                <p className="holding-overline mb-3">{slide.moduleNumber}</p>
                <DeckTitle as="h2" variant="section">
                  {slide.title}
                </DeckTitle>
                <GoldRule className="my-4 w-14" />
                <DeckSubtitle>{slide.subtitle}</DeckSubtitle>
              </div>
            </InfoCard>
          </div>
          {/* Right */}
          <div className="lg:col-span-7">
            {/* Build cards (slide 25) */}
            {slide.buildCards && slide.buildCards.length > 0 ? (
              <div className="flex flex-col gap-3">
                {slide.buildCards.map(({ title, description }) => (
                  <InfoCard
                    key={title}
                    className="relative overflow-hidden border-[#1E1E1E] p-6"
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#C9A86C]/30 to-transparent" />
                    <p className="holding-overline mb-2">{title}</p>
                    <DeckBody className="text-[#BEB7AC]">{description}</DeckBody>
                  </InfoCard>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {slide.items.map(({ label, category }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-[#1E1E1E] bg-[#0D0D0D] px-5 py-4"
                  >
                    {category ? (
                      <div className="flex items-start gap-3">
                        <span className="holding-overline mt-0.5 shrink-0 text-[#6D675D]">
                          {category}
                        </span>
                        <DeckBody className="text-[#DDD7CD]">{label}</DeckBody>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <GoldDot />
                        <DeckBody className="text-[#DDD7CD]">{label}</DeckBody>
                      </div>
                    )}
                  </div>
                ))}
                {slide.badge && (
                  <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#1E1E1E] bg-[#0D0D0D] px-5 py-4">
                    <span className="inline-flex items-center rounded-full bg-[#25D366]/12 border border-[#25D366]/25 px-3 py-1">
                      <span className="holding-overline text-[#25D366]/80">{slide.badge}</span>
                    </span>
                    <DeckMeta className="text-[#8E877B]">Comunicação direta com a turma</DeckMeta>
                  </div>
                )}
              </div>
            )}
          </div>
        </SectionShell>
      );
    }

    // ── BONUS ─────────────────────────────────────────────────────────────────
    case "bonus":
      return (
        <SectionShell
          width="standard"
          centerY
          contentClassName="grid grid-cols-1 items-center gap-14 lg:grid-cols-12"
        >
          <div className="lg:col-span-5">
            <p className="holding-overline mb-4">{slide.bonusNumber}</p>
            <DeckTitle as="h2" variant="section">
              {slide.title}
            </DeckTitle>
            <GoldRule className="my-5 w-16" />
            <DeckBody className="text-[#BEB7AC]">{slide.subtitle}</DeckBody>
          </div>
          <div className="lg:col-span-7">
            <div
              className="relative min-h-[420px] flex flex-col justify-center gap-3 overflow-hidden rounded-[24px] border border-[#C9A86C]/12 p-7"
              style={{
                background:
                  "radial-gradient(circle at top right, rgba(201,168,108,0.18), transparent 40%), linear-gradient(160deg, rgba(201,168,108,0.06), rgba(13,13,13,1) 40%)",
              }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A86C]/35 to-transparent" />
              {slide.items.map(({ code, label, description }) => (
                <div
                  key={label}
                  className="rounded-xl border border-[#1E1E1E] bg-[#080808]/60 px-5 py-4"
                >
                  {code ? (
                    <div className="flex items-start gap-3">
                      <span className="holding-overline mt-0.5 shrink-0 text-[#6D675D]">{code}</span>
                      <div>
                        <DeckBody className="text-[#F2EFE9]">{label}</DeckBody>
                        {description && (
                          <DeckMeta className="mt-1 text-[#8E877B]">{description}</DeckMeta>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#C9A86C]" />
                        <DeckBody className="text-[#F2EFE9]">{label}</DeckBody>
                      </div>
                      {description && (
                        <DeckMeta className="ml-3.5 text-[#8E877B]">{description}</DeckMeta>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </SectionShell>
      );

    // ── GUARANTEE ─────────────────────────────────────────────────────────────
    case "guarantee":
      return (
        <SectionShell width="narrow" centerY contentClassName="flex flex-col items-center justify-center text-center">
          <ShieldCheck className="mb-8 h-12 w-12 text-[#C9A86C]" />
          <p className="holding-overline mb-6">{slide.overline}</p>
          <DeckTitle
            as="h2"
            variant="feature"
            className="max-w-[760px]"
           
          >
            {slide.text}
          </DeckTitle>
          <GoldRule className="mx-auto mt-8 w-16" />
        </SectionShell>
      );

    // ── ANCHOR INTRO ──────────────────────────────────────────────────────────
    case "anchor-intro":
      return (
        <SectionShell width="narrow" centerY contentClassName="flex flex-col items-center justify-center text-center">
          <p className="holding-overline mb-6">{slide.overline}</p>
          <DeckTitle
            as="h2"
            variant="section"
            className="max-w-[720px]"
           
          >
            {slide.title}
          </DeckTitle>
        </SectionShell>
      );

    // ── ANCHOR ────────────────────────────────────────────────────────────────
    case "anchor":
      return (
        <SectionShell
          width="standard"
          centerY
          contentClassName="grid grid-cols-1 items-center gap-14 lg:grid-cols-12"
        >
          <div className="lg:col-span-4">
            <p className="holding-overline mb-6">{slide.scenario}</p>
            <DeckTitle as="h2" variant="section">
              {slide.title}
            </DeckTitle>
            <GoldRule className="mt-6 w-16" />
          </div>
          <div className="lg:col-span-8">
            <InfoCard
              className={cn(
                "min-h-[300px] flex flex-col justify-center gap-3",
                slide.urgent
                  ? "border-[#C9A86C]/15 bg-[radial-gradient(circle_at_top_right,_rgba(201,168,108,0.08),_transparent_40%)]"
                  : "border-[#2A2A2A]",
              )}
            >
              {slide.items.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A86C]/60" />
                  <DeckBody
                    className={cn(
                      slide.urgent ? "text-[#DDD7CD]" : "text-[#BEB7AC]",
                    )}
                  >
                    {item}
                  </DeckBody>
                </div>
              ))}
            </InfoCard>
          </div>
        </SectionShell>
      );

    // ── INVESTMENT ────────────────────────────────────────────────────────────
    case "investment":
      return (
        <SectionShell
          width="standard"
          centerY
          contentClassName="grid grid-cols-1 items-center gap-14 lg:grid-cols-12"
        >
          <div className="lg:col-span-5">
            <p className="holding-overline mb-6">{slide.overline}</p>
            <DeckTitle as="h2" variant="section">
              {slide.title}
            </DeckTitle>
            <GoldRule className="my-5 w-16" />
            <DeckBody className="text-[#BEB7AC]">{slide.subtitle}</DeckBody>
          </div>
          <div className="lg:col-span-7">
            <div
              className="relative min-h-[400px] overflow-hidden rounded-[24px] border border-[#C9A86C]/15 p-8"
              style={{
                background:
                  "radial-gradient(circle at top right, rgba(201,168,108,0.15), transparent 40%), linear-gradient(160deg, rgba(201,168,108,0.07), rgba(13,13,13,1) 40%)",
              }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A86C]/40 to-transparent" />
              <div className="flex flex-col gap-6">
                {/* Entry */}
                <div>
                  <p className="holding-overline mb-2 text-[#6D675D]">{slide.entryLabel}</p>
                  <DeckTitle as="p" variant="feature" className="text-[#F2EFE9]">
                    {slide.entryValue}
                  </DeckTitle>
                </div>
                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-[#C9A86C]/25 to-transparent" />
                {/* Monthly */}
                <div>
                  <p className="holding-overline mb-2 text-[#6D675D]">{slide.monthlyLabel}</p>
                  <DeckTitle as="p" variant="feature" className="text-[#F2EFE9]">
                    {slide.monthlyValue}
                  </DeckTitle>
                  <DeckMeta className="mt-2 text-[#8E877B]">{slide.note}</DeckMeta>
                </div>
                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-[#C9A86C]/25 to-transparent" />
                {/* Footer — total value */}
                <div className="flex items-center justify-between">
                  <p className="holding-overline text-[#6D675D]">Total</p>
                  <DeckTitle as="p" variant="feature" className="text-[#C9A86C]">
                    R$17.000
                  </DeckTitle>
                </div>
              </div>
            </div>
          </div>
        </SectionShell>
      );

    // ── PAYMENT STEPS ─────────────────────────────────────────────────────────
    case "payment-steps":
      return (
        <SectionShell width="standard" centerY contentClassName="flex flex-col items-center">
          <p className="holding-overline mb-4">{slide.overline}</p>
          <DeckTitle as="h2" variant="section" className="mb-10 text-center">
            {slide.title}
          </DeckTitle>
          <div className="flex w-full max-w-[900px] items-stretch gap-4">
            {slide.steps.map((step, i) => (
              <div key={step.number} className="flex flex-1 items-stretch gap-4">
                <div
                  className="relative flex flex-1 flex-col rounded-[20px] border border-[#C9A86C]/15 p-7"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(201,168,108,0.07), rgba(13,13,13,1) 50%)",
                  }}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A86C]/40 to-transparent" />
                  <p className="mb-3 font-mono text-[13px] font-semibold tracking-widest text-[#C9A86C]">
                    {step.number}
                  </p>
                  <p className="holding-overline mb-2 text-[#6D675D]">{step.label}</p>
                  <DeckTitle as="p" variant="feature" className="mb-3 text-[#F2EFE9]">
                    {step.value}
                  </DeckTitle>
                  <DeckMeta className="mt-auto text-[#8E877B]">{step.note}</DeckMeta>
                </div>
                {i < slide.steps.length - 1 && (
                  <div className="flex items-center self-center text-[#C9A86C]/40">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10h12M12 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-[700px] text-center text-[13px] leading-relaxed text-[#6D675D]">
            A taxa de compromisso existe para firmar sua decisão e garantir essa oferta. Se por qualquer motivo você decidir não seguir em frente, o valor será{" "}
            <span className="text-[#BEB7AC]">reembolsado 100%</span>, sem burocracia.
          </p>
        </SectionShell>
      );

    // ── SCARCITY ──────────────────────────────────────────────────────────────
    case "scarcity":
      return (
        <SectionShell width="narrow" centerY contentClassName="flex flex-col items-center justify-center text-center">
          <p className="holding-overline mb-6">{slide.overline}</p>
          <DeckTitle
            as="h2"
            variant="section"
            className="max-w-[720px]"
           
          >
            {slide.title}
          </DeckTitle>
          <GoldRule className="mx-auto my-8 w-16" />
          <div className="flex flex-col gap-3 w-full max-w-[500px]">
            {slide.bullets.map((bullet) => (
              <div
                key={bullet}
                className="flex items-center gap-3 rounded-xl border border-[#1E1E1E] bg-[#0D0D0D] px-5 py-4"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A86C]" />
                <DeckBody className="text-[#DDD7CD]">{bullet}</DeckBody>
              </div>
            ))}
          </div>
        </SectionShell>
      );

    // ── CTA QR ────────────────────────────────────────────────────────────────
    case "cta-qr":
      return (
        <SectionShell width="wide" centerY contentClassName="grid grid-cols-12 gap-8 items-center">
          {/* Left column */}
          <div className="col-span-6 flex flex-col items-start">
            <p className="holding-overline mb-5">{slide.overline}</p>
            <DeckTitle as="h2" variant="section" className="mb-8 text-left">
              {slide.headline}
            </DeckTitle>

            {/* Commit value card */}
            <div className="mb-7 rounded-2xl border border-[#C9A86C]/30 bg-[#C9A86C]/10 px-6 py-4">
              <p className="mb-1 text-[11px] font-semibold tracking-[0.15em] text-[#C9A86C]">
                {slide.commitLabel}
              </p>
              <DeckTitle as="p" variant="feature" className="text-[#C9A86C]">
                {slide.commitValue}
              </DeckTitle>
            </div>

            {/* Steps */}
            <ol className="mb-7 flex flex-col gap-0">
              {slide.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C9A86C] text-[11px] font-bold text-[#0D0D0D]">
                      {i + 1}
                    </span>
                    {i < slide.steps.length - 1 && (
                      <span className="my-1 h-5 w-px bg-[#C9A86C]/30" />
                    )}
                  </div>
                  <DeckMeta className="mt-0.5 text-left text-white/80">{step}</DeckMeta>
                </li>
              ))}
            </ol>

            {/* Guarantee card */}
            <div className="mb-8 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <p className="mb-2.5 text-[10px] font-semibold tracking-[0.14em] text-white/30">GARANTIA</p>
              <div className="flex flex-col gap-2">
                {slide.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                      <path d="M2 7.5l3.5 3.5 6.5-7" stroke="#C9A86C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <DeckMeta className="text-left text-white/60">{benefit}</DeckMeta>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA button */}
            <a
              href="https://app.lightforms.io/TIJCSHK?utm_source=apresentacao&utm_medium=slide&utm_campaign=maestria&utm_content=cta-vaga"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#C9A86C] px-8 py-4 text-[15px] font-semibold tracking-wide text-[#0D0D0D] transition-opacity hover:opacity-85"
            >
              {slide.action}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Right column */}
          <div className="col-span-5 col-start-8 flex flex-col items-center gap-5">
            <div className="rounded-3xl border border-[#C9A86C]/25 bg-gradient-to-b from-[#C9A86C]/10 to-transparent p-6">
              <img
                src="https://t9013332252.p.clickup-attachments.com/t9013332252/ed8bc645-3882-472a-a0b7-6d02fb7e36d0/QR-CODE-MAESTRIA.png"
                alt="QR Code MAESTR.IA"
                className="h-[220px] w-[220px] rounded-[16px] object-contain"
                loading="eager"
              />
            </div>
            <DeckMeta className="text-center text-white/50">Ou escaneie o QR code</DeckMeta>
          </div>
        </SectionShell>
      );

    default:
      return null;
  }
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────

export default function MaestriaPresentation() {
  useEffect(() => {
    const urls = [
      CDN.atendimento,
      CDN.rhSystem,
      CDN.triagem,
      CDN.trafego,
      CDN.disparos,
      "https://t9013332252.p.clickup-attachments.com/t9013332252/4962cad6-4a0e-4a25-8787-fe6596f29e18/organograma-ia.png",
      "https://t9013332252.p.clickup-attachments.com/t9013332252/ed8bc645-3882-472a-a0b7-6d02fb7e36d0/QR-CODE-MAESTRIA.png",
    ];
    urls.forEach((src) => { const img = new Image(); img.src = src; });
  }, []);

  return (
    <DeckShell
      brand="MAESTR.IA"
      slides={slides}
      getSlideAssets={getMaestriaSlideAssets}
      preload={{ strategy: "progressive", include: ["image"] }}
      renderSlide={renderMaestriaSlide}
    />
  );
}
