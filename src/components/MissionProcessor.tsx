'use client';

import React, { useState } from 'react';
import { AgentMission } from '../lib/types';
import { BASE_MISSIONS } from '../lib/missions';
import { AgentExecutionModal } from './AgentExecutionModal';
import { Cpu, ArrowRight, Play, Shield, Lock, CheckCircle2, Sparkles, Zap, Award } from 'lucide-react';

interface MissionProcessorProps {
  onMissionCompleted: (missionId: string, xpEarned: number) => void;
  completedMissionIds: string[];
}

export const MissionProcessor: React.FC<MissionProcessorProps> = ({
  onMissionCompleted,
  completedMissionIds,
}) => {
  const [activeMissionToRun, setActiveMissionToRun] = useState<AgentMission | null>(null);

  const PROCESS_STEPS = [
    { idx: '01', title: 'Open mission', desc: 'Choose available work' },
    { idx: '02', title: 'Submit output', desc: 'Send structured result' },
    { idx: '03', title: 'bAgent review', desc: 'Reviewed by bAgent engine' },
    { idx: '04', title: 'Effort recognized', desc: 'Added to wallet record' },
    { idx: '05', title: 'XP + Position', desc: 'Standing improves on Base' },
  ];

  const ACCESS_CARDS = [
    {
      id: 'product-access',
      tag: 'Access',
      title: 'Product access',
      copy: 'Early access to new console features and perks from bAgent portfolio products.',
      isUnlocked: true,
    },
    {
      id: 'partner-access',
      tag: 'Access',
      title: 'Partner access',
      copy: 'Tracked access linked to missions, CDP credentials, and Base snapshots.',
      isUnlocked: true,
    },
    {
      id: 'run-access',
      tag: 'Access',
      title: 'Run access',
      copy: 'Unlocks autonomous agent runs once all three agent verifications pass.',
      isUnlocked: completedMissionIds.length >= 1,
    },
    {
      id: 'ecosystem-programs',
      tag: 'Access',
      title: 'Ecosystem programs',
      copy: 'Allocation to Base-native agent revenue sharing and token governance.',
      isUnlocked: completedMissionIds.length >= 2,
    },
  ];

  return (
    <section id="b04" className="mb-14 scroll-mt-20">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#1A1E29] pb-4">
        <div>
          <div className="text-[11px] font-mono font-bold text-[#0052FF] uppercase tracking-widest mb-1">
            03 — Earn & Access
          </div>
          <h2 className="text-xl sm:text-2xl font-mono font-bold text-white">
            Earn XP. Build position. Open access.
          </h2>
        </div>
        <span className="text-xs font-mono text-[#8A94A6] mt-1 sm:mt-0">
          Completed: <strong className="text-[#00FF9D]">{completedMissionIds.length}</strong> / {BASE_MISSIONS.length}
        </span>
      </header>

      {/* 5-Step Mission Processor Visualizer */}
      <div className="rounded-sm border border-[#1E2433] bg-[#0A0C11] p-5 mb-8">
        <div className="flex items-center justify-between pb-3 border-b border-[#1A1E29] mb-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#0052FF]" />
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              bAgent Mission Processor
            </span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono text-[#00FF9D] bg-[#00FF9D]/10 border border-[#00FF9D]/20">
            5 STEPS
          </span>
        </div>

        {/* Horizontal Flow Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
          {PROCESS_STEPS.map((s, idx) => (
            <div
              key={s.idx}
              className={`p-3 rounded-sm border ${
                idx === 4
                  ? 'bg-[#0052FF]/15 border-[#0052FF]'
                  : 'bg-[#0D0F16] border-[#181C26]'
              }`}
            >
              <div className="text-[10px] font-mono text-[#00E5FF] font-bold mb-1">
                [{s.idx}]
              </div>
              <div className="text-xs font-mono font-bold text-white mb-1">
                {s.title}
              </div>
              <div className="text-[11px] font-mono text-[#8A94A6]">
                {s.desc}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[11px] font-mono text-[#64748B]">
          &gt; efforts and XP count after bAgent review and Base verification
        </p>
      </div>

      {/* Active Missions Grid */}
      <div className="mb-10">
        <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>Available Missions on Base</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BASE_MISSIONS.map((m) => {
            const isDone = completedMissionIds.includes(m.id);

            return (
              <div
                key={m.id}
                className={`p-5 rounded-sm border transition-all ${
                  isDone
                    ? 'bg-[#0B0E14] border-[#00FF9D]/40'
                    : 'bg-[#0A0C11] border-[#1E2433] hover:border-[#2A3245]'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#00E5FF] font-bold">
                      [{m.code}]
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#141824] text-[#8A94A6] border border-[#1E2330]">
                      {m.category}
                    </span>
                    <span className="text-[10px] font-mono text-[#64748B]">
                      {m.difficulty}
                    </span>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-[#00FF9D]">
                      +{m.rewardXp} XP
                    </div>
                    {m.rewardToken && (
                      <div className="text-[10px] font-mono text-[#8A94A6]">
                        +{m.rewardAmount} {m.rewardToken}
                      </div>
                    )}
                  </div>
                </div>

                <h4 className="text-sm font-mono font-bold text-white mb-2">
                  {m.title}
                </h4>

                <p className="text-xs text-[#94A3B8] font-sans mb-4 leading-relaxed">
                  {m.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-[#181C26]">
                  <div className="text-[11px] font-mono text-[#64748B]">
                    Agent: <span className="text-white">{m.agentTypeRequired}</span>
                  </div>

                  {isDone ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00FF9D] font-bold bg-[#00FF9D]/10 px-3 py-1 rounded">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Completed
                    </span>
                  ) : (
                    <button
                      onClick={() => setActiveMissionToRun(m)}
                      className="btn-filled px-4 py-1.5 rounded-sm text-xs font-mono flex items-center gap-1.5 shadow-sm shadow-[#0052FF]/30"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Run with Agent</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Access Paths Cards */}
      <div>
        <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Award className="w-3.5 h-3.5 text-[#0052FF]" />
          <span>Access paths</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ACCESS_CARDS.map((card) => (
            <div
              key={card.id}
              className={`p-4 rounded-sm border transition-all ${
                card.isUnlocked
                  ? 'bg-[#0B0D13] border-[#1E2433] hover:border-[#0052FF]/50'
                  : 'bg-[#07080B] border-[#141824] opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase text-[#00E5FF] tracking-wider">
                  [{card.tag}]
                </span>
                {card.isUnlocked ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9D]" />
                ) : (
                  <Lock className="w-3 h-3 text-[#64748B]" />
                )}
              </div>
              <h4 className="text-xs font-mono font-bold text-white mb-1.5">
                {card.title}
              </h4>
              <p className="text-[11px] font-sans text-[#8A94A6] leading-relaxed">
                {card.copy}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[11px] font-mono text-[#64748B]">
          &gt; Access depends on standing, review status, hold history, and partner rules.
        </p>
      </div>

      {/* Agent Execution Modal Trigger */}
      {activeMissionToRun && (
        <AgentExecutionModal
          mission={activeMissionToRun}
          onClose={() => setActiveMissionToRun(null)}
          onMissionSuccess={(id, xp) => {
            onMissionCompleted(id, xp);
          }}
        />
      )}
    </section>
  );
};
