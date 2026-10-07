import { useEffect, useMemo, useRef, useState } from 'react'
import { createChart, CandlestickSeries, LineStyle, ColorType } from 'lightweight-charts'
import type { UTCTimestamp } from 'lightweight-charts'

type Props = { token:string; side:'BUY'|'SELL'; entry:number; target:number; stop:number }

function makeCandles(entry:number,target:number,stop:number,side:'BUY'|'SELL',points:number):Array<{time:UTCTimestamp;open:number;high:number;low:number;close:number}> {
  const start=Math.floor(Date.now()/1000)-(points-1)*3600
  const direction=side==='BUY'?1:-1
  const range=Math.max(Math.abs(target-stop),entry*0.012)
  let previous=entry-direction*range*0.08
  return Array.from({length:points},(_,index)=>{
    const open=previous
    const close=Math.max(0.000001,open+direction*range*0.018+Math.sin(index*.82)*range*.055+Math.cos(index*.31)*range*.035)
    const wick=range*(.025+(index%4)*.008)
    previous=close
    return {time:(start+index*3600) as UTCTimestamp,open,high:Math.max(open,close)+wick,low:Math.max(.000001,Math.min(open,close)-wick),close}
  })
}

export default function InteractiveTradeChart({token,side,entry,target,stop}:Props){
  const containerRef=useRef<HTMLDivElement|null>(null)
  const [range,setRange]=useState<'1H'|'4H'|'1D'>('1H')
  const candles=useMemo(()=>makeCandles(entry,target,stop,side,range==='1H'?42:range==='4H'?54:72),[entry,target,stop,side,range])

  useEffect(()=>{
    if(!containerRef.current)return
    const chart=createChart(containerRef.current,{
      autoSize:true,height:260,
      layout:{background:{type:ColorType.Solid,color:'transparent'},textColor:'#64748b'},
      grid:{vertLines:{color:'rgba(39,48,58,.28)'},horzLines:{color:'rgba(39,48,58,.34)'}},
      rightPriceScale:{borderColor:'rgba(51,65,85,.45)',scaleMargins:{top:.12,bottom:.12}},
      timeScale:{borderColor:'rgba(51,65,85,.45)',timeVisible:true,secondsVisible:false,rightOffset:4},
      crosshair:{vertLine:{color:'rgba(148,163,184,.32)',style:LineStyle.Dashed},horzLine:{color:'rgba(148,163,184,.32)',style:LineStyle.Dashed}},
      handleScroll:{mouseWheel:true,pressedMouseMove:true,horzTouchDrag:true,vertTouchDrag:false},
      handleScale:{mouseWheel:true,pinch:true,axisPressedMouseMove:{time:true,price:true},axisDoubleClickReset:{time:true,price:true}},
      localization:{priceFormatter:(value:number)=>value<1?'$'+value.toFixed(4):'$'+value.toLocaleString(undefined,{maximumFractionDigits:2})}
    })
    const series=chart.addSeries(CandlestickSeries,{upColor:'#74f27c',downColor:'#fb7185',borderVisible:false,wickUpColor:'#74f27c',wickDownColor:'#fb7185',lastValueVisible:true,priceLineVisible:false})
    series.setData(candles)
    series.createPriceLine({price:entry,color:'#cbd5e1',lineWidth:1,lineStyle:LineStyle.Dotted,axisLabelVisible:true,title:'Entry'})
    series.createPriceLine({price:target,color:'#74f27c',lineWidth:1,lineStyle:LineStyle.Dashed,axisLabelVisible:true,title:'TP'})
    series.createPriceLine({price:stop,color:'#fb7185',lineWidth:1,lineStyle:LineStyle.Dashed,axisLabelVisible:true,title:'SL'})
    chart.timeScale().fitContent()
    return()=>chart.remove()
  },[candles,entry,target,stop,side])

  return <div className="relative overflow-hidden bg-[#070b10]">
    <div className="absolute left-4 top-3 z-10 flex gap-2"><span className="rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[10px] text-slate-400">{token} · Kuru</span><span className="rounded-full border border-emerald-900/60 bg-emerald-500/[0.04] px-2 py-1 text-[10px] text-accent">interactive</span></div>
    <div className="absolute right-4 top-3 z-10 flex gap-1 rounded-lg border border-white/10 bg-black/40 p-1">{(['1H','4H','1D'] as const).map(item=><button key={item} onClick={()=>setRange(item)} className={'rounded-md px-2 py-1 text-[10px] '+(range===item?'bg-white/[0.08] text-white':'text-slate-600')}>{item}</button>)}</div>
    <div ref={containerRef} className="h-[260px] w-full"/>
    <div className="flex items-center justify-between border-t border-line px-4 py-2 text-[10px] text-slate-600"><span>Scroll to zoom · drag to pan · double-click to reset</span><a href="https://www.tradingview.com/" target="_blank" rel="noreferrer" className="hover:text-slate-400">Charts by TradingView</a></div>
  </div>
}
