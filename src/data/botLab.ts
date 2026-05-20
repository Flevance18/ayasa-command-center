export type BotLifecycleStage = {
  label: string;
  status: "done" | "active" | "locked";
};

export const meteoraDlmmBot = {
  title: "Meteora DLMM Bot Automation",
  status: "Sampling",
  mode: "Research-first / execution disabled",
  cadence: "Hourly sample collection",
  safety:
    "Simulation-before-execution. Sensitive strategy parameters, wallets, private RPCs, and execution triggers are redacted.",
  metrics: [
    { label: "Samples Collected", value: "Manual update pending" },
    { label: "Sampling Cadence", value: "1 hour" },
    { label: "Execution Mode", value: "Disabled / Research only" },
    { label: "Risk Status", value: "Guarded" },
  ],
};

export const botLifecycle: BotLifecycleStage[] = [
  { label: "Sampling", status: "active" },
  { label: "Backtest", status: "locked" },
  { label: "Simulation", status: "locked" },
  { label: "Paper Mode", status: "locked" },
  { label: "Guarded Execution", status: "locked" },
  { label: "Production", status: "locked" },
];
