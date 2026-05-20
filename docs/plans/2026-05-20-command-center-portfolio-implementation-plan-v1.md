# Command Center Portfolio Implementation Plan v1

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Transform `ayasa-command-center.vercel.app` from an interactive MVP into Ayasa's public-safe proof-of-work portfolio OS for DeFi intelligence, bot automation, AI agent workflows, and project case studies.

**Architecture:** Keep the existing Next.js + React client-side Command Center interface, but move portfolio content into typed data modules and add dedicated windows for Projects, Bot Lab, Case Studies, DeFi Intel, and Build Log. All public DeFi/bot content must be sanitized and must not expose credentials, wallets, private RPCs, execution parameters, or unreleased alpha.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Framer Motion, lucide-react, Vercel static/production deploy.

---

## Current Codebase Context

**Main component:**
- `/root/ayasa-command-center/src/components/command-center/CommandCenter.tsx`

**Existing window IDs:**
- `profile`
- `github`
- `projects`
- `flev`
- `defi`
- `contact`

**Current limitations:**
- `PROJECTS` window uses placeholder array only.
- No `BOT LAB` window.
- No `CASE STUDIES` window.
- No `BUILD LOG` window.
- DeFi content is generic and not tied to Ayasa's actual work.
- Content is hardcoded directly inside `WindowBody`.

**Primary project content to include in v1:**
1. `FLEV Intent Arbitrage Engine` — completed tactical DeFi intelligence report.
2. `Meteora DLMM Bot Automation` — in progress, hourly sampling phase.

---

## Public-Safe Content Policy

All displayed content must follow this policy.

### Allowed

- Project names.
- High-level objectives.
- Public-safe summaries.
- Sanitized architecture descriptions.
- Project stage/status.
- Aggregated or placeholder metrics.
- Public links.
- Redacted/private labels.
- Non-sensitive methodology.

### Forbidden

Do **not** display or commit:

- Private keys.
- Seed phrases.
- API tokens.
- Vercel tokens.
- Private RPC URLs.
- Wallets that should remain private.
- Exact trading/execution triggers.
- Exact Meteora DLMM strategy parameters.
- Raw alpha or unreleased edge.
- Raw hourly samples if they reveal strategy logic.

### Required UI label

Add a visible disclaimer in DeFi/Bot/Case Study areas:

```text
PUBLIC-SAFE VIEW — sensitive strategy parameters, wallets, keys, and private execution logic are redacted.
```

---

## Target Window Structure

Final v1 dock/windows should include:

```text
PROFILE
PROJECTS
BOT LAB
CASE STUDIES
DEFI INTEL
BUILD LOG
GITHUB
FLEV AGENT
CONTACT
```

Recommended default open windows:

```ts
const defaultOpen: WindowId[] = ["profile", "projects", "botLab"];
```

Rationale:
- First-time visitors immediately see who Ayasa is.
- They see real project cards.
- They see active bot development progress.

---

## Task 1: Create typed portfolio data modules

**Objective:** Move public portfolio content out of `CommandCenter.tsx` into reusable typed data files.

**Files:**
- Create: `/root/ayasa-command-center/src/data/projects.ts`
- Create: `/root/ayasa-command-center/src/data/caseStudies.ts`
- Create: `/root/ayasa-command-center/src/data/botLab.ts`
- Create: `/root/ayasa-command-center/src/data/buildLog.ts`

**Implementation:**

Create `/root/ayasa-command-center/src/data/projects.ts`:

```ts
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
```

Create `/root/ayasa-command-center/src/data/caseStudies.ts`:

```ts
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
```

Create `/root/ayasa-command-center/src/data/botLab.ts`:

```ts
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
```

Create `/root/ayasa-command-center/src/data/buildLog.ts`:

```ts
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
```

**Verification:**

Run:

```bash
cd /root/ayasa-command-center
npm run lint
npm run build
```

Expected:

```text
lint passes
production build succeeds
```

---

## Task 2: Expand WindowId and window configuration

**Objective:** Add `botLab`, `caseStudies`, and `buildLog` windows to the OS dock.

**File:**
- Modify: `/root/ayasa-command-center/src/components/command-center/CommandCenter.tsx`

**Implementation guidance:**

Update imports from `lucide-react` to include suitable icons:

```ts
import {
  Activity,
  Bot,
  BriefcaseBusiness,
  ClipboardList,
  GitBranch,
  Mail,
  Minus,
  RadioTower,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Terminal,
  TrendingUp,
  UserRound,
  X,
} from "lucide-react";
```

