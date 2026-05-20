"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";
import {
  Bot,
  BriefcaseBusiness,
  GitBranch,
  Mail,
  Minus,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Terminal,
  TrendingUp,
  UserRound,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

type WindowId = "profile" | "github" | "projects" | "flev" | "defi" | "contact";
type WindowState = "closed" | "open" | "minimized";

type WindowConfig = {
  id: WindowId;
  title: string;
  icon: React.ElementType;
  color: string;
  shadow: string;
  pos: string;
};

const windows: WindowConfig[] = [
  { id: "profile", title: "PROFILE", icon: UserRound, color: "bg-[#ffee00]", shadow: "shadow-brutal-pink", pos: "md:left-[5%] md:top-[18%]" },
  { id: "github", title: "GITHUB", icon: GitBranch, color: "bg-[#00ffff]", shadow: "shadow-brutal-purple", pos: "md:left-[38%] md:top-[12%]" },
  { id: "projects", title: "PROJECTS", icon: BriefcaseBusiness, color: "bg-[#ff00ff]", shadow: "shadow-brutal-cyan", pos: "md:left-[16%] md:top-[52%]" },
  { id: "flev", title: "FLEV AGENT", icon: Bot, color: "bg-[#bc13fe]", shadow: "shadow-brutal-yellow", pos: "md:left-[58%] md:top-[42%]" },
  { id: "defi", title: "DEFI INTEL", icon: TrendingUp, color: "bg-[#050606] text-[#fdfaf1]", shadow: "shadow-brutal-pink", pos: "md:left-[64%] md:top-[17%]" },
  { id: "contact", title: "CONTACT", icon: Mail, color: "bg-white", shadow: "shadow-brutal-black", pos: "md:left-[37%] md:top-[55%]" },
];

const defaultOpen: WindowId[] = ["profile", "github", "flev"];
const initialWindowState = windows.reduce<Record<WindowId, WindowState>>((acc, window) => {
  acc[window.id] = defaultOpen.includes(window.id) ? "open" : "closed";
  return acc;
}, {} as Record<WindowId, WindowState>);
const windowIds = windows.map((window) => window.id);

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
    return <div className="space-y-4"><p className="text-xl font-black uppercase">Ayasa // Flevance18</p><p>Anime-neobrutalist command operator building AI agents, crypto tooling, and sharp web experiences with chaotic-cute precision.</p><div className="grid grid-cols-3 gap-2 text-center font-mono text-xs"><b className="brutal-chip bg-[#ffee00]">AI</b><b className="brutal-chip bg-[#00ffff]">WEB3</b><b className="brutal-chip bg-[#ff00ff]">OS</b></div></div>;
  }
  if (id === "github") {
    return <div className="space-y-3"><p className="font-bold">Live GitHub signal for <span className="font-mono">Flevance18</span>.</p><Image unoptimized width={460} height={190} className="w-full border-4 border-black bg-white" alt="Flevance18 GitHub stats" src="https://github-readme-stats.vercel.app/api?username=Flevance18&show_icons=true&theme=radical&hide_border=true&title_color=ff00ff&icon_color=ffee00" /><a className="neo-button inline-flex" href="https://github.com/Flevance18" target="_blank" rel="noreferrer">Open GitHub ↗</a></div>;
  }
  if (id === "projects") {
    return <div className="space-y-3"><p className="font-black uppercase">Active project board</p>{["Command Center OS", "Agentic workflow cockpit", "DeFi signal scanner"].map((item, i) => <div key={item} className="border-4 border-black bg-white p-3 shadow-[4px_4px_0_#050606]"><span className="font-mono text-xs">0{i + 1}</span> {item}</div>)}</div>;
  }
  if (id === "flev") {
    return <div className="space-y-4"><p className="font-mono text-sm">&gt; FLEV_AGENT booted. Persona: fast, direct, research-heavy.</p><div className="halftone-yellow border-4 border-black p-4"><b>Mission:</b> convert vague ideas into shipped interfaces, intelligence dashboards, and automations.</div><button className="neo-button">Run diagnostic</button></div>;
  }
  if (id === "defi") {
    return <div className="space-y-3"><p className="font-black uppercase">DeFi Intel Feed</p>{["Liquidity watch: stable", "Narrative heat: AI x agents", "Risk posture: verify contracts"].map((item) => <div key={item} className="flex items-center gap-2 font-mono text-sm"><RadioTower size={16} className="text-[#bc13fe]" />{item}</div>)}</div>;
  }
  return <div className="space-y-4"><p>Patch into Ayasa channels.</p><div className="flex flex-wrap gap-3"><a className="neo-button" href="https://github.com/Flevance18" target="_blank" rel="noreferrer">GitHub</a><a className="neo-button bg-[#00ffff]" href="https://x.com/Ayasa_18" target="_blank" rel="noreferrer">X / Twitter</a></div><p className="font-mono text-xs">No secrets stored. External links only.</p></div>;
}

