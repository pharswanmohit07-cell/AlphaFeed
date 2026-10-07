import { useMemo, useState } from 'react'
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Bell,
  Check,
  ChevronDown,
  CircleDollarSign,
  Compass,
  Copy,
  Gauge,
  Heart,
  Home,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Radio,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
  Trophy,
  Wallet,
  X,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Trader = {
  id: string
  name: string
  handle: string
  followers: string
  roi: string
  winRate: string
  avatar: string
  accent: string
  specialty: string
}

type Post = {
  id: string
  trader: Trader
  time: string
  side: 'BUY' | 'SELL'
  token: string
  pair: string
  entry: string
  target: string
  stop: string
  text: string
  likes: number
  comments: number
  chart: 'up' | 'down'
  confidence: string
}

const traders: Trader[] = [
  { id: 'alice', name: 'Alice Chen', handle: '@alice_alpha', followers: '12.4K', roi: '+34.7%', winRate: '68.2%', avatar: 'AC', accent: 'from-emerald-300/30 to-emerald-700/20', specialty: 'Momentum & breakouts' },
  { id: 'david', name: 'David Rao', handle: '@davidflow', followers: '8.2K', roi: '+28.3%', winRate: '71.4%', avatar: 'DR', accent: 'from-cyan-300/30 to-cyan-700/20', specialty: 'Market structure' },
  { id: 'sarah', name: 'Sarah Malik', handle: '@sarahcharts', followers: '6.4K', roi: '+24.1%', winRate: '65.0%', avatar: 'SM', accent: 'from-violet-300/30 to-violet-700/20', specialty: 'Swing setups' },
  { id: 'leo', name: 'Leo Park', handle: '@leopark', followers: '4.9K', roi: '+19.8%', winRate: '63.7%', avatar: 'LP', accent: 'from-amber-300/30 to-amber-700/20', specialty: 'Scalping & flow' },
]

const initialPosts: Post[] = [
  {
    id: '1',
    trader: traders[0],
    time: '8 min',
    side: 'BUY',
    token: 'MON',
    pair: 'MON / USDC',
    entry: '$0.4208',
    target: '$0.5100',
    stop: '$0.3810',
    text: 'Clean reclaim of the intraday range. Watching for continuation above local resistance with a tight invalidation.',
    likes: 184,
    comments: 26,
    chart: 'up',
    confidence: '84%',
  },
  {
    id: '2',
    trader: traders[1],
    time: '24 min',
    side: 'SELL',
    token: 'ETH',
    pair: 'ETH / USDC',
    entry: '$3,812',
    target: '$3,650',
    stop: '$3,875',
    text: 'Momentum is fading into resistance. Waiting for confirmation before scaling into the short.',
    likes: 96,
    comments: 14,
    chart: 'down',
    confidence: '77%',
  },
  {
    id: '3',
    trader: traders[2],
    time: '41 min',
    side: 'BUY',
    token: 'BTC',
    pair: 'BTC / USDC',
    entry: '$118,240',
    target: '$121,400',
    stop: '$116,900',
    text: 'Higher-timeframe trend is intact. Looking for a controlled pullback and another expansion leg.',
    likes: 72,
    comments: 11,
    chart: 'up',
    confidence: '73%',
  },
]

const trendings = [
  { token: 'MON', price: '$0.4208', change: '+8.4%', volume: '$4.8M' },
  { token: 'ETH', price: '$3,812', change: '+3.1%', volume: '$1.9B' },
  { token: 'BTC', price: '$118,240', change: '+1.7%', volume: '$32.4B' },
]

const navigationItems: { label: string; icon: LucideIcon }[] = [
  { label: 'Home', icon: Home },
  { label: 'Explore', icon: Compass },
  { label: 'Leaderboard', icon: Trophy },
  { label: 'Portfolio', icon: Wallet },
]

function Avatar({ trader, large = false, small = false }: { trader: Trader; large?: boolean; small?: boolean }) {
  const size = large ? 'size-14 text-sm' : small ? 'size-8 text-[10px]' : 'size-10 text-xs'
  return <div className={'grid shrink-0 place-items-center rounded-full border border-white/10 bg-gradient-to-br font-semibold text-slate-100 ' + trader.accent + ' ' + size}>{trader.avatar}</div>
}

function MiniChart({ down = false }: { down?: boolean }) {
  const points = down
    ? '0,24 24,27 54,18 86,25 118,37 149,31 183,46 217,40 252,55 287,51 323,68 360,62 402,76'
    : '0,68 26,61 54,72 84,55 115,61 146,44 176,51 207,34 240,40 273,24 311,29 351,18 402,11'
  return <svg viewBox="0 0 402 90" className="h-14 w-full" preserveAspectRatio="none"><polyline fill="none" stroke={down ? '#63d8ff' : '#74f27c'} strokeWidth="3" points={points} /></svg>
}

