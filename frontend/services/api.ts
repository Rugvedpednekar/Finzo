import { API_URL } from "@/constants/config";
import type { Backtest, CompareResult, Dashboard, Report, SentimentResult, StrategyType } from "@/types";

type BacktestPayload = {
  symbol: string;
  strategy_type: StrategyType;
  starting_capital: number;
  start_date: string;
  end_date: string;
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export const api = {
  dashboard: () => request<Dashboard>("/dashboard"),
  runBacktest: (payload: BacktestPayload) =>
    request<Backtest>("/backtests/run", { method: "POST", body: JSON.stringify(payload) }),
  backtests: () => request<Backtest[]>("/backtests"),
  analyzeSentiment: (text: string) =>
    request<SentimentResult>("/sentiment/analyze", { method: "POST", body: JSON.stringify({ text }) }),
  compare: (payload: BacktestPayload & { sentiment_text: string }) =>
    request<CompareResult>("/compare", { method: "POST", body: JSON.stringify(payload) }),
  reports: () => request<Report[]>("/reports")
};
