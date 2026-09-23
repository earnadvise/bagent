'use client';

import React from 'react';
import { ExternalLink, Layers, Activity, Cpu, ShieldCheck, Zap } from 'lucide-react';

export const InfrastructureSection: React.FC = () => {
  return (
    <section id="b07" className="mb-14 scroll-mt-20">
      <header className="mb-6 border-b border-[#1A1E29] pb-4">
        <div className="text-[11px] font-mono font-bold text-[#0052FF] uppercase tracking-widest mb-1">
          05 — Infrastructure
        </div>
        <h2 className="text-xl sm:text-2xl font-mono font-bold text-white mb-1">
          Where the network lives
        </h2>
        <p className="text-xs font-mono text-[#8A94A6]">
          Base-native liquidity path &amp; autonomous agent execution infrastructure.
        </p>
      </header>

      {/* 2 Big Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Panel 1: DEX Path */}
        <article className="p-6 rounded-sm bg-[#0A0C11] border border-[#1E2433] flex flex-col justify-between hover:border-[#0052FF]/40 transition-colors">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#1A1E29] mb-4">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#0052FF]" />
                <span>DEX Layer</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono text-[#00E5FF] bg-[#00E5FF]/10 border border-[#00E5FF]/20">
                Base-native
              </span>
            </div>

            <h3 className="text-base font-mono font-bold text-white mb-2">
              Base-Native Liquidity Routing
            </h3>

            <p className="text-xs text-[#94A3B8] font-sans mb-3 leading-relaxed">
              bAgent is engineered for a Base-native, DEX-first execution architecture. 
              Autonomous agent bonding curves graduate seamlessly to Aerodrome Slipstream V3 pools.
            </p>

            <p className="text-xs text-[#94A3B8] font-sans mb-5 leading-relaxed">
              <strong className="text-white">Aerodrome</strong> provides deep on-chain liquidity, concentrated tick management, and automated fee distribution to token stakers.
            </p>

            {/* Aerodrome Metrics */}
            <div className="grid grid-cols-2 gap-2 mb-6 p-3 rounded bg-[#07090E] border border-[#181C26] font-mono text-xs">
              <div>
                <span className="text-[10px] text-[#64748B]">24h Agent Volume</span>
                <div className="text-white font-bold">$14.2M</div>
              </div>
              <div>
                <span className="text-[10px] text-[#64748B]">Slipstream TVL</span>
                <div className="text-[#00FF9D] font-bold">$82.6M</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#1A1E29]">
            <a
              href="https://aerodrome.finance"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-filled flex-1 py-2 rounded-sm text-xs font-mono text-center flex items-center justify-center gap-1.5"
            >
              <span>Explore Aerodrome DEX</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </article>

        {/* Panel 2: On-Chain Base Telemetry */}
        <article className="p-6 rounded-sm bg-[#0A0C11] border border-[#1E2433] flex flex-col justify-between hover:border-[#0052FF]/40 transition-colors">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#1A1E29] mb-4">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#00FF9D]" />
                <span>Base L2 Telemetry</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono text-[#00FF9D] bg-[#00FF9D]/10 border border-[#00FF9D]/20">
                100% Operational
              </span>
            </div>

            <h3 className="text-base font-mono font-bold text-white mb-2">
              Sovereign Execution Engine
            </h3>

            <p className="text-xs text-[#94A3B8] font-sans mb-4 leading-relaxed">
              Real-time on-chain sequencer health, Coinbase CDP smart accounts, and cryptographic attestation feeds powering all autonomous agent runs.
            </p>

            {/* Health Matrix */}
            <div className="space-y-2 mb-6 font-mono text-xs">
              <div className="p-2.5 rounded bg-[#07090E] border border-[#181C26] flex items-center justify-between">
                <span className="text-[#8A94A6]">Base Sequencer</span>
                <span className="text-[#00FF9D] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9D]" />
                  Active (2.0s blocks)
                </span>
              </div>
              <div className="p-2.5 rounded bg-[#07090E] border border-[#181C26] flex items-center justify-between">
                <span className="text-[#8A94A6]">ERC-4337 Paymaster</span>
                <span className="text-[#00E5FF] font-bold">Sponsored (0 Gas for Agents)</span>
              </div>
              <div className="p-2.5 rounded bg-[#07090E] border border-[#181C26] flex items-center justify-between">
                <span className="text-[#8A94A6]">CDP AgentKit Runtime</span>
                <span className="text-white font-bold">V2.4.0 Engine</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1A1E29]">
            <a
              href="https://base.org"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-industrial w-full py-2 rounded-sm text-xs font-mono text-center flex items-center justify-center gap-1.5"
            >
              <span>Inspect Base L2 Explorer</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </article>
      </div>
    </section>
  );
};
