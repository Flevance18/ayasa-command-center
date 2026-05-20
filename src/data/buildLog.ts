export type BuildLogEntry = {
  date: string;
  project: string;
  update: string;
  status: "completed" | "active" | "planned";
};

export const buildLog: BuildLogEntry[] = [
  {
    date: "2026-05",
    project: "Command Center OS",
    update: "Standalone interactive portfolio OS deployed to production.",
    status: "completed",
  },
  {
    date: "2026-05",
    project: "Classic Profile Gateway",
    update: "Portal launcher and boot prompt added to route visitors into Command Center.",
    status: "completed",
  },
  {
    date: "2026-05",
    project: "FLEV Intent Arbitrage Engine",
    update: "Tactical DeFi intelligence report completed; public-safe summary planned.",
    status: "completed",
  },
  {
    date: "2026-05",
    project: "Meteora DLMM Bot Automation",
    update: "Hourly sample collection phase in progress.",
    status: "active",
  },
];
