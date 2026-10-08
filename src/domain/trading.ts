export type TradeSide = 'BUY' | 'SELL'
export type TradeStatus = 'Active' | 'TP1 Hit' | 'Stopped Out' | 'Canceled'
export type DataSource = 'demo' | 'backend' | 'onchain'

export interface Trader {
  id: string
  name: string
  handle: string
  followers: string
  roi: string
  winRate: string
  avatar: string
  accent: string
  specialty: string
  verified: boolean
  dataSource: DataSource
}

export interface TradeIdea {
  id: string
  trader: Trader
  time: string
  side: TradeSide
  token: string
  pair: string
  entry: string
  target: string
  stop: string
  text: string
  likes: number
  comments: number
  chart: 'up' | 'down'
  confidence: string
  txHash?: string
  block?: number
  status?: TradeStatus
  dataSource: DataSource
}

export interface TrendingAsset {
  token: string
  price: string
  change: string
  volume: string
}