Update `WindowId`:

```ts
type WindowId =
  | "profile"
  | "projects"
  | "botLab"
  | "caseStudies"
  | "defi"
  | "buildLog"
  | "github"
  | "flev"
  | "contact";
```

Update `windows` array order:

```ts
const windows: WindowConfig[] = [
  { id: "profile", title: "PROFILE", icon: UserRound, color: "bg-[#ffee00]", shadow: "shadow-brutal-pink", pos: "md:left-[4%] md:top-[14%]" },
  { id: "projects", title: "PROJECTS", icon: BriefcaseBusiness, color: "bg-[#ff00ff]", shadow: "shadow-brutal-cyan", pos: "md:left-[30%] md:top-[10%]" },
  { id: "botLab", title: "BOT LAB", icon: Activity, color: "bg-[#00ffff]", shadow: "shadow-brutal-purple", pos: "md:left-[58%] md:top-[16%]" },
  { id: "caseStudies", title: "CASE STUDIES", icon: ScrollText, color: "bg-white", shadow: "shadow-brutal-yellow", pos: "md:left-[10%] md:top-[54%]" },
  { id: "defi", title: "DEFI INTEL", icon: TrendingUp, color: "bg-[#050606] text-[#fdfaf1]", shadow: "shadow-brutal-pink", pos: "md:left-[44%] md:top-[50%]" },
  { id: "buildLog", title: "BUILD LOG", icon: ClipboardList, color: "bg-[#ffee00]", shadow: "shadow-brutal-black", pos: "md:left-[66%] md:top-[52%]" },
  { id: "github", title: "GITHUB", icon: GitBranch, color: "bg-[#00ffff]", shadow: "shadow-brutal-purple", pos: "md:left-[38%] md:top-[12%]" },
  { id: "flev", title: "FLEV AGENT", icon: Bot, color: "bg-[#bc13fe]", shadow: "shadow-brutal-yellow", pos: "md:left-[58%] md:top-[42%]" },
  { id: "contact", title: "CONTACT", icon: Mail, color: "bg-white", shadow: "shadow-brutal-black", pos: "md:left-[37%] md:top-[55%]" },
];
```

Update default open:

```ts
const defaultOpen: WindowId[] = ["profile", "projects", "botLab"];
```

**Verification:**

Run:

```bash
npm run lint
npm run build
```

Expected:

```text
No type errors for new window IDs.
Dock shows new windows after boot.
```

---

## Task 3: Add shared UI helpers inside CommandCenter.tsx or components

**Objective:** Avoid repeated styling and keep the main `WindowBody` readable.

**File:**
- Modify: `/root/ayasa-command-center/src/components/command-center/CommandCenter.tsx`

**Implementation guidance:**

Add helper constants/functions above `WindowBody`:

```ts
const accentClass: Record<string, string> = {
  yellow: "bg-[#ffee00]",
  cyan: "bg-[#00ffff]",
  pink: "bg-[#ff00ff] text-white",
  purple: "bg-[#bc13fe] text-white",
  black: "bg-[#050606] text-[#fdfaf1]",
};

function PublicSafeNotice() {
  return (
    <div className="border-4 border-black bg-[#ffee00] p-3 font-mono text-[11px] font-black uppercase shadow-[4px_4px_0_#050606]">
      PUBLIC-SAFE VIEW — sensitive strategy parameters, wallets, keys, and private execution logic are redacted.
    </div>
  );
}
```

Optional helper for status chips:

```ts
function StatusChip({ children }: { children: React.ReactNode }) {
  return <span className="border-2 border-black bg-white px-2 py-1 font-mono text-[10px] font-black uppercase">{children}</span>;
}
```

**Verification:**

Run:

```bash
npm run lint
npm run build
```

Expected:

```text
Helpers compile and do not change behavior yet.
```

---

## Task 4: Implement Projects window v1

**Objective:** Replace placeholder project board with real project cards.

**Files:**
- Modify: `/root/ayasa-command-center/src/components/command-center/CommandCenter.tsx`
- Uses: `/root/ayasa-command-center/src/data/projects.ts`

**Implementation guidance:**

Import projects:

```ts
import { projects } from "@/data/projects";
```

Replace existing `if (id === "projects")` branch with:

