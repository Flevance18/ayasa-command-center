export type ProjectStatus = "Completed Tactical Report" | "In Progress" | "Live" | "Prototype";

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
    status: "Completed Tactical Report",
    category: "DeFi Intelligence / Intent Market Research",
    stage: "Research → Tactical Report",
    visibility: "Public summary / sensitive findings redacted",
    summary:
      "A tactical intelligence framework for analyzing intent-based arbitrage, solver behavior, execution routing, and DeFi opportunity risk.",
    problem:
      "DeFi arbitrage is shifting from obvious pool-level price gaps toward intent systems, solver routing, and execution quality.",
    solution:
      "Map actors, opportunity surfaces, routing risks, and tactical decision points into a reusable intelligence report format.",
    evidence: ["Tactical report completed", "Public-safe summary available", "Sensitive strategy details redacted"],
    cta: "Open Case Study",
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
