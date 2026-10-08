import type { TradeIdea, Trader, TrendingAsset } from './domain/trading'

export const traders: Trader[] = [
  { id: 'alice', name: 'Alice Chen', handle: '@alice_alpha', followers: '12.4K', roi: '+34.7%', winRate: '68.2%', avatar: 'AC', accent: 'from-emerald-300/30 to-emerald-700/20', specialty: 'Momentum & breakouts', verified: true, dataSource: 'demo' },
  { id: 'david', name: 'David Rao', handle: '@davidflow', followers: '8.2K', roi: '+28.3%', winRate: '71.4%', avatar: 'DR', accent: 'from-cyan-300/30 to-cyan-700/20', specialty: 'Market structure', verified: true, dataSource: 'demo' },
  { id: 'sarah', name: 'Sarah Malik', handle: '@sarahcharts', followers: '6.4K', roi: '+24.1%', winRate: '65.0%', avatar: 'SM', accent: 'from-violet-300/30 to-violet-700/20', specialty: 'Swing setups', verified: true, dataSource: 'demo' },
  { id: 'leo', name: 'Leo Park', handle: '@leopark', followers: '4.9K', roi: '+19.8%', winRate: '63.7%', avatar: 'LP', accent: 'from-amber-300/30 to-amber-700/20', specialty: 'Scalping & flow', verified: true, dataSource: 'demo' },
]

export const initialPosts: TradeIdea[] = [
  {
    id: '1', trader: traders[0], time: '8 min', side: 'BUY', token: 'MON', pair: 'MON / USDC', entry: '$0.4208', target: '$0.5100', stop: '$0.3810',
    text: 'Clean reclaim of the intraday range. Watching for continuation above local resistance with a tight invalidation.', likes: 184, comments: 26, chart: 'up', confidence: '84%', dataSource: 'demo',
  },
  {
    id: '2', trader: traders[1], time: '24 min', side: 'SELL', token: 'ETH', pair: 'ETH / USDC', entry: '$3,812', target: '$3,650', stop: '$3,875',
    text: 'Momentum is fading into resistance. Waiting for confirmation before scaling into the short.', likes: 96, comments: 14, chart: 'down', confidence: '77%', dataSource: 'demo',
  },
  {
    id: '3', trader: traders[2], time: '41 min', side: 'BUY', token: 'BTC', pair: 'BTC / USDC', entry: '$118,240', target: '$121,400', stop: '$116,900',
    text: 'Higher-timeframe trend is intact. Looking for a controlled pullback and another expansion leg.', likes: 72, comments: 11, chart: 'up', confidence: '73%', dataSource: 'demo',
  },
]

export const trendings: TrendingAsset[] = [
  { token: 'MON', price: '$0.4208', change: '+8.4%', volume: '$4.8M' },
  { token: 'ETH', price: '$3,812', change: '+3.1%', volume: '$1.9B' },
  { token: 'BTC', price: '$118,240', change: '+1.7%', volume: '$32.4B' },
]

export type { TradeIdea, Trader, TrendingAsset }
