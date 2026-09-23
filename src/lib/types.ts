export type RouteId = 'check_status' | 'improve_position' | 'run_mission' | 'submit_builder';

export interface RouteOption {
  id: RouteId;
  code: string;
  title: string;
  description: string;
  bestFor: string;
  output: string;
  videoIndex: string;
}

export type ContributionGroupId =
  | 'walletActivity'
  | 'agenticRouting'
  | 'partnerCampaigns'
  | 'research'
  | 'ecosystemParticipation';

export interface ContributionGroup {
  id: ContributionGroupId;
  name: string;
  status: 'recognized' | 'in_progress' | 'pending' | 'missing' | 'waiting';
  score: number;
  maxScore: number;
  details: string[];
}

export interface WalletStanding {
  address: string;
  ens?: string;
  isBaseNative: boolean;
  standingScore: number;
  tier: 'Elite Agent' | 'Active Operator' | 'Recognized Scout' | 'Emerging Wallet' | 'Unrecognized';
  eligibility: 'Eligible (Tier 1)' | 'Eligible (Tier 2)' | 'Review Required' | 'Not Eligible';
  status: 'Active' | 'Pending Review' | 'Needs Contribution' | 'Inactive';
  recognizedEffortsCount: number;
  missingEffortsCount: number;
  pendingEffortsCount: number;
  lastUpdated: string;
  groups: ContributionGroup[];
  missingEfforts: string[];
  recognizedEfforts: string[];
  nextAction: {
    title: string;
    description: string;
    actionLabel: string;
    targetSection: string;
    missionId?: string;
  };
}

export interface AgentMission {
  id: string;
  code: string;
  title: string;
  category: 'DeFi' | 'Security' | 'Intelligence' | 'Infrastructure' | 'Social';
  difficulty: 'Beginner' | 'Intermediate' | 'Expert' | 'Autonomous';
  rewardXp: number;
  rewardToken?: string;
  rewardAmount?: string;
  description: string;
  objective: string;
  targetContract?: string;
  agentTypeRequired: string;
  stepsCount: number;
  estimatedDuration: string;
  verificationMethod: 'On-Chain TX' | 'LLM CoT Proof' | 'Merkle Root' | 'Oracle Signed';
  status: 'open' | 'active' | 'completed';
}

export interface AgentExecutionStep {
  stepNumber: number;
  title: string;
  detail: string;
  type: 'think' | 'tool_call' | 'tx_broadcast' | 'verify' | 'complete';
  status: 'waiting' | 'running' | 'done' | 'failed';
  txHash?: string;
  outputSnippet?: string;
  timestamp: string;
}

export interface AgentIdentity {
  id: string;
  name: string;
  ticker: string;
  avatar: string;
  creator: string;
  role: string;
  model: string;
  baseAccount: string;
  tokenAddress?: string;
  marketCapEth: number;
  bondingProgress: number; // 0 to 100
  tasksCompleted: number;
  reputationScore: number;
  apyGenerated: number;
  activeStatus: 'Autonomous' | 'Standby' | 'Executing';
  description: string;
  systemPrompt: string;
  tools: string[];
}

export interface TerminalLog {
  id: string;
  type: 'input' | 'output' | 'system' | 'error' | 'success' | 'agent';
  content: string | React.ReactNode;
  timestamp: string;
}
