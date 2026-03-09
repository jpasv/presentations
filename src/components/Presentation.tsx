"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area,
    BarChart, Bar, Legend
} from 'recharts';
import {
    ChevronLeft, ChevronRight,
    Target, BarChart3, Clock, Layers, Zap, TrendingDown,
    BrainCircuit, Database, FileSpreadsheet, Scale, HandCoins, Users, Rocket,
    CheckCircle2, Building, ArrowRightCircle, ArrowRight,
    TableProperties, DollarSign, MessageSquareQuote, ShieldCheck, TimerReset, Star, Gift,
    Sparkles, Quote
} from "lucide-react";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BPMNFlow } from "@/components/BPMNFlow/BPMNFlow";
import { GanttChart } from "@/components/GanttChart/GanttChart";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// ─── Color tokens ────────────────────────────────────────────────────────────
const C = {
    bg:       "#080808",
    surface:  "#0D0D0D",
    elevated: "#121212",
    border:   "#1E1E1E",
    borderMid:"#2A2A2A",
    gold:     "#C9A86C",
    goldDim:  "#8A7148",
    goldGlow: "rgba(201,168,108,0.12)",
    textPrimary:   "#F2EFE9",
    textSecondary: "#9C9589",
    textMuted:     "#4A4745",
} as const;

// ─── Data ─────────────────────────────────────────────────────────────────────
const efficiencyData = [
    { name: 'Mês 1', manual: 180, automacao: 150 },
    { name: 'Mês 2', manual: 190, automacao: 120 },
    { name: 'Mês 3', manual: 200, automacao: 80 },
    { name: 'Mês 4', manual: 210, automacao: 50 },
    { name: 'Mês 5', manual: 220, automacao: 35 },
    { name: 'Mês 6', manual: 230, automacao: 20 },
];

const roiData = [
    { name: 'Atendimento', economia: 65, produtividade: 85 },
    { name: 'Financeiro', economia: 75, produtividade: 90 },
    { name: 'RH', economia: 50, produtividade: 70 },
    { name: 'Jurídico', economia: 60, produtividade: 80 },
];

const empresasData = [
    { name: '2021', abertas: 4026000, fechadas: 1400000 },
    { name: '2022', abertas: 3840000, fechadas: 1712000 },
    { name: '2023', abertas: 3868000, fechadas: 2153000 },
    { name: '2024 (Proj.)', abertas: 4254000, fechadas: 2436000 },
];

