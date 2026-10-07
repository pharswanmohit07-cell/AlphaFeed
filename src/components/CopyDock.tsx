import { memo } from 'react'
import { Copy, Zap } from 'lucide-react'

type Trader = {
  id: string
  name: string
}

type Post = {
  id: string
  trader: Trader
  token: string
  side: 'BUY' | 'SELL'
  entry: string
}

type Props = {
  feed: Post[]
  onCopy: (trader: Trader, post: Post) => void
}

function CopyDock({ feed, onCopy }: Props) {
  const posts = feed.slice(0, 3)

  if (posts.length === 0) return null

  return (
    <div className="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+12px)] z-40 lg:hidden">
      <div className="mx-auto max-w-2xl rounded-2xl border border-zinc-800/90 bg-zinc-950/95 p-2 shadow-lg">
        <div className="mb-1 flex items-center justify-between px-2">
          <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[.15em] text-zinc-500">
            <Zap size={11} className="text-emerald-400" aria-hidden="true" />
            Quick Copy
          </div>
          <span className="font-mono text-[8px] uppercase tracking-[.12em] text-zinc-700">prototype</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {posts.map((post) => (
            <button
              key={post.id}
              type="button"
              onClick={() => onCopy(post.trader, post)}
              className="min-w-0 rounded-xl border border-zinc-800 bg-zinc-900/95 px-2.5 py-2 text-left transition hover:border-emerald-400/25 hover:bg-zinc-900 active:scale-[.98]"
            >
              <div className="flex items-center gap-1.5">
                <span className={post.side === 'BUY' ? 'text-emerald-400' : 'text-rose-300'}>{post.side}</span>
                <span className="truncate font-semibold text-zinc-100">{post.token}</span>
                <Copy size={11} className="ml-auto shrink-0 text-zinc-600" aria-hidden="true" />
              </div>
              <div className="mt-1 truncate text-[9px] text-zinc-600">{post.trader.name}</div>
              <div className="mt-1 truncate font-mono text-[10px] text-zinc-300">{post.entry}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(CopyDock)
