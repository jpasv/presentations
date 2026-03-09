"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

interface Phase {
    id: number;
    name: string;
    label: string;
    start: number; // 1-based month
    duration: number;
    color: string;
    track: number; // row
    milestones?: number[]; // which months have milestones
    detail: string;
}

const PHASES: Phase[] = [
    {
        id: 1,
        name: "Diagnóstico & Mapeamento BPMN",
        label: "Diagnóstico",
        start: 1,
        duration: 1,
        color: "#C9A86C",
        track: 0,
        milestones: [1],
        detail: "4 reuniões estruturadas com gestores e áreas-chave. Entrega do diagrama BPMN 2.0 completo e roadmap de prioridades por ROI.",
    },
    {
        id: 2,
        name: "Arquitetura & Setup de Infraestrutura",
        label: "Arquitetura",
        start: 1,
        duration: 2,
        color: "#B8956A",
        track: 1,
        milestones: [2],
        detail: "Configuração da VPS, ambientes de desenvolvimento, integrações base e conexão com os sistemas existentes (CRM, ERP, APIs).",
    },
    {
        id: 3,
        name: "Automações Core",
        label: "Automações",
        start: 2,
        duration: 4,
        color: "#A07B4A",
        track: 2,
        milestones: [3, 5],
        detail: "Deploy contínuo das primeiras automações por sprint semanal. Webhooks, conectores e fluxos críticos em produção com monitoramento de logs.",
    },
    {
        id: 4,
        name: "IA Nativa & Agentes Autônomos",
        label: "IA & Agentes",
        start: 3,
        duration: 4,
        color: "#C9A86C",
        track: 3,
        milestones: [4, 6],
        detail: "Treinamento e deploy dos Agentes de Suporte L1, SDR e Especialistas. Integração com WhatsApp Business API Oficial.",
    },
    {
        id: 5,
        name: "Dashboards & Business Intelligence",
        label: "Dashboards",
        start: 4,
        duration: 4,
        color: "#8A7148",
        track: 4,
        milestones: [6, 7],
        detail: "Painéis executivos no ClickUp com workload, SLA e alertas. Dashboards de BI no Vibecoding com dados cruzados em tempo real.",
    },
    {
        id: 6,
        name: "Add-ons Especializados",
        label: "Add-ons",
        start: 6,
        duration: 7,
        color: "#6A5838",
        track: 5,
        milestones: [9, 12],
        detail: "Módulos de Backoffice Jurídico, RH, Financeiro e Fiscal implantados conforme priorização do backlog.",
    },
    {
        id: 7,
        name: "Sustentação, Evolução & Reuniões",
        label: "Sustentação",
        start: 3,
        duration: 10,
        color: "#3A3228",
        track: 6,
        milestones: [6, 12],
        detail: "Monitoramento 24h de todos os fluxos. Reuniões mensais de alinhamento estratégico. Evolução contínua do backlog.",
    },
];

const TRACK_HEIGHT = 48;
const BAR_HEIGHT = 32;
const BAR_VERTICAL_OFFSET = (TRACK_HEIGHT - BAR_HEIGHT) / 2;
const HEADER_HEIGHT = 40;
const LEFT_WIDTH = 140;
const TOTAL_MONTHS = 12;