// ─── Slides ───────────────────────────────────────────────────────────────────
const slidesData = [
    { id: 1, type: "cover", title: "ASSESSOR.IA", subtitle: "Nós cuidamos de processos, inteligência artificial e automações, para que você foque na escala do seu negócio.", description: "", icon: null },
    { id: 2, type: "text", title: "O Cenário Atual", subtitle: "O custo invisível da ineficiência nas empresas do Brasil.", items: ["IBGE: 80% das micro e pequenas empresas fecham afogadas em burocracia e custos operacionais invisíveis.", "Banco Mundial: Empresas no Brasil perdem até 2.600 horas por ano apenas com processos administrativos manuais e tributários.", "Fecomercio: R$ 79 Bilhões é o custo anual na economia gerado exclusivamente por tarefas repetitivas e lentidão processual.", "A margem de lucro vaza diariamente pela falta de automação e silos de dados que não se conectam."], icon: Target },
    { id: 2.5, type: "chart-bar", title: "A Mortalidade Corporativa", subtitle: "Abertura vs Fechamento de Empresas no Brasil (Fonte: IBGE / Gov.br)", description: "Em três anos, o número de fechamentos anuais cresceu 1 milhão. Operações engessadas e ineficientes rapidamente perdem a corrida.", icon: TrendingDown, chartData: "empresas" },
    { id: 3, type: "chart-line", title: "O Desempenho Desejado", subtitle: "Tempo em Operações Manuais vs. Automações ASSESSOR.IA (Horas/Mês)", description: "Comparativo de horas dispendidas nos primeiros 6 meses de projeto.", icon: TrendingDown },
    { id: 4, type: "deliverable", title: "Mapeamento de Processos", subtitle: "A planta da sua empresa. Sem isso, qualquer IA é cega — só automatiza o caos.", items: ["Conduzimos 4 reuniões estruturadas com gestores e áreas-chave para capturar cada fluxo crítico do negócio", "Entregamos o diagrama BPMN 2.0 completo: cada processo desenhado de ponta a ponta, com raias por departamento e pontos de decisão", "Mapeamos todos os gargalos operacionais — onde tempo é perdido, onde dado some, onde o humano vira gargalo", "Geramos um Roadmap priorizado por ROI: quais processos automatizar primeiro para retorno máximo e mínimo atrito", "O diagrama é seu. Fica na sua VPS, não na nossa cabeça. É um ativo permanente do seu negócio."], showBPMN: true, icon: Layers },
    { id: 5, type: "deliverable", title: "Implementação & Automação Contínua", subtitle: "Engenharia de software como serviço mensal. Cada sprint entrega algo em produção.", items: ["Trabalhamos em sprints semanais: toda semana uma automação nova entra em produção no seu ambiente — nada fica em rascunho por meses", "Conectamos qualquer sistema via API ou Webhook: CRM (Salesforce, HubSpot, RD), ERP (Omie, Totvs, SAP), WhatsApp, e-mail, Slack, Notion", "Cada fluxo em produção tem monitoramento de logs, alertas de falha em tempo real e rollback automático — nada para silenciosamente", "Backlog aberto no ClickUp: você vê tudo que está na fila, prioriza o que entra no próximo sprint e acompanha o progresso ao vivo", "Escalamos horizontalmente conforme seu volume cresce — nenhuma automação tem limite de uso"], icon: Zap },
    { id: 6, type: "deliverable", title: "Inteligência Artificial Nativa", subtitle: "Adição de IA nos processos empresariais existentes.", items: ["Classificação automática de leads no CRM", "Resumo e extração de dados sensíveis de PDFs e Contratos longos", "Redação e envio dinâmico de e-mails contextuais para clientes", "Tradução e formatação automática de planilhas e relatórios"], icon: BrainCircuit },
    { id: 7, type: "deliverable", title: "Agentes de IA (Autônomos)", subtitle: "Colaboradores digitais disponíveis 24/7.", items: ["Agentes de Suporte (L1), resolvendo dúvidas sem intervenção humana", "Agentes Pré-Vendas (SDR), capacidade de negociar e agendar reuniões", "Agentes Especialistas em documentos da cultura e produtos da empresa", "Integração direta com o WhatsApp e portais corporativos"], icon: CheckCircle2 },
    { id: 8, type: "deliverable", title: "Dashboards: ClickUp & Vibecoding", subtitle: "O controle invisível trazido para a superfície.", items: ["No ClickUp: Painéis executivos de status, workload da equipe e SLA de automações", "No Vibecoding: Dashboards customizados focados em Business Intelligence e vendas brutas", "Atualização em tempo real cruzando banco de dados gerados pela IA", "Alertas automáticos baseados nas metas predefinidas da diretoria"], icon: BarChart3 },
    { id: 9, type: "chart-bar", title: "Add-ons de Backoffice", subtitle: "Potencial Estimado — Redução de Custo vs Aumento de Produtividade (%)", description: "Como pacotes adicionais impulsionam os demais setores base.", icon: Rocket },
    { id: 10, type: "addon", title: "Add-On: Jurídico e RH", subtitle: "Solidez, segurança e foco no colaborador.", items: ["Jurídico: Minutas padronizadas por IA, acompanhamento de prazos, indexação jurisprudencial", "RH: Onboarding automatizado, trilhas de treinamento validadas por IA, automação de aprovações de ponto"], icon: Scale },
    { id: 11, type: "addon", title: "Add-On: Financeiro e Fiscal", subtitle: "Governança e auditoria constante sem margem para erro manual.", items: ["Financeiro: Conciliação bancária cruzada com ERP automatizada diária, esteira de cobranças inteligente", "Contábil: Tagueamento de notas fiscais com IA, conferência de tributos e arquivamento automatizado no cloud"], icon: HandCoins },
    { id: 12, type: "gantt", title: "Programa de 12 Meses", subtitle: "Cada fase com entrega concreta. Nenhum mês sem progresso visível.", icon: Clock },
    { id: 14, type: "table", title: "Seu Novo Centro de Custos", subtitle: "Contratar uma equipe tradicional vs. ASSESSOR.IA", rows: [{ role: "Gestor de Projetos Sênior", market: "R$ 6.000 – R$ 10.000 /mês", assessor: "Incluso e Gerenciado" }, { role: "Gestor de Processos Analítico", market: "R$ 7.000 – R$ 9.000 /mês", assessor: "Incluso e Gerenciado" }, { role: "Engenheiro de Automações IA", market: "R$ 8.000 – R$ 14.000 /mês", assessor: "Incluso e Gerenciado" }, { role: "Especialista em ClickUp", market: "R$ 5.000 – R$ 7.000 /mês", assessor: "Incluso e Gerenciado" }, { role: "Consultor Empresarial & BI", market: "R$ 10.000 – R$ 15.000 /mês", assessor: "Incluso e Gerenciado" }, { role: "Custos Trabalhistas / Impostos", market: "+ 70% sobre valores base", assessor: "Zero (OpEx Limpo)" }], icon: TableProperties },
    { id: 15, type: "text", title: "Ancoragem e Reflexão Tática", subtitle: "Montar esse ecossistema internamente é um passivo arriscado.", items: ["No mercado tradicional, construir essa equipe custaria em média R$ 45.000/mês, fora rescisões e 13º salário.", "Passivos trabalhistas, recrutamento caro e risco de perder as mentes brilhantes para gigantes da tecnologia.", "Lentidão no ramp-up: Levaria até 6 meses para que todos esses profissionais atuassem em sintonia fina.", "Com a ASSESSOR.IA, o impacto não é linear, e sim exponencial desde a primeira semana, e todo risco operacional fica por nossa conta."], icon: DollarSign },
    { id: 16, type: "social", title: "Confiança e Resultados", subtitle: "O que dizem os times escalados pelos nossos sistemas.", testimonials: [{ quote: "Cortamos nosso backoffice administrativo em 80%. Minha equipe parou de digitar nota e foi treinar a IA. Fechamos o ano no azul.", author: "Diretor Financeiro, Logística B2B" }, { quote: "A implantação de um único Agente SDR validou 215 novas reuniões sozinho durante as noites e madrugadas. ROI infinito.", author: "Head de Growth, Tech Partner" }, { quote: "Com os painéis no ClickUp interligados com a IA, enxergo a produtividade do meu time inteiro em 5 segundos, sem pedir relatório.", author: "CEO, Agência de Performance" }], icon: MessageSquareQuote },
    { id: 17, type: "price", title: "A Sua Infraestrutura de Elite", subtitle: "Formato Premium As A Service. Retorno no Primeiro Mês.", price: "R$ 60.000", period: "", description: "Mais ágil, rápido e confiável que qualquer contratação humana para tarefas em escala.", items: ["Squad multidisciplinar conectada ao seu negócio", "Engenharia reversa dos seus processos com arquitetura robusta", "Criação ilimitada via escopo contínuo (Backlog)", "Dashboards, Dashboards Vibecoding e Agentes de IA customizados", "Sem taxas surpresas, OpEx 100% dedutível."], icon: Star },
    { id: 18, type: "bonus", title: "Bônus Exclusivos do Programa", subtitle: "Softwares, acesso e propriedade de código — inclusos no seu plano.", icon: Gift },
    { id: 19, type: "text", title: "Garantia Integral de Execução", subtitle: "Riscos eliminados, foco na execução brilhante.", items: ["Propriedade de Software Garantida: Você é o dono da VPS e instalações. Nada fica preso à nossa agência.", "SLA Restrito: Monitoramento 24h e atuação imediata no backlog caso algo pare.", "LGPD & Sigilo: Assinamos NDA inquebrável para resguardar a cadeia informacional do seu core business.", "Contrato Consultivo, você tem liberdade de guiar as prioridades pelo ClickUp direto com nosso time."], icon: ShieldCheck },
    { id: 20, type: "offer", title: "Condição Especial: Pagamento Imediato", subtitle: "Somente para ativações confirmadas nesta reunião.", description: "Viabilizando sua infraestrutura instantânea com uma oportunidade irrecusável:", items: ["R$ 8.000 de Entrada + 12 parcelas fixas de R$ 3.000", "Observação Comercial: Feito como pagamento recorrente no cartão sem consumir o limite total dele.", "Auditoria Premium de toda a base de dados histórica do seu CRM atual e plano de arquitetura de dados.", "Estruturação de um robô / esteira particularizada para o WhatsApp do Sócio com visibilidade C-Level.", "Isenção de Custo Zero para Setups de Add-ons complexos que fogem da regra."], icon: TimerReset },
    { id: 21, type: "text", title: "Ciclos de Fidelidade", subtitle: "Ficar conosco tem suas grandes recompensas.", items: ["Completando 12 Meses: Ganhe uma nova cadeira nos eventos e usufrua de 1 dia de Consultoria Presencial com nossos líderes na Sede da Bravy School.", "Completando 24 Meses: Receba uma visita técnica presencial in-loco da nossa diretoria na sua empresa para revisão tecnológica local."], icon: Building },
    { id: 22, type: "cover", title: "ASSESSOR.IA", subtitle: "O Futuro Chegou Ao Seu Negócio.", description: "Pare de rodar sua empresa nos últimos 10 anos. Vamos liderar os próximos.", icon: null },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function GoldRule({ className }: { className?: string }) {
    return (
        <div className={cn("h-px w-12 bg-gradient-to-r from-[#C9A86C] to-transparent", className)} />
    );
}

function SlideLabel({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-xs font-medium tracking-[0.25em] uppercase text-[#C9A86C] mb-4 opacity-70">
            {children}
        </p>
    );
}

function ItemCard({ children, delay = 0, highlight = false }: { children: React.ReactNode; delay?: number; highlight?: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
                "rounded-xl p-6 flex items-start gap-5 border transition-colors",
                highlight
                    ? "bg-[#C9A86C]/8 border-[#C9A86C]/30"
                    : "bg-[#0D0D0D] border-[#1E1E1E] hover:border-[#2A2A2A]"
            )}
        >
            {children}
        </motion.div>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function Presentation() {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const handleNext = useCallback(() => {
        if (currentSlideIndex < slidesData.length - 1) setCurrentSlideIndex(p => p + 1);
    }, [currentSlideIndex]);

    const handlePrev = useCallback(() => {
        if (currentSlideIndex > 0) setCurrentSlideIndex(p => p - 1);
    }, [currentSlideIndex]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === ' ') handleNext();
            else if (e.key === 'ArrowLeft') handlePrev();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [handleNext, handlePrev]);

    const slide = slidesData[currentSlideIndex];
    const Icon = slide.icon;

    const variants: any = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
        exit: { opacity: 0, y: -12, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
    };

    const tooltipStyle = {
        backgroundColor: '#0D0D0D',
        borderRadius: '10px',
        border: '1px solid #2A2A2A',
        color: '#F2EFE9',
        fontSize: 13,
    };

    const renderContent = () => {
        switch (slide.type) {

            // ── COVER ──────────────────────────────────────────────────────────
            case 'cover':
                return (
                    <div className="flex flex-col h-full justify-center w-full px-12 md:px-32">
                        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.9 }}>
                            <p className="text-xs font-medium tracking-[0.35em] uppercase text-[#C9A86C] mb-8 opacity-60">
                                Apresentação Comercial
                            </p>
                            <h1 className="font-serif text-7xl md:text-9xl lg:text-[8.5rem] font-light text-[#F2EFE9] tracking-tight leading-[1] mb-10"
                                style={{ fontFamily: "var(--font-serif)" }}>
                                {slide.title}
                            </h1>
                            <GoldRule className="w-20 mb-10" />
                            <h2 className="text-2xl md:text-3xl text-[#9C9589] font-light max-w-3xl tracking-tight leading-[1.5] mb-8">
                                {slide.subtitle}
                            </h2>
                            {slide.description && (
                                <p className="text-lg text-[#4A4745] max-w-2xl leading-relaxed font-light">
                                    {slide.description}
                                </p>
                            )}
                        </motion.div>
                    </div>
                );

            // ── CHARTS ────────────────────────────────────────────────────────
            case 'chart-line':
            case 'chart-bar':
                const isLine = slide.type === 'chart-line';
                return (
                    <div className="flex flex-col h-full justify-center w-full px-12 md:px-32">
                        <div className="mb-10">
                            <SlideLabel>Análise</SlideLabel>
                            <h2 className="font-serif text-4xl md:text-5xl font-light text-[#F2EFE9] tracking-tight mb-3"
                                style={{ fontFamily: "var(--font-serif)" }}>
                                {slide.title}
                            </h2>
                            <p className="text-base text-[#9C9589] font-light max-w-2xl">{slide.subtitle}</p>
                        </div>

                        <div className="w-full h-[52vh] bg-[#0D0D0D] border border-[#1E1E1E] rounded-2xl p-8 mb-5">
                            <ResponsiveContainer width="100%" height="100%">
                                {isLine ? (
                                    <AreaChart data={efficiencyData} margin={{ top: 16, right: 24, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="gManual" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3A3A3A" stopOpacity={0.6} />
                                                <stop offset="95%" stopColor="#3A3A3A" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="gAuto" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#C9A86C" stopOpacity={0.4} />
                                                <stop offset="95%" stopColor="#C9A86C" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="#1E1E1E" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#4A4745', fontSize: 12 }} dy={12} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#4A4745', fontSize: 12 }} dx={-10} />
                                        <RechartsTooltip contentStyle={tooltipStyle} itemStyle={{ color: '#F2EFE9' }} />
                                        <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', color: '#9C9589', fontSize: 13 }} />
                                        <Area type="monotone" name="Operação Tradicional" dataKey="manual" stroke="#3A3A3A" strokeWidth={2} fillOpacity={1} fill="url(#gManual)" />
                                        <Area type="monotone" name="Operação ASSESSOR.IA" dataKey="automacao" stroke="#C9A86C" strokeWidth={2.5} fillOpacity={1} fill="url(#gAuto)" />
                                    </AreaChart>
                                ) : (
                                    <BarChart data={(slide.chartData === 'empresas' ? empresasData : roiData) as any[]} margin={{ top: 16, right: 24, left: 0, bottom: 0 }} barGap={12}>
                                        <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="#1E1E1E" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#4A4745', fontSize: 12 }} dy={12} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#4A4745', fontSize: 12 }} dx={-10} />
                                        <RechartsTooltip cursor={{ fill: '#141414' }} contentStyle={tooltipStyle} itemStyle={{ color: '#F2EFE9' }} />
                                        <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', color: '#9C9589', fontSize: 13 }} />
                                        {slide.chartData === 'empresas' ? (
                                            <>
                                                <Bar dataKey="abertas" name="Empresas Abertas" fill="#2A2A2A" radius={[4, 4, 0, 0]} maxBarSize={44} />
                                                <Bar dataKey="fechadas" name="Empresas Fechadas" fill="#C9A86C" radius={[4, 4, 0, 0]} maxBarSize={44} />
                                            </>
                                        ) : (
                                            <>
                                                <Bar dataKey="economia" name="% Redução de Custo" fill="#2A2A2A" radius={[4, 4, 0, 0]} maxBarSize={44} />
                                                <Bar dataKey="produtividade" name="% Aumento de Produtividade" fill="#C9A86C" radius={[4, 4, 0, 0]} maxBarSize={44} />
                                            </>
                                        )}
                                    </BarChart>
                                )}
                            </ResponsiveContainer>
                        </div>
                        {slide.description && <p className="text-sm text-[#4A4745] font-light">{slide.description}</p>}
                    </div>
                );

            // ── TABLE ─────────────────────────────────────────────────────────
            case 'table':
                return (
                    <div className="flex flex-col h-full justify-center w-full px-12 md:px-32">
                        <div className="mb-12 text-center">
                            <SlideLabel>Comparativo</SlideLabel>
                            <h2 className="font-serif text-4xl md:text-5xl font-light text-[#F2EFE9] tracking-tight mb-3"
                                style={{ fontFamily: "var(--font-serif)" }}>
                                {slide.title}
                            </h2>
                            <p className="text-base text-[#9C9589] font-light">{slide.subtitle}</p>
                        </div>

                        <div className="w-full max-w-5xl mx-auto bg-[#0D0D0D] border border-[#1E1E1E] rounded-2xl overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-[#1E1E1E]">
                                        <th className="py-5 px-8 font-medium text-[#4A4745] text-xs uppercase tracking-widest">Profissional / Despesa</th>
                                        <th className="py-5 px-8 font-medium text-[#4A4745] text-xs uppercase tracking-widest">Custo de Mercado</th>
                                        <th className="py-5 px-8 font-medium text-[#C9A86C] text-xs uppercase tracking-widest">Com a ASSESSOR.IA</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#141414]">
                                    {slide.rows?.map((row, idx) => (
                                        <tr key={idx} className="hover:bg-[#111111] transition-colors group">
                                            <td className="py-5 px-8 font-light text-[#F2EFE9] text-base flex items-center gap-3">
                                                <span className="w-1 h-1 rounded-full bg-[#C9A86C] opacity-50 group-hover:opacity-100 transition-opacity shrink-0" />
                                                {row.role}
                                            </td>
                                            <td className="py-5 px-8 text-[#4A4745] font-light text-base">{row.market}</td>
                                            <td className="py-5 px-8 font-medium text-[#C9A86C] text-base">{row.assessor}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            // ── SOCIAL ────────────────────────────────────────────────────────
            case 'social':
                return (
                    <div className="flex flex-col h-full justify-center w-full px-12 md:px-32 items-center">
                        <div className="mb-16 text-center max-w-2xl">
                            <SlideLabel>Depoimentos</SlideLabel>
                            <h2 className="font-serif text-4xl md:text-5xl font-light text-[#F2EFE9] tracking-tight mb-3"
                                style={{ fontFamily: "var(--font-serif)" }}>
                                {slide.title}
                            </h2>
                            <GoldRule className="mx-auto mt-5" />
                        </div>

                        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {slide.testimonials?.map((testi, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 + idx * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className="bg-[#0D0D0D] border border-[#1E1E1E] p-8 rounded-2xl flex flex-col relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C9A86C]/20 to-transparent" />
                                    <Quote className="w-6 h-6 text-[#C9A86C] opacity-30 mb-6" />
                                    <p className="text-[#C8C4BC] font-light leading-relaxed text-base flex-1">
                                        {testi.quote}
                                    </p>
                                    <div className="mt-8 pt-6 border-t border-[#1E1E1E] flex items-center gap-3">
                                        <div className="w-1 h-6 bg-gradient-to-b from-[#C9A86C] to-transparent rounded-full" />
                                        <p className="text-[#4A4745] text-xs uppercase tracking-widest font-medium">{testi.author}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );

            // ── PRICE ─────────────────────────────────────────────────────────
            case 'price':
                return (
                    <div className="flex flex-col h-full justify-center w-full px-12 md:px-32 items-center">
                        <div className="mb-14 text-center max-w-2xl">
                            <SlideLabel>Investimento</SlideLabel>
                            <h2 className="font-serif text-5xl md:text-6xl font-light text-[#F2EFE9] tracking-tight mb-3"
                                style={{ fontFamily: "var(--font-serif)" }}>
                                {slide.title}
                            </h2>
                            <p className="text-base text-[#9C9589] font-light">{slide.subtitle}</p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="bg-[#0D0D0D] border border-[#1E1E1E] p-12 rounded-2xl max-w-2xl w-full relative overflow-hidden"
                        >
                            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A86C]/40 to-transparent" />

                            <div className="text-center mb-10">
                                <p className="text-xs font-medium tracking-[0.25em] uppercase text-[#4A4745] mb-3">Investimento Total</p>
                                <span className="font-serif text-6xl md:text-7xl font-light text-[#F2EFE9] tracking-tighter"
                                    style={{ fontFamily: "var(--font-serif)" }}>
                                    {slide.price}
                                </span>
                            </div>

                            <p className="text-[#9C9589] mb-10 text-sm font-light text-center max-w-md mx-auto">{slide.description}</p>

                            <div className="space-y-4 border-t border-[#1E1E1E] pt-8">
                                {slide.items?.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 items-start">
                                        <div className="w-4 h-4 rounded-full border border-[#C9A86C]/40 flex items-center justify-center shrink-0 mt-0.5">
                                            <div className="w-1.5 h-1.5 bg-[#C9A86C] rounded-full" />
                                        </div>
                                        <span className="font-light text-[#C8C4BC] text-base leading-relaxed">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                );

            // ── OFFER ─────────────────────────────────────────────────────────
            case 'offer':
                return (
                    <div className="flex flex-col h-full justify-center w-full px-12 md:px-32">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
                            <div className="lg:col-span-5">
                                <SlideLabel>Condição Exclusiva</SlideLabel>
                                <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight mb-6 leading-[1.15] text-[#F2EFE9]"
                                    style={{ fontFamily: "var(--font-serif)" }}>
                                    {slide.title}
                                </h2>
                                <GoldRule className="mb-6" />
                                <p className="text-lg text-[#9C9589] font-light leading-relaxed mb-5">{slide.subtitle}</p>
                                {slide.description && <p className="text-[#C8C4BC] font-light text-base leading-relaxed">{slide.description}</p>}

                                <div className="mt-10 p-7 border border-[#1E1E1E] bg-[#0D0D0D] rounded-xl relative overflow-hidden">
                                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A86C]/20 to-transparent" />
                                    {Icon && <Icon className="w-7 h-7 text-[#C9A86C] mb-5 opacity-60" strokeWidth={1.5} />}
                                    <p className="text-[#4A4745] text-xs uppercase tracking-widest font-medium mb-2">Sustentação Imediata</p>
                                    <p className="text-[#F2EFE9] text-base font-light leading-relaxed">Temos um limite estrito de onboarding simultâneo para garantir a excelência executiva da nossa engenharia.</p>
                                </div>
                            </div>

                            <div className="lg:col-span-7">
                                <div className="space-y-3">
                                    {slide.items?.map((item, idx) => {
                                        const isHighlight = item.includes("R$ 8.000");
                                        return (
                                            <ItemCard key={idx} delay={0.25 + idx * 0.08} highlight={isHighlight}>
                                                {isHighlight
                                                    ? <Sparkles className="w-5 h-5 text-[#C9A86C] shrink-0 mt-0.5" strokeWidth={1.5} />
                                                    : <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                                                        <div className="w-1 h-1 bg-[#4A4745] rounded-full" />
                                                      </div>
                                                }
                                                <span className={cn("text-base font-light leading-relaxed", isHighlight ? "text-[#F2EFE9]" : "text-[#9C9589]")}>{item}</span>
                                            </ItemCard>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            // ── GANTT ─────────────────────────────────────────────────────────
            case 'gantt':
                return (
                    <div className="flex flex-col h-full w-full px-10 md:px-16">
                        <div className="mb-5">
                            <SlideLabel>Cronograma</SlideLabel>
                            <h2 className="font-serif text-4xl md:text-5xl font-light text-[#F2EFE9] tracking-tight mb-2 leading-[1.15]"
                                style={{ fontFamily: "var(--font-serif)" }}>
                                {slide.title}
                            </h2>
                            <p className="text-base text-[#9C9589] font-light">{slide.subtitle}</p>
                        </div>
                        <div className="flex-1 min-h-0">
                            <GanttChart />
                        </div>
                    </div>
                );

            // ── BONUS ─────────────────────────────────────────────────────────
            case 'bonus':
                return (
                    <div className="flex flex-col h-full justify-center w-full px-12 md:px-32">
                        <div className="mb-10">
                            <SlideLabel>Bônus</SlideLabel>
                            <h2 className="font-serif text-4xl md:text-5xl font-light text-[#F2EFE9] tracking-tight mb-2"
                                style={{ fontFamily: "var(--font-serif)" }}>
                                {slide.title}
                            </h2>
                            <p className="text-base text-[#9C9589] font-light">{slide.subtitle}</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            {/* Software SaaS access */}
                            <div className="space-y-3">
                                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#4A4745] mb-4">Acesso Gratuito</p>
                                {[
                                    { name: "Lightforms", desc: "1 mês grátis — formulários de alta conversão com IA integrada", tag: "SaaS" },
                                    { name: "Zappyfy", desc: "1 mês grátis — automação de WhatsApp com API Oficial", tag: "SaaS" },
                                ].map((s, i) => (
                                    <motion.div
                                        key={s.name}
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                                        className="bg-[#0D0D0D] border border-[#1E1E1E] rounded-xl p-5 flex items-start gap-4 hover:border-[#C9A86C]/30 transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-[#C9A86C]/10 border border-[#C9A86C]/20 flex items-center justify-center shrink-0">
                                            <span className="text-[#C9A86C] text-xs font-bold">{s.name[0]}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[#F2EFE9] font-medium text-sm">{s.name}</span>
                                                <span className="text-[9px] font-medium uppercase tracking-widest text-[#C9A86C] bg-[#C9A86C]/10 px-2 py-0.5 rounded-full">{s.tag}</span>
                                            </div>
                                            <p className="text-[#9C9589] text-xs font-light leading-relaxed">{s.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Software ownership */}
                            <div className="space-y-3">
                                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#4A4745] mb-4">Propriedade de Código</p>
                                {[
                                    { name: "Atendimento com IA", desc: "Agente via API Oficial do WhatsApp Business — código 100% seu, hospedado na sua VPS" },
                                    { name: "Dashboard Meta Ads", desc: "Painel integrado com Meta Ads em tempo real, cruzando dados de campanhas com CRM" },
                                    { name: "Área de Membros", desc: "Plataforma própria de conteúdo e treinamentos — sem mensalidade de SaaS terceiro" },
                                    { name: "Formulário Comercial", desc: "Esteira de qualificação e captura de leads com lógica condicional e integração com CRM" },
                                ].map((sw, i) => (
                                    <motion.div
                                        key={sw.name}
                                        initial={{ opacity: 0, x: 12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                                        className="bg-[#0D0D0D] border border-[#1E1E1E] rounded-xl p-4 flex items-start gap-4 hover:border-[#2A2A2A] transition-colors"
                                    >
                                        <div className="w-1 h-full min-h-[32px] rounded-full bg-gradient-to-b from-[#C9A86C] to-transparent opacity-40 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-[#F2EFE9] text-sm font-medium mb-0.5">{sw.name}</p>
                                            <p className="text-[#4A4745] text-xs font-light leading-relaxed">{sw.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Educational bonuses */}
                        <div className="mt-5 pt-5 border-t border-[#141414] grid grid-cols-2 lg:grid-cols-4 gap-3">
                            {[
                                "1 cadeira no evento presencial exclusivo",
                                "50% de desconto em cadeiras adicionais",
                                "Acesso VIP ao programa de Marketing e Vendas",
                                "Mentorias de alto impacto na Bravy School",
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + i * 0.07, duration: 0.4 }}
                                    className="flex items-start gap-2.5"
                                >
                                    <div className="w-3.5 h-3.5 rounded-full border border-[#C9A86C]/30 flex items-center justify-center shrink-0 mt-0.5">
                                        <div className="w-1 h-1 bg-[#C9A86C] rounded-full" />
                                    </div>
                                    <span className="text-[#6A5838] text-xs font-light leading-relaxed">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );

            // ── DEFAULT (deliverable / addon / schedule / text) ───────────────
            default:
                if (slide.showBPMN) {
                    return (
                        <div className="flex flex-col h-full w-full px-10 md:px-16">
                            <div className="mb-4">
                                <SlideLabel>Entregável</SlideLabel>
                                <h2 className="font-serif text-4xl md:text-5xl font-light text-[#F2EFE9] tracking-tight mb-2 leading-[1.15]"
                                    style={{ fontFamily: "var(--font-serif)" }}>
                                    {slide.title}
                                </h2>
                                <p className="text-base text-[#9C9589] font-light leading-relaxed max-w-3xl">
                                    {slide.subtitle}
                                </p>
                            </div>
                            <div className="flex-1 w-full min-h-0">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.97 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.65 }}
                                    className="h-full w-full"
                                >
                                    <BPMNFlow />
                                </motion.div>
                            </div>
                        </div>
                    );
                }

                const labelMap: Record<string, string> = {
                    deliverable: "Entregável",
                    addon: "Add-On",
                    schedule: "Governança",
                    text: "Visão Geral",
                };

                return (
                    <div className="flex flex-col h-full justify-center w-full px-12 md:px-32">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
                            <div className="lg:col-span-4">
                                <SlideLabel>{labelMap[slide.type] || ""}</SlideLabel>
                                <h2 className="font-serif text-4xl md:text-5xl lg:text-5xl font-light text-[#F2EFE9] tracking-tight mb-6 leading-[1.15]"
                                    style={{ fontFamily: "var(--font-serif)" }}>
                                    {slide.title}
                                </h2>
                                <GoldRule className="mb-6" />
                                <p className="text-lg text-[#9C9589] font-light leading-relaxed">
                                    {slide.subtitle}
                                </p>
                                {slide.description && (
                                    <p className="mt-6 text-[#4A4745] text-sm font-light leading-relaxed">
                                        {slide.description}
                                    </p>
                                )}
                            </div>

                            <div className="lg:col-span-1" />

                            <div className="lg:col-span-7">
                                {slide.items && (
                                    <div className="space-y-3">
                                        {slide.items.map((item, idx) => (
                                            <ItemCard key={idx} delay={0.2 + idx * 0.08}>
                                                <div className="w-5 h-5 rounded-full border border-[#2A2A2A] flex items-center justify-center shrink-0 mt-0.5">
                                                    <ArrowRight className="w-2.5 h-2.5 text-[#C9A86C]" strokeWidth={2} />
                                                </div>
                                                <span className="text-base text-[#C8C4BC] font-light leading-relaxed">{item}</span>
                                            </ItemCard>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden text-[#F2EFE9] flex flex-col"
             style={{ backgroundColor: "#080808" }}>

            {/* Background atmosphere */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.035]"
                     style={{ background: "radial-gradient(circle, #C9A86C 0%, transparent 70%)" }} />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-[0.025]"
                     style={{ background: "radial-gradient(circle, #C9A86C 0%, transparent 70%)" }} />
            </div>

            {/* Header */}
            <header className="absolute top-0 left-0 right-0 px-10 md:px-14 py-8 flex justify-between items-center z-20">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A86C]" />
                    <span className="text-sm font-medium tracking-[0.2em] uppercase text-[#F2EFE9] opacity-80">
                        ASSESSOR.IA
                    </span>
                </div>
                <div className="text-[11px] font-medium text-[#4A4745] tracking-[0.2em] uppercase tabular-nums">
                    {String(currentSlideIndex + 1).padStart(2, '0')}
                    <span className="mx-2 text-[#2A2A2A]">/</span>
                    {String(slidesData.length).padStart(2, '0')}
                </div>
            </header>

            {/* Slide Content */}
            <main className={cn(
                "flex-1 w-full h-full relative z-10 flex pt-20 pb-28",
                !slide.showBPMN && slide.type !== 'gantt' && "max-w-[1440px] mx-auto"
            )}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={slide.id}
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="w-full h-full flex"
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Footer */}
            <footer className="absolute bottom-0 left-0 right-0 z-20">
                <div className="flex justify-between items-center px-10 md:px-14 pb-8">
                    <div className="flex gap-3">
                        <button
                            onClick={handlePrev}
                            disabled={currentSlideIndex === 0}
                            className="w-10 h-10 rounded-full border border-[#2A2A2A] flex items-center justify-center text-[#4A4745] hover:text-[#F2EFE9] hover:border-[#4A4745] disabled:opacity-20 disabled:pointer-events-none transition-all bg-[#080808]"
                            aria-label="Slide anterior"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentSlideIndex === slidesData.length - 1}
                            className="h-10 px-6 rounded-full border border-[#2A2A2A] flex items-center gap-2.5 text-[#F2EFE9] hover:border-[#C9A86C]/50 hover:bg-[#C9A86C]/5 disabled:opacity-20 disabled:pointer-events-none transition-all bg-[#080808]"
                            aria-label="Próximo slide"
                        >
                            <span className="text-[11px] font-medium tracking-[0.2em] uppercase">Avançar</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                {/* Progress */}
                <div className="h-px bg-[#141414] w-full overflow-hidden">
                    <motion.div
                        className="h-full"
                        style={{ background: "linear-gradient(90deg, #8A7148, #C9A86C)" }}
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentSlideIndex + 1) / slidesData.length) * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                </div>
            </footer>
        </div>
    );
}