function ChartCard({ post }: { post: Post }) {
  const points = post.chart === 'up'
    ? '0,168 42,158 88,174 134,136 176,146 226,116 267,127 315,92 362,103 406,70 462,76 522,47 600,31'
    : '0,58 46,67 92,48 138,68 182,86 232,76 281,104 331,93 382,120 432,110 484,139 536,126 600,145'
  return (
    <div className="relative h-56 overflow-hidden bg-[#080d12]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(116,242,124,.10),transparent_28%),radial-gradient(circle_at_88%_75%,rgba(99,216,255,.06),transparent_30%)]" />
      <div className="absolute inset-x-5 top-[34%] border-t border-dashed border-slate-800" />
      <div className="absolute inset-x-5 top-[68%] border-t border-dashed border-slate-900" />
      <svg viewBox="0 0 600 220" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={'fill-' + post.id} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#74f27c" stopOpacity="0.18" /><stop offset="100%" stopColor="#74f27c" stopOpacity="0" /></linearGradient>
        </defs>
        <path d={\`M 0 \${post.chart === 'up' ? 168 : 58} L \${post.chart === 'up' ? '42 158 88 174 134 136 176 146 226 116 267 127 315 92 362 103 406 70 462 76 522 47 600 31' : '46 67 92 48 138 68 182 86 232 76 281 104 331 93 382 120 432 110 484 139 536 126 600 145'} L 600 220 L 0 220 Z\`} fill={'url(#fill-' + post.id + ')'} />
        <polyline fill="none" stroke={post.chart === 'up' ? '#74f27c' : '#63d8ff'} strokeWidth="4" points={points} />
      </svg>
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] text-slate-400 backdrop-blur"><Radio size={11} className="text-accent" /> Live market</div>
      <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] text-slate-400 backdrop-blur">{post.confidence} confidence</div>
      <div className="absolute bottom-3 left-4 text-[11px] text-slate-600">1H · Kuru</div>
      <div className="absolute bottom-3 right-4 text-[11px] text-slate-600">on-chain idea</div>
    </div>
  )
}

function Stat({ label, value, positive = false }: { label: string; value: string; positive?: boolean }) {
  return <div><div className="text-[10px] uppercase tracking-[0.14em] text-slate-600">{label}</div><div className={'mt-1 text-sm font-semibold ' + (positive ? 'text-accent' : 'text-white')}>{value}</div></div>
}

function PostCard({ post, onCopy, onProfile }: { post: Post; onCopy: (trader: Trader, post: Post) => void; onProfile: (trader: Trader) => void }) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  return (
    <article className="group border-b border-line px-4 py-6 sm:px-6">
      <div className="flex gap-3.5">
        <button onClick={() => onProfile(post.trader)} className="transition hover:scale-105"><Avatar trader={post.trader} /></button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={() => onProfile(post.trader)} className="font-semibold text-white hover:underline">{post.trader.name}</button>
            <span className="hidden text-slate-600 sm:inline">{post.trader.handle}</span>
            <span className="text-slate-700">·</span>
            <span className="text-slate-600">{post.time}</span>
            <span className="hidden items-center gap-1 rounded-full border border-emerald-900/70 bg-emerald-500/[0.04] px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-accent sm:flex"><ShieldCheck size={11} />verified</span>
            <button className="ml-auto rounded-lg p-1.5 text-slate-600 hover:bg-white/[0.04] hover:text-slate-300" aria-label="More"><MoreHorizontal size={17} /></button>
          </div>

          <p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-300">{post.text}</p>

          <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-panel shadow-[0_16px_50px_rgba(0,0,0,.20)] transition group-hover:border-slate-700">
            <div className="grid grid-cols-4 gap-3 border-b border-line px-4 py-3.5">
              <Stat label="Asset" value={post.token} />
              <Stat label="Side" value={post.side} positive={post.side === 'BUY'} />
              <Stat label="Entry" value={post.entry} />
              <Stat label="Target" value={post.target} positive />
            </div>
            <ChartCard post={post} />
            <div className="grid grid-cols-3 gap-3 border-t border-line bg-black/10 px-4 py-3.5 text-xs">
              <div><span className="text-slate-600">Stop</span><span className="ml-2 text-white">{post.stop}</span></div>
              <div><span className="text-slate-600">Pair</span><span className="ml-2 text-white">{post.pair}</span></div>
              <div className="text-right"><span className="text-slate-600">Status</span><span className="ml-2 text-accent">Live</span></div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-5 text-xs text-slate-600">
            <button onClick={() => setLiked((value) => !value)} className={'flex items-center gap-1.5 transition hover:text-slate-300 ' + (liked ? 'text-rose-400' : '')}><Heart size={15} fill={liked ? 'currentColor' : 'none'} />{post.likes + (liked ? 1 : 0)}</button>
            <button className="flex items-center gap-1.5 hover:text-slate-300"><MessageCircle size={15} />{post.comments}</button>
            <button onClick={() => setSaved((value) => !value)} className={'flex items-center gap-1.5 hover:text-slate-300 ' + (saved ? 'text-amber-300' : '')}><Star size={14} fill={saved ? 'currentColor' : 'none'} />{saved ? 'Saved' : 'Save'}</button>
            <button className="hidden items-center gap-1.5 hover:text-slate-300 sm:flex"><Copy size={14} />Share</button>
            <button onClick={() => onCopy(post.trader, post)} className="ml-auto inline-flex items-center gap-1.5 rounded-xl bg-accent px-3.5 py-2 font-bold text-ink shadow-[0_0_22px_rgba(116,242,124,.12)] transition hover:brightness-105"><Copy size={14} />Copy Trade</button>
          </div>
        </div>
      </div>
    </article>
  )
}

function TraderCard({ trader, onCopy, onProfile }: { trader: Trader; onCopy: (trader: Trader) => void; onProfile: (trader: Trader) => void }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-line bg-panel p-5 transition hover:-translate-y-1 hover:border-slate-700 hover:shadow-2xl">
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-accent/[0.04] blur-2xl transition group-hover:bg-accent/[0.08]" />
      <div className="relative flex items-start gap-3">
        <button onClick={() => onProfile(trader)}><Avatar trader={trader} /></button>
        <div className="min-w-0">
          <button onClick={() => onProfile(trader)} className="font-semibold text-white hover:underline">{trader.name}</button>
          <div className="text-xs text-slate-600">{trader.handle}</div>
        </div>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-emerald-900/60 bg-emerald-500/[0.03] px-2 py-1 text-[10px] text-accent"><ShieldCheck size={11} />Verified</span>
      </div>
      <div className="relative mt-4 text-xs text-slate-500">{trader.specialty}</div>
      <div className="relative mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-xl border border-line bg-[#0a0e13] p-3"><div className="text-[10px] uppercase tracking-wider text-slate-600">ROI</div><div className="mt-1 font-semibold text-accent">{trader.roi}</div></div>
        <div className="rounded-xl border border-line bg-[#0a0e13] p-3"><div className="text-[10px] uppercase tracking-wider text-slate-600">Win rate</div><div className="mt-1 font-semibold">{trader.winRate}</div></div>
        <div className="rounded-xl border border-line bg-[#0a0e13] p-3"><div className="text-[10px] uppercase tracking-wider text-slate-600">Followers</div><div className="mt-1 font-semibold">{trader.followers}</div></div>
      </div>
      <div className="relative mt-4 rounded-xl border border-line bg-[#0a0e13] px-3 py-2"><MiniChart /><div className="mt-1 flex justify-between text-[10px] text-slate-600"><span>30D performance</span><span className="text-accent">verified</span></div></div>
      <div className="relative mt-4 flex gap-2"><button onClick={() => onProfile(trader)} className="flex-1 rounded-xl border border-line py-2.5 text-sm text-slate-300 hover:border-slate-600">View profile</button><button onClick={() => onCopy(trader)} className="flex-1 rounded-xl bg-accent py-2.5 text-sm font-bold text-ink">Copy Trade</button></div>
    </div>
  )
}

function CopyModal({ trader, post, onClose }: { trader: Trader; post: Post | null; onClose: () => void }) {
  const [amount, setAmount] = useState('50')
  const [mode, setMode] = useState<'fixed' | 'percent'>('fixed')
  const [enabled, setEnabled] = useState(true)
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-line bg-[#0c1016] p-5 shadow-2xl">
        <div className="flex items-start justify-between"><div><div className="text-lg font-semibold">Copy {trader.name}</div><div className="mt-1 text-xs text-slate-600">Set rules once. AlphaFeed handles the rest when connected.</div></div><button onClick={onClose} className="rounded-xl border border-line p-2 text-slate-400 hover:text-white"><X size={17} /></button></div>
        <div className="mt-5 rounded-2xl border border-line bg-panel p-4">
          <div className="flex items-center justify-between"><span className="text-xs text-slate-600">Latest setup</span><span className={post?.side === 'SELL' ? 'text-xs text-rose-400' : 'text-xs text-accent'}>{post?.side ?? 'BUY'} {post?.token ?? 'MON'}</span></div>
          <div className="mt-3 flex items-end justify-between"><div><div className="text-2xl font-semibold">{post?.entry ?? '$0.4208'}</div><div className="mt-1 text-xs text-slate-600">Entry price</div></div><div className="text-right text-xs"><div className="text-accent">Target {post?.target ?? '$0.5100'}</div><div className="mt-1 text-rose-400">Stop {post?.stop ?? '$0.3810'}</div></div></div>
        </div>
        <div className="mt-5 space-y-4">
          <div><div className="text-xs text-slate-500">Copy mode</div><div className="mt-2 grid grid-cols-2 gap-2">{[['fixed','Fixed amount'],['percent','Percent of trade']].map(([key,label]) => <button key={key} onClick={() => setMode(key as 'fixed' | 'percent')} className={'rounded-xl border px-3 py-2.5 text-xs ' + (mode === key ? 'border-slate-500 bg-white/[0.05] text-white' : 'border-line text-slate-500')}>{label}</button>)}</div></div>
          <div><label htmlFor="copyAmount" className="text-xs text-slate-500">{mode === 'fixed' ? 'Maximum per trade' : 'Copy percentage'}</label><div className="relative mt-2"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600">{mode === 'fixed' ? '$' : '%'}</span><input id="copyAmount" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))} className="w-full rounded-xl border border-line bg-panel py-3 pl-8 pr-3 text-sm text-white outline-none focus:border-slate-600" /></div></div>
          <div className="flex items-center justify-between rounded-xl border border-line bg-panel p-3"><div><div className="text-sm">Copy trading</div><div className="text-xs text-slate-600">Pause when your limits are reached</div></div><button onClick={() => setEnabled((value) => !value)} className={'h-7 w-12 rounded-full p-1 transition ' + (enabled ? 'bg-accent' : 'bg-slate-700')}><span className={'block size-5 rounded-full bg-ink transition ' + (enabled ? 'translate-x-5' : 'translate-x-0')} /></button></div>
          <div className="rounded-xl border border-amber-900/50 bg-amber-950/20 p-3 text-xs leading-5 text-amber-200/80">Trading involves risk. Copy settings are examples for this prototype and do not execute a real trade.</div>
          <button onClick={onClose} className="w-full rounded-xl bg-accent py-3 text-sm font-bold text-ink">Save Copy Settings</button>
        </div>
      </div>
    </div>
  )
}

function ProfileModal({ trader, onClose, onCopy }: { trader: Trader; onClose: () => void; onCopy: (trader: Trader) => void }) {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black/70 p-4 backdrop-blur-sm">
      <div className="mx-auto my-6 w-full max-w-2xl rounded-3xl border border-line bg-[#0c1016] shadow-2xl">
        <div className="h-32 rounded-t-3xl bg-[radial-gradient(circle_at_15%_30%,rgba(116,242,124,.18),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(99,216,255,.10),transparent_30%),linear-gradient(120deg,#111823,#0a0f15)]" />
        <div className="-mt-8 px-6 pb-6">
          <div className="flex items-end justify-between"><Avatar trader={trader} large /><button onClick={onClose} className="rounded-xl border border-line p-2 text-slate-400"><X size={17} /></button></div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xl font-semibold">{trader.name}<span className="rounded-full bg-accent/10 p-1 text-accent"><ShieldCheck size={14} /></span><span className="rounded-full border border-line px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-slate-500">on-chain verified</span></div>
          <div className="text-sm text-slate-600">{trader.handle}</div>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">{trader.specialty}. Public performance is intended to be calculated from verifiable trading activity.</p>
          <div className="mt-5 flex gap-2"><button className="rounded-xl border border-line px-4 py-2.5 text-sm text-slate-300">Follow</button><button onClick={() => onCopy(trader)} className="rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-ink">Copy Trade</button></div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">{[['ROI',trader.roi],['Win rate',trader.winRate],['Trades','143'],['Followers',trader.followers]].map(([a,b],i) => <div key={a} className="rounded-2xl border border-line bg-panel p-4"><div className="text-[10px] uppercase tracking-[0.14em] text-slate-600">{a}</div><div className={'mt-2 font-semibold ' + (i === 0 ? 'text-accent' : '')}>{b}</div></div>)}</div>
          <div className="mt-5 rounded-2xl border border-line bg-panel p-5"><div className="flex items-center justify-between"><div className="flex items-center gap-2 font-semibold"><BarChart3 size={16} />Performance</div><span className="rounded-full bg-accent/10 px-2 py-1 text-xs text-accent">30D</span></div><div className="mt-4 h-44 rounded-xl bg-[#0a0e13] p-2"><svg viewBox="0 0 600 180" className="h-full w-full" preserveAspectRatio="none"><polyline fill="none" stroke="#74f27c" strokeWidth="4" points="0,145 52,141 108,133 162,138 217,119 274,124 325,98 383,107 438,81 495,87 546,55 600,39" /></svg></div></div>
          <div className="mt-5 flex items-center gap-2 text-sm font-semibold"><ShieldCheck size={15} className="text-accent" />Recent verified trades</div>
          <div className="mt-3 space-y-2">{[['MON','BUY','+12.4%'],['ETH','SELL','+8.1%'],['BTC','BUY','+5.7%']].map(([a,b,c]) => <div key={a} className="flex items-center rounded-xl border border-line bg-panel px-4 py-3 text-sm"><span className="w-16 font-semibold">{a}</span><span className={'text-xs ' + (b === 'BUY' ? 'text-accent' : 'text-rose-400')}>{b}</span><span className="ml-auto font-semibold text-accent">{c}</span></div>)}</div>
        </div>
      </div>
    </div>
  )
}

function Composer({ onClose, onPublish }: { onClose: () => void; onPublish: (text: string) => void }) {
  const [text, setText] = useState('')
  const [token, setToken] = useState('MON')
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY')
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-3xl border border-line bg-[#0c1016] p-5 shadow-2xl">
        <div className="flex items-center justify-between"><div><div className="text-lg font-semibold">Create trade idea</div><div className="mt-1 text-xs text-slate-600">Share a setup with your followers.</div></div><button onClick={onClose} className="rounded-xl border border-line p-2 text-slate-400"><X size={17} /></button></div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} placeholder="Share your setup, thesis, or execution notes..." className="mt-5 w-full resize-none rounded-2xl border border-line bg-panel p-4 text-sm leading-6 text-white outline-none placeholder:text-slate-600 focus:border-slate-600" />
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div><label className="text-xs text-slate-500">Asset</label><select value={token} onChange={(e) => setToken(e.target.value)} className="mt-2 w-full rounded-xl border border-line bg-panel px-3 py-2.5 text-sm outline-none"><option>MON</option><option>ETH</option><option>BTC</option></select></div>
          <div><div className="text-xs text-slate-500">Direction</div><div className="mt-2 grid grid-cols-2 gap-2"><button onClick={() => setSide('BUY')} className={'rounded-xl border py-2.5 text-xs ' + (side === 'BUY' ? 'border-emerald-800 bg-emerald-500/10 text-accent' : 'border-line text-slate-500')}>BUY</button><button onClick={() => setSide('SELL')} className={'rounded-xl border py-2.5 text-xs ' + (side === 'SELL' ? 'border-rose-900 bg-rose-500/10 text-rose-300' : 'border-line text-slate-500')}>SELL</button></div></div>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-xl border border-dashed border-line bg-panel p-3 text-xs text-slate-500"><Sparkles size={15} className="text-accent" />AI analysis can be connected to Hunyuan later.</div>
        <button onClick={() => { if (text.trim()) onPublish(text.trim()) }} className="mt-5 w-full rounded-xl bg-accent py-3 text-sm font-bold text-ink">Publish trade idea</button>
      </div>
    </div>
  )
}

function Sidebar({ active, setActive }: { active: string; setActive: (value: string) => void }) {
  return (
    <aside className="hidden min-h-[calc(100vh-64px)] border-r border-line p-4 lg:block">
      <nav className="space-y-1">{navigationItems.map(({ label, icon: Icon }) => <button key={label} onClick={() => setActive(label)} className={'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm ' + (active === label ? 'bg-white/[0.07] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,.04)]' : 'text-slate-500 hover:bg-white/[0.03] hover:text-slate-300')}><Icon size={18} />{label}</button>)}</nav>
      <div className="mt-7 border-t border-line pt-5"><button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-500 hover:text-slate-300"><Settings size={18} />Settings</button></div>
      <div className="mt-7 rounded-2xl border border-line bg-panel p-4"><div className="flex items-center gap-2 text-xs font-semibold text-slate-300"><Sparkles size={14} className="text-accent" />Alpha Insight</div><p className="mt-2 text-sm leading-6 text-slate-600">Use AI to summarize charts and trading theses. Every actual execution remains traceable on-chain.</p><div className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-wider text-slate-600"><span className="size-1.5 rounded-full bg-accent" />Hunyuan ready</div></div>
      <div className="mt-4 rounded-2xl border border-line bg-gradient-to-br from-white/[0.04] to-transparent p-4"><div className="flex items-center gap-2 text-xs text-slate-400"><Gauge size={14} />Market health</div><div className="mt-3 flex items-end justify-between"><span className="text-2xl font-semibold">78</span><span className="text-xs text-accent">Healthy</span></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full w-[78%] rounded-full bg-accent" /></div></div>
    </aside>
  )
}

function RightRail({ onProfile }: { onProfile: (trader: Trader) => void }) {
  return (
    <aside className="hidden min-h-[calc(100vh-64px)] p-5 xl:block">
      <div className="flex items-center justify-between"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500"><TrendingUp size={15} />Market pulse</div><span className="text-[10px] text-slate-600">Live</span></div>
      <div className="mt-4 space-y-2">{trendings.map((item) => <div key={item.token} className="rounded-2xl border border-line bg-panel p-3.5 transition hover:border-slate-700"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="grid size-8 place-items-center rounded-lg bg-white/[0.04] text-[10px] font-bold">{item.token[0]}</div><div><div className="text-sm font-semibold">{item.token}</div><div className="text-[10px] text-slate-600">24h volume {item.volume}</div></div></div><span className="text-xs font-semibold text-accent">{item.change}</span></div><div className="mt-2 flex items-end justify-between"><span className="text-sm text-slate-300">{item.price}</span><span className="w-28"><MiniChart /></span></div></div>)}</div>

      <div className="mt-8 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.15em] text-slate-500"><span>Who to follow</span><button className="text-[10px] text-slate-600 hover:text-slate-300">View all</button></div>
      <div className="mt-3 space-y-2">{traders.slice(0,3).map((trader) => <button key={trader.id} onClick={() => onProfile(trader)} className="flex w-full items-center gap-3 rounded-xl border border-line bg-panel p-3 text-left hover:border-slate-700"><Avatar trader={trader} small /><div className="min-w-0 flex-1"><div className="truncate text-sm font-semibold">{trader.name}</div><div className="text-xs text-slate-600">{trader.handle}</div></div><ArrowUpRight size={14} className="text-slate-700" /></button>)}</div>

      <div className="mt-8 rounded-2xl border border-line bg-panel p-4"><div className="flex items-center gap-2 text-xs font-semibold text-slate-300"><Activity size={14} className="text-accent" />Live activity</div><div className="mt-3 space-y-3">{[['Alice Chen','bought MON','$250'],['David Rao','sold ETH','$1,200'],['Sarah Malik','bought BTC','$680']].map(([name,action,amount],i) => <div key={name} className="flex items-start gap-2.5"><div className="mt-1 size-1.5 rounded-full bg-accent" /><div className="min-w-0 text-xs leading-5 text-slate-500"><span className="text-slate-300">{name}</span> {action} <span className="text-slate-300">{amount}</span><div className="text-[10px] text-slate-700">{i + 1} min ago · verified execution</div></div></div>)}</div></div>
    </aside>
  )
}

function Explore({ onCopy, onProfile }: { onCopy: (trader: Trader) => void; onProfile: (trader: Trader) => void }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('Top ROI')
  const visible = traders.filter((t) => (t.name + t.handle + t.specialty).toLowerCase().includes(query.toLowerCase()))
  return <div className="p-4 sm:p-6"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div className="relative max-w-md flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded-xl border border-line bg-panel py-3 pl-10 pr-4 text-sm outline-none placeholder:text-slate-600" placeholder="Search traders..." /></div><div className="flex gap-2 overflow-auto">{['Top ROI','Most Followed','Win Rate'].map((x) => <button key={x} onClick={() => setFilter(x)} className={'whitespace-nowrap rounded-xl border px-3 py-2.5 text-xs ' + (filter === x ? 'border-slate-600 bg-white/[0.05] text-white' : 'border-line text-slate-500')}>{x}</button>)}</div></div><div className="mt-5 grid gap-4 sm:grid-cols-2">{visible.map((trader) => <TraderCard key={trader.id} trader={trader} onCopy={onCopy} onProfile={onProfile} />)}</div></div>
}

function Leaderboard({ onProfile }: { onProfile: (trader: Trader) => void }) {
  const [range, setRange] = useState('30D')
  return <div className="p-4 sm:p-6"><div className="rounded-2xl border border-line bg-panel p-5"><div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-slate-500"><Trophy size={15} />Performance leaderboard</div><h2 className="mt-2 text-2xl font-semibold">Top traders, verified</h2><p className="mt-1 text-sm text-slate-600">Ranked from transparent trading performance signals.</p></div><div className="flex gap-2">{['7D','30D','90D','All'].map((x) => <button key={x} onClick={() => setRange(x)} className={'rounded-full border px-3 py-1.5 text-xs ' + (range === x ? 'border-slate-500 bg-white/[0.06] text-white' : 'border-line text-slate-500')}>{x}</button>)}</div></div></div><div className="mt-4 overflow-hidden rounded-2xl border border-line bg-panel"><div className="grid grid-cols-[35px_1fr_75px_75px_70px] gap-3 border-b border-line px-4 py-3 text-[10px] uppercase tracking-wider text-slate-600"><span>#</span><span>Trader</span><span>ROI</span><span>Win rate</span><span>Copy</span></div>{traders.map((trader,i) => <div key={trader.id} className="grid grid-cols-[35px_1fr_75px_75px_70px] items-center gap-3 border-b border-line px-4 py-4 text-left text-sm last:border-b-0 hover:bg-white/[0.02]"><span className="text-slate-600">{i+1}</span><button onClick={() => onProfile(trader)} className="flex min-w-0 items-center gap-3 text-left"><Avatar trader={trader} small /><div className="min-w-0"><div className="truncate font-medium">{trader.name}</div><div className="truncate text-xs text-slate-600">{trader.followers} followers</div></div></button><span className="font-semibold text-accent">{trader.roi}</span><span>{trader.winRate}</span><span className="text-xs text-slate-500">Ready</span></div>)}</div></div>
}

function Portfolio() {
  return <div className="p-4 sm:p-6"><div className="grid gap-4 lg:grid-cols-[1.25fr_.75fr]"><div className="rounded-2xl border border-line bg-panel p-5"><div className="flex items-start justify-between"><div><div className="text-xs uppercase tracking-wider text-slate-600">Total portfolio</div><div className="mt-2 text-3xl font-semibold tracking-tight">$2,481.52</div><div className="mt-1 text-sm text-accent">+$184.23 (+8.02%)</div></div><div className="rounded-xl border border-line bg-black/10 px-3 py-2 text-right text-xs"><div className="text-slate-600">24H</div><div className="mt-1 text-accent">+2.18%</div></div></div><div className="mt-5 flex items-center gap-5 text-xs text-slate-500"><span>Available <b className="text-slate-300">$1,121.22</b></span><span>Positions <b className="text-slate-300">$1,360.30</b></span></div><div className="mt-6 h-44 rounded-xl bg-[#0a0e13] p-2"><svg viewBox="0 0 600 180" className="h-full w-full" preserveAspectRatio="none"><polyline fill="none" stroke="#74f27c" strokeWidth="4" points="0,140 55,137 110,143 163,127 218,132 272,109 325,119 377,91 429,100 483,73 536,79 600,38" /></svg></div></div><div className="rounded-2xl border border-line bg-panel p-5"><div className="flex items-center gap-2 font-semibold"><CircleDollarSign size={17} className="text-accent" />Capital overview</div><div className="mt-5 space-y-4">{[['Available','45%'],['MON','22%'],['ETH','21%'],['BTC','12%']].map(([a,b]) => <div key={a}><div className="flex justify-between text-xs"><span className="text-slate-500">{a}</span><span className="text-slate-300">{b}</span></div><div className="mt-2 h-1.5 rounded-full bg-slate-800"><div className={'h-full rounded-full ' + (a === 'Available' ? 'bg-slate-500' : 'bg-accent')} style={{width:b}} /></div></div>)}</div></div></div><div className="mt-4 grid gap-3 sm:grid-cols-3">{[['MON','$540.20','+12.4%'],['ETH','$820.10','+5.7%'],['USDC','$1,121.22','—']].map(([a,b,c]) => <div key={a} className="rounded-2xl border border-line bg-panel p-4"><div className="text-xs text-slate-600">{a}</div><div className="mt-2 text-lg font-semibold">{b}</div><div className="mt-1 text-xs text-accent">{c}</div></div>)}</div><div className="mt-5 rounded-2xl border border-line bg-panel p-5"><div className="flex items-center gap-2 font-semibold"><Copy size={15} />Copy trading</div><div className="mt-4 grid gap-2 sm:grid-cols-3">{traders.slice(0,3).map((t) => <div key={t.id} className="flex items-center gap-3 rounded-xl border border-line bg-[#0a0e13] px-3 py-3"><Avatar trader={t} small /><div><div className="text-sm font-medium">{t.name}</div><div className="text-xs text-slate-600">Max $50 per trade</div></div><span className="ml-auto rounded-full bg-accent/10 px-2 py-1 text-[10px] text-accent">ON</span></div>)}</div></div></div>
}

function Home({ feed, setFeed, onCopy, onProfile, onCompose }: { feed: Post[]; setFeed: (posts: Post[]) => void; onCopy: (trader: Trader, post: Post) => void; onProfile: (trader: Trader) => void; onCompose: () => void }) {
  const [tab, setTab] = useState<'For You'|'Following'|'Latest'>('For You')
  return <><div className="border-b border-line bg-[radial-gradient(circle_at_15%_0%,rgba(116,242,124,.08),transparent_34%),linear-gradient(180deg,rgba(255,255,255,.015),transparent)] px-4 py-5 sm:px-6"><div className="flex items-start justify-between gap-4"><div><div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-accent"><span className="size-1.5 rounded-full bg-accent" />Live social market</div><h1 className="mt-2 text-2xl font-semibold tracking-tight">Your Feed</h1><p className="mt-1 text-xs text-slate-500">Trading ideas, verified execution and trader reputation in one place.</p></div><button onClick={onCompose} className="hidden items-center gap-2 rounded-xl bg-accent px-3.5 py-2.5 text-sm font-bold text-ink md:flex"><Plus size={16} />Post idea</button></div><div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4"><div className="rounded-xl border border-line bg-black/10 p-3"><div className="text-[10px] uppercase text-slate-600">Active traders</div><div className="mt-1 font-semibold">1,284</div></div><div className="rounded-xl border border-line bg-black/10 p-3"><div className="text-[10px] uppercase text-slate-600">Live ideas</div><div className="mt-1 font-semibold">328</div></div><div className="hidden rounded-xl border border-line bg-black/10 p-3 sm:block"><div className="text-[10px] uppercase text-slate-600">Copied today</div><div className="mt-1 font-semibold">$8.4M</div></div><div className="hidden rounded-xl border border-line bg-black/10 p-3 sm:block"><div className="text-[10px] uppercase text-slate-600">Network</div><div className="mt-1 font-semibold">Monad</div></div></div></div><div className="flex border-b border-line px-4 sm:px-6">{(['For You','Following','Latest'] as const).map((item) => <button key={item} onClick={() => setTab(item)} className={'relative px-4 py-3 text-sm ' + (tab === item ? 'font-medium text-white' : 'text-slate-500')}>{item}{tab === item && <span className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-accent" />}</button>)}</div>{feed.map((post) => <PostCard key={post.id} post={post} onCopy={onCopy} onProfile={onProfile} />)}{feed.length === 0 && <div className="p-12 text-center text-sm text-slate-500">No ideas found.</div>}</>
}

export default function App() {
  const [active, setActive] = useState('Home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [walletOpen, setWalletOpen] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [copyTrader, setCopyTrader] = useState<Trader | null>(null)
  const [copyPost, setCopyPost] = useState<Post | null>(null)
  const [profileTrader, setProfileTrader] = useState<Trader | null>(null)
  const [composerOpen, setComposerOpen] = useState(false)
  const [feed, setFeed] = useState(initialPosts)

  const title = useMemo(() => ({ Home: 'Your Feed', Explore: 'Discover Traders', Leaderboard: 'Top Traders', Portfolio: 'Your Portfolio' }[active] ?? active), [active])
  const openCopy = (trader: Trader, post?: Post) => { setCopyTrader(trader); setCopyPost(post ?? null) }
  const publish = (text: string) => { setFeed([{ id: String(Date.now()), trader: traders[0], time: 'now', side: 'BUY', token: 'MON', pair: 'MON / USDC', entry: '$0.4208', target: '$0.5100', stop: '$0.3810', text, likes: 0, comments: 0, chart: 'up', confidence: 'AI pending' }, ...feed]); setComposerOpen(false); setActive('Home') }

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink text-slate-100">
      <header className="sticky top-0 z-40 border-b border-line bg-ink/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center gap-3 px-4 lg:px-6">
          <button className="rounded-xl border border-line p-2 lg:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label="Menu">{mobileOpen ? <X size={19} /> : <Menu size={19} />}</button>
          <div className="flex items-center gap-3 pr-2"><div className="grid size-9 place-items-center rounded-xl bg-accent text-sm font-black text-ink shadow-[0_0_25px_rgba(116,242,124,.15)]">α</div><div className="hidden sm:block"><div className="text-sm font-semibold tracking-tight">AlphaFeed</div><div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">social trading</div></div></div>
          <div className="relative hidden max-w-2xl flex-1 lg:block"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={17} /><input className="w-full rounded-xl border border-line bg-panel py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-slate-600 focus:border-slate-600" placeholder="Search traders, tokens, ideas..." /></div>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-line bg-panel px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-slate-500 md:flex"><span className="size-1.5 rounded-full bg-accent" />Monad <span className="text-slate-700">·</span> online</div>
            <button onClick={() => setComposerOpen(true)} className="hidden items-center gap-2 rounded-xl border border-line bg-panel px-3 py-2 text-sm text-slate-300 hover:border-slate-600 md:flex"><Plus size={16} />Post</button>
            <div className="relative"><button onClick={() => { setNotificationsOpen((v) => !v); setWalletOpen(false) }} className="relative rounded-xl border border-line bg-panel p-2.5 text-slate-300" aria-label="Notifications"><Bell size={18} /><span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-accent" /></button>{notificationsOpen && <div className="absolute right-0 top-12 w-80 rounded-2xl border border-line bg-[#0c1016] p-3 shadow-2xl"><div className="px-2 py-2 text-sm font-semibold">Notifications</div>{['Alice executed a new trade · MON BUY $1,000','Your copy settings are active for Alice','David posted a new strategy'].map((x) => <div key={x} className="rounded-xl px-2 py-3 text-xs leading-5 text-slate-400 hover:bg-white/[0.03]">{x}</div>)}</div>}</div>
            <div className="relative"><button onClick={() => { setWalletOpen((v) => !v); setNotificationsOpen(false) }} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-ink"><span className="size-2 rounded-full bg-emerald-500" />{walletConnected ? '0x82...91A' : 'Connect Wallet'}<ChevronDown size={14} /></button>{walletOpen && <div className="absolute right-0 top-12 w-64 rounded-2xl border border-line bg-[#0c1016] p-4 shadow-2xl"><div className="text-xs text-slate-500">Wallet</div><div className="mt-2 text-sm font-semibold">{walletConnected ? '0x82...91A' : 'Not connected'}</div><button onClick={() => setWalletConnected((v) => !v)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-2.5 text-sm font-bold text-ink">{walletConnected ? <Check size={16} /> : <Wallet size={16} />}{walletConnected ? 'Connected' : 'Connect wallet'}</button></div>}</div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1500px] grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)_315px]">
        <Sidebar active={active} setActive={setActive} />
        {mobileOpen && <div className="absolute left-0 top-16 z-30 w-64 border-r border-b border-line bg-ink p-4 shadow-xl lg:hidden"><nav className="space-y-1">{navigationItems.map(({label,icon:Icon}) => <button key={label} onClick={() => { setActive(label); setMobileOpen(false) }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-slate-300"><Icon size={18} />{label}</button>)}</nav></div>}

        <section className="min-w-0 border-r border-line">
          {active === 'Home' && <Home feed={feed} setFeed={setFeed} onCopy={openCopy} onProfile={setProfileTrader} onCompose={() => setComposerOpen(true)} />}
          {active === 'Explore' && <><div className="border-b border-line px-4 py-5 sm:px-6"><h1 className="text-xl font-semibold">{title}</h1><p className="mt-1 text-xs text-slate-500">Discover verified traders and compare their on-chain performance.</p></div><Explore onCopy={(trader) => openCopy(trader)} onProfile={setProfileTrader} /></>}
          {active === 'Leaderboard' && <><div className="border-b border-line px-4 py-5 sm:px-6"><h1 className="text-xl font-semibold">{title}</h1><p className="mt-1 text-xs text-slate-500">Find consistent performers instead of loudest voices.</p></div><Leaderboard onProfile={setProfileTrader} /></>}
          {active === 'Portfolio' && <><div className="border-b border-line px-4 py-5 sm:px-6"><h1 className="text-xl font-semibold">{title}</h1><p className="mt-1 text-xs text-slate-500">Track positions and copy-trading activity from one place.</p></div><Portfolio /></>}
        </section>

        <RightRail onProfile={setProfileTrader} />
      </main>

      {copyTrader && <CopyModal trader={copyTrader} post={copyPost} onClose={() => { setCopyTrader(null); setCopyPost(null) }} />}
      {profileTrader && <ProfileModal trader={profileTrader} onClose={() => setProfileTrader(null)} onCopy={(trader) => { setProfileTrader(null); openCopy(trader) }} />}
      {composerOpen && <Composer onClose={() => setComposerOpen(false)} onPublish={publish} />}
    </div>
  )
}
