import { AgentMission, AgentExecutionStep } from './types';

export interface ExecutionTrace {
  mission: AgentMission;
  agentName: string;
  steps: AgentExecutionStep[];
  isComplete: boolean;
  totalXpEarned: number;
  finalTxHash?: string;
  verdict: string;
}

export function generateInitialSteps(mission: AgentMission): AgentExecutionStep[] {
  const timestamp = () => new Date().toISOString().substring(11, 19) + ' UTC';

  if (mission.category === 'DeFi') {
    return [
      {
        stepNumber: 1,
        title: 'Query Aerodrome Slipstream V3 Quoter',
        detail: 'Fetching real-time reserve ratios, tick arrays, and fee tier (0.01% / 0.05%) on Base...',
        type: 'tool_call',
        status: 'running',
        timestamp: timestamp(),
      },
      {
        stepNumber: 2,
        title: 'Evaluate Multi-Hop Arbitrage Path',
        detail: 'Simulating Uniswap V3 Base (WETH -> USDC) vs Aerodrome (USDC -> AERO -> WETH)...',
        type: 'think',
        status: 'waiting',
        timestamp: timestamp(),
      },
      {
        stepNumber: 3,
        title: 'Sign & Encode Calldata via Smart Account',
        detail: 'Constructing ERC-4337 UserOperation with minimal gas limit on Base L2...',
        type: 'tx_broadcast',
        status: 'waiting',
        timestamp: timestamp(),
      },
      {
        stepNumber: 4,
        title: 'Broadcast Transaction to Base Sequencer',
        detail: 'Submitting bundled UserOp with Base Paymaster sponsored gas...',
        type: 'tx_broadcast',
        status: 'waiting',
        timestamp: timestamp(),
      },
      {
        stepNumber: 5,
        title: 'Verify Execution & Settle Rewards',
        detail: 'Receipt confirmed on Base block. Releasing XP + token reward into wallet record.',
        type: 'complete',
        status: 'waiting',
        timestamp: timestamp(),
      },
    ];
  } else if (mission.category === 'Security') {
    return [
      {
        stepNumber: 1,
        title: 'Fetch Target Bytecode from Base RPC',
        detail: `Downloading raw EVM bytecode at ${mission.targetContract?.substring(0, 10)}... on Base`,
        type: 'tool_call',
        status: 'running',
        timestamp: timestamp(),
      },
      {
        stepNumber: 2,
        title: 'Run Abstract Interpretation & CFG Analysis',
        detail: 'Tracing JUMPDEST graph, external CALL instructions, and non-reentrant state transitions...',
        type: 'think',
        status: 'waiting',
        timestamp: timestamp(),
      },
      {
        stepNumber: 3,
        title: 'Synthesize LLM Chain-of-Thought Audit Proof',
        detail: 'Generating zero-day exploit risk assessment with cryptographic signature...',
        type: 'verify',
        status: 'waiting',
        timestamp: timestamp(),
      },
      {
        stepNumber: 4,
        title: 'Commit Audit Attestation to bAgent Registry',
        detail: 'Writing verifiable safety score to bAgent Assay smart contract on Base.',
        type: 'complete',
        status: 'waiting',
        timestamp: timestamp(),
      },
    ];
  } else if (mission.category === 'Intelligence') {
    return [
      {
        stepNumber: 1,
        title: 'Stream L1->Base Portal Deposit Logs',
        detail: 'Filtering Base Bridge deposit events > 50 ETH in the last 100 blocks...',
        type: 'tool_call',
        status: 'running',
        timestamp: timestamp(),
      },
      {
        stepNumber: 2,
        title: 'Cluster Whale Wallets & Smart Money',
        detail: 'Cross-referencing address tags with Arkham & Nansen entity clusters...',
        type: 'think',
        status: 'waiting',
        timestamp: timestamp(),
      },
      {
        stepNumber: 3,
        title: 'Detect Abnormal Liquidity Shifts',
        detail: 'Analyzing delta skew on Seamless Protocol and Moonwell money markets...',
        type: 'think',
        status: 'waiting',
        timestamp: timestamp(),
      },
      {
        stepNumber: 4,
        title: 'Publish Coordination Signal',
        detail: 'Broadcasting signed telemetry packet to bAgent Coordination Surface.',
        type: 'complete',
        status: 'waiting',
        timestamp: timestamp(),
      },
    ];
  } else {
    return [
      {
        stepNumber: 1,
        title: 'Query Farcaster Hub & Warpcast API',
        detail: 'Aggregating trending casts mentioning #Base and verified builders...',
        type: 'tool_call',
        status: 'running',
        timestamp: timestamp(),
      },
      {
        stepNumber: 2,
        title: 'Run Sentiment & Conviction Scoring',
        detail: 'Processing LLM semantic analysis on builder engagement and launch momentum...',
        type: 'think',
        status: 'waiting',
        timestamp: timestamp(),
      },
      {
        stepNumber: 3,
        title: 'Record Merkle Root On-Chain',
        detail: 'Publishing daily sentiment Merkle root to Base L2 state for decentralized verification.',
        type: 'complete',
        status: 'waiting',
        timestamp: timestamp(),
      },
    ];
  }
}

export function generateRandomTxHash(): string {
  const chars = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}
