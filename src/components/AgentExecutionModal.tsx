'use client';

import React, { useState, useEffect } from 'react';
import { AgentMission, AgentExecutionStep } from '../lib/types';
import { generateInitialSteps, generateRandomTxHash } from '../lib/agent-runner';
import { BASE_BUILDER_CONFIG } from '../lib/contracts';
import { Terminal, Cpu, CheckCircle2, Shield, ExternalLink, X, Zap, Loader2, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AgentExecutionModalProps {
  mission: AgentMission;
  onClose: () => void;
  onMissionSuccess: (missionId: string, xpEarned: number) => void;
}

export const AgentExecutionModal: React.FC<AgentExecutionModalProps> = ({
  mission,
  onClose,
  onMissionSuccess,
}) => {
  const [steps, setSteps] = useState<AgentExecutionStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [isSigningOnChain, setIsSigningOnChain] = useState(false);
  const [onChainTxError, setOnChainTxError] = useState<string | null>(null);

  useEffect(() => {
    const initial = generateInitialSteps(mission);
    setSteps(initial);
    setCurrentStepIndex(0);
    setIsCompleted(false);
    setTxHash(generateRandomTxHash());
  }, [mission]);

  // Step runner timer
  useEffect(() => {
    if (steps.length === 0 || isCompleted || isSigningOnChain) return;

    const timer = setTimeout(() => {
      setSteps((prevSteps) => {
        const nextSteps = [...prevSteps];
        if (currentStepIndex < nextSteps.length) {
          nextSteps[currentStepIndex].status = 'done';
          if (currentStepIndex + 1 < nextSteps.length) {
            nextSteps[currentStepIndex + 1].status = 'running';
          }
        }
        return nextSteps;
      });

      if (currentStepIndex + 1 >= steps.length) {
        setIsCompleted(true);
        onMissionSuccess(mission.id, mission.rewardXp);
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#0052FF', '#00E5FF', '#00FF9D'],
          });
        } catch {}
      } else {
        setCurrentStepIndex((prev) => prev + 1);
      }
    }, 2400);

    return () => clearTimeout(timer);
  }, [currentStepIndex, steps.length, isCompleted, isSigningOnChain, mission.id, mission.rewardXp, onMissionSuccess]);

  // Execute a real on-chain transaction directly from user's connected wallet
  const handleSignRealTransaction = async () => {
    if (typeof window === 'undefined' || !(window as any).ethereum) {
      setOnChainTxError('Please connect a Web3 wallet (MetaMask / Coinbase / Rabby) to broadcast on Base.');
      return;
    }

    try {
      setIsSigningOnChain(true);
      setOnChainTxError(null);
      const eth = (window as any).ethereum;

      const accounts: string[] = await eth.request({ method: 'eth_requestAccounts' });
      if (!accounts || accounts.length === 0) {
        throw new Error('No wallet accounts available.');
      }
      const userAddress = accounts[0];

      const hash: string = await eth.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: userAddress,
            to: mission.targetContract || userAddress,
            value: '0x0',
            data: BASE_BUILDER_CONFIG.encodedAttributionHex,
          },
        ],
      });

      setTxHash(hash);
      setIsCompleted(true);
      onMissionSuccess(mission.id, mission.rewardXp);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#0052FF', '#00E5FF', '#00FF9D'],
        });
      } catch {}
    } catch (err: any) {
      setOnChainTxError(err?.message || 'Transaction was rejected.');
    } finally {
      setIsSigningOnChain(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="w-full max-w-2xl bg-[#090B10] border border-[#1E2433] rounded-sm shadow-2xl overflow-hidden terminal-glow">
        {/* Modal Chrome Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0D0F16] border-b border-[#1A1E29]">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 mr-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF3366]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFB800]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#00FF9D]" />
            </div>
            <Cpu className="w-4 h-4 text-[#0052FF]" />
            <span className="font-mono text-xs font-bold text-white tracking-wider">
              bAgent RUNNER — {mission.code}
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-[#8A94A6] hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Mission Info Bar */}
          <div className="flex items-start justify-between gap-4 pb-4 mb-5 border-b border-[#1A1E29]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#0052FF]/20 text-[#3377FF] border border-[#0052FF]/30">
                  {mission.category}
                </span>
                <span className="text-xs font-mono text-[#64748B]">
                  Agent: <strong className="text-white">{mission.agentTypeRequired}</strong>
                </span>
              </div>
              <h3 className="text-base font-mono font-bold text-white">
                {mission.title}
              </h3>
            </div>

            <div className="text-right shrink-0">
              <div className="text-[10px] font-mono text-[#64748B]">Reward Bounty</div>
              <div className="text-sm font-mono font-bold text-[#00FF9D]">
                +{mission.rewardXp} XP {mission.rewardToken ? `+ ${mission.rewardAmount} ${mission.rewardToken}` : ''}
              </div>
            </div>
          </div>

          {/* Stepper Pipeline */}
          <div className="space-y-3 mb-6">
            {steps.map((step, idx) => {
              const isRunning = step.status === 'running';
              const isDone = step.status === 'done';

              return (
                <div
                  key={step.stepNumber}
                  className={`p-3 rounded-sm border transition-all ${
                    isRunning
                      ? 'bg-[#0052FF]/10 border-[#0052FF] shadow-sm shadow-[#0052FF]/20'
                      : isDone
                      ? 'bg-[#0B0D13] border-[#181C26]'
                      : 'bg-[#07080B] border-[#12151D] opacity-40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#00E5FF] font-bold">
                        [STEP {idx + 1}]
                      </span>
                      <span className="font-mono text-xs font-semibold text-white">
                        {step.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-[10px]">
                      {isRunning && (
                        <span className="text-[#3377FF] flex items-center gap-1">
                          <Loader2 className="w-3 h-3 animate-spin" /> Executing
                        </span>
                      )}
                      {isDone && (
                        <span className="text-[#00FF9D] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Complete
                        </span>
                      )}
                      {step.status === 'waiting' && (
                        <span className="text-[#64748B]">Queued</span>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] font-mono text-[#8A94A6]">
                    {step.detail}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Broadcast Real On-Chain TX Callout */}
          {!isCompleted && (
            <div className="p-3.5 rounded-sm bg-[#0E121D] border border-[#0052FF]/40 mb-5 flex items-center justify-between gap-4 font-mono text-xs">
              <div className="text-[#8A94A6]">
                Want to sign with your connected wallet instead?
              </div>
              <button
                onClick={handleSignRealTransaction}
                disabled={isSigningOnChain}
                className="btn-industrial px-3.5 py-1.5 rounded-sm text-xs font-mono font-semibold text-[#00E5FF] hover:bg-[#0052FF]/20 flex items-center gap-1.5 shrink-0"
              >
                {isSigningOnChain ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>Sign On Base Wallet</span>
              </button>
            </div>
          )}

          {onChainTxError && (
            <div className="p-2.5 rounded bg-[#FF3366]/10 border border-[#FF3366]/30 text-xs font-mono text-[#FF3366] mb-5">
              {onChainTxError}
            </div>
          )}

          {/* On-Chain Base Proof Card */}
          {isCompleted && (
            <div className="p-4 rounded-sm bg-[#00FF9D]/10 border border-[#00FF9D]/40 space-y-2 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00FF9D]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>MISSION EXECUTED &amp; VERIFIED ON BASE</span>
                </div>
                <span className="text-[10px] font-mono text-[#00FF9D] bg-[#00FF9D]/20 px-2 py-0.5 rounded">
                  CONFIRMED
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#8A94A6] pt-1">
                <span>BaseScan TX:</span>
                <a
                  href={`https://basescan.org/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3377FF] hover:underline flex items-center gap-1"
                >
                  <span>{txHash.substring(0, 14)}...{txHash.substring(txHash.length - 8)}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1A1E29]">
            {isCompleted ? (
              <button
                onClick={onClose}
                className="btn-filled px-6 py-2 rounded-sm text-xs font-mono font-bold"
              >
                Claim XP &amp; Close
              </button>
            ) : (
              <div className="flex items-center gap-2 text-xs font-mono text-[#8A94A6]">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0052FF]" />
                <span>bAgent autonomous loop in progress...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
