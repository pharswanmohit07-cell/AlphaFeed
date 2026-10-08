import { useEffect, useMemo, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ChevronLeft, ChevronRight, HelpCircle, MousePointer2, X } from 'lucide-react'

type Placement = 'bottom' | 'right' | 'left' | 'top'

type TourStep = {
  target: string
  eyebrow: string
  title: string
  message: string
  placement: Placement
}

type TargetRect = { top: number; left: number; width: number; height: number }

const TOUR_KEY = 'alphafeed-onboarding-complete'

const STEPS: TourStep[] = [
  {
    target: 'app-navigation',
    eyebrow: '01 / NAVIGATION',
    title: 'Move around AlphaFeed',
    message: 'Use the sidebar to switch between your feed, trader discovery, leaderboard, and portfolio views.',
    placement: 'right',
  },
  {
    target: 'app-wallet',
    eyebrow: '02 / WALLET',
    title: 'Connect your wallet',
    message: 'Wallet connection is simulated in this demo. A live wallet will unlock real balances and on-chain actions later.',
    placement: 'bottom',
  },
  {
    target: 'app-view-toggle',
    eyebrow: '03 / TWO MODES',
    title: 'Choose your workflow',
    message: 'Social mode gives you context and discussion. Terminal mode gives you a compact execution-focused view.',
    placement: 'bottom',
  },
  {
    target: 'app-quick-copy',
    eyebrow: '04 / TRADE IDEAS',
    title: 'Review a signal',
    message: 'Each signal includes entry, target, stop, trader context, and a demo Quick Copy action for exploring the flow.',
    placement: 'left',
  },
  {
    target: 'app-workspace',
    eyebrow: '05 / WORKSPACE',
    title: 'Monitor the session',
    message: 'Use market telemetry, risk guardrails, and the execution queue to understand what the terminal is tracking.',
    placement: 'top',
  },
]

function findTarget(target: string): TargetRect | null {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>(`[data-tour="${target}"]`))
  for (const node of nodes) {
    const rect = node.getBoundingClientRect()
    if (rect.width > 0 && rect.height > 0) {
      return { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
    }
  }
  return null
}

function getTooltipPosition(rect: TargetRect | null, placement: Placement) {
  if (!rect) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
  const gap = 18
  if (placement === 'right') return { top: Math.max(24, rect.top), left: rect.left + rect.width + gap, transform: 'none' }
  if (placement === 'left') return { top: Math.max(24, rect.top), left: Math.max(18, rect.left - 358), transform: 'none' }
  if (placement === 'top') return { top: Math.max(24, rect.top - 230), left: Math.min(window.innerWidth - 360, Math.max(18, rect.left)), transform: 'none' }
  return { top: Math.min(window.innerHeight - 260, rect.top + rect.height + gap), left: Math.min(window.innerWidth - 360, Math.max(18, rect.left)), transform: 'none' }
}

export default function OnboardingTour() {
  const [open, setOpen] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const [targetRect, setTargetRect] = useState<TargetRect | null>(null)
  const step = STEPS[stepIndex]

  const refreshTarget = () => setTargetRect(findTarget(step.target))

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (window.localStorage.getItem(TOUR_KEY) !== 'true') setOpen(true)
    }, 650)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!open) return
    refreshTarget()
    const handleViewportChange = () => refreshTarget()
    window.addEventListener('resize', handleViewportChange)
    window.addEventListener('scroll', handleViewportChange, true)
    return () => {
      window.removeEventListener('resize', handleViewportChange)
      window.removeEventListener('scroll', handleViewportChange, true)
    }
  }, [open, step.target])

  const tooltipPosition = useMemo(() => getTooltipPosition(targetRect, step.placement), [targetRect, step.placement])

  const close = (remember = true) => {
    if (remember) window.localStorage.setItem(TOUR_KEY, 'true')
    setOpen(false)
  }

  const next = () => {
    if (stepIndex === STEPS.length - 1) close()
    else setStepIndex((value) => value + 1)
  }

  const previous = () => setStepIndex((value) => Math.max(0, value - 1))

  if (!open) {
    return (
      <button type="button" onClick={() => { setStepIndex(0); setOpen(true) }} className="fixed bottom-5 left-5 z-[80] inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-[#101625]/95 px-3 py-2 text-[11px] font-semibold text-violet-200 shadow-[0_12px_30px_rgba(0,0,0,.3),0_0_20px_rgba(139,92,246,.1)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-violet-300/50" aria-label="Open AlphaFeed guide">
        <HelpCircle size={14} />Guide
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="pointer-events-none absolute inset-0 bg-transparent" />
      {targetRect && <div className="pointer-events-none absolute rounded-2xl border border-violet-300/90 bg-violet-300/[.06] shadow-[0_0_0_9999px_rgba(4,6,17,.52),0_0_0_5px_rgba(167,139,250,.18),0_0_34px_rgba(139,92,246,.6)] transition-all duration-300" style={{ top: targetRect.top - 7, left: targetRect.left - 7, width: targetRect.width + 14, height: targetRect.height + 14 }} />}
      {targetRect && <div className="pointer-events-none absolute text-violet-200 drop-shadow-[0_0_12px_rgba(167,139,250,.9)]" style={{ top: step.placement === 'top' ? targetRect.top - 32 : targetRect.top + targetRect.height / 2 - 10, left: step.placement === 'right' ? targetRect.left + targetRect.width + 4 : Math.max(8, targetRect.left - 28) }}>
        {step.placement === 'right' ? <ArrowRight size={22} /> : step.placement === 'left' ? <ArrowLeft size={22} /> : step.placement === 'top' ? <ArrowUp size={22} /> : <ArrowDown size={22} />}
      </div>}
      <div className="absolute w-[min(340px,calc(100vw-32px))] rounded-3xl border border-violet-300/25 bg-[#101625]/[.98] p-5 text-slate-100 shadow-[0_24px_80px_rgba(0,0,0,.55),0_0_38px_rgba(139,92,246,.16)] backdrop-blur-xl" style={tooltipPosition}>
        <div className="flex items-start justify-between gap-4"><div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-violet-300"><MousePointer2 size={13} />{step.eyebrow}</div><button type="button" onClick={() => close()} className="rounded-lg p-1 text-slate-500 transition hover:bg-white/[.06] hover:text-white" aria-label="Close guide"><X size={16} /></button></div>
        <h2 className="mt-3 text-lg font-semibold tracking-tight">{step.title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">{step.message}</p>
        <div className="mt-5 flex items-center justify-between"><div className="flex gap-1.5">{STEPS.map((item, index) => <span key={item.target} className={'h-1.5 rounded-full transition-all ' + (index === stepIndex ? 'w-6 bg-violet-300' : 'w-1.5 bg-slate-700')} />)}</div><div className="flex items-center gap-2"><button type="button" onClick={() => close()} className="rounded-xl px-3 py-2 text-xs text-slate-500 transition hover:text-slate-200">Skip</button>{stepIndex > 0 && <button type="button" onClick={previous} className="rounded-xl border border-line p-2 text-slate-400 transition hover:border-violet-300/40 hover:text-white" aria-label="Previous step"><ChevronLeft size={15} /></button>}<button type="button" onClick={next} className="flex items-center gap-1.5 rounded-xl bg-violet-300 px-3.5 py-2 text-xs font-bold text-[#0b0d17] transition hover:bg-violet-200">{stepIndex === STEPS.length - 1 ? 'Done' : 'Next'}<ChevronRight size={14} /></button></div></div>
      </div>
    </div>
  )
}
