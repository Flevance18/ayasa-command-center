"use client";

import { buildLog } from "@/data/buildLog";
import { botLifecycle, meteoraDlmmBot } from "@/data/botLab";
import { caseStudies } from "@/data/caseStudies";
import { projects } from "@/data/projects";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";
import {
  Activity,
  Bot,
  BriefcaseBusiness,
  ClipboardList,
  GitBranch,
  Mail,
  Maximize2,
  Minimize2,
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
import type { ElementType, ReactNode } from "react";
import { FormEvent, useEffect, useMemo, useState } from "react";

type WindowId = "profile" | "projects" | "botLab" | "caseStudies" | "defi" | "buildLog" | "github" | "flev" | "contact";
type WindowState = "closed" | "open" | "minimized";
type WindowSize = "normal" | "maximized";

type WindowConfig = {
  id: WindowId;
  title: string;
  icon: ElementType;
  color: string;
  shadow: string;
  pos: string;
};

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

const defaultOpen: WindowId[] = ["profile", "projects", "botLab"];
const initialWindowState = windows.reduce<Record<WindowId, WindowState>>((acc, window) => {
  acc[window.id] = defaultOpen.includes(window.id) ? "open" : "closed";
  return acc;
}, {} as Record<WindowId, WindowState>);
const windowIds = windows.map((window) => window.id);
const initialWindowSize = windows.reduce<Record<WindowId, WindowSize>>((acc, window) => {
  acc[window.id] = "normal";
  return acc;
}, {} as Record<WindowId, WindowSize>);

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

function StatusChip({ children }: { children: ReactNode }) {
  return <span className="border-2 border-black bg-white px-2 py-1 font-mono text-[10px] font-black uppercase">{children}</span>;
}

function useDesktopDrag() {
  const [canDrag, setCanDrag] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setCanDrag(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return canDrag;
}

function useClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return {
    utc: now.toLocaleTimeString("en-GB", { hour12: false, timeZone: "UTC" }),
    local: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
  };
}

function WindowBody({ id }: { id: WindowId }) {
  if (id === "profile") {
    return <div className="space-y-4"><p className="text-xl font-black uppercase">Ayasa // Flevance18</p><p>Anime-neobrutalist command operator building AI agents, DeFi intelligence, bot automation, and sharp web experiences with chaotic-cute precision.</p><div className="grid grid-cols-3 gap-2 text-center font-mono text-xs"><b className="brutal-chip bg-[#ffee00]">AI</b><b className="brutal-chip bg-[#00ffff]">DEFI</b><b className="brutal-chip bg-[#ff00ff]">OS</b></div></div>;
  }
  if (id === "projects") {
    return <div className="space-y-4"><div><p className="font-black uppercase">Active project board</p><p className="font-mono text-xs font-bold text-black/70">Ayasa proof-of-work: tactical reports, DeFi bot research, and shipped interactive systems.</p></div><PublicSafeNotice />{projects.map((project, index) => <article key={project.id} className="border-4 border-black bg-white p-3 shadow-[4px_4px_0_#050606]"><div className="flex flex-wrap items-start justify-between gap-2"><span className="font-mono text-xs font-black">0{index + 1}</span><span className={clsx("border-2 border-black px-2 py-1 font-mono text-[10px] font-black uppercase", accentClass[project.accent])}>{project.status}</span></div><h3 className="mt-2 text-xl font-black uppercase leading-none">{project.title}</h3><p className="mt-1 font-mono text-[11px] font-black uppercase text-black/70">{project.category}</p><p className="mt-3 text-sm font-bold leading-tight">{project.summary}</p><div className="mt-3 flex flex-wrap gap-2"><StatusChip>{project.stage}</StatusChip><StatusChip>{project.visibility}</StatusChip></div></article>)}</div>;
  }
  if (id === "botLab") {
    return <div className="space-y-4"><div><p className="font-black uppercase">{meteoraDlmmBot.title}</p><p className="font-mono text-xs font-bold uppercase text-black/70">{meteoraDlmmBot.cadence}</p></div><PublicSafeNotice /><div className="border-4 border-black bg-white p-3 shadow-[4px_4px_0_#050606]"><p className="font-mono text-[10px] font-black uppercase">Current Phase</p><p className="text-2xl font-black uppercase text-[#bc13fe]">{meteoraDlmmBot.status}</p><p className="mt-2 text-sm font-bold leading-tight">{meteoraDlmmBot.safety}</p></div><div className="grid grid-cols-2 gap-2">{meteoraDlmmBot.metrics.map((metric) => <div key={metric.label} className="border-4 border-black bg-[#fdfaf1] p-2 shadow-[3px_3px_0_#050606]"><p className="font-mono text-[10px] font-black uppercase text-black/60">{metric.label}</p><p className="text-sm font-black uppercase leading-tight">{metric.value}</p></div>)}</div><div className="space-y-2">{botLifecycle.map((stage, index) => <div key={stage.label} className="flex items-center gap-2 font-mono text-xs font-black uppercase"><span className={clsx("grid size-7 place-items-center border-2 border-black", stage.status === "active" && "bg-[#ffee00]", stage.status === "done" && "bg-[#00ffff]", stage.status === "locked" && "bg-white opacity-70")}>{index + 1}</span><span>{stage.label}</span><span className="ml-auto text-[10px]">{stage.status}</span></div>)}</div></div>;
  }
  if (id === "caseStudies") {
    return <div className="space-y-4"><div><p className="font-black uppercase">Case studies</p><p className="font-mono text-xs font-bold text-black/70">Problem → hypothesis → method → signal → result.</p></div><PublicSafeNotice />{caseStudies.map((study) => <article key={study.id} className="border-4 border-black bg-white p-3 shadow-[4px_4px_0_#050606]"><h3 className="text-lg font-black uppercase leading-none">{study.title}</h3><p className="mt-1 font-mono text-[10px] font-black uppercase text-[#bc13fe]">{study.type} / {study.status}</p><div className="mt-3 space-y-2 text-sm leading-tight"><p><b>Context:</b> {study.context}</p><p><b>Method:</b> {study.method}</p><p><b>Result:</b> {study.result}</p><p><b>Next:</b> {study.nextStep}</p></div></article>)}</div>;
  }
  if (id === "defi") {
    const intelItems = ["Intent Arbitrage Engine: tactical report completed", "Meteora DLMM Research: hourly sampling active", "Risk Model: simulation-before-execution", "Visibility: public-safe summaries only"];
    return <div className="space-y-3"><p className="font-black uppercase">DeFi Intel Feed</p><PublicSafeNotice />{intelItems.map((item) => <div key={item} className="flex items-start gap-2 border-2 border-black bg-white p-2 font-mono text-sm font-black text-black"><RadioTower size={16} className="mt-0.5 text-[#bc13fe]" /> <span>{item}</span></div>)}</div>;
  }
  if (id === "buildLog") {
    return <div className="space-y-3"><p className="font-black uppercase">Build Log</p><p className="font-mono text-xs font-bold text-black/70">Public timeline of shipped work and active experiments.</p>{buildLog.map((entry) => <div key={`${entry.date}-${entry.project}`} className="border-4 border-black bg-white p-3 shadow-[4px_4px_0_#050606]"><div className="flex items-center justify-between gap-2"><span className="font-mono text-[10px] font-black uppercase">{entry.date}</span><span className={clsx("border-2 border-black px-2 py-1 font-mono text-[10px] font-black uppercase", entry.status === "completed" && "bg-[#00ffff]", entry.status === "active" && "bg-[#ffee00]", entry.status === "planned" && "bg-white")}>{entry.status}</span></div><p className="mt-2 font-black uppercase leading-none">{entry.project}</p><p className="mt-2 text-sm font-bold leading-tight">{entry.update}</p></div>)}</div>;
  }
  if (id === "github") {
    return <div className="space-y-3"><p className="font-bold">Live GitHub signal for <span className="font-mono">Flevance18</span>.</p><Image unoptimized width={460} height={190} className="w-full border-4 border-black bg-white" alt="Flevance18 GitHub stats" src="https://github-readme-stats-sigma-five.vercel.app/api?username=Flevance18&show_icons=true&theme=radical&hide_border=true&title_color=ff00ff&icon_color=ffee00" /><a className="neo-button inline-flex" href="https://github.com/Flevance18" target="_blank" rel="noreferrer">Open GitHub ↗</a></div>;
  }
  if (id === "flev") {
    return <div className="space-y-4"><p className="font-mono text-sm">&gt; FLEV_AGENT booted. Persona: fast, direct, research-heavy.</p><div className="halftone-yellow border-4 border-black p-4"><b>Mission:</b> convert vague ideas into shipped interfaces, intelligence dashboards, and automations.</div><button className="neo-button">Run diagnostic</button></div>;
  }
  return <div className="space-y-4"><p>Patch into Ayasa channels.</p><div className="flex flex-wrap gap-3"><a className="neo-button" href="https://github.com/Flevance18" target="_blank" rel="noreferrer">GitHub</a><a className="neo-button bg-[#00ffff]" href="https://x.com/Ayasa_18" target="_blank" rel="noreferrer">X / Twitter</a></div><p className="font-mono text-xs">No secrets stored. External links only.</p></div>;
}

export default function CommandCenter() {
  const [booted, setBooted] = useState(false);
  const [windowState, setWindowState] = useState<Record<WindowId, WindowState>>(initialWindowState);
  const [windowSize, setWindowSize] = useState<Record<WindowId, WindowSize>>(initialWindowSize);
  const [active, setActive] = useState<WindowId>("profile");
  const [terminalMinimized, setTerminalMinimized] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLog, setTerminalLog] = useState<string[]>(["> ayasa portfolio os ready", "> type `open projects` or `open botLab`"]);
  const canDrag = useDesktopDrag();
  const clock = useClock();

  const ordered = useMemo(() => windows.filter((w) => windowState[w.id] === "open"), [windowState]);
  const launch = (id: WindowId) => { setWindowState((v) => ({ ...v, [id]: "open" })); setActive(id); };
  const minimize = (id: WindowId) => setWindowState((v) => ({ ...v, [id]: "minimized" }));
  const close = (id: WindowId) => {
    setWindowState((v) => ({ ...v, [id]: "closed" }));
    setWindowSize((v) => ({ ...v, [id]: "normal" }));
  };
  const toggleMaximize = (id: WindowId) => {
    setWindowState((v) => ({ ...v, [id]: "open" }));
    setWindowSize((v) => ({ ...v, [id]: v[id] === "maximized" ? "normal" : "maximized" }));
    setActive(id);
  };
  const reset = () => {
    setWindowState(initialWindowState);
    setWindowSize(initialWindowSize);
    setTerminalMinimized(false);
    setActive("profile");
  };

  const runCommand = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const raw = terminalInput.trim();
    if (!raw) return;
    const command = raw.toLowerCase();
    const parts = command.split(/\s+/);
    const requestedWindow = windowIds.find((windowId) => windowId.toLowerCase() === parts[1]);
    let output = "";

    if (command === "help") {
      output = "commands: help, open <profile|projects|botLab|caseStudies|defi|buildLog|github|flev|contact>, close <window>, minimize <window>, maximize <window>, terminal hide, terminal show, reset, contact";
    } else if (parts[0] === "open" && requestedWindow) {
      launch(requestedWindow);
      output = `opened ${requestedWindow}`;
    } else if (parts[0] === "close" && requestedWindow) {
      close(requestedWindow);
      output = `closed ${requestedWindow}`;
    } else if (parts[0] === "minimize" && requestedWindow) {
      minimize(requestedWindow);
      output = `minimized ${requestedWindow}`;
    } else if (parts[0] === "maximize" && requestedWindow) {
      if (windowState[requestedWindow] !== "open") launch(requestedWindow);
      setWindowSize((v) => ({ ...v, [requestedWindow]: "maximized" }));
      output = `maximized ${requestedWindow}`;
    } else if (command === "terminal hide") {
      setTerminalMinimized(true);
      output = "terminal minimized to dock icon";
    } else if (command === "terminal show") {
      setTerminalMinimized(false);
      output = "terminal restored";
    } else if (command === "reset") {
      reset();
      output = "window layout reset";
    } else if (command === "contact") {
      launch("contact");
      output = "contact window opened";
    } else {
      output = `unknown command: ${raw}`;
    }

    setTerminalLog((log) => [...log.slice(-5), `> ${raw}`, output]);
    setTerminalInput("");
  };

  return <main className="command-shell min-h-screen overflow-hidden p-3 md:p-6">
    <AnimatePresence>{!booted && <motion.section className="fixed inset-0 z-50 grid place-items-center bg-[#fdfaf1] p-6 halftone-dark" exit={{ opacity: 0, scale: 1.05 }}><div className="max-w-3xl border-[6px] border-black bg-white p-6 text-center shadow-brutal-pink md:p-10"><Sparkles className="mx-auto mb-4" size={52}/><p className="font-mono text-sm">AYASA COMMAND CENTER // PORTFOLIO OS</p><h1 className="glitch-text my-4 text-5xl font-black uppercase md:text-8xl">Proof Deck</h1><button onClick={() => setBooted(true)} className="neo-button bg-[#ffee00] text-xl">Enter Portfolio OS</button></div></motion.section>}</AnimatePresence>
    <header className="mb-4 flex flex-col gap-3 border-[5px] border-black bg-white p-3 shadow-brutal-black md:flex-row md:items-center md:justify-between"><div><p className="font-mono text-xs">STATUS: ONLINE / UTC {clock.utc} / LOCAL {clock.local}</p><div className="flex flex-wrap items-center gap-3"><h1 className="text-3xl font-black uppercase md:text-5xl">Ayasa OS</h1><a href="https://ayasa-profile.vercel.app/" className="neo-button bg-[#ffee00] py-1 px-2 text-xs font-black uppercase border-2 border-black inline-block">← CLASSIC</a></div></div><div className="marquee border-4 border-black bg-[#ffee00] font-mono text-sm"><span>◆ LIVE TICKER ◆ PORTFOLIO OS ◆ DEFI INTEL ◆ BOT LAB ◆ CASE STUDIES ◆ BUILD LOG ◆&nbsp;</span></div></header>
    <section className="relative min-h-[70vh] md:min-h-[760px]" aria-label="Desktop command windows">
      <div className="pointer-events-none absolute inset-0 speed-lines" />
      <AnimatePresence>{ordered.map((w, index) => { const Icon = w.icon; const isMaximized = windowSize[w.id] === "maximized"; return <motion.article key={w.id} layout drag={canDrag && !isMaximized} dragMomentum={false} dragElastic={0.08} whileDrag={{ scale: 1.02 }} initial={{ opacity: 0, y: 30, rotate: -1 }} animate={{ opacity: 1, y: 0, rotate: active === w.id ? 0 : -1 }} exit={{ opacity: 0, scale: .9 }} onMouseDown={() => setActive(w.id)} className={clsx("neo-window relative mb-5 w-full", !isMaximized && "md:absolute md:w-[390px]", isMaximized && "md:fixed md:left-4 md:right-4 md:top-[136px] md:bottom-28 md:z-40", canDrag && !isMaximized && "md:cursor-grab md:active:cursor-grabbing", !isMaximized && w.pos, w.shadow, active === w.id && "z-20", active !== w.id && !isMaximized && "z-10 opacity-90")} style={{ zIndex: isMaximized ? 40 : active === w.id ? 30 : 10 + index }}><div className={clsx("flex items-center justify-between border-b-4 border-black p-2", w.color)}><div className="flex items-center gap-2 font-black"><Icon size={20}/>{w.title}</div><div className="flex gap-1"><button aria-label={isMaximized ? `Restore ${w.title}` : `Maximize ${w.title}`} onClick={() => toggleMaximize(w.id)} className="grid size-8 place-items-center border-2 border-black bg-white text-black">{isMaximized ? <Minimize2 size={16}/> : <Maximize2 size={16}/>}</button><button aria-label={`Minimize ${w.title}`} onClick={() => minimize(w.id)} className="grid size-8 place-items-center border-2 border-black bg-white text-black"><Minus size={18}/></button><button aria-label={`Close ${w.title}`} onClick={() => close(w.id)} className="grid size-8 place-items-center border-2 border-black bg-white text-black"><X size={18}/></button></div></div><div className={clsx("bg-[#fdfaf1] p-4", isMaximized && "h-[calc(100%-52px)] overflow-y-auto")}><WindowBody id={w.id}/></div></motion.article>; })}</AnimatePresence>
      {!terminalMinimized && <aside className="neo-window relative z-30 mt-4 w-full shadow-brutal-black md:absolute md:right-4 md:top-4 md:mt-0 md:w-[430px]" aria-label="Terminal command input"><div className="flex items-center justify-between gap-2 border-b-4 border-black bg-[#050606] p-2 font-black text-[#00ffff]"><div className="flex items-center gap-2"><Terminal size={20}/> TERMINAL</div><button aria-label="Minimize terminal" onClick={() => setTerminalMinimized(true)} className="grid size-8 place-items-center border-2 border-[#00ffff] bg-black text-[#00ffff]"><Minus size={18}/></button></div><div className="bg-[#050606] p-3 font-mono text-sm text-[#fdfaf1]">{terminalLog.map((line, i) => <p key={`${line}-${i}`}>{line}</p>)}<form onSubmit={runCommand} className="mt-3 flex gap-2"><label className="sr-only" htmlFor="terminal-command">Terminal command</label><input id="terminal-command" value={terminalInput} onChange={(event) => setTerminalInput(event.target.value)} className="min-w-0 flex-1 border-2 border-[#00ffff] bg-black px-2 py-1 text-[#ffee00] outline-none" placeholder="help / open projects" autoComplete="off"/><button className="border-2 border-[#ffee00] bg-[#ff00ff] px-3 py-1 font-black text-black" type="submit">RUN</button></form></div></aside>}
      {terminalMinimized && <button onClick={() => setTerminalMinimized(false)} className="fixed bottom-24 right-4 z-50 flex items-center gap-2 border-4 border-black bg-[#050606] px-3 py-2 font-mono text-xs font-black text-[#00ffff] shadow-brutal-black" aria-label="Restore terminal"><Terminal size={16}/> TERMINAL</button>}
    </section>
    <nav className="dock fixed bottom-3 left-1/2 z-40 flex max-w-[94vw] -translate-x-1/2 gap-2 overflow-x-auto border-[5px] border-black bg-white p-2 shadow-brutal-purple" aria-label="Window dock">{windows.map((w) => { const Icon = w.icon; const state = windowState[w.id]; return <button key={w.id} onClick={() => launch(w.id)} className={clsx("dock-icon", w.color, state === "open" && "ring-4 ring-[#050606]", state === "minimized" && "opacity-70 ring-4 ring-[#ff00ff]", state === "closed" && "opacity-55")} title={`${w.title} (${state})`} aria-label={`${state === "minimized" ? "Restore" : "Open"} ${w.title}`}><Icon size={22}/><span className="hidden text-xs font-black md:inline">{w.title}</span></button>; })}</nav>
    <footer className="pb-24 pt-4 text-center font-mono text-xs"><ShieldCheck className="inline" size={14}/> public-safe portfolio OS / drag desktop windows / open projects + bot lab / sensitive data redacted</footer>
  </main>;
}
