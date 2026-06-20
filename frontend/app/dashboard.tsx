import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { PortfolioChart } from "@/components/dashboard/PortfolioChart";
import { RecentTests } from "@/components/dashboard/RecentTests";
import { SentimentSnapshot } from "@/components/dashboard/SentimentSnapshot";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { WatchlistCard } from "@/components/dashboard/WatchlistCard";
import { AppShell } from "@/components/layout/AppShell";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { disclaimer } from "@/constants/config";
import { api } from "@/services/api";
import type { Dashboard } from "@/types";

const equityData = [
  { label: "Jan", value: 10000 },
  { label: "Feb", value: 10500 },
  { label: "Mar", value: 10300 },
  { label: "Apr", value: 11200 },
  { label: "May", value: 11800 },
  { label: "Jun", value: 12100 },
  { label: "Jul", value: 13400 }
];

const watchlist = [
  { symbol: "AAPL", price: "173.50", change: "+1.2%", direction: "up" as const },
  { symbol: "MSFT", price: "338.11", change: "+0.8%", direction: "up" as const },
  { symbol: "NVDA", price: "450.25", change: "-2.1%", direction: "down" as const },
  { symbol: "TSLA", price: "215.40", change: "+3.4%", direction: "up" as const }
];

const recentTests = [
  { strategy: "SMA Crossover", symbol: "AAPL", date: "Oct 12", returnValue: "+12.4%" },
  { strategy: "RSI Reversion", symbol: "TSLA", date: "Oct 11", returnValue: "-3.2%" },
  { strategy: "MACD Trend", symbol: "NVDA", date: "Oct 10", returnValue: "+28.1%" },
  { strategy: "Sentiment Pulse", symbol: "MSFT", date: "Oct 09", returnValue: "+8.9%" }
];

export default function DashboardScreen() {
  const [data, setData] = useState<Dashboard | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.dashboard()
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

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
              <View style={styles.summaryGrid}>
                <SummaryCard label="Total Backtests" value={String(data.total_backtests)} helper="Saved paper simulations" tone="blue" />
                <SummaryCard label="Best Return" value={`${data.best_return.toFixed(2)}%`} helper="Highest simulated result" tone="green" />
                <SummaryCard label="Win Rate" value={`${data.average_win_rate.toFixed(2)}%`} helper="Average across strategies" tone="cyan" />
                <SummaryCard label="Recent Strategy" value={data.recent_strategy || "No strategy yet"} helper="Latest paper run" tone="purple" />
              </View>
            ) : null}
            {!loading && !error && !data ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyTitle}>No dashboard data yet</Text>
                <Text style={styles.emptyText}>Run your first backtest to populate performance stats and reports.</Text>
              </View>
            ) : null}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Watchlist</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.watchlist}>
                {watchlist.map((item) => (
                  <WatchlistCard key={item.symbol} {...item} />
                ))}
              </ScrollView>
            </View>
            <View style={styles.analyticsRow}>
              <PortfolioChart data={equityData} />
              <RecentTests tests={recentTests} />
            </View>
            <SentimentSnapshot />
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
  section: {
    gap: 12
  },
  sectionTitle: {
    color: "#F8FAFC",
    fontSize: 18,
    fontWeight: "900"
  },
  watchlist: {
    gap: 12,
    paddingRight: 4
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