```tsx
if (id === "projects") {
  return (
    <div className="space-y-4">
      <div>
        <p className="font-black uppercase">Active project board</p>
        <p className="font-mono text-xs font-bold text-black/70">
          Ayasa proof-of-work: tactical reports, DeFi bot research, and shipped interactive systems.
        </p>
      </div>
      <PublicSafeNotice />
      {projects.map((project, index) => (
        <article key={project.id} className="border-4 border-black bg-white p-3 shadow-[4px_4px_0_#050606]">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <span className="font-mono text-xs font-black">0{index + 1}</span>
            <span className={clsx("border-2 border-black px-2 py-1 font-mono text-[10px] font-black uppercase", accentClass[project.accent])}>
              {project.status}
            </span>
          </div>
          <h3 className="mt-2 text-xl font-black uppercase leading-none">{project.title}</h3>
          <p className="mt-1 font-mono text-[11px] font-black uppercase text-black/70">{project.category}</p>
          <p className="mt-3 text-sm font-bold leading-tight">{project.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <StatusChip>{project.stage}</StatusChip>
            <StatusChip>{project.visibility}</StatusChip>
          </div>
        </article>
      ))}
    </div>
  );
}
```

**Verification:**

Run:

```bash
npm run lint
npm run build
```

Then launch local preview and verify:

```bash
npm run dev
```

Expected:

```text
PROJECTS window displays FLEV Intent Arbitrage Engine and Meteora DLMM Bot Automation.
No sensitive data displayed.
```

---

## Task 5: Implement Bot Lab window v1

**Objective:** Add a dedicated `BOT LAB` window showing Meteora DLMM lifecycle and sanitized sampling state.

**Files:**
- Modify: `/root/ayasa-command-center/src/components/command-center/CommandCenter.tsx`
- Uses: `/root/ayasa-command-center/src/data/botLab.ts`

**Implementation guidance:**

Import bot data:

```ts
import { botLifecycle, meteoraDlmmBot } from "@/data/botLab";
```

Add branch:

