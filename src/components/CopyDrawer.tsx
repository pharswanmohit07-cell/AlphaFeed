import { useState } from 'react'
import { AlertTriangle, Check, ShieldCheck, X, Zap } from 'lucide-react'

type Trader={name:string;handle:string}
type Post={token:string;side:'BUY'|'SELL';entry:string}
type Props={trader:Trader;post:Post|null;onClose:()=>void;onSaved?:()=>void;onSimulateFill?:()=>void}

export default function CopyDrawer({trader,post,onClose,onSaved,onSimulateFill}:Props){
  const [amount,setAmount]=useState(50)
  const [drawdown,setDrawdown]=useState(10)
  const [autoStop,setAutoStop]=useState(true)
  const [enabled,setEnabled]=useState(true)
  return <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm">
    <button className="absolute inset-0" aria-label="Close copy drawer" onClick={onClose}/>
    <aside className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l border-zinc-800/60 bg-zinc-950 shadow-2xl shadow-black/60">
      <div className="sticky top-0 z-10 border-b border-zinc-800/60 bg-zinc-950/90 px-5 py-4 backdrop-blur"><div className="flex items-start justify-between gap-4"><div><div className="text-lg font-semibold">Instant Copy</div><div className="mt-1 text-xs text-slate-500">Configure a guardrailed prototype copy rule for \${trader.name}.</div></div><button onClick={onClose} className="rounded-xl border border-zinc-800/60 p-2 text-slate-400"><X size={17}/></button></div></div>
      <div className="space-y-5 p-5">
        <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/80 p-4"><div className="flex items-center justify-between"><div><div className="text-sm font-semibold">\${trader.name}</div><div className="text-xs text-slate-500">\${trader.handle}</div></div><div className="rounded-full bg-accent/10 p-2 text-accent"><ShieldCheck size={16}/></div></div><div className="mt-4 grid grid-cols-3 gap-2 text-xs"><div><span className="text-slate-600">Asset</span><div className="mt-1 font-semibold">\${post?.token??'MON'}</div></div><div><span className="text-slate-600">Side</span><div className={'mt-1 font-semibold '+(post?.side==='SELL'?'text-rose-300':'text-accent')}>\${post?.side??'BUY'}</div></div><div><span className="text-slate-600">Entry</span><div className="mt-1 font-semibold">\${post?.entry??'$0.4208'}</div></div></div></div>
        <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/80 p-4"><div className="flex items-center justify-between"><div><div className="text-sm font-medium">Risk allocation</div><div className="mt-1 text-xs text-slate-500">Maximum notional per copied trade</div></div><div className="text-lg font-semibold">$\${amount}</div></div><input aria-label="Risk allocation" type="range" min="10" max="500" step="10" value={amount} onChange={e=>setAmount(Number(e.target.value))} className="mt-5 w-full accent-emerald-400"/><div className="mt-2 flex justify-between text-[10px] text-slate-600"><span>$10</span><span>$500</span></div></div>
        <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/80 p-4"><div className="flex items-center justify-between"><div><div className="text-sm font-medium">Auto stop-loss safeguard</div><div className="mt-1 text-xs text-slate-500">Pause copying after portfolio drawdown reaches the limit.</div></div><button onClick={()=>setAutoStop(v=>!v)} className={'h-7 w-12 rounded-full p-1 '+(autoStop?'bg-accent':'bg-zinc-800')}><span className={'block size-5 rounded-full bg-zinc-950 '+(autoStop?'translate-x-5':'')}/></button></div>{autoStop&&<div className="mt-4"><div className="flex items-center justify-between text-xs"><span className="text-slate-500">Portfolio drawdown limit</span><span className="font-semibold text-amber-300">\${drawdown}%</span></div><input aria-label="Portfolio drawdown limit" type="range" min="1" max="30" value={drawdown} onChange={e=>setDrawdown(Number(e.target.value))} className="mt-3 w-full accent-amber-400"/><div className="mt-2 flex justify-between text-[10px] text-slate-600"><span>1%</span><span>30%</span></div></div>}</div>
        <div className="rounded-2xl border border-amber-900/50 bg-amber-950/15 p-4 text-xs leading-5 text-amber-200/75"><AlertTriangle size={15} className="mb-2 text-amber-300"/>Prototype only. This drawer configures UI state and does not submit a real order or move funds.</div>
        <div className="grid grid-cols-2 gap-2"><button onClick={()=>{onSaved?.();onClose()}} className="rounded-xl border border-zinc-800/60 py-3 text-sm text-slate-300">Save Rule</button><button onClick={()=>{onSimulateFill?.();onClose()}} disabled={!enabled} className="flex items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-bold text-ink disabled:opacity-50"><Zap size={15}/>Copy Now</button></div>
        <button onClick={()=>setEnabled(v=>!v)} className="flex w-full items-center justify-center gap-2 text-xs text-slate-600"><Check size={13}/>\${enabled?'Copy execution enabled for this prototype':'Copy execution paused'}</button>
      </div>
    </aside>
  </div>
}
