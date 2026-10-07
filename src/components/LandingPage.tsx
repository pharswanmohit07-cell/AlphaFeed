import { useMemo, useState } from 'react'
import { ArrowRight, Brain, ChartCandlestick, ChevronRight, CircleCheck, Copy, Github, Link2, MessageCircle, Search, ShieldCheck, TrendingUp, Users, Wallet, Zap } from 'lucide-react'

type Props = { onLaunchApp: () => void; onExploreTraders?: () => void }

const stats = [
  ['Total Volume Copied', '$12.4M+', Wallet],
  ['Active Traders', '1,280+', Users],
  ['Average Win Rate', '64.2%', TrendingUp],
  ['Execution Layer', 'Monad / Kuru', Zap],
] as const

const steps = [
  ['01', 'Discover', 'Verified trader profiles and transparent on-chain track records.', Search],
  ['02', 'Analyze', 'Interactive charts and AI-assisted trade breakdowns.', Brain],
  ['03', 'Automate', 'One-click copy rules built around Chainlink CRE.', Zap],
] as const

const tech = [
  ['Monad', 'High-performance EVM execution', 'M'],
  ['Kuru DEX', 'On-chain orderbook infrastructure', 'K'],
  ['Chainlink CRE', 'Composable execution layer', 'C'],
  ['Hunyuan AI', 'AI-assisted trade analysis', 'AI'],
] as const

