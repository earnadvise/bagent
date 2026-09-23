'use client';

import React, { useState, useEffect } from 'react';
import { Cpu, Shield, Sparkles, Wallet, ExternalLink, Terminal, PlusCircle, Check, LogOut, Copy, ArrowRight, Loader2, AlertTriangle } from 'lucide-react';

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
  const [isConnectingWeb3, setIsConnectingWeb3] = useState(false);
  const [web3Error, setWeb3Error] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [chainId, setChainId] = useState<string | null>(null);

  const BASE_CHAIN_ID = '0x2105'; // 8453 in hex

  const PRESET_WALLETS = [
    { label: 'bAgent Operator (Base Whale)', address: '0x321D54b0E28292850d998F12aE04B46c19F474A3' },
    { label: 'Jesse.base.eth (Base Core)', address: '0x8453000000000000000000000000000000000001' },
    { label: 'Emerging Builder (Fresh)', address: '0x49B5c6B321f9A6e20C88De78B814407B129c91f0' },
  ];

  // Check if browser wallet is already connected
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      const eth = (window as any).ethereum;
      eth
        .request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts && accounts.length > 0) {
            onSelectWallet(accounts[0]);
          }
        })
        .catch(() => {});

      eth
        .request({ method: 'eth_chainId' })
        .then((id: string) => setChainId(id))
        .catch(() => {});

      // Listen for account and chain changes
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts && accounts.length > 0) {
          onSelectWallet(accounts[0]);
        }
      };

      const handleChainChanged = (id: string) => {
        setChainId(id);
      };

      eth.on?.('accountsChanged', handleAccountsChanged);
      eth.on?.('chainChanged', handleChainChanged);

      return () => {
        eth.removeListener?.('accountsChanged', handleAccountsChanged);
        eth.removeListener?.('chainChanged', handleChainChanged);
      };
    }
  }, [onSelectWallet]);

  // Connect via browser extension (MetaMask, Coinbase Wallet, Rainbow, Rabby)
  const connectBrowserWallet = async () => {
    if (typeof window === 'undefined' || !(window as any).ethereum) {
      setWeb3Error('No Web3 wallet detected. Please install MetaMask, Coinbase Wallet, or use simulated mode.');
      return;
    }

    try {
      setIsConnectingWeb3(true);
      setWeb3Error(null);
      const eth = (window as any).ethereum;

      const accounts: string[] = await eth.request({
        method: 'eth_requestAccounts',
      });

      if (accounts && accounts.length > 0) {
        onSelectWallet(accounts[0]);

        // Attempt switch to Base L2 if on another network
        try {
          await eth.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: BASE_CHAIN_ID }],
          });
        } catch (switchError: any) {
          // If chain not added to wallet, request to add it
          if (switchError.code === 4902) {
            await eth.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: BASE_CHAIN_ID,
                  chainName: 'Base',
                  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
                  rpcUrls: ['https://mainnet.base.org'],
                  blockExplorerUrls: ['https://basescan.org'],
                },
              ],
            });
          }
        }

        setIsWalletModalOpen(false);
      }
    } catch (err: any) {
      setWeb3Error(err?.message || 'Failed to connect wallet.');
    } finally {
      setIsConnectingWeb3(false);
    }
  };

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

  const copyToClipboard = () => {
    if (activeWallet) {
      navigator.clipboard.writeText(activeWallet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
              <a href="#b07" className="text-[#8A94A6] hover:text-white transition-colors">Infrastructure</a>
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
              className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#0E1015] border border-[#1E2330] hover:border-[#0052FF] text-xs font-mono text-white transition-colors group"
            >
              <span className="w-2 h-2 rounded-full bg-[#00FF9D] animate-pulse" />
              {activeWallet ? (
                <div className="flex items-center gap-1.5">
                  <span className="font-mono">
                    {activeWallet.substring(0, 6)}...{activeWallet.substring(activeWallet.length - 4)}
                  </span>
                </div>
              ) : (
                <span className="font-bold flex items-center gap-1.5 text-[#00E5FF]">
                  <Wallet className="w-3.5 h-3.5" /> Connect Wallet
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Wallet Connection Modal */}
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
              {/* Connected Wallet Actions Bar */}
              {activeWallet && (
                <div className="p-3 rounded-sm bg-[#090B10] border border-[#1E2433] space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8A94A6]">Connected Address:</span>
                    <span className="text-[#00FF9D] font-bold">Active</span>
                  </div>
                  <div className="text-white break-all text-[11px] font-semibold bg-[#12151D] p-2 rounded border border-[#1A1E29]">
                    {activeWallet}
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={copyToClipboard}
                      className="flex-1 py-1 rounded bg-[#161B26] hover:bg-[#1E2433] border border-[#232A3B] text-[11px] text-white flex items-center justify-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                    <a
                      href={`https://basescan.org/address/${activeWallet}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-1 rounded bg-[#161B26] hover:bg-[#1E2433] border border-[#232A3B] text-[11px] text-[#3377FF] flex items-center justify-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>BaseScan</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Primary 1-Click Web3 Connect Button */}
              <div>
                <button
                  onClick={connectBrowserWallet}
                  disabled={isConnectingWeb3}
                  className="btn-filled w-full py-2.5 rounded-sm text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#0052FF]/30"
                >
                  {isConnectingWeb3 ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Requesting Wallet Signature...</span>
                    </>
                  ) : (
                    <>
                      <Wallet className="w-4 h-4" />
                      <span>Connect Browser Wallet (MetaMask / Coinbase / Rabby)</span>
                    </>
                  )}
                </button>

                {web3Error && (
                  <div className="mt-2 p-2 rounded bg-[#FF3366]/10 border border-[#FF3366]/30 text-[11px] font-mono text-[#FF3366] flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>{web3Error}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 my-2">
                <div className="h-px bg-[#1A1E29] flex-1" />
                <span className="text-[10px] font-mono text-[#64748B] uppercase">Or Test with Simulated Operator</span>
                <div className="h-px bg-[#1A1E29] flex-1" />
              </div>

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
                  Or enter any custom Base / ENS address:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customAddress}
                    onChange={(e) => setCustomAddress(e.target.value)}
                    placeholder="0x... or name.base.eth"
                    className="flex-1 bg-[#08090C] border border-[#1E2433] focus:border-[#0052FF] rounded-sm px-3 py-1.5 text-xs font-mono text-white outline-none"
                  />
                  <button
                    type="submit"
                    className="btn-industrial px-4 py-1.5 text-xs font-mono font-semibold rounded-sm"
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
