import { useEffect, useMemo, useState, type PointerEvent as ReactPointerEvent } from 'react'
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Brain,
  Check,
  ChevronRight,
  CircleDot,
  Copy,
  Github,
  Globe2,
  Link2,
  MessageCircle,
  Radio,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Props = {
  onLaunchApp: () => void
  onExploreTraders?: () => void
}

type Tone = 'emerald' | 'cyan' | 'red'

type Candle = {
  open: number
  close: number
  high: number
  low: number
  volume: number
}

type HoverPoint = {
  index: number
  price: number
  x: number
  y: number
} | null

type StatItem = {
  label: string
  value: string
  icon: LucideIcon
  tone: 'emerald' | 'cyan'
}

const CANDLES: Candle[] = [
  { open: 0.0802, close: 0.0815, high: 0.0824, low: 0.0794, volume: 7200 },
  { open: 0.0815, close: 0.0809, high: 0.0820, low: 0.0799, volume: 5500 },
  { open: 0.0809, close: 0.0822, high: 0.0830, low: 0.0802, volume: 8100 },
  { open: 0.0822, close: 0.0837, high: 0.0846, low: 0.0817, volume: 9400 },
  { open: 0.0837, close: 0.0830, high: 0.0844, low: 0.0821, volume: 6300 },
  { open: 0.0830, close: 0.0851, high: 0.0862, low: 0.0826, volume: 10400 },
  { open: 0.0851, close: 0.0868, high: 0.0876, low: 0.0846, volume: 11700 },
  { open: 0.0868, close: 0.0860, high: 0.0873, low: 0.0854, volume: 6700 },
  { open: 0.0860, close: 0.0883, high: 0.0892, low: 0.0855, volume: 12600 },
  { open: 0.0883, close: 0.0897, high: 0.0906, low: 0.0876, volume: 13800 },
  { open: 0.0897, close: 0.0888, high: 0.0904, low: 0.0879, volume: 7700 },
  { open: 0.0888, close: 0.0911, high: 0.0920, low: 0.0884, volume: 14900 },
  { open: 0.0911, close: 0.0927, high: 0.0938, low: 0.0905, volume: 16100 },
  { open: 0.0927, close: 0.0919, high: 0.0935, low: 0.0911, volume: 8000 },
  { open: 0.0919, close: 0.0945, high: 0.0957, low: 0.0913, volume: 17400 },
  { open: 0.0945, close: 0.0938, high: 0.0951, low: 0.0928, volume: 9100 },
  { open: 0.0938, close: 0.0963, high: 0.0975, low: 0.0931, volume: 15600 },
  { open: 0.0963, close: 0.0981, high: 0.0991, low: 0.0957, volume: 17100 },
  { open: 0.0981, close: 0.0973, high: 0.0989, low: 0.0965, volume: 9500 },
  { open: 0.0973, close: 0.1000, high: 0.1012, low: 0.0969, volume: 18500 },
  { open: 0.1000, close: 0.1016, high: 0.1029, low: 0.0992, volume: 20100 },
  { open: 0.1016, close: 0.1027, high: 0.1037, low: 0.1008, volume: 10900 },
]

const TICKER = [
  'MON BUY 0.0842',
  'KURU / MON-USDC / BUY',
  'CRE_ROUTE::SIGNAL_84',
  'VERIFY::TRADER_ALICE',
  'MONAD::FINALIZED',
  'ORDERBOOK::SYNCED',
]

const LIVE_STATS: StatItem[] = [
  { label: 'Total Volume Copied', value: '$12.4M+', icon: Wallet, tone: 'emerald' },
  { label: 'Active Traders', value: '1,280+', icon: Users, tone: 'cyan' },
  { label: 'Average Win Rate', value: '64.2%', icon: TrendingUp, tone: 'emerald' },
  { label: 'Execution Layer', value: 'Monad / Kuru', icon: Zap, tone: 'cyan' },
]

const FLOW_ITEMS = [
  { number: '01', title: 'Discover', description: 'Find high-signal traders, strategies and reputation without leaving one dense terminal.', icon: Search, chips: ['Profiles', 'Signals', 'Leaderboard'] },
  { number: '02', title: 'Analyze', description: 'Move from social context into charts, price levels, risk and AI-assisted interpretation.', icon: Brain, chips: ['Charts', 'R:R', 'AI Context'] },
  { number: '03', title: 'Automate', description: 'Prototype copy rules around a programmable execution flow with clear guardrails.', icon: Zap, chips: ['Copy Rules', 'CRE', 'Kuru'] },
]

