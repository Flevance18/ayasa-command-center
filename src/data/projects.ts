export type ProjectStatus = "Completed Tactical Report" | "In Progress" | "Live" | "Prototype" | "Shipped Intelligence Engine";

export type Project = {
  id: string;
  title: string;
  status: ProjectStatus;
  category: string;
  stage: string;
  visibility: string;
  summary: string;
  problem: string;
  solution: string;
  evidence: string[];
  cta: string;
  accent: "yellow" | "cyan" | "pink" | "purple" | "black";
};

export const projects: Project[] = [
  {
    id: "flev-intent-arbitrage-engine",
    title: "FLEV Intent Arbitrage Engine",
    status: "Shipped Intelligence Engine",
    category: "Multi-Chain DeFi Intelligence / Solana Pilot",
    stage: "Explainable Scoring V2 / Solana Pilot Run",
    visibility: "Public summary / raw evidence redacted",
    summary:
      "Chain-agnostic intelligence framework for detecting developer intent before social hype. The first field test runs on Solana, tracking ecosystem GitHub momentum, official updates, package activity, and noise-adjusted build readiness.",
    problem:
      "Fast-moving DeFi narratives often reach social channels after the alpha gap has already closed. Solana was selected as the first pilot network because of its high developer velocity, active package ecosystem, and rapid narrative cycles.",
    solution:
      "Run targeted cluster scanners on a pilot network, filter noisy evidence, deduplicate signals, and score each narrative using transparent multi-factor methodology before expanding to additional chains.",
    evidence: ["Run ID: IAE-2026-05-21-0512Z", "Pilot network: Solana", "Latest intel run: 21 May 2026 · 05:12 UTC", "Sensitive operator routes redacted"],
    cta: "Open DeFi Intel",
    accent: "purple",
  },
  {
    id: "meteora-dlmm-bot",
    title: "Meteora DLMM Bot Automation",
    status: "In Progress",
    category: "DeFi Bot Automation / Liquidity Research",
    stage: "Hourly Sampling",
    visibility: "Aggregated metrics only / execution logic redacted",
    summary:
      "An automation system under development for observing DLMM market behavior through hourly sample collection before simulation and guarded execution.",
    problem:
      "DLMM positions require continuous observation of bin behavior, volatility, liquidity distribution, and fee opportunity before automation can be trusted.",
    solution:
      "Collect hourly market/bin samples, review data quality, then progress through backtest, simulation, paper mode, and guarded execution.",
    evidence: ["Hourly sampling in progress", "Simulation-before-execution safety model", "Private strategy parameters redacted"],
    cta: "Open Bot Lab",
    accent: "cyan",
  },
];
