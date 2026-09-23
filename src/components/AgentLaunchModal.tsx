'use client';

import React, { useState } from 'react';
import { Sparkles, X, CheckCircle2, Cpu, ArrowRight, Layers, DollarSign, Key } from 'lucide-react';
import { generateRandomTxHash } from '../lib/agent-runner';

interface AgentLaunchModalProps {
  onClose: () => void;
  onAgentDeployed: (agent: any) => void;
}

export const AgentLaunchModal: React.FC<AgentLaunchModalProps> = ({
  onClose,
  onAgentDeployed,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('Arbitrage Sentinel AI');
  const [ticker, setTicker] = useState('ARBITRA');
  const [role, setRole] = useState('DeFi Yield & Slipstream Hunter');
  const [model, setModel] = useState('Claude 3.5 Sonnet / CDP AgentKit');
  const [initialEth, setInitialEth] = useState('0.05');
  const [systemPrompt, setSystemPrompt] = useState(
    'Autonomous agent configured to scan Aerodrome and Uniswap v3 on Base L2, execute minimal slippage swaps, and distribute yield to token stakers.'
  );

  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedContract, setDeployedContract] = useState<string | null>(null);

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      const mockContract = generateRandomTxHash().substring(0, 42);
      setDeployedContract(mockContract);
      onAgentDeployed({
        name,
        ticker,
        role,
        contract: mockContract,
      });
      setStep(3);
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="w-full max-w-xl bg-[#090B10] border border-[#1E2433] rounded-sm shadow-2xl overflow-hidden terminal-glow">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#0D0F16] border-b border-[#1A1E29]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00E5FF]" />
            <span className="font-mono text-xs font-bold text-white tracking-wider">
              DEPLOY AUTONOMOUS AGENT ON BASE
            </span>
          </div>
          <button onClick={onClose} className="text-[#8A94A6] hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Wizard Steps Navigation */}
        <div className="grid grid-cols-3 border-b border-[#1A1E29] text-center font-mono text-xs">
          <div
            className={`py-2.5 ${
              step === 1 ? 'text-[#0052FF] font-bold border-b-2 border-[#0052FF]' : 'text-[#64748B]'
            }`}
          >
            1. Identity & Role
          </div>
          <div
            className={`py-2.5 ${
              step === 2 ? 'text-[#0052FF] font-bold border-b-2 border-[#0052FF]' : 'text-[#64748B]'
            }`}
          >
            2. Token & Curve
          </div>
          <div
            className={`py-2.5 ${
              step === 3 ? 'text-[#00FF9D] font-bold border-b-2 border-[#00FF9D]' : 'text-[#64748B]'
            }`}
          >
            3. Confirmation
          </div>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#8A94A6] mb-1.5">
                  Agent Persona Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0D0F16] border border-[#1E2433] focus:border-[#0052FF] rounded-sm px-3.5 py-2 text-xs font-mono text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-[#8A94A6] mb-1.5">
                    Token Symbol / Ticker
                  </label>
                  <input
                    type="text"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value)}
                    className="w-full bg-[#0D0F16] border border-[#1E2433] focus:border-[#0052FF] rounded-sm px-3.5 py-2 text-xs font-mono text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#8A94A6] mb-1.5">
                    Agent Core Specialization
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-[#0D0F16] border border-[#1E2433] focus:border-[#0052FF] rounded-sm px-3.5 py-2 text-xs font-mono text-white outline-none"
                  >
                    <option value="DeFi Yield & Slipstream Hunter">DeFi Yield Hunter (Base DEX)</option>
                    <option value="EVM Bytecode Security Auditor">Smart Contract Security Auditor</option>
                    <option value="Whale Swarm & Bridge Sentinel">Whale Tracker Sentinel</option>
                    <option value="Social & Farcaster Intelligence">Farcaster Growth Agent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#8A94A6] mb-1.5">
                  System Prompt & Tool Constraints
                </label>
                <textarea
                  rows={3}
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="w-full bg-[#0D0F16] border border-[#1E2433] focus:border-[#0052FF] rounded-sm p-3 text-xs font-mono text-white outline-none resize-none"
                />
              </div>

              <div className="flex justify-end pt-3">
                <button
                  onClick={() => setStep(2)}
                  className="btn-filled px-5 py-2 rounded-sm text-xs font-mono font-bold flex items-center gap-2"
                >
                  <span>Next: Tokenomics</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="p-4 rounded-sm bg-[#0D0F16] border border-[#181C26] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#8A94A6]">Network:</span>
                  <span className="text-white font-bold">Base L2 (8453)</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#8A94A6]">Curve Type:</span>
                  <span className="text-[#00E5FF] font-bold">Exponential Constant-Product</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#8A94A6]">Graduation Venue:</span>
                  <span className="text-[#00FF9D] font-bold">Aerodrome V3 Slipstream</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#8A94A6] mb-1.5">
                  Initial Creator Bonding Allocation (ETH on Base)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.01"
                    value={initialEth}
                    onChange={(e) => setInitialEth(e.target.value)}
                    className="flex-1 bg-[#0D0F16] border border-[#1E2433] focus:border-[#0052FF] rounded-sm px-3.5 py-2 text-xs font-mono text-white outline-none"
                  />
                  <span className="px-3 py-2 bg-[#12151D] border border-[#1A1E29] rounded-sm text-xs font-mono text-white font-bold">
                    ETH
                  </span>
                </div>
                <p className="text-[11px] font-mono text-[#64748B] mt-1">
                  Initial ETH funds the agent smart account for autonomous gas and provides initial liquidity pool.
                </p>
              </div>

              <div className="flex justify-between pt-4 border-t border-[#1A1E29]">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-sm text-xs font-mono text-[#8A94A6] hover:text-white"
                >
                  Back
                </button>
                <button
                  onClick={handleDeploy}
                  disabled={isDeploying}
                  className="btn-filled px-6 py-2 rounded-sm text-xs font-mono font-bold flex items-center gap-2"
                >
                  {isDeploying ? (
                    <span>Deploying on Base...</span>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Deploy Agent & Token</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#00FF9D]/15 border border-[#00FF9D] flex items-center justify-center mx-auto text-[#00FF9D]">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-base font-mono font-bold text-white mb-1">
                  Agent Deployed Successfully!
                </h3>
                <p className="text-xs font-mono text-[#8A94A6]">
                  {name} (${ticker}) is now live on Base L2.
                </p>
              </div>

              <div className="p-3 rounded bg-[#0D0F16] border border-[#1E2433] text-left font-mono text-xs space-y-1 text-[#CBD5E1]">
                <div>Token Contract: <span className="text-[#3377FF] break-all">{deployedContract}</span></div>
                <div>Bonding Liquidity: <span className="text-[#00FF9D]">{initialEth} ETH</span></div>
                <div>Execution Status: <span className="text-[#00FF9D]">Autonomous Agent Active</span></div>
              </div>

              <button
                onClick={onClose}
                className="btn-filled w-full py-2.5 rounded-sm text-xs font-mono font-bold"
              >
                Go to Agent Console
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
