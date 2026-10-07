import { useState } from 'react'
import { Check, ChevronDown, ExternalLink, ShieldCheck } from 'lucide-react'

type Props={txHash:string;block:number;dex:string;status:'Active'|'TP1 Hit'|'Stopped Out'|'Canceled'}
const statusStyles={Active:'border-emerald-900/60 bg-emerald-500/[0.05] text-accent','TP1 Hit':'border-cyan-900/60 bg-cyan-500/[0.05] text-cyan-300','Stopped Out':'border-rose-900/60 bg-rose-500/[0.05] text-rose-300',Canceled:'border-slate-700 bg-slate-500/[0.05] text-slate-400'}

export default function OnChainDetails({txHash,block,dex,status}:Props){
  const [open,setOpen]=useState(false)
  const shortHash=txHash.slice(0,8)+'...'+txHash.slice(-6)
  return <div className="border-t border-line bg-black/10">
    <button onClick={()=>setOpen(v=>!v)} className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-xs text-slate-500 hover:text-slate-300">
      <ShieldCheck size={14} className="text-accent"/><span className="font-medium text-slate-300">Verified On-Chain</span>
      <span className={'ml-auto rounded-full border px-2 py-1 text-[10px] '+statusStyles[status]}><span className="mr-1 inline-block size-1.5 rounded-full bg-current"/>{status}</span><ChevronDown size={14} className={'transition '+(open?'rotate-180':'')}/>
    </button>
    {open&&<div className="grid gap-3 border-t border-line px-4 py-3 sm:grid-cols-3">
      <div><div className="text-[9px] uppercase tracking-[0.15em] text-slate-600">Monad Tx</div><a href={'https://monadscan.com/tx/'+txHash} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 text-xs text-cyan-300 hover:underline">{shortHash}<ExternalLink size={11}/></a></div>
      <div><div className="text-[9px] uppercase tracking-[0.15em] text-slate-600">Entry block</div><div className="mt-1 text-xs text-slate-300">#{block.toLocaleString()}</div></div>
      <div><div className="text-[9px] uppercase tracking-[0.15em] text-slate-600">Execution DEX</div><div className="mt-1 flex items-center gap-1 text-xs text-slate-300"><Check size={12} className="text-accent"/>{dex}</div></div>
      <div className="sm:col-span-3 rounded-lg border border-dashed border-line bg-panel px-3 py-2 text-[10px] leading-5 text-slate-600">Prototype verification data. The explorer link becomes meaningful when the backend supplies the real transaction hash and block number.</div>
    </div>}
  </div>
}
