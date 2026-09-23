'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles, Send } from 'lucide-react';
import { WalletStanding } from '../lib/types';
import { BASE_MISSIONS } from '../lib/missions';

interface InteractiveTerminalProps {
  standing: WalletStanding;
  onRunMission: (id: string) => void;
}

interface LogEntry {
  id: string;
  type: 'input' | 'output' | 'system' | 'error' | 'success';
  text: string | React.ReactNode;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  standing,
  onRunMission,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'bAgent Coordination Terminal v2.4.0 [Base L2 Native Engine]',
    },
    {
      id: 'init-2',
      type: 'system',
      text: 'Type "help" or click any command below to query signals, standing, or agent operations.',
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const QUICK_COMMANDS = [
    { cmd: 'bagent agentic ops', desc: 'missions your agent wallet runs for you' },
    { cmd: 'bagent status', desc: 'standing, recognized efforts, missing efforts' },
    { cmd: 'bagent missions', desc: 'open work that improves your record' },
    { cmd: 'bagent eligibility', desc: 'upcoming partner events, snapshots, access paths' },
    { cmd: 'bagent ask how do agents coordinate on Base?', desc: 'ask bagent — routes, standing, missions, access' },
  ];

  const handleExecute = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    // Add to command history
    setHistory((prev) => [...prev, cmd]);
    setHistoryIdx(-1);

    const newLogs: LogEntry[] = [
      ...logs,
      {
        id: `cmd-${Date.now()}`,
        type: 'input',
        text: cmd,
      },
    ];

    const lower = cmd.toLowerCase();

    if (lower === 'clear' || lower === 'cls') {
      setLogs([]);
      setInputVal('');
      return;
    }

    if (lower === 'help' || lower === 'commands') {
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        text: (
          <div className="space-y-1 font-mono text-xs">
            <div className="text-[#00E5FF] font-bold">AVAILABLE COMMANDS:</div>
            <div><span className="text-[#3377FF]">bagent status</span> : Inspect wallet standing & contribution score</div>
            <div><span className="text-[#3377FF]">bagent agentic ops</span> : View active agent task executors & RPC feeds</div>
            <div><span className="text-[#3377FF]">bagent missions</span> : List open bounties on Base</div>
            <div><span className="text-[#3377FF]">bagent run &lt;id&gt;</span> : Trigger immediate execution of mission (e.g. `bagent run MSN-01`)</div>
            <div><span className="text-[#3377FF]">bagent eligibility</span> : Check Tier 1 & partner snapshot status</div>
            <div><span className="text-[#3377FF]">bagent ask &lt;question&gt;</span> : Query bAgent autonomous agent intelligence</div>
            <div><span className="text-[#3377FF]">clear</span> : Clear terminal screen</div>
          </div>
        ),
      });
    } else if (lower.startsWith('bagent status') || lower === 'status') {
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        text: (
          <div className="space-y-1 font-mono text-xs text-[#CBD5E1]">
            <div className="text-[#00FF9D] font-bold">WALLET STANDING REPORT:</div>
            <div>Address: <span className="text-white">{standing.address || '0x321D54...74A3'}</span></div>
            <div>Standing Score: <span className="text-[#00E5FF] font-bold">{standing.standingScore}/100</span> [{standing.tier}]</div>
            <div>Eligibility: <span className="text-[#00FF9D]">{standing.eligibility}</span></div>
            <div>Recognized Efforts: <span className="text-white">{standing.recognizedEffortsCount}</span> | Missing: <span className="text-[#FF3366]">{standing.missingEffortsCount}</span></div>
            <div>Base L2 Status: <span className="text-[#00FF9D]">Connected (Block #28,941,204)</span></div>
          </div>
        ),
      });
    } else if (lower.startsWith('bagent agentic ops') || lower === 'ops') {
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        text: (
          <div className="space-y-1.5 font-mono text-xs text-[#CBD5E1]">
            <div className="text-[#00E5FF] font-bold">ACTIVE AGENTIC WORKERS [BASE L2]:</div>
            <div className="p-2 rounded bg-[#0D0F16] border border-[#1E2433]">
              <div>[AG-01] <strong className="text-white">DeFi Yield Sentinel</strong> — State: <span className="text-[#00FF9D]">Monitoring Aerodrome Slipstream</span></div>
              <div className="text-[11px] text-[#8A94A6]">Smart Account: 0x42A1...98B2 · Gas Sponsored by Base Paymaster</div>
            </div>
            <div className="p-2 rounded bg-[#0D0F16] border border-[#1E2433]">
              <div>[AG-02] <strong className="text-white">Security Bytecode Auditor</strong> — State: <span className="text-[#3377FF]">Standby (Waiting for new deployments)</span></div>
              <div className="text-[11px] text-[#8A94A6]">CDP AgentKit Session: Authorized · Merkle Root Proof: Verified</div>
            </div>
          </div>
        ),
      });
    } else if (lower.startsWith('bagent missions') || lower === 'missions') {
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        text: (
          <div className="space-y-1.5 font-mono text-xs">
            <div className="text-[#00FF9D] font-bold">OPEN BASE QUESTS:</div>
            {BASE_MISSIONS.map((m) => (
              <div key={m.id} className="flex items-center justify-between text-[#8A94A6]">
                <span><strong className="text-[#00E5FF]">[{m.code}]</strong> {m.title}</span>
                <span className="text-[#00FF9D]">+{m.rewardXp} XP</span>
              </div>
            ))}
          </div>
        ),
      });
    } else if (lower.startsWith('bagent run')) {
      const parts = cmd.split(' ');
      const codeOrId = parts[2] ? parts[2].toUpperCase() : 'MSN-01';
      const target = BASE_MISSIONS.find(m => m.code === codeOrId || m.id === codeOrId) || BASE_MISSIONS[0];
      
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'success',
        text: `Initiating agent autonomous runner for [${target.code}: ${target.title}]...`,
      });
      onRunMission(target.id);
    } else if (lower.startsWith('bagent eligibility') || lower === 'eligibility') {
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        text: (
          <div className="space-y-1 font-mono text-xs text-[#CBD5E1]">
            <div className="text-[#00E5FF] font-bold">PARTNER SNAPSHOTS & ACCESS WINDOWS:</div>
            <div>[PASS-1] Aerodrome veAERO Staker Access: <span className="text-[#00FF9D]">ACTIVE</span></div>
            <div>[PASS-2] Base Camp Season 2 Builder Whitelist: <span className="text-[#00FF9D]">QUALIFIED</span></div>
            <div>[PASS-3] Autonomous Agentic Run Pool: <span className="text-[#FFB800]">UNLOCKED (Tier 1 Standing)</span></div>
          </div>
        ),
      });
    } else if (lower.startsWith('bagent ask')) {
      const query = cmd.replace(/^bagent ask/i, '').trim();
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        text: (
          <div className="space-y-1 font-mono text-xs text-[#CBD5E1]">
            <div className="text-[#3377FF] font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>bAgent INTELLIGENCE RESPONSE:</span>
            </div>
            <p className="text-[#94A3B8] leading-relaxed">
              &quot;{query || 'How do agents coordinate?'}&quot; — On Base L2, agents communicate via shared state coordination contracts and ERC-4337 smart accounts. Wallets carry verifiable credentials, and autonomous sub-agents claim tasks escrowed by protocols on Aerodrome and Uniswap.
            </p>
          </div>
        ),
      });
    } else {
      newLogs.push({
        id: `err-${Date.now()}`,
        type: 'error',
        text: `Command not recognized: "${cmd}". Type "help" for a list of valid commands.`,
      });
    }

    setLogs(newLogs);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleExecute(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx !== -1) {
        const nextIdx = historyIdx + 1;
        if (nextIdx < history.length) {
          setHistoryIdx(nextIdx);
          setInputVal(history[nextIdx]);
        } else {
          setHistoryIdx(-1);
          setInputVal('');
        }
      }
    }
  };

  return (
    <div className="rounded-sm border border-[#1E2433] bg-[#07090E] overflow-hidden shadow-2xl terminal-glow">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0C0E14] border-b border-[#1A1E29]">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-3.5 h-3.5 text-[#0052FF]" />
          <span className="font-mono text-xs font-bold text-white tracking-wider">
            bagent.console — commands / output
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#64748B]">
          <span>TTY1</span>
          <span>·</span>
          <span className="text-[#00FF9D]">READY</span>
        </div>
      </div>

      {/* Quick Command Buttons */}
      <div className="p-3 bg-[#090B10] border-b border-[#1A1E29] flex flex-wrap gap-2">
        {QUICK_COMMANDS.map((qc) => (
          <button
            key={qc.cmd}
            onClick={() => handleExecute(qc.cmd)}
            className="px-2.5 py-1 rounded-sm bg-[#0E1118] hover:bg-[#141924] border border-[#181C26] hover:border-[#0052FF]/40 text-left text-xs font-mono transition-colors group"
          >
            <span className="text-[#0052FF] font-bold mr-1">$</span>
            <span className="text-[#CBD5E1] group-hover:text-white">{qc.cmd}</span>
          </button>
        ))}
      </div>

      {/* Terminal Output Area */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="p-4 min-h-[220px] max-h-[380px] overflow-y-auto font-mono text-xs space-y-2.5 cursor-text"
      >
        {logs.map((log) => {
          if (log.type === 'input') {
            return (
              <div key={log.id} className="flex items-center gap-2 text-white">
                <span className="text-[#0052FF] font-bold">bagent@console:~/commands$</span>
                <span className="text-[#00E5FF]">{log.text}</span>
              </div>
            );
          }
          if (log.type === 'error') {
            return (
              <div key={log.id} className="text-[#FF3366] pl-2 border-l-2 border-[#FF3366]">
                {log.text}
              </div>
            );
          }
          if (log.type === 'success') {
            return (
              <div key={log.id} className="text-[#00FF9D] pl-2 border-l-2 border-[#00FF9D]">
                {log.text}
              </div>
            );
          }
          if (log.type === 'system') {
            return (
              <div key={log.id} className="text-[#64748B]">
                // {log.text}
              </div>
            );
          }
          return (
            <div key={log.id} className="text-[#CBD5E1] pl-2 border-l border-[#1A1E29]">
              {log.text}
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Input Row */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0C0E14] border-t border-[#1A1E29]">
        <span className="font-mono text-xs font-bold text-[#0052FF] shrink-0">
          bagent@console:~/commands$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="bagent status · bagent missions · bagent ask…"
          className="flex-1 bg-transparent text-xs font-mono text-white outline-none placeholder-[#4B5568]"
        />
        <button
          onClick={() => handleExecute(inputVal)}
          className="text-[#8A94A6] hover:text-[#00E5FF] transition-colors p-1"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
