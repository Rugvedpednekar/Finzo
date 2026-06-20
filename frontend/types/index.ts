export type StrategyType = "SMA crossover" | "RSI strategy" | "MACD strategy";

export type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

export type AuthResponse = {
  access_token: string;
  token_type: "bearer";
  user: User;
};

export type Trade = {
  id?: number;
  date: string;
  action: "BUY" | "SELL";
  price: number;
  quantity: number;
  value: number;
};

export type Backtest = {
  id?: number;
  symbol: string;
  strategy_type: string;
  starting_capital: number;
  start_date: string;
  end_date: string;
  final_portfolio_value: number;
  total_return: number;
  win_rate: number;
  max_drawdown: number;
  sharpe_ratio: number;
  created_at?: string;
  trades: Trade[];
};

export type Dashboard = {
  total_backtests: number;
  best_return: number;
  average_win_rate: number;
  recent_strategy: string;
};

export type SentimentResult = {
  label: "Positive" | "Neutral" | "Negative";
  score: number;
  explanation: string;
};

export type Report = {
  id: number;
  backtest_id: number;
  title: string;
  summary: string;
  created_at: string;
};

export type CompareResult = {
  technical_only: Backtest;
  sentiment_adjusted: Backtest;
  sentiment: SentimentResult;
  summary: string;
};

export type PortfolioSummary = {
  total_portfolio_value: number;
  daily_pl: number;
  daily_pl_percent: number;
  total_return: number;
  cash_available: number;
  virtual_capital: number;
  currency: string;
};

export type AllocationItem = {
  bucket: string;
  percent: number;
  value: number;
  color: string;
  rationale: string;
};

export type AllocationPlan = {
  allocation: AllocationItem[];
  insight_title: string;
  insight: string;
  risk_profile: string;
  positions: Array<{ symbol: string; name: string; weight: number; value: number; change: number }>;
};

export type MarketCandle = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  source: string;
};

export type MarketHistory = {
  symbol: string;
  range: string;
  candles: MarketCandle[];
};

export type LiveQuote = {
  symbol: string;
  price: number;
  open: number;
  high: number;
  low: number;
  previous_close: number;
  change: number;
  percent_change: number;
  timestamp: number;
  source: string;
};

export type StrategyPerformance = {
  strategy_name: string;
  symbol: string;
  cumulative_return: number;
  win_rate: number;
  max_drawdown: number;
  sharpe_ratio: number;
  equity_curve: Array<{ label: string; value: number }>;
};

export type TradeTimelineItem = {
  timestamp: string;
  tag: "BUY" | "SELL" | "REBALANCE" | "HOLD" | "ALERT";
  symbol: string;
  title: string;
  explanation: string;
  impact: string;
};

export type RecentPaperTrade = {
  strategy: string;
  symbol: string;
  date: string;
  return_value: string;
  status: string;
};

export type SentimentSnapshotData = {
  status: "Bullish" | "Neutral" | "Bearish";
  score: number;
  updated_at: string;
  explanation: string;
};
