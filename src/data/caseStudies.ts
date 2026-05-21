export type CaseStudy = {
  id: string;
  title: string;
  type: string;
  status: string;
  context: string;
  hypothesis: string;
  method: string;
  signal: string;
  result: string;
  nextStep: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "intent-arbitrage-engine",
    title: "FLEV Intent Arbitrage Engine",
    type: "Chain-Agnostic Intent Intelligence Framework / Solana Pilot",
    status: "Completed Tactical Report / Public-Safe Version",
    context:
      "Fast-moving DeFi narratives often reach social channels after the alpha gap has already closed. Solana was selected as the first pilot network because of its high developer velocity, active package ecosystem, and rapid narrative cycles.",
    hypothesis:
      "Developer intent appears earlier than social hype. By monitoring GitHub activity, SDK/package movement, and official ecosystem updates on a pilot network, the framework can identify asymmetric builder windows before broader attention catches up.",
    method:
      "The engine runs targeted cluster scanners, filters noisy evidence, deduplicates signals, and scores each narrative using Explainable Scoring V2: Evidence Strength, Alpha Gap, Build Readiness, Ecosystem Backing, and Noise Risk. The current field test uses Solana as the pilot network before expanding to additional chains.",
    signal:
      "Run ID IAE-2026-05-21-0512Z · Pilot Network: Solana · Latest Intel Run 21 May 2026 · 05:12 UTC · Classification: Public-Safe Summary.",
    result:
      "Detected two high-priority Solana pilot clusters: AGENT_PAYMENT — 83/100 and INTENT — 83/100. Both were classified as Priority Build / Submit opportunities.",
    nextStep:
      "Convert the strongest public-safe Solana pilot insight into a prototype or bounty submission, then generalize the scanner for additional networks while raw evidence packs, keyword trees, and tactical operator routes remain redacted.",
  },
  {
    id: "meteora-dlmm-sampling-bot",
    title: "Meteora DLMM Sampling Bot",
    type: "Automation / Market Sampling",
    status: "In Progress",
    context:
      "Meteora DLMM automation should be built from observed behavior, not assumptions. Hourly sampling creates the foundation for risk-aware strategy validation.",
    hypothesis:
      "A disciplined sampling pipeline can reveal whether a DLMM strategy deserves simulation, paper mode, or guarded production execution.",
    method:
      "Collect hourly samples, monitor data quality, summarize safe metrics, and review before advancing lifecycle stages.",
    signal:
      "Bin movement, liquidity shape, volatility regime, fee behavior, and sampling consistency.",
    result:
      "Sampling phase is active. Production execution remains disabled until validation milestones are passed.",
    nextStep:
      "Add sanitized sample count, last update timestamp, and lifecycle status to the Bot Lab window.",
  },
];
