import { useState } from 'react'
import { Bell, Home, Menu, Search, Trophy, Wallet, X } from 'lucide-react'
import { posts, traders } from './data'
import type { Trader } from './types'

function Avatar({ trader, small = false }: { trader: Trader; small?: boolean }) {
  const initials = trader.name.split(' ').map((x) => x[0]).join('')
  return (
    <div className={small ? 'grid size-8 shrink-0 place-items-center rounded-full bg-slate-800 text-[10px] font-semibold' : 'grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-xs font-semibold'}>
      {initials}
    </div>
  )
}

function Chart({ blue = false }: { blue?: boolean }) {
  const points = blue ? '0,75 55,84 95,60 145,70 195,92 246,78 298,104 349,96 401,119 449,111 516,144 600,130' : '0,170 65,164 108,176 165,140 214,151 267,112 312,125 359,93 402,101 450,70 510,74 600,35'
  return (
    <div className="relative h-56 bg-[radial-gradient(circle_at_20%_15%,rgba(116,242,124,.08),transparent_28%),linear-gradient(180deg,#0b1116,#080c10)]">
      <div className="absolute inset-x-4 top-1/2 border-t border-dashed border-slate-800" />
      <svg viewBox="0 0 600 220" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <polyline fill="none" stroke={blue ? '#63d8ff' : '#74f27c'} strokeWidth="4" points={points} />
      </svg>
      <span className="absolute bottom-3 left-4 text-[11px] text-slate-600">1H · Kuru</span>
      <span className="absolute bottom-3 right-4 text-[11px] text-slate-600">On-chain idea</span>
    </div>
  )
}

