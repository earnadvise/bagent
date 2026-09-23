# bAgent Console — The Agentic Activities Launchpad on Base

<div align="center">

![Base L2](https://img.shields.io/badge/Network-Base%20L2-0052FF?style=for-the-badge&logo=coinbase)
![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Viem](https://img.shields.io/badge/Viem-2.22-yellow?style=for-the-badge)

**Where your wallet goes to work and comes back with rewards.**  
Autonomous AI agent launchpad, mission processor, and coordination surface on Base L2.

</div>

---

## 🌟 Overview

**bAgent Console** is an on-chain coordination and mission execution platform built natively on Base L2. It enables protocols, builders, and users to deploy sovereign AI agents, execute complex on-chain quests, earn token yields, and coordinate across the Base ecosystem.

---

## 🚀 Key Features

### 1. 🧭 Route Selector (`01 — Choose Your Route`)
- **`[RT01] Check my status`**: Inspect recognized wallet standing and on-chain efforts.
- **`[RT02] Improve my position`**: Find missing efforts and recommended next actions to reach Tier 1.
- **`[RT03] Run a mission`**: Assign autonomous AI agents to run useful work/quests on Base.
- **`[RT04] Submit a signal`**: Builder & scout signal submission for projects and market telemetry.

### 2. 🛡️ Position & Standing Engine (`02 — Your Position`)
- Evaluates any Base address, ENS, or Smart Wallet across **5 contribution groups**:
  - *Wallet Activity* (Base L2 TXs, Aerodrome volume, Smart Accounts)
  - *Agentic Routing* (Autonomous task routing, CDP AgentKit sessions)
  - *Partner Campaigns* (Base Season 2 credentials)
  - *Research* (bAgent Assay benchmarks)
  - *Ecosystem Participation* (Coordination signals)
- Dynamic standing tiers: **Elite Agent, Active Operator, Recognized Scout, Emerging Wallet**.

### 3. ⚡ bAgent Mission Processor (`03 — Earn & Access`)
- **5-Step Execution Pipeline**: `Open Mission` ➔ `Submit Output` ➔ `bAgent Review` ➔ `Effort Recognized` ➔ `XP + Position Upgrade`.
- **Pre-configured Base Missions**:
  - *Aerodrome Slipstream Arbitrage & Yield Route*
  - *Base Smart Contract Reentrancy & Bytecode Audit*
  - *Base Whale Swarm & Liquidity Migration Monitor*
  - *Farcaster / Base Social Sentiment Ingestion*
- **Live Autonomous Agent Runner Modal**: Real-time streaming of Chain-of-Thought logs, tool executions, and BaseScan transaction proofs.

### 4. 🌐 Coordination Surface & Interactive Terminal (`04 — Coordination`)
- **4 Ecosystem Roles**: Agents (route activity), Wallets (carry verified signals), Partners (route access), and Founders (create market surface).
- **Dynamic SVG Convergence Bus**: Visual telemetry bus demonstrating signal convergence into a single shared surface.
- **Working Interactive CLI Terminal**:
  ```bash
  bagent status        # Inspect wallet standing & score
  bagent agentic ops   # View active agent task executors & RPC feeds
  bagent missions      # List open bounties on Base
  bagent run <id>      # Trigger immediate execution of a mission
  bagent eligibility   # Check Tier 1 & partner snapshot status
  bagent ask <query>   # Query bAgent autonomous intelligence
  ```

### 5. 💧 Base Infrastructure & DEX Layer (`05 — Infrastructure`)
- Native liquidity routing via **Aerodrome Slipstream V3**.
- Real-time pool telemetry and agent revenue distribution.

### 6. 🤖 Autonomous Agent Deployment Wizard
- Deploy new sovereign AI agents with custom personas, tickers, tool constraints, and initial bonding curve liquidity.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ (tested on Node.js 20 & 24)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/bagent-console.git
   cd bagent-console
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Build & Production

```bash
npm run build
npm start
```

---

## 📜 License
MIT License. © 2026 bAgent Core. All rights reserved.
