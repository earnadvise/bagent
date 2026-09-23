'use client';

import React, { useState } from 'react';
import { WalletStanding, ContributionGroup } from '../lib/types';
import { Shield, CheckCircle2, AlertCircle, Clock, Search, ArrowRight, Zap, RefreshCw } from 'lucide-react';

interface PositionCheckerProps {
  standing: WalletStanding;
  walletInput: string;
  onWalletInputChange: (val: string) => void;
  onCheckPosition: () => void;
  onNavigateToMissions: (missionId?: string) => void;
}

export const PositionChecker: React.FC<PositionCheckerProps> = ({
  standing,
  walletInput,
  onWalletInputChange,
  onCheckPosition,
  onNavigateToMissions,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<ContributionGroup | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckPosition();
  };

  const getStatusBadge = (status: ContributionGroup['status']) => {
    switch (status) {
      case 'recognized':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#00FF9D]/15 text-[#00FF9D] border border-[#00FF9D]/30">
            <CheckCircle2 className="w-3 h-3" /> recognized
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#0052FF]/15 text-[#3377FF] border border-[#0052FF]/30">
            <RefreshCw className="w-3 h-3 animate-spin" /> in progress
          </span>
        );
      case 'missing':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#FF3366]/15 text-[#FF3366] border border-[#FF3366]/30">
            <AlertCircle className="w-3 h-3" /> missing
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#FFB800]/15 text-[#FFB800] border border-[#FFB800]/30">
            <Clock className="w-3 h-3" /> pending review
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono text-[#64748B] bg-[#12151D] border border-[#1A1E29]">
            waiting for wallet
          </span>
        );
    }
  };

  return (
    <section id="b02" className="mb-14 scroll-mt-20">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#1A1E29] pb-4">
        <div>
          <div className="text-[11px] font-mono font-bold text-[#0052FF] uppercase tracking-widest mb-1">
            02 — Your Position
          </div>
          <h2 className="text-xl sm:text-2xl font-mono font-bold text-white">
            Check your bAgent ecosystem position
          </h2>
        </div>
        <span className="text-xs font-mono text-[#8A94A6] mt-1 sm:mt-0">
          Base Standing Score: <strong className="text-white">{standing.standingScore}/100</strong>
        </span>
      </header>

      {/* Wallet Input Form */}
      <form onSubmit={handleSubmit} className="mb-8" id="positionInput">
        <label className="block text-xs font-mono text-[#8A94A6] mb-2">
          Wallet / ENS / Base address
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4B5568]" />
            <input
              type="text"
              value={walletInput}
              onChange={(e) => onWalletInputChange(e.target.value)}
              placeholder="0x…, name.eth, or name.base.eth"
              className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-[#0A0C11] border border-[#1E2433] focus:border-[#0052FF] text-xs sm:text-sm font-mono text-white outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            className="btn-filled px-6 py-2.5 rounded-sm text-xs font-mono font-bold flex items-center justify-center gap-2"
          >
            <span>Check position</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>

      {/* Metrics Key-Value Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-6">
        <div className="p-3 rounded-sm bg-[#0B0D13] border border-[#181C26]">
          <div className="text-[10px] font-mono text-[#64748B] uppercase mb-1">Eligibility</div>
          <div className="text-xs font-mono font-bold text-[#00FF9D] truncate">
            {standing.eligibility}
          </div>
        </div>

        <div className="p-3 rounded-sm bg-[#0B0D13] border border-[#181C26]">
          <div className="text-[10px] font-mono text-[#64748B] uppercase mb-1">Status</div>
          <div className="text-xs font-mono font-bold text-white truncate">
            {standing.status}
          </div>
        </div>

        <div className="p-3 rounded-sm bg-[#0B0D13] border border-[#181C26]">
          <div className="text-[10px] font-mono text-[#64748B] uppercase mb-1">Recognized</div>
          <div className="text-xs font-mono font-bold text-[#00E5FF]">
            {standing.recognizedEffortsCount} efforts
          </div>
        </div>

        <div className="p-3 rounded-sm bg-[#0B0D13] border border-[#181C26]">
          <div className="text-[10px] font-mono text-[#64748B] uppercase mb-1">Missing</div>
          <div className="text-xs font-mono font-bold text-[#FF3366]">
            {standing.missingEffortsCount} efforts
          </div>
        </div>

        <div className="p-3 rounded-sm bg-[#0B0D13] border border-[#181C26]">
          <div className="text-[10px] font-mono text-[#64748B] uppercase mb-1">Pending</div>
          <div className="text-xs font-mono font-bold text-[#FFB800]">
            {standing.pendingEffortsCount} efforts
          </div>
        </div>

        <div className="p-3 rounded-sm bg-[#0B0D13] border border-[#181C26]">
          <div className="text-[10px] font-mono text-[#64748B] uppercase mb-1">Last updated</div>
          <div className="text-[11px] font-mono text-[#8A94A6] truncate">
            {standing.lastUpdated}
          </div>
        </div>
      </div>

      {/* Standing Factor Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['Hold history', 'Approved missions', 'Partner campaigns', 'Snapshot history'].map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded text-[10px] font-mono text-[#8A94A6] bg-[#0E1015] border border-[#181C26]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Notes */}
      <div className="space-y-1 mb-6 text-xs font-mono text-[#64748B]">
        <div className="flex items-center gap-2">
          <span className="text-[#0052FF] font-bold">//</span>
          <span>Selling or unstaking may reduce hold-based standing.</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#00FF9D] font-bold">//</span>
          <span>Contribution history stays forever on Base.</span>
        </div>
      </div>

      {/* Contribution Inputs Panel (5 Groups) */}
      <div className="rounded-sm border border-[#1E2433] bg-[#0A0C11] p-5 mb-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#1A1E29] mb-4">
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
            Contribution inputs
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono text-[#00E5FF] bg-[#00E5FF]/10 border border-[#00E5FF]/20">
            5 groups
          </span>
        </div>

        <div className="space-y-3">
          {standing.groups.map((grp) => (
            <div
              key={grp.id}
              onClick={() => setSelectedGroup(selectedGroup?.id === grp.id ? null : grp)}
              className="p-3 rounded-sm bg-[#0D0F16] border border-[#181C26] hover:border-[#2A3245] cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold text-white">
                    {grp.name}
                  </span>
                  <span className="text-[11px] font-mono text-[#64748B]">
                    [{grp.score}/{grp.maxScore} pts]
                  </span>
                </div>
                {getStatusBadge(grp.status)}
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[#141824] h-1.5 rounded-full mt-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#0052FF] to-[#00FF9D] h-full transition-all duration-500"
                  style={{ width: `${(grp.score / grp.maxScore) * 100}%` }}
                />
              </div>

              {/* Group Details accordion */}
              {selectedGroup?.id === grp.id && grp.details.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-[#1A1E29] space-y-1">
                  {grp.details.map((detail, idx) => (
                    <div key={idx} className="text-[11px] font-mono text-[#94A3B8] flex items-center gap-2">
                      <span className="text-[#00E5FF]">›</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="mt-4 text-[11px] font-mono text-[#64748B]">
          &gt; Inputs are independent. No single activity is required, but more recognized inputs improve standing.
        </p>
      </div>

      {/* Missing Efforts List */}
      <div className="rounded-sm border border-[#1E2433] bg-[#0A0C11] p-5 mb-6">
        <h3 className="font-mono text-xs font-bold text-[#FF3366] uppercase tracking-wider mb-3 flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Missing efforts</span>
        </h3>
        <ul className="space-y-2">
          {standing.missingEfforts.map((effort, i) => (
            <li key={i} className="text-xs font-mono text-[#CBD5E1] flex items-center gap-2.5">
              <span className="text-[#FF3366] font-bold">[{i + 1}]</span>
              <span>{effort}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Next Action Box */}
      <div className="rounded-sm border border-[#0052FF]/40 bg-[#0052FF]/10 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00E5FF] font-bold uppercase mb-1">
            <ArrowRight className="w-4 h-4" />
            <span>Next action: {standing.nextAction.title}</span>
          </div>
          <p className="text-xs text-[#CBD5E1] font-sans">
            {standing.nextAction.description}
          </p>
        </div>

        <button
          onClick={() => onNavigateToMissions(standing.nextAction.missionId)}
          className="btn-filled px-5 py-2.5 rounded-sm text-xs font-mono font-bold shrink-0 flex items-center justify-center gap-2"
        >
          <Zap className="w-3.5 h-3.5 text-white" />
          <span>{standing.nextAction.actionLabel}</span>
        </button>
      </div>
    </section>
  );
};
