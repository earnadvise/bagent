import { createPublicClient, http } from 'viem';
import { base, baseSepolia } from 'viem/chains';

export const BASE_BUILDER_CONFIG = {
  builderCode: 'bc_jr1lqf3i',
  encodedAttributionHex: '0x62635f6a72316c716633690b0080218021802180218021802180218021' as `0x${string}`,
};

/**
 * Appends the Base ERC-8021 builder attribution suffix to any transaction calldata
 */
export function appendBuilderAttribution(calldata: `0x${string}` = '0x'): `0x${string}` {
  const suffix = BASE_BUILDER_CONFIG.encodedAttributionHex.replace(/^0x/, '');
  const baseCalldata = calldata.replace(/^0x/, '');
  return `0x${baseCalldata}${suffix}` as `0x${string}`;
}

export const BASE_CHAIN_CONFIG = {
  mainnet: {
    id: 8453,
    name: 'Base Mainnet',
    rpcUrl: 'https://mainnet.base.org',
    blockExplorer: 'https://basescan.org',
    factoryAddress: '0x33A243F6F6dD33968252277d33d997230b40742e',
    escrowAddress: '0x88e7D59A65D884dC0aCe600c92149b5B0594BFE6',
    aerodromeRouter: '0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43',
    wethAddress: '0x4200000000000000000000000000000000000006',
    usdcAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  },
  sepolia: {
    id: 84532,
    name: 'Base Sepolia Testnet',
    rpcUrl: 'https://sepolia.base.org',
    blockExplorer: 'https://sepolia.basescan.org',
    factoryAddress: '0x12B890a827C709424c568D2e37937A7eA6487E12',
    escrowAddress: '0x44D12053f47c3E1D4b50c18d35f6d7B466dD4F7a',
    aerodromeRouter: '0x5c69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    wethAddress: '0x4200000000000000000000000000000000000006',
    usdcAddress: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
  },
};

export const publicBaseClient = createPublicClient({
  chain: base,
  transport: http(),
});

export const AGENT_FACTORY_ABI = [
  {
    name: 'createAgent',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: 'name', type: 'string' },
      { name: 'symbol', type: 'string' },
      { name: 'systemPromptHash', type: 'bytes32' },
      { name: 'initialLiquidity', type: 'uint256' },
    ],
    outputs: [
      { name: 'agentToken', type: 'address' },
      { name: 'agentSmartAccount', type: 'address' },
    ],
  },
  {
    name: 'getAgentDetails',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'agentId', type: 'uint256' }],
    outputs: [
      { name: 'owner', type: 'address' },
      { name: 'tokenAddress', type: 'address' },
      { name: 'smartAccount', type: 'address' },
      { name: 'bondingProgress', type: 'uint256' },
      { name: 'tasksCompleted', type: 'uint256' },
    ],
  },
] as const;

export const TASK_ESCROW_ABI = [
  {
    name: 'createTaskBounty',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: 'title', type: 'string' },
      { name: 'rewardToken', type: 'address' },
      { name: 'rewardAmount', type: 'uint256' },
      { name: 'verificationKey', type: 'bytes32' },
    ],
    outputs: [{ name: 'taskId', type: 'uint256' }],
  },
  {
    name: 'claimAndExecute',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'taskId', type: 'uint256' },
      { name: 'proofData', type: 'bytes' },
    ],
    outputs: [{ name: 'success', type: 'bool' }],
  },
] as const;
