import { memo, useEffect, useMemo, useState } from 'react'
import { Activity, ArrowDown, ArrowUp } from 'lucide-react'

type Quote = {
  symbol: string
  base: number
  precision: number
  change: number
  tone: 'emerald' | 'cyan'
}

const QUOTES: Quote[] = [
  { symbol: '$MON', base: 0.4208, precision: 4, change: 8.4, tone: 'emerald' },
  { symbol: '$KURU', base: 0.0842, precision: 4, change: 5.8, tone: 'cyan' },
  { symbol: '$ETH', base: 3812, precision: 2, change: 3.1, tone: 'emerald' },
]

function formatPrice(value: number, precision: number) {
  return value >= 1000 ? value.toLocaleString(undefined, { maximumFractionDigits: precision }) : value.toFixed(precision)
}

function LiveTicker() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!document.hidden) setTick((value) => value + 1)
    }, 1800)

    return () => window.clearInterval(timer)
  }, [])

  const quotes = useMemo(
    () =>
      QUOTES.map((quote, index) => {
        const price = quote.base * (1 + Math.sin((tick + index) * 0.8) * 0.0025)
        const directionUp = Math.cos((tick + index) * 0.8) >= 0
        return { ...quote, price, directionUp }
      }),
    [tick],
  )

  return (
    <div className="relative z-[60] h-7 overflow-hidden border-b border-line bg-ink font-mono text-[9px]">
      <div className="mx-auto flex h-full max-w-[1500px] items-center gap-5 px-4 sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center gap-1.5 text-emerald-400">
          <Activity size={11} aria-hidden="true" />
          MARKET STREAM
        </div>
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="af-ticker-track flex w-max items-center gap-8">
            {[...quotes, ...quotes].map((quote, index) => (
              <span key={quote.symbol + '-' + index} className="flex items-center gap-2 whitespace-nowrap text-zinc-500">
                <span className={quote.tone === 'cyan' ? 'text-cyan-300' : 'text-zinc-200'}>{quote.symbol}</span>
                <span key={quote.symbol + tick} className="af-price-flash text-zinc-300">
                  {formatPrice(quote.price, quote.precision)}
                </span>
                <span className={quote.directionUp ? 'flex items-center gap-0.5 text-emerald-400' : 'flex items-center gap-0.5 text-rose-400'}>
                  {quote.directionUp ? <ArrowUp size={10} aria-hidden="true" /> : <ArrowDown size={10} aria-hidden="true" />}
                  {Math.abs(quote.change).toFixed(1)}%
                </span>
              </span>
            ))}
          </div>
        </div>
        <span className="hidden shrink-0 text-zinc-700 sm:inline">SIMULATED FEED</span>
      </div>
    </div>
  )
}

export default memo(LiveTicker)
