"use client";

import React, { useCallback } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
    { id: '1', position: { x: 50, y: 250 }, data: { label: 'Início: Lead via Site/WhatsApp' }, style: { backgroundColor: '#1A1A1A', color: '#E5E5E5', border: '1px solid #404040', borderRadius: '8px', padding: '16px', fontSize: '12px' } },
    { id: '2', position: { x: 350, y: 250 }, data: { label: 'Agente de IA (Coleta de Dados e Qualificação)' }, style: { backgroundColor: '#D4AF37', color: '#1A1A1A', border: '1px solid #D4AF37', borderRadius: '8px', padding: '16px', fontWeight: 'bold', fontSize: '12px' } },
    { id: '3', position: { x: 700, y: 100 }, data: { label: 'Lead Desqualificado / Nutrição' }, style: { backgroundColor: '#1A1A1A', color: '#A3A3A3', border: '1px solid #404040', borderRadius: '8px', padding: '16px', fontSize: '12px' } },
    { id: '4', position: { x: 700, y: 400 }, data: { label: 'Lead Qualificado (Validação de Fit)' }, style: { backgroundColor: '#1A1A1A', color: '#E5E5E5', border: '1px solid #404040', borderRadius: '8px', padding: '16px', fontSize: '12px' } },
    { id: '5', position: { x: 1050, y: 50 }, data: { label: 'Fluxo de E-mail Marketing Automático' }, style: { backgroundColor: '#1A1A1A', color: '#E5E5E5', border: '1px solid #404040', borderRadius: '8px', padding: '16px', fontSize: '12px' } },
    { id: '6', position: { x: 1050, y: 250 }, data: { label: 'Atualizar CRM & Notificar Slack' }, style: { backgroundColor: '#D4AF37', color: '#1A1A1A', border: '1px solid #D4AF37', borderRadius: '8px', padding: '16px', fontWeight: 'bold', fontSize: '12px' } },
    { id: '7', position: { x: 1050, y: 550 }, data: { label: 'Agendamento Calendly Automático' }, style: { backgroundColor: '#1A1A1A', color: '#E5E5E5', border: '1px solid #404040', borderRadius: '8px', padding: '16px', fontSize: '12px' } },
    { id: '8', position: { x: 1400, y: 400 }, data: { label: 'Reunião de Fechamento c/ Humano' }, style: { backgroundColor: '#1A1A1A', color: '#E5E5E5', border: '1px solid #404040', borderRadius: '8px', padding: '16px', fontSize: '12px' } },
    { id: '9', position: { x: 1750, y: 250 }, data: { label: 'Gerar Contrato (IA Jurídica / Clicksign)' }, style: { backgroundColor: '#D4AF37', color: '#1A1A1A', border: '1px solid #D4AF37', borderRadius: '8px', padding: '16px', fontWeight: 'bold', fontSize: '12px' } },
    { id: '10', position: { x: 2100, y: 250 }, data: { label: 'Notificar Dashboard (ClickUp) / Win' }, style: { backgroundColor: '#1A1A1A', color: '#E5E5E5', border: '1px solid #404040', borderRadius: '8px', padding: '16px', fontSize: '12px' } },
    { id: '11', position: { x: 1750, y: 550 }, data: { label: 'Re-engajamento' }, style: { backgroundColor: '#1A1A1A', color: '#A3A3A3', border: '1px solid #404040', borderRadius: '8px', padding: '16px', fontSize: '12px' } },
];

const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#D4AF37' } },
    { id: 'e2-3', source: '2', target: '3', animated: true, label: 'Perfil Baixo', labelStyle: { fill: '#A3A3A3', fontSize: 10 }, style: { stroke: '#404040' } },
    { id: 'e2-4', source: '2', target: '4', animated: true, label: 'High Ticket', labelStyle: { fill: '#D4AF37', fontSize: 10 }, style: { stroke: '#D4AF37' } },
    { id: 'e3-5', source: '3', target: '5', animated: true, style: { stroke: '#404040' } },
    { id: 'e4-6', source: '4', target: '6', animated: true, style: { stroke: '#D4AF37' } },
    { id: 'e4-7', source: '4', target: '7', animated: true, style: { stroke: '#404040' } },
    { id: 'e6-8', source: '6', target: '8', style: { stroke: '#404040' } },
    { id: 'e7-8', source: '7', target: '8', animated: true, style: { stroke: '#404040' } },
    { id: 'e8-9', source: '8', target: '9', animated: true, label: 'Ganho', labelStyle: { fill: '#D4AF37', fontSize: 10 }, style: { stroke: '#D4AF37' } },
    { id: 'e8-11', source: '8', target: '11', label: 'Perdido', labelStyle: { fill: '#A3A3A3', fontSize: 10 }, style: { stroke: '#404040' } },
    { id: 'e9-10', source: '9', target: '10', animated: true, style: { stroke: '#D4AF37' } },
    { id: 'e11-5', source: '11', target: '5', animated: false, style: { stroke: '#404040' } },
];

export function BPMNFlow() {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds as any) as any),
        [setEdges],
    );

    return (
        <div className="w-full h-full p-4">
            <div className="w-full h-full border border-[#333333] rounded-2xl overflow-hidden bg-[#0A0A0A]">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                    attributionPosition="bottom-right"
                >
                    <Background color="#262626" gap={16} />
                </ReactFlow>
            </div>
        </div>
    );
}
