'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#1A1E29] bg-[#07080B] pt-8 pb-12 overflow-hidden">
      {/* Marquee Ticker */}
      <div className="w-full overflow-hidden border-b border-[#141824] pb-6 mb-8 select-none">
        <div className="animate-marquee whitespace-nowrap flex gap-8 font-mono text-xs text-[#4B5568] uppercase tracking-wider">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              <span>Turning public onchain activity into coordination.</span>
              <span className="text-[#0052FF] font-bold">///</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-sm bg-[#0052FF] flex items-center justify-center text-white font-mono font-bold text-xs">
              bA
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold text-white tracking-wider">
                bAgent CORE
              </span>
              <span className="text-[10px] font-mono text-[#64748B]">
                Base Agentic Coordination Surface
              </span>
            </div>
          </div>

          {/* Links without any X/Twitter */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#8A94A6]">
            <a
              href="#b04"
              className="text-[#00E5FF] hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>Running agents in production? Run the bAgent Assay →</span>
            </a>
            <a href="https://base.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Base L2
            </a>
            <a href="https://aerodrome.finance" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Aerodrome
            </a>
            <a href="https://basescan.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              BaseScan
            </a>
          </div>

          {/* Copyright */}
          <div className="text-[11px] font-mono text-[#4B5568]">
            © 2026 bAgent. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
