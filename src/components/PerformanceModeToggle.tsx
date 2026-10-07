import { memo } from 'react'
import { Gauge } from 'lucide-react'

type Props = {
  enabled: boolean
  onChange: (enabled: boolean) => void
  compact?: boolean
}

function PerformanceModeToggle({ enabled, onChange, compact = false }: Props) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      aria-pressed={enabled}
      aria-label={enabled ? 'Disable performance mode' : 'Enable performance mode'}
      title={enabled ? 'Performance mode is on' : 'Reduce blur, glow and motion'}
      className={
        'inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-2 text-[10px] transition ' +
        (enabled
          ? 'border-emerald-400/30 bg-emerald-400/[.08] text-emerald-300'
          : 'border-zinc-800 bg-zinc-900/90 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300')
      }
    >
      <Gauge size={13} aria-hidden="true" />
      <span className={compact ? 'sr-only' : ''}>{enabled ? 'Eco on' : 'Eco mode'}</span>
      <span className={'size-1.5 rounded-full ' + (enabled ? 'bg-emerald-400' : 'bg-zinc-700')} aria-hidden="true" />
    </button>
  )
}

export default memo(PerformanceModeToggle)
