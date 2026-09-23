'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, Activity } from 'lucide-react';

interface NavItem {
  id: string;
  num: string;
  title: string;
  sub: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'b01', num: '01', title: 'Choose your route', sub: '4 routes · radio' },
  { id: 'b02', num: '02', title: 'Your Position', sub: 'STANDING · EFFORTS · ACTION' },
  { id: 'b04', num: '03', title: 'Earn & Access', sub: 'Mission pipeline · access' },
  { id: 'b06', num: '04', title: 'Coordination', sub: 'Coordination · four roles' },
  { id: 'b07', num: '05', title: 'Infrastructure', sub: 'DEX · public layer' },
];

export const SidebarNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('b01');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut listener Ctrl+1 to Ctrl+5
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
        const keyNum = parseInt(e.key, 10);
        if (keyNum >= 1 && keyNum <= 5) {
          e.preventDefault();
          const target = NAV_ITEMS[keyNum - 1];
          if (target) {
            const el = document.getElementById(target.id);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
              setActiveSection(target.id);
            }
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <aside className="hidden lg:block w-72 shrink-0 pr-6 sticky top-20 self-start">
      <div className="border-b border-[#1A1E29] pb-3 mb-4 flex items-center justify-between">
        <h2 className="text-[11px] font-mono font-bold tracking-widest text-[#8A94A6] uppercase">
          Index
        </h2>
        <span className="text-[10px] font-mono text-[#00E5FF] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-ping" />
          EPOCH #142
        </span>
      </div>

      <nav className="space-y-1.5 font-mono">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-sm border transition-all flex items-center justify-between group ${
                isActive
                  ? 'bg-[#0052FF]/10 border-[#0052FF] text-white shadow-sm shadow-[#0052FF]/20'
                  : 'bg-[#0B0D12] border-[#141824] text-[#8A94A6] hover:border-[#1E2433] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-bold ${
                    isActive ? 'text-[#00E5FF]' : 'text-[#4B5568] group-hover:text-[#8A94A6]'
                  }`}
                >
                  {item.num}
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white tracking-tight">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-[#64748B] uppercase tracking-wider">
                    {item.sub}
                  </span>
                </div>
              </div>
              <ArrowRight
                className={`w-3.5 h-3.5 transition-transform ${
                  isActive
                    ? 'text-[#0052FF] translate-x-0.5'
                    : 'text-[#2D3748] group-hover:text-[#8A94A6] group-hover:translate-x-0.5'
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Footer Meta / Shortcuts */}
      <div className="mt-8 pt-4 border-t border-[#1A1E29] space-y-2 text-[11px] font-mono text-[#64748B]">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[#00FF9D]">
            <span className="w-2 h-2 rounded-full bg-[#00FF9D]" />
            Session live
          </span>
          <span className="text-[10px] text-[#4B5568]">Base Mainnet</span>
        </div>
        <div className="flex items-center justify-between text-[#8A94A6] text-[10px]">
          <span>Jump shortcut</span>
          <div className="flex gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-[#13161F] border border-[#1E2330] text-[10px] text-white">
              Ctrl+1
            </kbd>
            <span>–</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#13161F] border border-[#1E2330] text-[10px] text-white">
              Ctrl+5
            </kbd>
          </div>
        </div>
      </div>
    </aside>
  );
};
