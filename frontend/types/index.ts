export type StrategyType = "SMA crossover" | "RSI strategy" | "MACD strategy";

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
