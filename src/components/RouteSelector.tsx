'use client';

import React, { useState } from 'react';
import { RouteId, RouteOption } from '../lib/types';
import { ChevronDown, ChevronUp, Check, ArrowRight } from 'lucide-react';

const ROUTES: RouteOption[] = [
  {
    id: 'check_status',
    code: 'RT01',
    title: 'Check my status',
    description: 'See what bAgent already recognizes for your wallet across Base L2.',
    bestFor: 'First-time visitors and returning wallets',
    output: 'Standing + recognized efforts',
    videoIndex: '01',
  },
  {
    id: 'improve_position',
    code: 'RT02',
    title: 'Improve my position',
    description: 'Find what is missing and what can move you forward to Tier 1.',
    bestFor: 'Users who want a stronger bAgent route and higher yield allocation',
    output: 'Missing efforts + next action',
    videoIndex: '02',
  },
  {
    id: 'run_mission',
    code: 'RT03',
    title: 'Run a mission',
    description: 'Deploy AI agents to complete useful work and build contribution toward access.',
    bestFor: 'Users ready to act inside bAgent Console & earn rewards',
    output: 'Mission status + XP release + next step',
    videoIndex: '03',
  },
  {
    id: 'submit_builder',
    code: 'RT04',
    title: 'Submit a signal',
    description: 'Send a project, agent archetype, or market signal into bAgent review.',
    bestFor: 'Builders, scouts, and users with a project or market signal',
    output: 'Project / market signal registration',
    videoIndex: '04',
  },
];

interface RouteSelectorProps {
  selectedRoute: RouteId;
  onSelectRoute: (id: RouteId) => void;
}

export const RouteSelector: React.FC<RouteSelectorProps> = ({
  selectedRoute,
  onSelectRoute,
}) => {
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({
    check_status: false,
    improve_position: false,
    run_mission: true,
    submit_builder: false,
  });

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelect = (route: RouteOption) => {
    onSelectRoute(route.id);
    
    // Auto-scroll to target section
    if (route.id === 'check_status' || route.id === 'improve_position') {
      document.getElementById('b02')?.scrollIntoView({ behavior: 'smooth' });
    } else if (route.id === 'run_mission') {
      document.getElementById('b04')?.scrollIntoView({ behavior: 'smooth' });
    } else if (route.id === 'submit_builder') {
      document.getElementById('b06')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="b01" className="mb-14 scroll-mt-20">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#1A1E29] pb-4">
        <div>
          <div className="text-[11px] font-mono font-bold text-[#0052FF] uppercase tracking-widest mb-1">
            01 — Choose your route
          </div>
          <h2 className="text-xl sm:text-2xl font-mono font-bold text-white">
            Why are you here today?
          </h2>
        </div>
        <p className="text-xs font-mono text-[#8A94A6] mt-2 sm:mt-0">
          Choose one route so bAgent Console can show the next action.
        </p>
      </header>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ROUTES.map((route) => {
          const isSelected = selectedRoute === route.id;
          const isExpanded = expandedDetails[route.id];

          return (
            <div
              key={route.id}
              onClick={() => handleSelect(route)}
              className={`cursor-pointer rounded-sm border p-4 transition-all duration-200 relative group ${
                isSelected
                  ? 'bg-[#0E121C] border-[#0052FF] shadow-lg shadow-[#0052FF]/15'
                  : 'bg-[#0A0C11] border-[#181C26] hover:border-[#2A3245] hover:bg-[#0D0F16]'
              }`}
            >
              {/* Radio Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'border-[#0052FF] bg-[#0052FF]'
                        : 'border-[#2E364A] group-hover:border-[#4B5568]'
                    }`}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>

                  <span className="font-mono text-xs text-[#00E5FF] font-semibold">
                    [{route.code}]
                  </span>
                  <span className="font-mono font-bold text-sm text-white tracking-tight">
                    {route.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => toggleExpand(route.id, e)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono text-[#8A94A6] bg-[#12151D] hover:text-white border border-[#1A1E29]"
                  >
                    <span>DTL</span>
                    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              <p className="text-xs text-[#94A3B8] font-sans mt-2.5 line-clamp-2">
                {route.description}
              </p>

              {/* Expandable Details Box */}
              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-[#1A1E29] space-y-2 text-[11px] font-mono">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[#64748B] shrink-0">Best for:</span>
                    <span className="text-[#CBD5E1] text-right">{route.bestFor}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[#64748B] shrink-0">Output:</span>
                    <span className="text-[#00FF9D] text-right font-semibold">{route.output}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
