'use client';

import React, { useState } from 'react';
import { Cpu, Shield, Sparkles, Wallet, ExternalLink, Terminal, PlusCircle, Check } from 'lucide-react';

interface HeaderProps {
  onOpenDeployAgent: () => void;
  activeWallet: string;
  onSelectWallet: (addr: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDeployAgent,
  activeWallet,
  onSelectWallet,
}) => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [customAddress, setCustomAddress] = useState('');

  const PRESET_WALLETS = [
    { label: 'bAgent Operator (Base Whale)', address: '0x321D54b0E28292850d998F12aE04B46c19F474A3' },
    { label: 'Jesse.base.eth (Base Core)', address: '0x8453000000000000000000000000000000000001' },
    { label: 'Emerging Builder (Fresh)', address: '0x49B5c6B321f9A6e20C88De78B814407B129c91f0' },
  ];

  const handleConnectPreset = (addr: string) => {
    onSelectWallet(addr);
    setIsWalletModalOpen(false);
  };

  const handleConnectCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customAddress.trim()) {
      onSelectWallet(customAddress.trim());
      setIsWalletModalOpen(false);
      setCustomAddress('');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#1A1E29] bg-[#07080B]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <a href="#hero" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-sm bg-[#0052FF] flex items-center justify-center text-white font-mono font-bold text-sm tracking-tighter shadow-lg shadow-[#0052FF]/30 group-hover:scale-105 transition-transform">
                bA
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-white tracking-tight">bAgent CONSOLE</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#0052FF]/20 text-[#3377FF] border border-[#0052FF]/30">
                    BASE L2
                  </span>
                </div>
                <span className="text-[11px] text-[#8A94A6] hidden sm:inline">agentic activities launchpad</span>
              </div>
            </a>

            {/* Navigation links */}
            <nav className="hidden md:flex items-center gap-5 ml-4 text-xs font-mono">
              <a href="#b01" className="text-[#8A94A6] hover:text-white transition-colors">Ecosystem</a>
              <a href="#b02" className="text-white border-b-2 border-[#0052FF] pb-1">Console</a>
              <a href="#b04" className="text-[#8A94A6] hover:text-white transition-colors">Missions</a>
              <a href="#b06" className="text-[#8A94A6] hover:text-white transition-colors">Coordination</a>
              <a href="#b07" className="text-[#8A94A6] hover:text-white transition-colors">DEX Layer</a>
            </nav>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            {/* Deploy Agent Button */}
            <button
              onClick={onOpenDeployAgent}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#0F121A] border border-[#0052FF]/40 text-[#00E5FF] text-xs font-mono font-semibold hover:bg-[#0052FF]/20 transition-all shadow-sm shadow-[#0052FF]/20"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Launch Agent</span>
            </button>

            {/* Wallet Button */}
            <button
              onClick={() => setIsWalletModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#0E1015] border border-[#1E2330] hover:border-[#0052FF] text-xs font-mono text-white transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-[#00FF9D] animate-pulse" />
              {activeWallet ? (
                <span className="font-mono">
                  {activeWallet.substring(0, 6)}...{activeWallet.substring(activeWallet.length - 4)}
                </span>
              ) : (
                <span>Connect Wallet</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Wallet Selector Modal */}
      {isWalletModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#0D0F14] border border-[#1E2330] rounded-sm p-6 shadow-2xl terminal-glow">
            <div className="flex items-center justify-between pb-4 border-b border-[#1A1E29]">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-[#0052FF]" />
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  Connect Base Wallet
                </h3>
              </div>
              <button
                onClick={() => setIsWalletModalOpen(false)}
                className="text-[#8A94A6] hover:text-white font-mono text-xs"
              >
                [ESC]
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <p className="text-xs text-[#8A94A6] font-mono">
                Select a simulated Base identity or enter your own Base / ENS address:
              </p>

              <div className="space-y-2">
                {PRESET_WALLETS.map((w) => {
                  const isSelected = activeWallet.toLowerCase() === w.address.toLowerCase();
                  return (
                    <button
                      key={w.address}
                      onClick={() => handleConnectPreset(w.address)}
                      className={`w-full text-left p-3 rounded-sm border text-xs font-mono transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#0052FF]/15 border-[#0052FF] text-white'
                          : 'bg-[#12151D] border-[#1E2330] text-[#8A94A6] hover:border-[#2A3245] hover:text-white'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-white">{w.label}</div>
                        <div className="text-[11px] text-[#8A94A6] font-mono mt-0.5">{w.address}</div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#00FF9D]" />}
                    </button>
                  );
                })}
              </div>

              <form onSubmit={handleConnectCustom} className="pt-2 border-t border-[#1A1E29]">
                <label className="block text-[11px] font-mono text-[#8A94A6] mb-1.5">
                  Or enter custom address / ENS:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customAddress}
                    onChange={(e) => setCustomAddress(e.target.value)}
                    placeholder="0x... or name.base.eth"
                    className="flex-1 bg-[#08090C] border border-[#1E2330] focus:border-[#0052FF] rounded-sm px-3 py-1.5 text-xs font-mono text-white outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#0052FF] hover:bg-[#1A68FF] text-white text-xs font-mono font-semibold rounded-sm transition-colors"
                  >
                    Set
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
