'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { SidebarNav } from '../components/SidebarNav';
import { HeroSection } from '../components/HeroSection';
import { RouteSelector } from '../components/RouteSelector';
import { PositionChecker } from '../components/PositionChecker';
import { MissionProcessor } from '../components/MissionProcessor';
import { CoordinationSurface } from '../components/CoordinationSurface';
import { InfrastructureSection } from '../components/InfrastructureSection';
import { Footer } from '../components/Footer';
import { AgentLaunchModal } from '../components/AgentLaunchModal';

import { RouteId, WalletStanding } from '../lib/types';
import { evaluateWalletStanding } from '../lib/scoring';
import { BASE_MISSIONS } from '../lib/missions';

export default function Home() {
  const [selectedRoute, setSelectedRoute] = useState<RouteId>('run_mission');
  const [activeWallet, setActiveWallet] = useState<string>('0x321D54b0E28292850d998F12aE04B46c19F474A3');
  const [walletInput, setWalletInput] = useState<string>('0x321D54b0E28292850d998F12aE04B46c19F474A3');
  const [standing, setStanding] = useState<WalletStanding>(() =>
    evaluateWalletStanding('0x321D54b0E28292850d998F12aE04B46c19F474A3')
  );
  const [completedMissionIds, setCompletedMissionIds] = useState<string[]>(['m-yield-01']);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  // Update standing when wallet address is evaluated
  const handleCheckPosition = () => {
    if (walletInput.trim()) {
      setActiveWallet(walletInput.trim());
      const newStanding = evaluateWalletStanding(walletInput.trim());
      setStanding(newStanding);
    }
  };

  const handleWalletSelect = (addr: string) => {
    setActiveWallet(addr);
    setWalletInput(addr);
    const newStanding = evaluateWalletStanding(addr);
    setStanding(newStanding);
  };

  const handleMissionSuccess = (missionId: string, xpEarned: number) => {
    setCompletedMissionIds((prev) => {
      if (!prev.includes(missionId)) {
        return [...prev, missionId];
      }
      return prev;
    });

    // Re-evaluate standing with increased score
    setStanding((prev) => ({
      ...prev,
      standingScore: Math.min(100, prev.standingScore + 12),
      recognizedEffortsCount: prev.recognizedEffortsCount + 1,
      missingEffortsCount: Math.max(0, prev.missingEffortsCount - 1),
      tier: prev.standingScore + 12 >= 80 ? 'Elite Agent' : 'Active Operator',
      eligibility: prev.standingScore + 12 >= 80 ? 'Eligible (Tier 1)' : 'Eligible (Tier 2)',
    }));
  };

  const handleNavigateToMissions = (missionId?: string) => {
    setSelectedRoute('run_mission');
    document.getElementById('b04')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07080B] text-[#F0F3F8]">
      {/* Topbar Header */}
      <Header
        onOpenDeployAgent={() => setIsDeployModalOpen(true)}
        activeWallet={activeWallet}
        onSelectWallet={handleWalletSelect}
      />

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="flex items-start">
          {/* Sticky Left Navigation Index */}
          <SidebarNav />

          {/* Main Content Column */}
          <div className="flex-1 min-w-0">
            <HeroSection
              onStartClick={() => {
                setSelectedRoute('run_mission');
                document.getElementById('b04')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenDeploy={() => setIsDeployModalOpen(true)}
            />

            <RouteSelector
              selectedRoute={selectedRoute}
              onSelectRoute={setSelectedRoute}
            />

            <PositionChecker
              standing={standing}
              walletInput={walletInput}
              onWalletInputChange={setWalletInput}
              onCheckPosition={handleCheckPosition}
              onNavigateToMissions={handleNavigateToMissions}
            />

            <MissionProcessor
              completedMissionIds={completedMissionIds}
              onMissionCompleted={handleMissionSuccess}
            />

            <CoordinationSurface
              standing={standing}
              onRunMission={(id) => {
                document.getElementById('b04')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <InfrastructureSection />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Deploy Custom Agent Modal */}
      {isDeployModalOpen && (
        <AgentLaunchModal
          onClose={() => setIsDeployModalOpen(false)}
          onAgentDeployed={(newAgent) => {
            // Can add to custom launched agents list
          }}
        />
      )}
    </div>
  );
}