export default function LandingPage({ onLaunchApp, onExploreTraders }: Props) {
  const [amount, setAmount] = useState(250)
  const roi = 18.6
  const profit = useMemo(() => amount * roi / 100, [amount])
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="min-h-screen overflow-x-hidden bg-zinc-950 text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-18rem] h-[42rem] w-[65rem] -translate-x-1/2 rounded-full bg-emerald-500/[0.07] blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.018)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>
      <header className="sticky top-0 z-50 border-b border-zinc-800/70 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-emerald-400 text-zinc-950"><ChartCandlestick size={18} /></span><span className="font-bold tracking-tight">Alpha<span className="text-emerald-400">Feed</span></span></button>
          <nav className="hidden items-center gap-7 md:flex"><button onClick={() => scroll('features')} className="text-xs text-zinc-400 hover:text-white">Features</button><button onClick={() => scroll('leaderboard')} className="text-xs text-zinc-400 hover:text-white">Leaderboard</button><button onClick={() => scroll('infrastructure')} className="text-xs text-zinc-400 hover:text-white">Docs</button></nav>
          <button onClick={onLaunchApp} className="flex items-center gap-2 rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/15"><Zap size={14} /> Launch Terminal</button>
        </div>
      </header>

      <main>
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[.06] px-3 py-1.5 text-[10px] uppercase tracking-[.18em] text-emerald-300"><span className="size-2 animate-pulse rounded-full bg-emerald-400" /> Social trading infrastructure</div>
            <h1 className="text-5xl font-semibold leading-[.98] tracking-[-.045em] sm:text-6xl lg:text-7xl">Social Trading Meets <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">On-Chain Execution.</span></h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">Discover traders, analyze setups and explore transparent copy-trading workflows built around <span className="text-zinc-200">Monad</span>, <span className="text-zinc-200">Kuru orderbooks</span>, <span className="text-zinc-200">Chainlink CRE</span> and AI-assisted analysis.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><button onClick={onLaunchApp} className="group flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-6 py-3.5 text-sm font-bold text-zinc-950 hover:bg-emerald-300">Launch App <ArrowRight size={16} className="transition group-hover:translate-x-1" /></button><button onClick={onExploreTraders ?? (() => scroll('leaderboard'))} className="flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/60 px-6 py-3.5 text-sm font-semibold text-zinc-200 hover:bg-zinc-900"><Users size={16} /> Explore Traders</button></div>
            <div className="mt-8 flex flex-wrap gap-5 text-[10px] uppercase tracking-[.14em] text-zinc-600"><span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-500" /> On-chain verification</span><span className="flex items-center gap-1.5"><Link2 size={14} className="text-emerald-500" /> Monad execution</span><span className="flex items-center gap-1.5"><Brain size={14} className="text-emerald-500" /> AI analysis</span></div>
          </div>

          <div className="relative mx-auto w-full max-w-xl"><div className="absolute -inset-10 rounded-full bg-emerald-400/[.07] blur-[80px]" /><div className="relative overflow-hidden rounded-2xl border border-zinc-700/80 bg-zinc-900/80 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3 text-[9px] uppercase tracking-[.18em] text-zinc-600"><span>● ● ●</span><span>AlphaFeed / Live Setup</span><span className="text-emerald-400">● LIVE</span></div>
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-300">AM</div><div><div className="flex items-center gap-1.5 text-sm font-semibold">Alex Morgan <ShieldCheck size={14} className="text-emerald-400" /></div><div className="text-[10px] text-zinc-600">@alexalpha · Verified trader</div></div></div><span className="rounded-full bg-emerald-500/[.06] px-2 py-1 text-[9px] font-semibold text-emerald-400">+18.6% ROI</span></div>
              <div className="mt-6 flex items-end justify-between"><div><div className="text-[10px] uppercase tracking-[.15em] text-zinc-600">Market</div><div className="mt-1 flex items-center gap-2 text-2xl font-bold">MON <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] text-emerald-400">BUY</span></div></div><div className="text-right"><div className="text-[10px] text-zinc-600">Entry</div><div className="font-mono text-sm">$0.0842</div></div></div>
              <div className="relative mt-5 h-48 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/80"><div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:36px_36px]" /><svg viewBox="0 0 500 200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full"><path d="M0 150 C45 158 65 120 105 132 C145 145 170 85 205 102 C245 120 270 55 305 75 C350 100 370 48 410 58 C445 67 465 30 500 18" fill="none" stroke="#34d399" strokeWidth="2"/></svg><div className="absolute left-0 right-0 top-[25%] border-t border-dashed border-emerald-400/70"><span className="absolute right-2 -top-3 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[8px] text-emerald-400">TP $0.1028</span></div><div className="absolute left-0 right-0 top-[54%] border-t border-dashed border-zinc-500/70"><span className="absolute right-2 -top-3 bg-zinc-800 px-1.5 py-0.5 font-mono text-[8px] text-zinc-400">ENTRY $0.0842</span></div><div className="absolute left-0 right-0 top-[75%] border-t border-dashed border-red-400/50"><span className="absolute right-2 -top-3 bg-red-500/10 px-1.5 py-0.5 font-mono text-[8px] text-red-400">SL $0.0784</span></div></div>
              <div className="mt-4 grid grid-cols-3 gap-2">{['Entry $0.0842','Target $0.1028','Stop $0.0784'].map((x,i)=><div key={x} className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-2.5 text-[10px]"><span className="text-zinc-600">{x.split(' ')[0]}</span><div className={i===1?'text-emerald-400':i===2?'text-red-400':'text-zinc-300'}>{x.split(' ')[1]}</div></div>)}</div>
              <button onClick={onLaunchApp} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 py-3 text-xs font-bold text-zinc-950 hover:bg-emerald-300"><Copy size={14}/> Copy Trade Preview <ArrowRight size={14}/></button><p className="mt-3 text-center text-[9px] text-zinc-600">Prototype preview · no real order is submitted</p>
            </div>
          </div></div>
        </section>

        <section className="border-y border-zinc-800/80 bg-zinc-900/30"><div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-zinc-800/70 md:grid-cols-4">{stats.map(([label,value,Icon])=><div key={label} className="flex items-center gap-3 px-5 py-6 sm:px-8"><Icon className="hidden h-4 w-4 text-emerald-400 sm:block"/><div><div className="text-lg font-bold">{value}</div><div className="text-[9px] uppercase tracking-[.13em] text-zinc-600">{label}</div></div></div>)}</div></section>

        <section id="features" className="scroll-mt-20 px-5 py-24 sm:px-8"><div className="mx-auto max-w-7xl"><Heading eyebrow="THE ALPHAFEED LOOP" title="From signal to execution." description="A social trading workflow built around discovery, analysis and programmable execution."/><div className="mt-14 grid gap-4 md:grid-cols-3">{steps.map(([num,title,desc,Icon])=><div key={num} className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-7 hover:-translate-y-1 hover:border-emerald-500/20"><div className="absolute right-5 top-5 text-5xl font-black text-zinc-800/60">{num}</div><div className="grid size-11 place-items-center rounded-xl border border-emerald-500/20 bg-emerald-500/[.07]"><Icon size={20} className="text-emerald-400"/></div><h3 className="mt-7 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-zinc-500">{desc}</p><div className="mt-7 flex items-center gap-2 text-[10px] uppercase tracking-[.15em] text-emerald-400">Explore <ChevronRight size={14}/></div></div>)}</div></div></section>

        <section id="leaderboard" className="scroll-mt-20 border-y border-zinc-800/70 bg-zinc-900/20 px-5 py-24 sm:px-8"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><Heading eyebrow="COPY CALCULATOR" title="See what a copy rule could look like." description="Adjust the simulated allocation and see how a fixed mock ROI translates into a hypothetical result."/><div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6 sm:p-8"><div className="flex items-end justify-between"><div><div className="text-[10px] uppercase tracking-[.15em] text-zinc-600">Initial copy amount</div><div className="mt-1 text-3xl font-bold">$ {amount}</div></div><div className="text-right"><div className="text-[10px] uppercase tracking-[.15em] text-zinc-600">Mock ROI</div><div className="mt-1 text-xl font-bold text-emerald-400">+{roi}%</div></div></div><input aria-label="Copy amount" type="range" min="50" max="1000" step="10" value={amount} onChange={e=>setAmount(Number(e.target.value))} className="mt-8 h-1.5 w-full accent-emerald-400"/><div className="mt-2 flex justify-between text-[9px] font-mono text-zinc-600"><span>$50</span><span>$1,000</span></div><div className="mt-8 grid grid-cols-2 gap-3"><div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4"><div className="text-[9px] uppercase text-zinc-600">Hypothetical profit</div><div className="mt-2 text-xl font-bold text-emerald-400">+$ {profit.toFixed(0)}</div></div><div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4"><div className="text-[9px] uppercase text-zinc-600">Hypothetical value</div><div className="mt-2 text-xl font-bold">$ {(amount+profit).toFixed(0)}</div></div></div><div className="mt-5 rounded-xl border border-amber-500/10 bg-amber-500/[.035] p-3 text-[10px] leading-4 text-zinc-600">Prototype only: fixed mock ROI; this does not predict future returns or represent live performance.</div></div></div></section>

        <section id="infrastructure" className="scroll-mt-20 px-5 py-24 sm:px-8"><div className="mx-auto max-w-7xl"><Heading eyebrow="INFRASTRUCTURE" title="Built for the on-chain terminal." description="A modular stack connecting social discovery, AI analysis and programmable execution."/><div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{tech.map(([name,desc,mark])=><div key={name} className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-emerald-500/20"><div className="grid size-10 place-items-center rounded-xl border border-zinc-800 bg-zinc-950 text-xs font-black text-emerald-400">{mark}</div><h3 className="mt-6 font-semibold">{name}</h3><p className="mt-2 text-xs leading-5 text-zinc-600">{desc}</p><div className="mt-5 inline-flex rounded-full border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-[9px] uppercase tracking-[.13em] text-zinc-600">Integrated</div></div>)}</div></div></section>
      </main>

      <footer className="border-t border-zinc-800/80 bg-zinc-950"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 py-12 sm:px-8 md:flex-row"><div><div className="font-bold">Alpha<span className="text-emerald-400">Feed</span></div><p className="mt-3 max-w-sm text-xs leading-5 text-zinc-600">Social trading infrastructure connecting trader discovery, transparent analysis and programmable execution.</p></div><div className="flex gap-2"><a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X" className="grid size-9 place-items-center rounded-lg border border-zinc-800 text-zinc-500 hover:text-white">𝕏</a><a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="grid size-9 place-items-center rounded-lg border border-zinc-800 text-zinc-500 hover:text-white"><Github size={15}/></a><a href="https://discord.com" target="_blank" rel="noreferrer" aria-label="Discord" className="grid size-9 place-items-center rounded-lg border border-zinc-800 text-zinc-500 hover:text-white"><MessageCircle size={15}/></a></div></div></footer>
    </div>
  )
}

function Heading({ eyebrow, title, description }: { eyebrow:string; title:string; description:string }) {
  return <div className="max-w-2xl"><div className="mb-4 text-[10px] font-semibold uppercase tracking-[.2em] text-emerald-400">{eyebrow}</div><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2><p className="mt-4 text-sm leading-6 text-zinc-500">{description}</p></div>
}