export function GanttChart() {
    const [hovered, setHovered] = useState<number | null>(null);

    const totalTracks = PHASES.reduce((max, p) => Math.max(max, p.track + 1), 0);
    const chartHeight = totalTracks * TRACK_HEIGHT;

    const hoveredPhase = PHASES.find(p => p.id === hovered);

    return (
        <div className="w-full h-full flex flex-col gap-4 select-none">
            {/* Detail tooltip */}
            <div
                className="transition-all duration-300 overflow-hidden"
                style={{ maxHeight: hovered ? "80px" : "0px", opacity: hovered ? 1 : 0 }}
            >
                {hoveredPhase && (
                    <div className="bg-[#0D0D0D] border border-[#C9A86C]/30 rounded-xl px-6 py-4 flex items-start gap-4">
                        <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: hoveredPhase.color }} />
                        <div>
                            <p className="text-[#C9A86C] text-xs font-medium uppercase tracking-widest mb-1">{hoveredPhase.name}</p>
                            <p className="text-[#9C9589] text-sm font-light leading-relaxed">{hoveredPhase.detail}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Chart */}
            <div className="flex-1 min-h-0 overflow-auto">
                <div className="min-w-[720px] h-full">
                    {/* Month header */}
                    <div className="flex" style={{ paddingLeft: LEFT_WIDTH }}>
                        {MONTHS.map((m, i) => (
                            <div
                                key={m}
                                className="flex-1 text-center text-[10px] font-medium uppercase tracking-widest pb-3 border-b border-[#1E1E1E]"
                                style={{ color: i < 2 ? "#C9A86C" : i < 6 ? "#6A5838" : "#3A3228" }}
                            >
                                {m}
                            </div>
                        ))}
                    </div>

                    {/* Rows */}
                    <div className="relative" style={{ height: chartHeight }}>
                        {/* Grid columns */}
                        {MONTHS.map((_, i) => (
                            <div
                                key={i}
                                className="absolute top-0 bottom-0 border-r"
                                style={{
                                    left: `calc(${LEFT_WIDTH}px + ${(i / TOTAL_MONTHS) * 100}%)`,
                                    width: `calc(${(1 / TOTAL_MONTHS) * 100}%)`,
                                    borderColor: i % 3 === 2 ? "#1E1E1E" : "#141414",
                                }}
                            />
                        ))}

                        {/* Track row backgrounds */}
                        {PHASES.map(phase => (
                            <div
                                key={phase.id}
                                className="absolute left-0 right-0 transition-colors duration-200"
                                style={{
                                    top: phase.track * TRACK_HEIGHT,
                                    height: TRACK_HEIGHT,
                                    backgroundColor: hovered === phase.id ? "rgba(201,168,108,0.04)" : "transparent",
                                }}
                            />
                        ))}

                        {/* Phase labels */}
                        {PHASES.map(phase => (
                            <div
                                key={`label-${phase.id}`}
                                className="absolute flex items-center cursor-pointer"
                                style={{
                                    top: phase.track * TRACK_HEIGHT + BAR_VERTICAL_OFFSET,
                                    left: 0,
                                    width: LEFT_WIDTH - 12,
                                    height: BAR_HEIGHT,
                                }}
                                onMouseEnter={() => setHovered(phase.id)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                <span
                                    className="text-[11px] font-light truncate transition-colors duration-200 text-right w-full pr-3"
                                    style={{ color: hovered === phase.id ? "#C9A86C" : "#6A5838" }}
                                >
                                    {phase.label}
                                </span>
                            </div>
                        ))}

                        {/* Bars */}
                        {PHASES.map((phase, index) => {
                            const leftPct = ((phase.start - 1) / TOTAL_MONTHS) * 100;
                            const widthPct = (phase.duration / TOTAL_MONTHS) * 100;

                            return (
                                <motion.div
                                    key={phase.id}
                                    initial={{ scaleX: 0, originX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="absolute cursor-pointer"
                                    style={{
                                        top: phase.track * TRACK_HEIGHT + BAR_VERTICAL_OFFSET,
                                        left: `calc(${LEFT_WIDTH}px + ${leftPct}%)`,
                                        width: `calc(${widthPct}% - 4px)`,
                                        height: BAR_HEIGHT,
                                        transformOrigin: "left center",
                                    }}
                                    onMouseEnter={() => setHovered(phase.id)}
                                    onMouseLeave={() => setHovered(null)}
                                >
                                    <div
                                        className="w-full h-full rounded-lg flex items-center px-3 transition-all duration-200 relative overflow-hidden"
                                        style={{
                                            backgroundColor: phase.color,
                                            opacity: hovered === null ? 1 : hovered === phase.id ? 1 : 0.35,
                                            filter: hovered === phase.id ? "brightness(1.2)" : "brightness(1)",
                                        }}
                                    >
                                        <div
                                            className="absolute inset-0 rounded-lg"
                                            style={{
                                                background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)",
                                            }}
                                        />
                                        <span className="text-[10px] font-medium text-[#0D0D0D] truncate relative z-10 tracking-wide">
                                            {phase.label}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}

                        {/* Milestones */}
                        {PHASES.flatMap(phase =>
                            (phase.milestones ?? []).map(month => {
                                const leftPct = ((month - 0.5) / TOTAL_MONTHS) * 100;
                                return (
                                    <div
                                        key={`m-${phase.id}-${month}`}
                                        className="absolute pointer-events-none"
                                        style={{
                                            top: phase.track * TRACK_HEIGHT + BAR_VERTICAL_OFFSET + BAR_HEIGHT / 2 - 5,
                                            left: `calc(${LEFT_WIDTH}px + ${leftPct}% - 5px)`,
                                            opacity: hovered === null || hovered === phase.id ? 1 : 0.2,
                                        }}
                                    >
                                        <div
                                            className="w-2.5 h-2.5 rotate-45 border border-[#0D0D0D]"
                                            style={{ backgroundColor: "#F2EFE9" }}
                                        />
                                    </div>
                                );
                            })
                        )}

                        {/* "Mês X" vertical markers */}
                        {[2, 6, 12].map(month => (
                            <div
                                key={`vmark-${month}`}
                                className="absolute top-0 bottom-0 pointer-events-none"
                                style={{
                                    left: `calc(${LEFT_WIDTH}px + ${(month / TOTAL_MONTHS) * 100}%)`,
                                    width: 1,
                                    backgroundColor: month === 12 ? "rgba(201,168,108,0.4)" : "rgba(201,168,108,0.15)",
                                }}
                            >
                                <span
                                    className="absolute -top-5 text-[9px] font-medium tracking-widest uppercase whitespace-nowrap"
                                    style={{
                                        color: "rgba(201,168,108,0.5)",
                                        transform: "translateX(-50%)",
                                    }}
                                >
                                    M{month}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-6 mt-4 pt-4 border-t border-[#141414] flex-wrap">
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rotate-45 bg-[#F2EFE9]" />
                            <span className="text-[10px] text-[#4A4745] uppercase tracking-widest">Marco de entrega</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-px" style={{ backgroundColor: "rgba(201,168,108,0.4)" }} />
                            <span className="text-[10px] text-[#4A4745] uppercase tracking-widest">Marco temporal</span>
                        </div>
                        <span className="text-[10px] text-[#2A2A2A] uppercase tracking-widest ml-auto">
                            Passe o mouse sobre cada fase para detalhes
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
