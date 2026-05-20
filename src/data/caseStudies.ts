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
    id: "intent-arbitrage-intelligence",
    title: "Intent Arbitrage Intelligence",
    type: "Research / Tactical DeFi Intelligence",
    status: "Completed Report",
    context:
      "Intent-based execution changes the arbitrage surface from simple pool mispricing to solver routing, fill quality, and execution risk.",
    hypothesis:
      "Mapping routing actors and opportunity surfaces can create a better tactical intelligence framework than chasing isolated price gaps.",
    method:
      "Analyze actors, routing flow, risk surfaces, and tactical decision points, then package findings into a public-safe report structure.",
    signal:
      "Solver behavior, routing quality, risk posture, and opportunity categories.",
    result:
      "A tactical report designed to guide further DeFi intelligence workflows while keeping sensitive findings redacted.",
    nextStep:
      "Convert the report into a sanitized public summary and connect it to future opportunity radar modules.",
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
