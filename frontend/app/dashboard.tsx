import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AllocationCard } from "@/components/dashboard/AllocationCard";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { MarketWatchPanel } from "@/components/dashboard/MarketWatchPanel";
import { PortfolioSummaryCard } from "@/components/dashboard/PortfolioSummaryCard";
import { PriceChart } from "@/components/dashboard/PriceChart";
import { RecentTradesCard } from "@/components/dashboard/RecentTradesCard";
import { SentimentSnapshot } from "@/components/dashboard/SentimentSnapshot";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { StrategyPerformanceCard } from "@/components/dashboard/StrategyPerformanceCard";
import { TradeTimeline } from "@/components/dashboard/TradeTimeline";
import { AppShell } from "@/components/layout/AppShell";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { disclaimer } from "@/constants/config";
import { api } from "@/services/api";
import type {
  AllocationPlan,
  Dashboard,
  LiveQuote,
  MarketHistory,
  PortfolioSummary,
  RecentPaperTrade,
  SentimentSnapshotData,
  StrategyPerformance,
  TradeTimelineItem
} from "@/types";

const watchSymbols = ["AAPL", "MSFT", "NVDA", "TSLA", "SPY", "QQQ"];

export default function DashboardScreen() {
  const [data, setData] = useState<Dashboard | null>(null);
  const [summary, setSummary] = useState<PortfolioSummary | null>(null);
  const [allocation, setAllocation] = useState<AllocationPlan | null>(null);
  const [quotes, setQuotes] = useState<LiveQuote[]>([]);
  const [history, setHistory] = useState<MarketHistory | null>(null);
  const [range, setRange] = useState("1M");
  const [strategy, setStrategy] = useState<StrategyPerformance | null>(null);
  const [timeline, setTimeline] = useState<TradeTimelineItem[]>([]);
  const [recentTrades, setRecentTrades] = useState<RecentPaperTrade[]>([]);
  const [sentiment, setSentiment] = useState<SentimentSnapshotData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.dashboard(),
      api.portfolioSummary(),
      api.portfolioAllocation(),
      Promise.all(watchSymbols.map((symbol) => api.marketQuote(symbol))),
      api.marketHistory("AAPL", range),
      api.strategyPerformance(),
      api.tradeTimeline(),
      api.recentTrades(),
      api.liveDashboard()
    ])
      .then(([dashboard, portfolioSummary, allocationPlan, marketQuotes, marketHistory, strategyPerformance, tradeTimeline, trades, live]) => {
        setData(dashboard);
        setSummary(portfolioSummary);
        setAllocation(allocationPlan);
        setQuotes(marketQuotes);
        setHistory(marketHistory);
        setStrategy(strategyPerformance);
        setTimeline(tradeTimeline.timeline);
        setRecentTrades(trades.trades);
        setSentiment(live.sentiment);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [range]);

  return (
    <ProtectedRoute>
      {(user) => (
        <AppShell user={user}>
          <View style={styles.page}>
            <DashboardHero user={user} pulse="Bullish" />
            {loading ? <LoadingSkeleton rows={5} /> : null}
            {error ? (
              <View style={styles.errorCard}>
                <Text style={styles.errorTitle}>Dashboard data is unavailable</Text>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}
            {!loading && !error && data ? (
              <>
                <PortfolioSummaryCard summary={summary} />
                <View style={styles.summaryGrid}>
                  <SummaryCard label="Total Backtests" value={String(data.total_backtests)} helper="Saved paper simulations" tone="blue" />
                  <SummaryCard label="Best Return" value={`${data.best_return.toFixed(2)}%`} helper="Highest simulated result" tone="green" />
                  <SummaryCard label="Win Rate" value={`${data.average_win_rate.toFixed(2)}%`} helper="Average across strategies" tone="cyan" />
                  <SummaryCard label="Recent Strategy" value={data.recent_strategy || "No strategy yet"} helper="Latest paper run" tone="purple" />
                </View>
              </>
            ) : null}
            {!loading && !error && !data ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyTitle}>No dashboard data yet</Text>
                <Text style={styles.emptyText}>Run your first backtest to populate performance stats and reports.</Text>
              </View>
            ) : null}
            {quotes.length ? <MarketWatchPanel quotes={quotes} /> : null}
            <View style={styles.mainGrid}>
              <AllocationCard allocation={allocation} />
              <SentimentSnapshot sentiment={sentiment} />
            </View>
            <View style={styles.analyticsRow}>
              {history ? <PriceChart symbol="AAPL" range={range} candles={history.candles} onRangeChange={setRange} /> : null}
              <StrategyPerformanceCard performance={strategy} />
            </View>
            <View style={styles.analyticsRow}>
              <TradeTimeline items={timeline} />
              <RecentTradesCard trades={recentTrades} />
            </View>
            <Text style={styles.disclaimer}>{disclaimer}</Text>
          </View>
        </AppShell>
      )}
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  page: {
    gap: 16,
    width: "100%"
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  mainGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16
  },
  analyticsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16
  },
  errorCard: {
    backgroundColor: "rgba(244, 63, 94, 0.1)",
    borderColor: "rgba(244, 63, 94, 0.26)",
    borderRadius: 16,
    borderWidth: 1,
    gap: 6,
    padding: 16
  },
  errorTitle: {
    color: "#FDA4AF",
    fontSize: 16,
    fontWeight: "900"
  },
  errorText: {
    color: "#FECACA",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 19
  },
  emptyCard: {
    backgroundColor: "#0F172A",
    borderColor: "rgba(34, 211, 238, 0.18)",
    borderRadius: 16,
    borderWidth: 1,
    padding: 16
  },
  emptyTitle: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "900"
  },
  emptyText: {
    color: "#9FB0C7",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5
  },
  disclaimer: {
    color: "#64748B",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center"
  }
});
