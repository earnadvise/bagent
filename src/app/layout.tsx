import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'bAgent Console · Agentic Activities Launchpad on Base',
  description:
    'Where your wallet goes to work and comes back with rewards. Autonomous AI agent launchpad, mission processor, and coordination surface on Base.',
  keywords: [
    'Base',
    'bAgent',
    'AI Agents',
    'Agentic Activities',
    'Launchpad',
    'bAgent Console',
    'Aerodrome',
    'ERC-4337',
    'Coinbase CDP',
  ],
  authors: [{ name: 'bAgent Core' }],
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%230052FF"/><text x="50" y="65" font-family="monospace" font-size="45" font-weight="bold" fill="white" text-anchor="middle">b</text></svg>',
  },
  other: {
    'base:app_id': '6ab3b9e7e6f916f1836acdcd',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="base:app_id" content="6ab3b9e7e6f916f1836acdcd" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#07080B] text-[#F0F3F8] antialiased font-sans selection:bg-[#0052FF] selection:text-white relative">
        <div className="fixed inset-0 bg-scanlines z-50 pointer-events-none opacity-40" />
        <div className="fixed inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
        {children}
      </body>
    </html>
  );
}