function PostCard({ post, onCopy }: { post: (typeof posts)[number]; onCopy: (trader: Trader) => void }) {
  return (
    <article className="border-b border-line px-4 py-5 sm:px-6">
      <div className="flex gap-3">
        <Avatar trader={post.trader} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">{post.trader.name}</span>
            <span className="text-slate-600">{post.trader.handle}</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-600">{post.time}</span>
            <span className="ml-auto rounded-full border border-emerald-900/60 px-2 py-0.5 text-[10px] uppercase tracking-wider text-accent">verified</span>
          </div>
          <p className="mt-3 text-[15px] leading-7 text-slate-300">{post.text}</p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-[#0a0e13]">
            <div className="grid grid-cols-4 gap-2 border-b border-line px-4 py-3 text-xs">
              {[
                ['Asset', post.token],
                ['Side', post.side],
                ['Entry', post.entry],
                ['Target', post.target],
              ].map(([label, value]) => (
                <div key={label}><div className="text-slate-600">{label}</div><div className={label === 'Side' ? `mt-1 font-semibold ${post.side === 'BUY' ? 'text-accent' : 'text-rose-400'}` : 'mt-1 font-semibold text-white'}>{value}</div></div>
              ))}
            </div>
            <Chart blue={post.chart === 'blue'} />
            <div className="grid grid-cols-3 border-t border-line px-4 py-3 text-xs">
              <div><span className="text-slate-600">Stop</span><span className="ml-2 text-white">{post.stop}</span></div>
              <div><span className="text-slate-600">Risk</span><span className="ml-2 text-white">1.1R</span></div>
              <div className="text-right"><span className="text-slate-600">Setup</span><span className="ml-2 text-white">Breakout</span></div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-5 text-xs text-slate-600">
            <span>♡ {post.likes}</span><span>💬 {post.comments}</span><span>↗ Share</span>
            <button onClick={() => onCopy(post.trader)} className="ml-auto rounded-xl bg-accent px-3.5 py-2 text-xs font-bold text-ink">Copy Trade</button>
          </div>
        </div>
      </div>
    </article>
  )
}

function CopyModal({ trader, onClose }: { trader: Trader; onClose: () => void }) {
  const [amount, setAmount] = useState('50')
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-line bg-[#0c1016] p-5 shadow-2xl">
        <div className="flex items-start justify-between">
          <div><div className="text-lg font-semibold">Copy {trader.name}</div><div className="mt-1 text-xs text-slate-600">Configure your trade limits</div></div>
          <button onClick={onClose} className="rounded-lg border border-line p-2 text-slate-400"><X size={17} /></button>
        </div>
        <div className="mt-5 rounded-2xl border border-line bg-panel p-4">
          <div className="flex justify-between text-xs"><span className="text-slate-600">Latest setup</span><span className="text-accent">BUY MON</span></div>
          <div className="mt-3 text-2xl font-semibold">$0.4208</div>
          <div className="mt-1 text-xs text-slate-600">Entry · target $0.5100 · stop $0.3810</div>
        </div>
        <div className="mt-5 space-y-4">
          <div><label className="text-xs text-slate-500">Copy mode</label><div className="mt-2 flex gap-2"><button className="rounded-xl border border-slate-500 bg-white/[0.05] px-3 py-2 text-xs">Fixed</button><button className="rounded-xl border border-line px-3 py-2 text-xs text-slate-500">Percent</button></div></div>
          <div><label htmlFor="amount" className="text-xs text-slate-500">Maximum per trade</label><div className="relative mt-2"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600">$</span><input id="amount" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))} className="w-full rounded-xl border border-line bg-panel py-3 pl-8 pr-3 text-sm outline-none" /></div></div>
          <div className="flex items-center justify-between rounded-xl border border-line bg-panel p-3"><div><div className="text-sm">Copy trading</div><div className="text-xs text-slate-600">Pause when limits are reached</div></div><div className="grid size-6 place-items-center rounded-full bg-accent"><div className="size-2 rounded-full bg-ink" /></div></div>
          <div className="rounded-xl border border-amber-900/50 bg-amber-950/20 p-3 text-xs leading-5 text-amber-200/80">Trading involves risk. AlphaFeed should not imply guaranteed returns.</div>
          <button onClick={onClose} className="w-full rounded-xl bg-accent py-3 text-sm font-bold text-ink">Enable Copy Trading</button>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [active, setActive] = useState('Home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [copyTrader, setCopyTrader] = useState<Trader | null>(null)
  const nav = [
    ['Home', Home],
    ['Explore', Search],
    ['Leaderboard', Trophy],
    ['Portfolio', Wallet],
  ] as const

  return (
    <div className="min-h-screen bg-ink text-slate-100">
      <header className="sticky top-0 z-30 border-b border-line bg-ink/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center gap-4 px-4 lg:px-6">
          <button onClick={() => setMobileOpen((v) => !v)} className="rounded-xl border border-line p-2 lg:hidden">{mobileOpen ? <X size={19} /> : <Menu size={19} />}</button>
          <div className="flex items-center gap-3 pr-2"><div className="grid size-9 place-items-center rounded-xl bg-accent text-sm font-black text-ink">α</div><div className="hidden sm:block"><div className="text-sm font-semibold">AlphaFeed</div><div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">social trading</div></div></div>
          <div className="relative hidden max-w-xl flex-1 lg:block"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={17} /><input className="w-full rounded-xl border border-line bg-panel py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-slate-600" placeholder="Search traders, tokens, ideas..." /></div>
          <div className="ml-auto flex items-center gap-2">
            <button className="relative rounded-xl border border-line bg-panel p-2.5 text-slate-300" aria-label="Notifications"><Bell size={18} /><span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-accent" /></button>
            <button onClick={() => setWalletConnected((v) => !v)} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-ink"><span className="size-2 rounded-full bg-emerald-500" />{walletConnected ? '0x82...91A' : 'Connect Wallet'}</button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)_300px]">
        <aside className="hidden min-h-[calc(100vh-64px)] border-r border-line p-4 lg:block">
          <nav className="space-y-1">{nav.map(([label, Icon]) => <button key={label} onClick={() => setActive(label)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${active === label ? 'bg-white/[0.07] text-white' : 'text-slate-500 hover:bg-white/[0.03]'}`}><Icon size={18} />{label}</button>)}</nav>
          <div className="mt-10 rounded-2xl border border-line bg-panel p-4"><div className="text-xs font-semibold text-slate-400">Alpha Insight</div><p className="mt-2 text-sm leading-6 text-slate-600">AI chart analysis will plug into this panel later.</p></div>
        </aside>

        {mobileOpen && <aside className="absolute left-0 top-16 z-20 w-64 border-r border-b border-line bg-ink p-4 lg:hidden"><nav className="space-y-1">{nav.map(([label, Icon]) => <button key={label} onClick={() => { setActive(label); setMobileOpen(false) }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-slate-300"><Icon size={18} />{label}</button>)}</nav></aside>}

        <section className="min-w-0 border-r border-line">
          <div className="border-b border-line px-4 py-5 sm:px-6"><h1 className="text-xl font-semibold">{active === 'Home' ? 'Your Feed' : active}</h1><p className="mt-1 text-xs text-slate-500">Verified on-chain ideas from the traders you follow.</p></div>
          {active === 'Home' ? <><div className="flex border-b border-line px-4 sm:px-6"><button className="relative px-4 py-3 text-sm font-medium">For You<span className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-accent" /></button><button className="px-4 py-3 text-sm text-slate-500">Following</button></div>{posts.map((post) => <PostCard key={post.id} post={post} onCopy={setCopyTrader} />)}</> : <div className="p-6"><div className="rounded-2xl border border-dashed border-line bg-panel p-12 text-center"><div className="mx-auto grid size-12 place-items-center rounded-2xl bg-white/[0.04]"><Wallet size={21} className="text-slate-500" /></div><h2 className="mt-4 font-semibold">UI foundation ready</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">This screen is reserved for the {active.toLowerCase()} flow. The shared design system and trading components are already in place.</p></div></div>}
        </section>

        <aside className="hidden min-h-[calc(100vh-64px)] p-5 xl:block">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Trending now</div>
          <div className="mt-4 space-y-2">{[['MON','$0.4208','+8.4%'],['ETH','$3,812','+3.1%'],['BTC','$118,240','+1.7%']].map(([token, price, change]) => <div key={token} className="rounded-xl border border-line bg-panel p-3"><div className="flex justify-between"><span className="font-semibold">{token}</span><span className="text-xs text-accent">{change}</span></div><div className="mt-1 text-sm text-slate-400">{price}</div></div>)}</div>
          <div className="mt-8 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Top traders</div>
          <div className="mt-3 space-y-2">{traders.map((trader, i) => <button key={trader.id} onClick={() => setActive('Explore')} className="flex w-full items-center gap-3 rounded-xl border border-line bg-panel p-3 text-left"><Avatar trader={trader} small /><div className="min-w-0 flex-1"><div className="truncate text-sm font-semibold">{i + 1}. {trader.name}</div><div className="text-xs text-slate-600">{trader.followers} followers</div></div><span className="text-xs font-semibold text-accent">{trader.roi}</span></button>)}</div>
        </aside>
      </div>
      {copyTrader && <CopyModal trader={copyTrader} onClose={() => setCopyTrader(null)} />}
    </div>
  )
}