function Sparkline({ points, tone = 'emerald' }: { points: number[]; tone?: Tone }) {
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = Math.max(max - min, 0.0001)
  const stroke = tone === 'red' ? '#fb7185' : tone === 'cyan' ? '#22d3ee' : '#34d399'
  const coords = points.map((point, index) => ({
    x: (index / Math.max(points.length - 1, 1)) * 100,
    y: 28 - ((point - min) / range) * 22,
  }))
  const line = coords.map((point, index) => (index === 0 ? 'M ' : 'L ') + point.x + ' ' + point.y).join(' ')
  const area = 'M 0 30 ' + coords.map((point) => 'L ' + point.x + ' ' + point.y).join(' ') + ' L 100 32 L 0 32 Z'

  return (
    <svg viewBox="0 0 100 32" className="h-7 w-full" aria-hidden="true">
      <path d={area} fill={stroke} fillOpacity=".07" />
      <path d={line} fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="max-w-3xl">
      <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.22em] text-emerald-400"><span className="h-px w-8 bg-emerald-400/70" />{eyebrow}</div>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-zinc-500">{text}</p>
    </div>
  )
}

function LiveStat({ item }: { item: StatItem }) {
  const Icon = item.icon
  return (
    <div className="relative p-4">
      <div className="flex items-center gap-2 text-[9px] uppercase tracking-[.14em] text-zinc-600"><Icon size={12} className={item.tone === 'cyan' ? 'text-cyan-400' : 'text-emerald-400'} />{item.label}</div>
      <div className="mt-2 text-sm font-semibold text-zinc-100 sm:text-base">{item.value}</div>
      <Sparkline points={[4, 4.7, 4.3, 5.4, 5.1, 6.1, 5.9]} tone={item.tone} />
    </div>
  )
}

function TradingChart({ hover, onHover }: { hover: HoverPoint; onHover: (point: HoverPoint) => void }) {
  const width = 760
  const height = 360
  const padX = 28
  const padY = 24
  const minPrice = 0.077
  const maxPrice = 0.106
  const chartWidth = width - padX * 2
  const chartHeight = height - padY * 2
  const xFor = (index: number) => padX + (index / Math.max(CANDLES.length - 1, 1)) * chartWidth
  const yFor = (price: number) => padY + ((maxPrice - price) / (maxPrice - minPrice)) * chartHeight

  const trendPath = CANDLES.map((candle, index) => (index === 0 ? 'M ' : 'L ') + xFor(index) + ' ' + yFor(candle.close)).join(' ')
  const levels = [
    { label: 'TP $0.1028', value: 0.1028, line: '#34d399', box: '#06261a', width: 112 },
    { label: 'ENTRY $0.0842', value: 0.0842, line: '#22d3ee', box: '#04242c', width: 134 },
    { label: 'SL $0.0784', value: 0.0784, line: '#fb7185', box: '#2d0c17', width: 108 },
  ]

  const handlePointerMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const localX = ((event.clientX - rect.left) / Math.max(rect.width, 1)) * width
    const index = Math.max(0, Math.min(CANDLES.length - 1, Math.round(((localX - padX) / chartWidth) * (CANDLES.length - 1))))
    const candle = CANDLES[index]
    if (!candle) return
    onHover({ index, price: candle.close, x: xFor(index), y: yFor(candle.close) })
  }

  return (
    <div className="relative mt-4 overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#040808]">
      <svg
        viewBox={'0 0 ' + width + ' ' + height}
        className="h-[260px] w-full touch-none sm:h-[330px]"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => onHover(null)}
        role="img"
        aria-label="Interactive simulated MON candlestick chart"
      >
        <defs>
          <linearGradient id="afChartArea" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#34d399" stopOpacity=".18" /><stop offset="100%" stopColor="#34d399" stopOpacity="0" /></linearGradient>
          <filter id="afCandleGlow"><feGaussianBlur stdDeviation="2.2" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <rect width={width} height={height} fill="#040808" />

        {Array.from({ length: 11 }, (_, index) => (
          <line key={'v-' + index} x1={padX + (index / 10) * chartWidth} x2={padX + (index / 10) * chartWidth} y1={padY} y2={height - padY} stroke="#64748b" strokeOpacity=".08" strokeDasharray="3 8" />
        ))}
        {Array.from({ length: 9 }, (_, index) => (
          <line key={'h-' + index} x1={padX} x2={width - padX} y1={padY + (index / 8) * chartHeight} y2={padY + (index / 8) * chartHeight} stroke="#64748b" strokeOpacity=".09" strokeDasharray="3 8" />
        ))}

        <path d={trendPath + ' L ' + xFor(CANDLES.length - 1) + ' ' + (height - padY) + ' L ' + padX + ' ' + (height - padY) + ' Z'} fill="url(#afChartArea)" />
        <path d={trendPath} fill="none" stroke="#22d3ee" strokeWidth="1.2" strokeOpacity=".48" />

        {levels.map((level) => {
          const y = yFor(level.value)
          const x = width - padX - level.width
          return (
            <g key={level.label}>
              <line x1={padX} x2={width - padX} y1={y} y2={y} stroke={level.line} strokeOpacity=".82" strokeDasharray="5 8" />
              <rect x={x} y={y - 13} width={level.width} height="26" rx="10" fill={level.box} stroke={level.line} strokeOpacity=".5" />
              <text x={x + level.width / 2} y={y + 3.5} textAnchor="middle" fill={level.line} fontSize="10" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">{level.label}</text>
            </g>
          )
        })}

        {CANDLES.map((candle, index) => {
          const x = xFor(index)
          const openY = yFor(candle.open)
          const closeY = yFor(candle.close)
          const highY = yFor(candle.high)
          const lowY = yFor(candle.low)
          const bullish = candle.close >= candle.open
          const candleColor = bullish ? '#34d399' : '#fb7185'
          return (
            <g key={index}>
              <line x1={x} x2={x} y1={highY} y2={lowY} stroke={candleColor} strokeWidth="2" strokeOpacity=".82" />
              <rect x={x - 5.5} y={Math.min(openY, closeY)} width="11" height={Math.max(Math.abs(closeY - openY), 3)} rx="2" fill={candleColor} fillOpacity=".88" filter="url(#afCandleGlow)" />
            </g>
          )
        })}

        {hover && (
          <g>
            <line x1={hover.x} x2={hover.x} y1={padY} y2={height - padY} stroke="#e2e8f0" strokeOpacity=".14" />
            <circle cx={hover.x} cy={hover.y} r="4" fill="#22d3ee" stroke="#d7f9ff" strokeWidth="2" />
            <g transform={'translate(' + Math.min(hover.x + 12, width - 118) + ' ' + Math.max(hover.y - 48, 28) + ')'}>
              <rect width="106" height="38" rx="9" fill="#071011" stroke="#22d3ee" strokeOpacity=".25" />
              <text x="10" y="15" fill="#64748b" fontSize="8" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">CANDLE {String(hover.index + 1).padStart(2, '0')}</text>
              <text x="10" y="29" fill="#e2e8f0" fontSize="11" fontWeight="600" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">{'$' + hover.price.toFixed(4)}</text>
            </g>
          </g>
        )}

        <text x={padX} y={height - 8} fill="#3f4a57" fontSize="8" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">12:00</text>
        <text x={width / 2} y={height - 8} textAnchor="middle" fill="#3f4a57" fontSize="8" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">16:00</text>
        <text x={width - padX} y={height - 8} textAnchor="end" fill="#3f4a57" fontSize="8" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">20:00</text>
      </svg>
    </div>
  )
}

