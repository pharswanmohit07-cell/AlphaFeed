import { useMemo, useState } from 'react'
import { BrainCircuit, Loader2, Sparkles, Target } from 'lucide-react'

type Props={entry:number;target:number;stop:number;side:'BUY'|'SELL';token:string}
const riskRatio=(entry:number,target:number,stop:number)=>Math.abs(target-entry)/Math.abs(entry-stop)

export default function AlphaInsights({entry,target,stop,side,token}:Props){
  const [loading,setLoading]=useState(false)
  const [result,setResult]=useState<{pattern:string;risk:'Low'|'Medium'|'Degenerate';rr:number}|null>(null)
  const ratio=useMemo(()=>riskRatio(entry,target,stop),[entry,target,stop])
  const analyze=()=>{
    setLoading(true)
    window.setTimeout(()=>{
      const pattern=side==='BUY'?'Bullish Flag':'Wyckoff Distribution'
      const risk: 'Low'|'Medium'|'Degenerate'=ratio>=3?'Low':ratio>=1.7?'Medium':'Degenerate'
      setResult({pattern,risk,rr:ratio});setLoading(false)
    },850)
  }
  const riskStyle=result?.risk==='Low'?'text-accent bg-accent/10 border-emerald-900/50':result?.risk==='Medium'?'text-amber-300 bg-amber-500/5 border-amber-900/50':'text-rose-300 bg-rose-500/5 border-rose-900/50'
  return <div className="rounded-2xl border border-line bg-panel p-4">
    <div className="flex items-center gap-2"><div className="grid size-8 place-items-center rounded-xl bg-accent/10 text-accent"><BrainCircuit size={16}/></div><div><div className="text-sm font-semibold">Alpha AI</div><div className="text-[10px] text-slate-600">Hunyuan-ready setup analysis</div></div></div>
    <button onClick={analyze} disabled={loading} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-accent/30 bg-accent/[0.06] py-2.5 text-xs font-semibold text-accent hover:bg-accent/[0.1] disabled:opacity-60">{loading?<><Loader2 size={14} className="animate-spin"/>Analyzing {token}...</>:<><Sparkles size={14}/>Analyze Setup</>}</button>
    <div className="mt-4 grid grid-cols-2 gap-2">
      <div className="rounded-xl border border-line bg-[#0a0e13] p-3"><div className="text-[9px] uppercase tracking-[0.14em] text-slate-600">Risk / Reward</div><div className="mt-1 flex items-center gap-1.5 text-sm font-semibold"><Target size={13} className="text-accent"/>{ratio.toFixed(2)}R</div></div>
      <div className="rounded-xl border border-line bg-[#0a0e13] p-3"><div className="text-[9px] uppercase tracking-[0.14em] text-slate-600">Risk</div><div className={'mt-1 inline-flex rounded-full border px-2 py-1 text-[10px] '+(result?riskStyle:'border-line text-slate-500')}>{result?.risk??'Not analyzed'}</div></div>
    </div>
    {result&&<div className="mt-3 rounded-xl border border-line bg-[#0a0e13] p-3 text-xs leading-5 text-slate-400"><div className="font-medium text-slate-200">{result.pattern}</div><div className="mt-1">Simulated analysis: {result.rr.toFixed(2)}R payoff relative to invalidation. This is a prototype UI result, not a prediction.</div></div>}
  </div>
}
