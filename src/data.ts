import type { TradePost, Trader } from './types'

export const traders: Trader[] = [
  { id: 'alice', name: 'Alice Chen', handle: '@alice_alpha', roi: '+34.7%', winRate: '68.2%', followers: '12.4K', verified: true },
  { id: 'david', name: 'David Rao', handle: '@davidflow', roi: '+28.3%', winRate: '71.4%', followers: '8.2K', verified: true },
  { id: 'sarah', name: 'Sarah Malik', handle: '@sarahcharts', roi: '+24.1%', winRate: '65.0%', followers: '6.4K', verified: true },
]

export const posts: TradePost[] = [
  {
    id: 'post-1', trader: traders[0], time: '8 min', side: 'BUY', token: 'MON',
    entry: '$0.4208', target: '$0.5100', stop: '$0.3810',
    text: 'Clean reclaim of the intraday range. Watching for continuation above local resistance with a tight invalidation.',
    likes: 184, comments: 26, chart: 'green',
  },
  {
    id: 'post-2', trader: traders[1], time: '24 min', side: 'SELL', token: 'ETH',
    entry: '$3,812', target: '$3,650', stop: '$3,875',
    text: 'Momentum is fading into resistance. Waiting for confirmation before scaling into the short.',
    likes: 96, comments: 14, chart: 'blue',
  },
]