```tsx
if (id === "botLab") {
  return (
    <div className="space-y-4">
      <div>
        <p className="font-black uppercase">{meteoraDlmmBot.title}</p>
        <p className="font-mono text-xs font-bold uppercase text-black/70">{meteoraDlmmBot.cadence}</p>
      </div>
      <PublicSafeNotice />
      <div className="border-4 border-black bg-white p-3 shadow-[4px_4px_0_#050606]">
        <p className="font-mono text-[10px] font-black uppercase">Current Phase</p>
        <p className="text-2xl font-black uppercase text-[#bc13fe]">{meteoraDlmmBot.status}</p>
        <p className="mt-2 text-sm font-bold leading-tight">{meteoraDlmmBot.safety}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {meteoraDlmmBot.metrics.map((metric) => (
          <div key={metric.label} className="border-4 border-black bg-[#fdfaf1] p-2 shadow-[3px_3px_0_#050606]">
            <p className="font-mono text-[10px] font-black uppercase text-black/60">{metric.label}</p>
            <p className="text-sm font-black uppercase leading-tight">{metric.value}</p>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {botLifecycle.map((stage, index) => (
          <div key={stage.label} className="flex items-center gap-2 font-mono text-xs font-black uppercase">
            <span className={clsx(
              "grid size-7 place-items-center border-2 border-black",
              stage.status === "active" && "bg-[#ffee00]",
              stage.status === "done" && "bg-[#00ffff]",
              stage.status === "locked" && "bg-white opacity-70"
            )}>{index + 1}</span>
            <span>{stage.label}</span>
            <span className="ml-auto text-[10px]">{stage.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Verification:**

Expected:

```text
BOT LAB window displays sampling stage, lifecycle pipeline, and sanitized metrics only.
```

---

## Task 6: Implement Case Studies window v1

**Objective:** Show how Ayasa thinks, not just what Ayasa built.

**Files:**
- Modify: `/root/ayasa-command-center/src/components/command-center/CommandCenter.tsx`
- Uses: `/root/ayasa-command-center/src/data/caseStudies.ts`

**Implementation guidance:**

Import:

```ts
import { caseStudies } from "@/data/caseStudies";
```

Add branch:

```tsx
if (id === "caseStudies") {
  return (
    <div className="space-y-4">
      <div>
        <p className="font-black uppercase">Case studies</p>
        <p className="font-mono text-xs font-bold text-black/70">
          Problem → hypothesis → method → signal → result.
        </p>
      </div>
      <PublicSafeNotice />
      {caseStudies.map((study) => (
        <article key={study.id} className="border-4 border-black bg-white p-3 shadow-[4px_4px_0_#050606]">
          <h3 className="text-lg font-black uppercase leading-none">{study.title}</h3>
          <p className="mt-1 font-mono text-[10px] font-black uppercase text-[#bc13fe]">{study.type} / {study.status}</p>
          <div className="mt-3 space-y-2 text-sm leading-tight">
            <p><b>Context:</b> {study.context}</p>
            <p><b>Method:</b> {study.method}</p>
            <p><b>Result:</b> {study.result}</p>
            <p><b>Next:</b> {study.nextStep}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
```

**Verification:**

Expected:

```text
CASE STUDIES window displays both case studies with public-safe copy.
```

---

## Task 7: Upgrade DeFi Intel window

**Objective:** Replace generic DeFi feed with specific intelligence categories tied to Ayasa's work.

**File:**
- Modify: `/root/ayasa-command-center/src/components/command-center/CommandCenter.tsx`

**Implementation guidance:**

Replace existing `defi` branch with:

```tsx
if (id === "defi") {
  const intelItems = [
    "Intent Arbitrage Engine: tactical report completed",
    "Meteora DLMM Research: hourly sampling active",
    "Risk Model: simulation-before-execution",
    "Visibility: public-safe summaries only",
  ];

  return (
    <div className="space-y-3">
      <p className="font-black uppercase">DeFi Intel Feed</p>
      <PublicSafeNotice />
      {intelItems.map((item) => (
        <div key={item} className="flex items-start gap-2 border-2 border-black bg-white p-2 font-mono text-sm font-black text-black">
          <RadioTower size={16} className="mt-0.5 text-[#bc13fe]" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}
```

**Verification:**

Expected:

```text
DEFI INTEL references real projects and includes public-safe notice.
```

---

## Task 8: Implement Build Log window v1

**Objective:** Show portfolio momentum and active progress.

**Files:**
- Modify: `/root/ayasa-command-center/src/components/command-center/CommandCenter.tsx`
- Uses: `/root/ayasa-command-center/src/data/buildLog.ts`

**Implementation guidance:**

Import:

```ts
import { buildLog } from "@/data/buildLog";
```

Add branch:

```tsx
if (id === "buildLog") {
  return (
    <div className="space-y-3">
      <p className="font-black uppercase">Build Log</p>
      <p className="font-mono text-xs font-bold text-black/70">Public timeline of shipped work and active experiments.</p>
      {buildLog.map((entry) => (
        <div key={`${entry.date}-${entry.project}`} className="border-4 border-black bg-white p-3 shadow-[4px_4px_0_#050606]">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] font-black uppercase">{entry.date}</span>
            <span className={clsx(
              "border-2 border-black px-2 py-1 font-mono text-[10px] font-black uppercase",
              entry.status === "completed" && "bg-[#00ffff]",
              entry.status === "active" && "bg-[#ffee00]",
              entry.status === "planned" && "bg-white"
            )}>{entry.status}</span>
          </div>
          <p className="mt-2 font-black uppercase leading-none">{entry.project}</p>
          <p className="mt-2 text-sm font-bold leading-tight">{entry.update}</p>
        </div>
      ))}
    </div>
  );
}
```

**Verification:**

Expected:

```text
BUILD LOG window appears in dock and displays timeline entries.
```

---

## Task 9: Update terminal commands and boot copy

**Objective:** Make terminal and boot screen reflect the new portfolio OS.

**File:**
- Modify: `/root/ayasa-command-center/src/components/command-center/CommandCenter.tsx`

**Implementation guidance:**

Update help command output:

```ts
output = "commands: help, open <profile|projects|botLab|caseStudies|defi|buildLog|github|flev|contact>, close <window>, minimize <window>, reset, contact";
```

Update terminal initial log:

```ts
const [terminalLog, setTerminalLog] = useState<string[]>([
  "> ayasa portfolio os ready",
  "> type `open projects` or `open botLab`",
]);
```

Update boot screen copy:

```tsx
<p className="font-mono text-sm">AYASA COMMAND CENTER // PORTFOLIO OS</p>
<h1 className="glitch-text my-4 text-5xl font-black uppercase md:text-8xl">Proof Deck</h1>
<button onClick={() => setBooted(true)} className="neo-button bg-[#ffee00] text-xl">Enter Portfolio OS</button>
```

Update footer:

```tsx
<footer className="pb-24 pt-4 text-center font-mono text-xs">
  <ShieldCheck className="inline" size={14}/> public-safe portfolio OS / drag desktop windows / open projects + bot lab / sensitive data redacted
</footer>
```

**Verification:**

Expected:

```text
Terminal opens new windows by command.
Boot screen communicates portfolio purpose.
```

---

## Task 10: Accessibility and responsive QA

**Objective:** Ensure the new windows remain usable on desktop and mobile.

**Files:**
- Modify only if needed: `/root/ayasa-command-center/src/components/command-center/CommandCenter.tsx`
- Modify only if needed: `/root/ayasa-command-center/src/app/globals.css`

**Checks:**

Run local server:

```bash
cd /root/ayasa-command-center
npm run dev
```

Verify with browser:

```text
Desktop:
- Boot screen readable.
- Default windows do not hide the terminal completely.
- Dock contains all windows and scrolls horizontally if needed.
- PROJECTS, BOT LAB, CASE STUDIES, BUILD LOG can open.
- Terminal command `open botLab` works.

Mobile:
- Windows stack vertically.
- Dock is horizontally scrollable.
- Project cards do not overflow.
- CTA text remains readable.
```

**Accessibility:**

- Buttons must have visible text or `aria-label`.
- Links opening new tabs use `rel="noreferrer"`.
- No tiny unreadable text for critical content.
- Color-only status must also include text labels.

---

## Task 11: Security scan before commit

**Objective:** Confirm no credentials or sensitive parameters were introduced.

**Command:**

```bash
cd /root/ayasa-command-center
python3 - <<'PY'
import os,re
root='.'
exclude={'.git','node_modules','.next','.vercel'}
patterns=[
  re.compile(r'-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----'),
  re.compile(r'(?i)(api[_-]?key|secret|password|token)\s*[:=]\s*["\']?[A-Za-z0-9_\-]{20,}'),
  re.compile(r'vcp_[A-Za-z0-9]{20,}'),
]
findings=[]
for dp,dn,fn in os.walk(root):
    dn[:]=[d for d in dn if d not in exclude]
    for f in fn:
        p=os.path.join(dp,f)
        if os.path.getsize(p)>2_000_000: continue
        try:
            s=open(p,'r',encoding='utf-8',errors='ignore').read()
        except Exception:
            continue
        for pat in patterns:
            if pat.search(s):
                findings.append(p)
                break
print('SECRET_SCAN_COUNT:', len(findings))
for item in sorted(set(findings))[:20]: print(item)
PY
```

Expected:

```text
SECRET_SCAN_COUNT: 0
```

---

## Task 12: Build, preview, and production deployment

**Objective:** Verify and deploy only after local checks pass.

**Commands:**

```bash
cd /root/ayasa-command-center
npm run lint
npm run build
```

Expected:

```text
lint passes
build succeeds
```

**Git protocol:**

Before commit/push, show Ayasa:

```bash
git diff --stat
git status --short
```

Only commit/push after explicit approval.

Suggested commit message:

```bash
git commit -m "feat: transform Command Center into public portfolio OS"
```

Deploy after push using Vercel integration or CLI if approved/available.

---

## Acceptance Criteria

v1 is complete when:

- `PROJECTS` window shows both real projects.
- `BOT LAB` window shows Meteora DLMM as sampling/in-progress.
- `CASE STUDIES` window shows both public-safe case studies.
- `DEFI INTEL` references actual Ayasa intelligence work.
- `BUILD LOG` shows shipped/current progress.
- Terminal help includes new windows.
- `open projects`, `open botLab`, `open caseStudies`, `open defi`, `open buildLog` work.
- Public-safe disclaimer is visible anywhere DeFi/bot strategy is discussed.
- No secrets detected.
- `npm run lint` passes.
- `npm run build` passes.
- Production URL renders without broken major UI.

---

## Recommended Execution Order

```text
1. Task 1 — Data modules
2. Task 2 — Window IDs/config
3. Task 3 — UI helpers
4. Task 4 — Projects window
5. Task 5 — Bot Lab window
6. Task 6 — Case Studies window
7. Task 7 — DeFi Intel upgrade
8. Task 8 — Build Log window
9. Task 9 — Terminal/boot copy
10. Task 10 — Responsive QA
11. Task 11 — Security scan
12. Task 12 — Build/deploy protocol
```

---

## Notes for Future v2

Do not include in v1 unless explicitly approved:

- Live hourly sampling API.
- Wallet-connected dashboards.
- Private execution status.
- Real trading parameters.
- Auth system.
- Database.

Possible v2 ideas:

```text
- Static sanitized JSON export from sampling logs.
- Public chart screenshots.
- Report viewer for Intent Arbitrage summary.
- Project detail modal/drawer.
- GitHub repo pin cards.
- Mobile-first dock redesign.
```
