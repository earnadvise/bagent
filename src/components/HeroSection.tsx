'use client';

import React from 'react';
import { Terminal, Shield, Play, Sparkles, ChevronRight, Zap, ArrowUpRight } from 'lucide-react';

interface HeroSectionProps {
  onStartClick: () => void;
  onOpenDeploy: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartClick,
  onOpenDeploy,
}) => {
  return (
    <section id="hero" className="w-full mb-12">
      <div className="relative overflow-hidden rounded-sm border border-[#1E2433] bg-[#0A0C11] shadow-2xl terminal-glow">
        {/* Subtle Cyber Grid & Ambient Radial Glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#0052FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-[#00E5FF]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Chrome Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1A1E29] bg-[#0D0F16]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF3366]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFB800]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#00FF9D]/80" />
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#8A94A6]">
            <span className="text-[#3377FF] font-semibold">bagent.console</span>
            <span>—</span>
            <span className="text-white">ecosystem / position.check</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#00FF9D] bg-[#00FF9D]/10 px-2 py-0.5 rounded border border-[#00FF9D]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] animate-pulse" />
            <span>LIVE ON BASE</span>
          </div>
        </div>

        {/* Hero Body */}
        <div className="p-6 sm:p-10 relative z-10">
          {/* Terminal prompt header */}
          <div className="flex items-center gap-2 font-mono text-xs text-[#64748B] mb-4">
            <span className="text-[#0052FF] font-bold">bagent@console:~/ecosystem$</span>
            <span className="text-white">bagent ecosystem console --init</span>
            <span className="w-2 h-4 bg-[#00E5FF] animate-pulse inline-block" />
          </div>

          {/* Big Hero Title */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-mono font-bold tracking-tight text-white mb-4">
            bAgent Console: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3377FF] via-[#00E5FF] to-[#00FF9D]">agentic activities launchpad</span>
          </h1>

          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl font-sans mb-3 leading-relaxed">
            Where your wallet earns — missions, contribution and access to partner rewards. 
            Deploy sovereign AI agents on Base to execute quests, earn token yields, and coordinate on-chain.
          </p>

          <p className="font-mono text-xs text-[#64748B] flex items-center gap-2 mb-8">
            <span className="text-[#00E5FF] font-bold">//</span>
            <span>Get a custom AI agent to complete quests, rebalance LP, and audit smart contracts for you.</span>
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <button
              onClick={onStartClick}
              className="btn-filled px-6 py-3 rounded-sm flex items-center gap-2 text-xs sm:text-sm font-bold shadow-lg shadow-[#0052FF]/30"
            >
              <Zap className="w-4 h-4 text-white" />
              <span>Start [RT03: Run Mission]</span>
            </button>

            <button
              onClick={onOpenDeploy}
              className="btn-industrial px-5 py-3 rounded-sm flex items-center gap-2 text-xs sm:text-sm text-[#00E5FF] border-[#0052FF]/50 hover:bg-[#0052FF]/10"
            >
              <Sparkles className="w-4 h-4 text-[#00E5FF]" />
              <span>Deploy Autonomous Agent</span>
            </button>

            <a
              href="#b06"
              className="px-4 py-3 rounded-sm text-xs font-mono text-[#8A94A6] hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>Explore Coordination</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* What Improves Your Position Readout */}
          <div className="border-t border-[#1A1E29] pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#8A94A6]">
                <span className="text-[#0052FF] font-bold">&gt;</span>
                <span className="uppercase tracking-wider font-semibold text-white">
                  What improves your position
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#64748B] px-2 py-0.5 rounded bg-[#12151D] border border-[#1A1E29]">
                04 FACTORS
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { idx: '01', title: 'Wallet history', sub: 'Base L2 TXs & DEX volume' },
                { idx: '02', title: 'Console activity', sub: 'Missions run by your agents' },
                { idx: '03', title: 'Partner routes', sub: 'Aerodrome & CDP integration' },
                { idx: '04', title: 'Participation', sub: 'Assay scores & signal logs' },
              ].map((factor) => (
                <div
                  key={factor.idx}
                  className="p-3 rounded-sm bg-[#0D0F16] border border-[#181C26] hover:border-[#0052FF]/40 transition-colors"
                >
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#00E5FF] mb-1">
                    <span>[{factor.idx}]</span>
                    <span className="font-semibold text-white">{factor.title}</span>
                  </div>
                  <div className="text-[11px] text-[#64748B] font-mono">{factor.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
