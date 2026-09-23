'use client';

import React from 'react';
import { ExternalLink, Layers, Radio, ArrowUpRight, TrendingUp } from 'lucide-react';

export const InfrastructureSection: React.FC = () => {
  const CHIPS = [
    'Research notes',
    'Dashboards',
    'Partner activity',
    'Founder signals',
    'Base coordination',
  ];

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
          Base-native liquidity path · X as the public signal channel.
        </p>
      </header>

      {/* 2 Big Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Panel 1: DEX Path */}
        <article className="p-6 rounded-sm bg-[#0A0C11] border border-[#1E2433] flex flex-col justify-between hover:border-[#0052FF]/40 transition-colors">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#1A1E29] mb-4">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                DEX path
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono text-[#00E5FF] bg-[#00E5FF]/10 border border-[#00E5FF]/20">
                Base-native
              </span>
            </div>

            <h3 className="text-base font-mono font-bold text-white mb-2">
              Base-native, DEX-first
            </h3>

            <p className="text-xs text-[#94A3B8] font-sans mb-3 leading-relaxed">
              bAgent is designed for a Base-native, DEX-first market structure. 
              Autonomous agent liquidity pools graduate automatically to Aerodrome Slipstream V3.
            </p>

            <p className="text-xs text-[#94A3B8] font-sans mb-5 leading-relaxed">
              <strong className="text-white">Aerodrome</strong> is the primary venue to watch for bAgent&apos;s Base-native liquidity path and tokenized agent pools.
            </p>

            {/* Aerodrome Metrics Preview */}
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
            <button
              type="button"
              disabled
              className="px-4 py-2 rounded-sm bg-[#12151D] border border-[#1A1E29] text-xs font-mono text-[#64748B] cursor-not-allowed text-center"
            >
              Liquidity updates · soon
            </button>
            <a
              href="https://aerodrome.finance"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-industrial px-4 py-2 rounded-sm text-xs font-mono text-center flex items-center justify-center gap-1.5"
            >
              <span>Explore Aerodrome</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </article>

        {/* Panel 2: Public Signal */}
        <article className="p-6 rounded-sm bg-[#0A0C11] border border-[#1E2433] flex flex-col justify-between hover:border-[#0052FF]/40 transition-colors">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#1A1E29] mb-4">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                Public signal
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono text-[#0052FF] bg-[#0052FF]/10 border border-[#0052FF]/20">
                X · ↗
              </span>
            </div>

            <h3 className="text-base font-mono font-bold text-white mb-2">
              Thesis lives at X.
            </h3>

            <p className="text-xs text-[#94A3B8] font-sans mb-4 leading-relaxed">
              Real-time dispatch of agent evaluation benchmarks, coordination telemetry, and Base ecosystem signals.
            </p>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="px-2.5 py-1 rounded text-[10px] font-mono text-[#CBD5E1] bg-[#0E1118] border border-[#181C26]"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#1A1E29]">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-filled w-full py-2.5 rounded-sm text-xs font-mono font-bold flex items-center justify-center gap-2"
            >
              <span>Follow bAgent on X</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </article>
      </div>
    </section>
  );
};
