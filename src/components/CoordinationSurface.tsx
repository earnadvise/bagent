'use client';

import React from 'react';
import { InteractiveTerminal } from './InteractiveTerminal';
import { WalletStanding } from '../lib/types';
import { Network, GitFork, Cpu, Wallet, Users, Layers } from 'lucide-react';

interface CoordinationSurfaceProps {
  standing: WalletStanding;
  onRunMission: (id: string) => void;
}

export const CoordinationSurface: React.FC<CoordinationSurfaceProps> = ({
  standing,
  onRunMission,
}) => {
  const ROLES = [
    {
      num: '01',
      role: 'Agents',
      verb: 'Route activity',
      icon: Cpu,
      desc: 'Autonomous actors executing on-chain transactions on Base',
    },
    {
      num: '02',
      role: 'Wallets',
      verb: 'Carry verified signals',
      icon: Wallet,
      desc: 'Smart accounts and identities holding verifiable standing',
    },
    {
      num: '03',
      role: 'Partners',
      verb: 'Route ecosystem access',
      icon: Layers,
      desc: 'Protocols like Aerodrome & CDP granting tiered incentives',
    },
    {
      num: '04',
      role: 'Founders',
      verb: 'Create market surface',
      icon: Users,
      desc: 'Builders posting bounties and deploying agent token economies',
    },
  ];

  return (
    <section id="b06" className="mb-14 scroll-mt-20">
      <header className="mb-6 border-b border-[#1A1E29] pb-4">
        <div className="text-[11px] font-mono font-bold text-[#0052FF] uppercase tracking-widest mb-1">
          04 / COORDINATION
        </div>
        <h2 className="text-xl sm:text-2xl font-mono font-bold text-white mb-2">
          bAgent is a coordination surface
        </h2>
        <p className="text-xs font-mono text-[#8A94A6] mb-2">
          One signal across access, eligibility, missions, and partner campaigns.
        </p>
        <p className="text-[11px] font-mono text-[#00E5FF]">
          activity matters · evidence matters · history matters
        </p>
      </header>

      {/* 4 Roles Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {ROLES.map((r) => {
          const Icon = r.icon;
          return (
            <div
              key={r.num}
              className="p-4 rounded-sm bg-[#0A0C11] border border-[#181C26] hover:border-[#0052FF]/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono text-[#00E5FF] font-bold">
                  [{r.num}]
                </span>
                <span className="text-[10px] font-mono text-[#64748B] uppercase">
                  [role]
                </span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <Icon className="w-4 h-4 text-white" />
                <h4 className="text-sm font-mono font-bold text-white">
                  {r.role}
                </h4>
              </div>
              <div className="text-xs font-mono text-[#3377FF] font-semibold mb-1.5">
                {r.verb}
              </div>
              <div className="text-[11px] font-sans text-[#8A94A6] leading-relaxed">
                {r.desc}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic SVG Convergence Bus */}
      <div className="relative my-6 px-4 hidden sm:block">
        <div className="text-center font-mono text-[10px] text-[#0052FF] tracking-widest uppercase mb-1">
          ▼ converge ▼
        </div>
        <svg
          viewBox="0 0 1000 70"
          className="w-full h-16 stroke-[#0052FF]/60 fill-none"
          preserveAspectRatio="none"
        >
          {/* 4 Inflow Feeds to Center Point (500, 35) */}
          <path d="M 125 0 L 125 15 L 500 35" strokeWidth="2" className="path-feed" />
          <path d="M 375 0 L 375 15 L 500 35" strokeWidth="2" className="path-feed" />
          <path d="M 625 0 L 625 15 L 500 35" strokeWidth="2" className="path-feed" />
          <path d="M 875 0 L 875 15 L 500 35" strokeWidth="2" className="path-feed" />
          {/* Main Bus Downward to Surface */}
          <path d="M 500 35 L 500 70" strokeWidth="3" stroke="#00FF9D" className="path-bus" />
        </svg>
      </div>

      {/* Shared Coordination Layer Box */}
      <div className="rounded-sm border border-[#1E2433] bg-[#0A0C11] p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4 border-b border-[#1A1E29]">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#00E5FF] tracking-wider">
              [surface]
            </span>
            <h3 className="text-base font-mono font-bold text-white">
              Shared coordination layer
            </h3>
            <p className="text-xs text-[#94A3B8] font-sans">
              Signals from agents, wallets, partners, and founders converge into one readable ecosystem surface on Base.
            </p>
          </div>

          <div className="p-3 rounded bg-[#07090E] border border-[#181C26] font-mono text-[11px] space-y-1 shrink-0">
            <div className="text-[#00FF9D]">// signals converge</div>
            <div className="text-[#3377FF]">// recognized work stays legible</div>
            <div className="text-[#8A94A6]">// surface remains primary</div>
          </div>
        </div>

        <p className="mt-4 text-xs font-mono text-[#CBD5E1]">
          Recognized signals become readable in one surface. Not the full system. Not the only input.
        </p>
      </div>

      {/* Interactive Working CLI Terminal */}
      <div className="space-y-3">
        <div className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#0052FF]" />
          <span>bAgent Commands & Terminal Surface</span>
        </div>
        <InteractiveTerminal standing={standing} onRunMission={onRunMission} />
      </div>
    </section>
  );
};