function TechBadge({ label, detail, icon: Icon, tone }: { label: string; detail: string; icon: LucideIcon; tone: 'emerald' | 'cyan' | 'indigo' | 'purple' }) {
  const toneClass =
    tone === 'cyan'
      ? 'border-cyan-400/20 bg-cyan-400/[.045] text-cyan-300'
      : tone === 'indigo'
        ? 'border-indigo-400/20 bg-indigo-400/[.045] text-indigo-300'
        : tone === 'purple'
          ? 'border-purple-400/20 bg-purple-400/[.045] text-purple-300'
          : 'border-emerald-400/20 bg-emerald-400/[.045] text-emerald-300'

  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/55 px-4 py-3 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-emerald-400/20">
      <div className={'grid size-9 place-items-center rounded-xl border ' + toneClass}><Icon size={16} /></div>
      <div className="min-w-0"><div className="text-xs font-semibold text-zinc-200">{label}</div><div className="text-[9px] uppercase tracking-[.12em] text-zinc-600">{detail}</div></div>
      <Check size={13} className="ml-auto text-emerald-400 opacity-60 transition group-hover:opacity-100" />
    </div>
  )
}

export default function LandingPage({ onLaunchApp, onExploreTraders }: Props) {
  const [capital, setCapital] = useState(500)
  const [hover, setHover] = useState<HoverPoint>(null)
  const [tickerIndex, setTickerIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setTickerIndex((index) => (index + 1) % TICKER.length), 1800)
    return () => window.clearInterval(timer)
  }, [])

  const mockRoi = 34.7
  const profit = capital * (mockRoi / 100)
  const projectedValue = capital + profit

  const riskLabel = useMemo(() => {
    if (capital < 500) return 'LOW EXPOSURE'
    if (capital < 2000) return 'BALANCED'
    return 'HIGHER EXPOSURE'
  }, [capital])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
      <div className="min-h-screen overflow-x-hidden bg-ink text-zinc-100">
      <style>{`
        @keyframes alpha-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes alpha-grid-drift {
          0% { background-position: 0 0, 0 0; }
          100% { background-position: 0 0, 32px 32px; }
        }
        .af-float { animation: alpha-float 7s ease-in-out infinite; }
        .af-float-slow { animation: alpha-float 9s ease-in-out 1.2s infinite; }
        .af-grid { animation: alpha-grid-drift 22s linear infinite; }
      `}</style>

      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] af-grid" />
      <div className="pointer-events-none fixed inset-0 -z-20 bg-ink" />
      <div className="pointer-events-none fixed left-[8%] top-24 -z-10 size-80 rounded-full bg-violet-500/15 blur-3xl" />
      <div className="pointer-events-none fixed right-[5%] top-[16%] -z-10 size-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none fixed left-[45%] top-[54%] -z-10 size-72 rounded-full bg-indigo-500/[.06] blur-3xl" />

      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/75 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1500px] items-center gap-4 px-4 sm:px-6 lg:px-8">
          <button type="button" onClick={() => scrollTo('top')} className="group flex items-center gap-2.5" aria-label="AlphaFeed home">
            <span className="grid size-9 place-items-center rounded-xl bg-violet-400 text-sm font-black text-zinc-950 shadow-[0_0_28px_rgba(167,139,250,.28)] transition group-hover:rotate-6">α</span>
            <span className="hidden text-sm font-semibold tracking-tight sm:block">Alpha<span className="text-violet-300">Feed</span></span>
          </button>

          <nav className="ml-5 hidden items-center gap-1 md:flex">
            <button type="button" onClick={() => scrollTo('features')} className="rounded-lg px-3 py-2 text-xs text-zinc-500 transition hover:bg-white/[.03] hover:text-white">Features</button>
            <button type="button" onClick={() => scrollTo('leaderboard')} className="rounded-lg px-3 py-2 text-xs text-zinc-500 transition hover:bg-white/[.03] hover:text-white">Leaderboard</button>
            <button type="button" onClick={() => scrollTo('infrastructure')} className="rounded-lg px-3 py-2 text-xs text-zinc-500 transition hover:bg-white/[.03] hover:text-white">Docs</button>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-[9px] uppercase tracking-[.15em] text-zinc-600 sm:flex">
              <CircleDot size={11} className="text-emerald-400" />
              Monad connected
            </div>
            <button type="button" onClick={onLaunchApp} className="group flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/[.06] px-3.5 py-2.5 text-xs font-semibold text-emerald-300 transition hover:border-emerald-400/40 hover:bg-emerald-400/[.1]">
              <Terminal size={14} />
              Launch Terminal
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="relative px-4 pb-20 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
          <div className="mx-auto grid max-w-[1500px] items-center gap-14 lg:grid-cols-[.88fr_1.12fr] lg:gap-16">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[.05] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[.2em] text-emerald-300 shadow-[0_0_30px_rgba(52,211,153,.05)]">
                <span className="size-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.9)]" />
                Social trading infrastructure
              </div>

              <h1 className="max-w-4xl text-5xl font-semibold leading-[.92] tracking-[-.055em] text-white sm:text-6xl lg:text-[5.35rem]">
                Social Trading
                <span className="block">Meets</span>
                <span className="mt-2 block bg-gradient-to-r from-violet-300 via-cyan-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(167,139,250,.28)]">On-Chain Execution.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">Discover high-signal traders, inspect chart context and explore programmable execution flows built around Monad, Kuru orderbooks, Chainlink CRE and AI-assisted analysis.</p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1.5 text-[10px] font-medium text-zinc-200 backdrop-blur-xl">Monad</span>
                <span className="rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1.5 text-[10px] font-medium text-zinc-200 backdrop-blur-xl">Kuru Orderbook</span>
                <span className="rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1.5 text-[10px] font-medium text-zinc-200 backdrop-blur-xl">Chainlink CRE</span>
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={onLaunchApp} className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-4 text-sm font-bold text-zinc-950 shadow-[0_0_42px_rgba(139,92,246,.25)] transition hover:-translate-y-1 hover:shadow-[0_0_65px_rgba(139,92,246,.38)]">
                  <span className="absolute inset-y-0 -left-20 w-16 skew-x-[-18deg] bg-white/35 blur-lg transition-transform duration-700 group-hover:translate-x-[500px]" />
                  Launch App
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
                <button type="button" onClick={onExploreTraders ?? (() => scrollTo('leaderboard'))} className="group flex items-center justify-center gap-2 rounded-2xl border border-zinc-700 bg-white/[.035] px-6 py-4 text-sm font-semibold text-zinc-200 shadow-[0_15px_45px_rgba(0,0,0,.18)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/[.06]">
                  <Users size={16} />Explore Traders<ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>

              <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/45 shadow-[0_20px_60px_rgba(0,0,0,.18)] backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-zinc-800/70 px-4 py-3">
                  <div className="flex items-center gap-2 text-[9px] uppercase tracking-[.18em] text-zinc-500"><Radio size={13} className="text-emerald-400" />Live Stats</div>
                  <div className="flex items-center gap-2 font-mono text-[9px] text-emerald-400"><span className="size-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.9)]" />STREAMING</div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-y divide-zinc-800/70 sm:grid-cols-4 sm:divide-y-0">{LIVE_STATS.map((item) => <LiveStat key={item.label} item={item} />)}</div>
                <div className="border-t border-zinc-800/70 bg-black/20 px-4 py-2.5">
                  <div className="flex items-center gap-2 overflow-hidden font-mono text-[9px] text-zinc-500"><span className="shrink-0 text-emerald-400">LIVE FEED</span><span className="text-zinc-700">/</span><span className="truncate">{TICKER[tickerIndex]}</span><span className="ml-auto hidden shrink-0 text-cyan-300 sm:block">signal 84%</span></div>
                </div>
              </div>

              <div className="mt-5 rounded-[1.65rem] border border-emerald-400/10 bg-gradient-to-br from-emerald-400/[.045] via-zinc-900/70 to-cyan-400/[.035] p-5 shadow-[0_25px_80px_rgba(52,211,153,.06)] backdrop-blur-xl">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[.18em] text-emerald-400"><Sparkles size={13} />Estimated Copy Returns</div>
                    <h3 className="mt-2 text-lg font-semibold">Set the simulation capital.</h3>
                    <p className="mt-1 text-xs leading-5 text-zinc-600">Illustrative fixed 34.7% mock ROI. Not a forecast.</p>
                  </div>
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/75 px-3 py-2 text-right"><div className="text-[8px] uppercase tracking-[.16em] text-zinc-600">Projected ROI</div><div className="mt-1 text-lg font-bold text-emerald-400">+34.7%</div></div>
                </div>

                <div className="mt-6 flex items-end justify-between gap-4">
                  <div><div className="text-[9px] uppercase tracking-[.14em] text-zinc-600">Capital</div><div className="mt-1 text-3xl font-semibold tracking-tight transition-all">{'$' + capital.toLocaleString()}</div></div>
                  <div className="text-right"><div className="text-[9px] uppercase tracking-[.14em] text-zinc-600">Projected Profit</div><div className="mt-1 text-xl font-bold text-emerald-400 transition-all">{'+$' + profit.toFixed(0)}</div></div>
                </div>

                <div className="relative mt-6">
                  <div className="pointer-events-none absolute inset-x-0 top-1/2 h-6 -translate-y-1/2 rounded-full bg-emerald-400/[.05] blur-lg" />
                  <input type="range" min="100" max="5000" step="25" value={capital} aria-label="Simulation capital" onChange={(event) => setCapital(Number(event.target.value))} className="relative z-10 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-800 accent-emerald-400" />
                  <div className="mt-2 flex justify-between font-mono text-[9px] text-zinc-600"><span>$100</span><span>$5,000</span></div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-zinc-800 bg-black/20 p-3"><div className="text-[8px] uppercase tracking-[.14em] text-zinc-600">Simulated Value</div><div className="mt-1 text-base font-semibold">{'$' + projectedValue.toFixed(0)}</div><Sparkline points={[2, 2.4, 2.7, 3.2, 3.6, 4.1, 4.7]} tone="cyan" /></div>
                  <div className="rounded-xl border border-emerald-500/10 bg-emerald-400/[.025] p-3"><div className="text-[8px] uppercase tracking-[.14em] text-zinc-600">Exposure Band</div><div className="mt-1 flex items-center gap-1.5 text-base font-semibold text-emerald-400"><span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />{riskLabel}</div><Sparkline points={[2.5, 2.8, 3.2, 3.1, 3.8, 4.1, 4.4]} /></div>
                </div>

                <div className="mt-4 rounded-xl border border-amber-500/10 bg-amber-500/[.03] px-3 py-2.5 text-[9px] leading-4 text-zinc-600">Prototype only. The return number is a fixed mock calculation and does not predict performance or submit a real trade.</div>
              </div>
            </div>

            <div id="terminal" className="relative scroll-mt-24">
              <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-emerald-500/10 via-indigo-500/[.05] to-cyan-500/10 blur-[72px]" />
              <div className="af-float relative overflow-hidden rounded-[2rem] border border-zinc-800/80 bg-zinc-900/60 shadow-[0_0_50px_rgba(16,185,129,0.15)] backdrop-blur-xl">
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/[.045] to-transparent" />
                <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 px-4 py-3">
                  <div className="flex items-center gap-2"><span className="size-2 rounded-full bg-rose-400/70" /><span className="size-2 rounded-full bg-amber-300/70" /><span className="size-2 rounded-full bg-emerald-400/80" /></div>
                  <div className="font-mono text-[9px] uppercase tracking-[.16em] text-zinc-500">AlphaFeed / Live Terminal</div>
                  <div className="flex items-center gap-2 text-[9px] text-emerald-400"><span className="size-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.8)]" />Live On Monad</div>
                </div>

                <div className="flex items-center gap-3 overflow-hidden border-b border-zinc-800/70 bg-black/20 px-4 py-2.5 font-mono text-[9px]">
                  <span className="shrink-0 text-emerald-400">MARKET STREAM</span><span className="text-zinc-700">/</span><span className="truncate text-zinc-400">{TICKER[tickerIndex]}</span>
                  <div className="ml-auto hidden items-center gap-3 sm:flex"><span className="text-zinc-600">SPREAD</span><span className="text-zinc-300">0.14%</span><span className="text-zinc-600">VOL</span><span className="text-cyan-300">$1.28M</span></div>
                </div>

                <div className="relative p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-800/80 bg-black/20 p-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="grid size-11 shrink-0 place-items-center rounded-full border border-emerald-400/25 bg-gradient-to-br from-emerald-300/30 to-cyan-400/10 text-xs font-bold text-emerald-200 shadow-[0_0_24px_rgba(52,211,153,.12)]">AC</div>
                      <div className="min-w-0"><div className="flex items-center gap-1.5 text-sm font-semibold">Alice Chen<ShieldCheck size={14} className="text-emerald-400" /></div><div className="mt-0.5 truncate text-[10px] text-zinc-600">@alice_alpha · Momentum & breakouts</div></div>
                    </div>
                    <div className="rounded-xl border border-emerald-400/15 bg-emerald-400/[.05] px-3 py-2 text-right"><div className="text-[8px] uppercase tracking-[.15em] text-zinc-600">ROI</div><div className="mt-0.5 text-lg font-bold text-emerald-400">+34.7%</div></div>
                  </div>

                  <div className="mt-4 flex items-end justify-between gap-4">
                    <div><div className="flex items-center gap-2 text-[9px] uppercase tracking-[.16em] text-zinc-600"><span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />Simulated asset</div><div className="mt-1 flex items-center gap-2 text-2xl font-semibold tracking-tight">MON<span className="rounded-md border border-emerald-400/20 bg-emerald-400/[.07] px-2 py-0.5 font-mono text-[9px] text-emerald-400">BUY</span></div></div>
                    <div className="text-right"><div className="text-[9px] uppercase tracking-[.15em] text-zinc-600">Mark</div><div className="mt-1 text-xl font-semibold">$0.0842</div></div>
                  </div>

                  <TradingChart hover={hover} onHover={setHover} />

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-1">
                    <div className="flex items-center gap-4 text-[9px] uppercase tracking-[.12em] text-zinc-600"><span className="flex items-center gap-1.5"><span className="h-1.5 w-4 rounded-full bg-emerald-400" />Bull</span><span className="flex items-center gap-1.5"><span className="h-1.5 w-4 rounded-full bg-rose-400" />Bear</span><span className="flex items-center gap-1.5"><span className="h-1.5 w-4 rounded-full bg-cyan-400" />Trend</span></div>
                    <span className="font-mono text-[9px] text-zinc-600">Hover for price context</span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2.5">
                    <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/[.025] p-3"><div className="flex items-center justify-between text-[8px] uppercase tracking-[.14em] text-zinc-600"><span>Entry</span><Target size={12} className="text-cyan-400" /></div><div className="mt-2 font-mono text-xs font-semibold text-cyan-300">$0.0842</div><Sparkline points={[2, 2.1, 2.2, 2.05, 2.35, 2.4, 2.55]} tone="cyan" /></div>
                    <div className="rounded-xl border border-emerald-400/10 bg-emerald-400/[.025] p-3"><div className="flex items-center justify-between text-[8px] uppercase tracking-[.14em] text-zinc-600"><span>Take Profit</span><TrendingUp size={12} className="text-emerald-400" /></div><div className="mt-2 font-mono text-xs font-semibold text-emerald-300">$0.1028</div><Sparkline points={[2, 2.4, 2.7, 3.1, 3.5, 4.2, 4.8]} /></div>
                    <div className="rounded-xl border border-rose-400/10 bg-rose-400/[.025] p-3"><div className="flex items-center justify-between text-[8px] uppercase tracking-[.14em] text-zinc-600"><span>Stop Loss</span><TrendingDown size={12} className="text-rose-400" /></div><div className="mt-2 font-mono text-xs font-semibold text-rose-300">$0.0784</div><Sparkline points={[4.9, 4.5, 4.2, 4, 3.7, 3.4, 3.1]} tone="red" /></div>
                  </div>

                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-black/20 px-3 py-2.5"><Globe2 size={13} className="text-emerald-400" /><div><div className="text-[8px] uppercase tracking-[.13em] text-zinc-600">Network</div><div className="text-[10px] text-zinc-300">Monad</div></div></div>
                    <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-black/20 px-3 py-2.5"><BarChart3 size={13} className="text-cyan-400" /><div><div className="text-[8px] uppercase tracking-[.13em] text-zinc-600">Orderbook</div><div className="text-[10px] text-zinc-300">Kuru</div></div></div>
                    <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-black/20 px-3 py-2.5"><ShieldCheck size={13} className="text-emerald-400" /><div><div className="text-[8px] uppercase tracking-[.13em] text-zinc-600">Status</div><div className="text-[10px] text-emerald-300">UI verified</div></div></div>
                  </div>

                  <button type="button" onClick={onLaunchApp} className="group relative mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 py-3.5 text-sm font-bold text-zinc-950 shadow-[0_0_38px_rgba(52,211,153,.18)] transition hover:-translate-y-0.5 hover:shadow-[0_0_58px_rgba(52,211,153,.30)]">
                    <span className="absolute inset-y-0 -left-16 w-12 skew-x-[-18deg] bg-white/30 blur-lg transition-transform duration-700 group-hover:translate-x-[700px]" />
                    <Copy size={15} />Copy Trade Preview<ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </button>

                  <div className="mt-3 flex items-center justify-center gap-2 text-[8px] uppercase tracking-[.15em] text-zinc-700"><ShieldCheck size={11} className="text-zinc-600" />Prototype interface · simulated execution · no real order submitted</div>
                </div>

                <div className="af-float-slow absolute -right-5 top-[19%] hidden w-40 rounded-2xl border border-cyan-400/10 bg-zinc-900/75 p-3 shadow-[0_0_30px_rgba(34,211,238,.07)] backdrop-blur-xl xl:block">
                  <div className="flex items-center justify-between"><span className="text-[8px] uppercase tracking-[.14em] text-zinc-600">Feed Pulse</span><Activity size={12} className="text-cyan-400" /></div>
                  <div className="mt-2 text-sm font-semibold">328 ideas</div>
                  <Sparkline points={[3, 3.6, 3.4, 4.2, 4.8, 5.2, 6.1]} tone="cyan" />
                </div>

                <div className="af-float absolute -left-7 bottom-[7%] hidden w-44 rounded-2xl border border-emerald-400/10 bg-zinc-900/75 p-3 shadow-[0_0_30px_rgba(52,211,153,.07)] backdrop-blur-xl xl:block">
                  <div className="flex items-center gap-2 text-[8px] uppercase tracking-[.14em] text-zinc-600"><Link2 size={12} className="text-emerald-400" />Execution route</div>
                  <div className="mt-2 font-mono text-[10px] text-zinc-300">MON → KURU → CRE</div>
                  <div className="mt-2 flex items-center gap-2 text-[9px] text-emerald-400"><span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />Simulated route</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-zinc-800/70 bg-zinc-900/20">
          <div className="mx-auto grid max-w-[1500px] grid-cols-2 divide-x divide-y divide-zinc-800/70 sm:grid-cols-4 sm:divide-y-0">
            {FLOW_ITEMS.map((item) => {
              const Icon = item.icon
              return <div key={item.number} className="group relative overflow-hidden px-5 py-7 sm:px-8"><div className="absolute right-5 top-3 text-5xl font-black text-white/[.025]">{item.number}</div><Icon size={18} className="text-emerald-400 transition-transform group-hover:scale-110" /><div className="mt-5 text-[10px] uppercase tracking-[.14em] text-zinc-600">{item.title}</div><div className="mt-1 text-sm font-medium text-zinc-300">{item.description}</div></div>
            })}
          </div>
        </section>

        <section id="features" className="scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1500px]">
            <SectionHeading eyebrow="The AlphaFeed Loop" title="A social feed that feels like a cyber trading desk." text="Discover, analyze, verify and automate through one dense, chart-first product surface." />
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {FLOW_ITEMS.map((item) => {
                const Icon = item.icon
                return <div key={item.number} className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/45 p-6 shadow-[0_25px_80px_rgba(0,0,0,.18)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-emerald-400/20">
                  <div className="absolute -right-8 -top-8 size-32 rounded-full bg-emerald-400/[.05] blur-3xl transition group-hover:bg-emerald-400/[.1]" />
                  <div className="relative flex items-start justify-between"><div className="grid size-11 place-items-center rounded-xl border border-emerald-400/15 bg-emerald-400/[.06] text-emerald-300"><Icon size={20} /></div><span className="text-5xl font-black tracking-tight text-white/[.03]">{item.number}</span></div>
                  <h3 className="relative mt-8 text-xl font-semibold">{item.title}</h3>
                  <p className="relative mt-3 text-sm leading-6 text-zinc-500">{item.description}</p>
                  <div className="relative mt-6 flex flex-wrap gap-2">{item.chips.map((chip) => <span key={chip} className="rounded-full border border-zinc-800 bg-zinc-950/70 px-2.5 py-1 text-[9px] uppercase tracking-[.12em] text-zinc-600">{chip}</span>)}</div>
                  <div className="relative mt-7 flex items-center gap-2 text-[10px] uppercase tracking-[.15em] text-emerald-400">Explore module<ChevronRight size={14} className="transition-transform group-hover:translate-x-1" /></div>
                </div>
              })}
            </div>
          </div>
        </section>

        <section id="leaderboard" className="scroll-mt-20 border-y border-zinc-800/70 bg-zinc-900/[.14] px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1500px] items-center gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <SectionHeading eyebrow="Leaderboard Intelligence" title="Data-rich trader discovery." text="Performance becomes a compact decision layer with reputation, micro charts and verification states." />
            <div className="grid gap-3">
              {[
                ['Alice Chen', '@alice_alpha', '+34.7%', '68.2%', '12.4K'],
                ['David Rao', '@davidflow', '+28.3%', '71.4%', '8.2K'],
                ['Sarah Malik', '@sarahcharts', '+24.1%', '65.0%', '6.4K'],
              ].map(([name, handle, roi, win, followers], index) => (
                <div key={handle} className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 transition hover:border-emerald-400/20 hover:bg-zinc-900/70">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="grid size-10 place-items-center rounded-full border border-zinc-700 bg-gradient-to-br from-emerald-300/20 to-cyan-400/10 text-[10px] font-bold text-zinc-200">{name.split(' ').map((part) => part[0]).join('')}</div>
                      <div><div className="flex items-center gap-1.5 text-sm font-semibold">{name}<ShieldCheck size={13} className="text-emerald-400" /></div><div className="text-[10px] text-zinc-600">{handle}</div></div>
                    </div>
                    <div className="ml-auto grid grid-cols-3 gap-5 text-right">
                      <div><div className="text-[8px] uppercase tracking-[.12em] text-zinc-600">ROI</div><div className="mt-1 text-sm font-semibold text-emerald-400">{roi}</div></div>
                      <div><div className="text-[8px] uppercase tracking-[.12em] text-zinc-600">Win</div><div className="mt-1 text-sm font-semibold text-zinc-200">{win}</div></div>
                      <div><div className="text-[8px] uppercase tracking-[.12em] text-zinc-600">Followers</div><div className="mt-1 text-sm font-semibold text-zinc-200">{followers}</div></div>
                    </div>
                  </div>
                  <div className="mt-3"><Sparkline points={index === 0 ? [2, 2.4, 2.3, 3, 3.4, 4.2, 5] : index === 1 ? [2.5, 2.4, 3, 2.8, 3.6, 4.1, 4.7] : [2, 2.3, 2.2, 2.8, 3.1, 3.7, 4.2]} tone={index === 1 ? 'cyan' : 'emerald'} /></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="infrastructure" className="scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1500px]">
            <SectionHeading eyebrow="Infrastructure" title="Web3 rails rendered as terminal telemetry." text="Monad, Kuru, Chainlink CRE and Hunyuan AI become visible infrastructure modules instead of generic marketing badges." />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <TechBadge label="Monad" detail="Execution layer" icon={Globe2} tone="emerald" />
              <TechBadge label="Kuru DEX" detail="On-chain orderbook" icon={BarChart3} tone="cyan" />
              <TechBadge label="Chainlink CRE" detail="Composable workflows" icon={Link2} tone="indigo" />
              <TechBadge label="Hunyuan AI" detail="Assisted analysis" icon={Brain} tone="purple" />
            </div>
            <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900/45 p-5 backdrop-blur-xl sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div><div className="flex items-center gap-2 text-[9px] uppercase tracking-[.18em] text-emerald-400"><ShieldCheck size={13} />Prototype architecture</div><h3 className="mt-2 text-xl font-semibold">A continuous signal → analysis → verification → execution loop.</h3></div>
                <div className="flex flex-wrap gap-2 font-mono text-[9px] uppercase tracking-[.12em] text-zinc-500">{['DISCOVER', '→', 'ANALYZE', '→', 'VERIFY', '→', 'AUTOMATE'].map((item, index) => <span key={item + index} className={item === '→' ? 'text-zinc-700' : 'rounded-full border border-zinc-800 bg-zinc-950 px-2.5 py-1.5'}>{item}</span>)}</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-800/80 bg-zinc-950">
        <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-8 px-4 py-12 sm:px-6 md:flex-row lg:px-8">
          <div>
            <div className="flex items-center gap-2 font-semibold"><span className="grid size-8 place-items-center rounded-lg bg-emerald-400 text-zinc-950">α</span>Alpha<span className="text-emerald-400">Feed</span></div>
            <p className="mt-3 max-w-md text-xs leading-6 text-zinc-600">Cinematic Web3 social-trading interface for trader discovery, chart intelligence and programmable workflows.</p>
            <div className="mt-4 flex items-center gap-2 text-[8px] uppercase tracking-[.15em] text-zinc-700"><ShieldCheck size={11} />Prototype UI · simulated data</div>
          </div>
          <div className="flex items-start gap-2">
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X" className="grid size-10 place-items-center rounded-xl border border-zinc-800 text-zinc-500 transition hover:border-zinc-700 hover:text-white">𝕏</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="grid size-10 place-items-center rounded-xl border border-zinc-800 text-zinc-500 transition hover:border-zinc-700 hover:text-white"><Github size={15} /></a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" aria-label="Discord" className="grid size-10 place-items-center rounded-xl border border-zinc-800 text-zinc-500 transition hover:border-zinc-700 hover:text-white"><MessageCircle size={15} /></a>
          </div>
        </div>
      </footer>
    </div>
  )
}