export default function CommandCenter() {
  const [booted, setBooted] = useState(false);
  const [windowState, setWindowState] = useState<Record<WindowId, WindowState>>(initialWindowState);
  const [active, setActive] = useState<WindowId>("profile");
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLog, setTerminalLog] = useState<string[]>(["> ayasa terminal ready", "> type `help` for commands"]);
  const canDrag = useDesktopDrag();
  const clock = useClock();

  const ordered = useMemo(() => windows.filter((w) => windowState[w.id] === "open"), [windowState]);
  const launch = (id: WindowId) => { setWindowState((v) => ({ ...v, [id]: "open" })); setActive(id); };
  const minimize = (id: WindowId) => setWindowState((v) => ({ ...v, [id]: "minimized" }));
  const close = (id: WindowId) => setWindowState((v) => ({ ...v, [id]: "closed" }));
  const reset = () => { setWindowState(initialWindowState); setActive("profile"); };

  const runCommand = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const raw = terminalInput.trim();
    if (!raw) return;
    const command = raw.toLowerCase();
    const parts = command.split(/\s+/);
    let output = "";

    if (command === "help") {
      output = "commands: help, open <window>, close <window>, minimize <window>, reset, contact";
    } else if (parts[0] === "open" && windowIds.includes(parts[1] as WindowId)) {
      launch(parts[1] as WindowId);
      output = `opened ${parts[1]}`;
    } else if (parts[0] === "close" && windowIds.includes(parts[1] as WindowId)) {
      close(parts[1] as WindowId);
      output = `closed ${parts[1]}`;
    } else if (parts[0] === "minimize" && windowIds.includes(parts[1] as WindowId)) {
      minimize(parts[1] as WindowId);
      output = `minimized ${parts[1]}`;
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
    <AnimatePresence>{!booted && <motion.section className="fixed inset-0 z-50 grid place-items-center bg-[#fdfaf1] p-6 halftone-dark" exit={{ opacity: 0, scale: 1.05 }}><div className="max-w-3xl border-[6px] border-black bg-white p-6 text-center shadow-brutal-pink md:p-10"><Sparkles className="mx-auto mb-4" size={52}/><p className="font-mono text-sm">AYASA COMMAND CENTER // MVP</p><h1 className="glitch-text my-4 text-5xl font-black uppercase md:text-8xl">Control Deck</h1><button onClick={() => setBooted(true)} className="neo-button bg-[#ffee00] text-xl">Enter Control Deck</button></div></motion.section>}</AnimatePresence>
    <header className="mb-4 flex flex-col gap-3 border-[5px] border-black bg-white p-3 shadow-brutal-black md:flex-row md:items-center md:justify-between"><div><p className="font-mono text-xs">STATUS: ONLINE / UTC {clock.utc} / LOCAL {clock.local}</p><div className="flex flex-wrap items-center gap-3"><h1 className="text-3xl font-black uppercase md:text-5xl">Ayasa OS</h1><a href="https://ayasa-profile.vercel.app/" className="neo-button bg-[#ffee00] py-1 px-2 text-xs font-black uppercase border-2 border-black inline-block">← CLASSIC</a></div></div><div className="marquee border-4 border-black bg-[#ffee00] font-mono text-sm"><span>◆ LIVE TICKER ◆ BUILDING AGENTS ◆ DEFI INTEL ◆ CREATIVE CODE ◆ MANGA MODE ◆&nbsp;</span></div></header>
    <section className="relative min-h-[70vh] md:min-h-[680px]" aria-label="Desktop command windows">
      <div className="pointer-events-none absolute inset-0 speed-lines" />
      <AnimatePresence>{ordered.map((w, index) => { const Icon = w.icon; return <motion.article key={w.id} layout drag={canDrag} dragMomentum={false} dragElastic={0.08} whileDrag={{ scale: 1.02 }} initial={{ opacity: 0, y: 30, rotate: -1 }} animate={{ opacity: 1, y: 0, rotate: active === w.id ? 0 : -1 }} exit={{ opacity: 0, scale: .9 }} onMouseDown={() => setActive(w.id)} className={clsx("neo-window relative mb-5 w-full md:absolute md:w-[390px]", canDrag && "md:cursor-grab md:active:cursor-grabbing", w.pos, w.shadow, active === w.id && "z-20", active !== w.id && "z-10 opacity-90")} style={{ zIndex: active === w.id ? 30 : 10 + index }}><div className={clsx("flex items-center justify-between border-b-4 border-black p-2", w.color)}><div className="flex items-center gap-2 font-black"><Icon size={20}/>{w.title}</div><div className="flex gap-1"><button aria-label={`Minimize ${w.title}`} onClick={() => minimize(w.id)} className="grid size-8 place-items-center border-2 border-black bg-white text-black"><Minus size={18}/></button><button aria-label={`Close ${w.title}`} onClick={() => close(w.id)} className="grid size-8 place-items-center border-2 border-black bg-white text-black"><X size={18}/></button></div></div><div className="bg-[#fdfaf1] p-4"><WindowBody id={w.id}/></div></motion.article>; })}</AnimatePresence>
      <aside className="neo-window relative z-30 mt-4 w-full shadow-brutal-black md:absolute md:bottom-4 md:right-4 md:w-[430px]" aria-label="Terminal command input"><div className="flex items-center gap-2 border-b-4 border-black bg-[#050606] p-2 font-black text-[#00ffff]"><Terminal size={20}/> TERMINAL</div><div className="bg-[#050606] p-3 font-mono text-sm text-[#fdfaf1]">{terminalLog.map((line, i) => <p key={`${line}-${i}`}>{line}</p>)}<form onSubmit={runCommand} className="mt-3 flex gap-2"><label className="sr-only" htmlFor="terminal-command">Terminal command</label><input id="terminal-command" value={terminalInput} onChange={(event) => setTerminalInput(event.target.value)} className="min-w-0 flex-1 border-2 border-[#00ffff] bg-black px-2 py-1 text-[#ffee00] outline-none" placeholder="help / open projects" autoComplete="off"/><button className="border-2 border-[#ffee00] bg-[#ff00ff] px-3 py-1 font-black text-black" type="submit">RUN</button></form></div></aside>
    </section>
    <nav className="dock fixed bottom-3 left-1/2 z-40 flex max-w-[94vw] -translate-x-1/2 gap-2 overflow-x-auto border-[5px] border-black bg-white p-2 shadow-brutal-purple" aria-label="Window dock">{windows.map((w) => { const Icon = w.icon; const state = windowState[w.id]; return <button key={w.id} onClick={() => launch(w.id)} className={clsx("dock-icon", w.color, state === "open" && "ring-4 ring-[#050606]", state === "minimized" && "opacity-70 ring-4 ring-[#ff00ff]", state === "closed" && "opacity-55")} title={`${w.title} (${state})`} aria-label={`${state === "minimized" ? "Restore" : "Open"} ${w.title}`}><Icon size={22}/><span className="hidden text-xs font-black md:inline">{w.title}</span></button>; })}</nav>
    <footer className="pb-24 pt-4 text-center font-mono text-xs"><ShieldCheck className="inline" size={14}/> interactive MVP / drag desktop windows / minimize dock / terminal control</footer>
  </main>;
}
