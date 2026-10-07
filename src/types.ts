export type TradeSide = 'BUY' | 'SELL'

export interface Trader {
  id: string
  name: string
  handle: string
  followers: string
  roi: string
  winRate: string
  verified: boolean
}

export interface TradePost {
  id: string
  trader: Trader
  time: string
  side: TradeSide
  token: string
  entry: string
  target: string
  stop: string
  text: string
  likes: number
  comments: number
  chart: 'green' | 'blue'
}
