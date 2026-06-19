import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppLayout } from "@/components/AppLayout";
import { Disclaimer } from "@/components/Disclaimer";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { MiniAreaChart } from "@/components/MiniAreaChart";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { StatCard } from "@/components/StatCard";
import { WatchlistCard } from "@/components/WatchlistCard";
import { colors } from "@/constants/config";
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
  { ticker: "AAPL", price: "173.50", change: "+1.2%", up: true },
  { ticker: "MSFT", price: "338.11", change: "+0.8%", up: true },
  { ticker: "NVDA", price: "450.25", change: "-2.1%", up: false },
  { ticker: "TSLA", price: "215.40", change: "+3.4%", up: true }
];

const recentTests = [
  { strategy: "SMA Crossover", asset: "AAPL", date: "Oct 12", result: "+12.4%" },
  { strategy: "RSI Reversion", asset: "TSLA", date: "Oct 11", result: "-3.2%" },
  { strategy: "MACD Trend", asset: "NVDA", date: "Oct 10", result: "+28.1%" },
  { strategy: "Sentiment Pulse", asset: "MSFT", date: "Oct 09", result: "+8.9%" }
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
        <AppLayout user={user}>
          <View style={styles.page}>
            <View style={styles.header}>
              <View>
                <Text style={styles.kicker}>Protected workspace</Text>
                <Text style={styles.title}>Dashboard</Text>
                <Text style={styles.subtitle}>Welcome back, {user.name}. Track paper strategies, sentiment, and saved reports.</Text>
              </View>
              <View style={styles.pulse}>
                <Text style={styles.pulseLabel}>Market Pulse</Text>
                <Text style={styles.pulseValue}>BULLISH</Text>
              </View>
            </View>
            <Disclaimer />
            {loading ? <LoadingSkeleton rows={4} /> : null}
            {error ? <Text style={styles.error}>Could not load dashboard: {error}</Text> : null}
            {!loading && !error && data ? (
              <View style={styles.grid}>
                <StatCard label="Total Backtests" value={String(data.total_backtests)} helper="Active account" accent={colors.primary} />
                <StatCard label="Best Return" value={`${data.best_return.toFixed(2)}%`} helper="Top simulated result" accent={colors.green} />
                <StatCard label="Win Rate" value={`${data.average_win_rate.toFixed(2)}%`} helper="Average across tests" accent={colors.primary} />
                <StatCard label="Recent Strategy" value={data.recent_strategy} helper="Latest run" accent="#8B5CF6" />
              </View>
            ) : null}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Watchlist</Text>
              <View style={styles.watchlist}>
                {watchlist.map((item) => (
                  <WatchlistCard key={item.ticker} {...item} />
                ))}
              </View>
            </View>
            <View style={styles.analyticsRow}>
              <MiniAreaChart title="Paper Portfolio Growth" data={equityData} accent={colors.primary} />
              <View style={styles.recentCard}>
                <Text style={styles.sectionTitle}>Recent Tests</Text>
                <View style={styles.recentList}>
                  {recentTests.map((test) => (
                    <View key={`${test.strategy}-${test.date}`} style={styles.recentItem}>
                      <View>
                        <Text style={styles.recentStrategy}>{test.strategy}</Text>
                        <Text style={styles.recentMeta}>{test.asset} - {test.date}</Text>
                      </View>
                      <Text style={[styles.recentReturn, test.result.startsWith("+") ? styles.positive : styles.negative]}>{test.result}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </AppLayout>
      )}
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  page: {
    gap: 16,
    width: "100%"
  },
  header: {
    backgroundColor: colors.surface,
    borderColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "space-between",
    overflow: "hidden",
    padding: 22
  },
  kicker: {
    color: colors.cyan,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  title: {
    color: colors.ink,
    fontSize: 30,
    fontWeight: "900"
  },
  subtitle: {
    color: colors.muted,
    lineHeight: 21
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  pulse: {
    backgroundColor: "rgba(139, 92, 246, 0.12)",
    borderColor: "rgba(139, 92, 246, 0.26)",
    borderRadius: 14,
    borderWidth: 1,
    minWidth: 170,
    padding: 14
  },
  pulseLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  pulseValue: {
    color: "#C4B5FD",
    fontSize: 22,
    fontWeight: "900",
    marginTop: 4
  },
  section: {
    gap: 12
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900"
  },
  watchlist: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  analyticsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16
  },
  recentCard: {
    backgroundColor: colors.surface,
    borderColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 16,
    borderWidth: 1,
    flexBasis: 300,
    flexGrow: 1,
    gap: 14,
    padding: 18
  },
  recentList: {
    gap: 10
  },
  recentItem: {
    alignItems: "center",
    backgroundColor: "rgba(5, 11, 24, 0.52)",
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12
  },
  recentStrategy: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "800"
  },
  recentMeta: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 3
  },
  recentReturn: {
    fontSize: 14,
    fontWeight: "900"
  },
  positive: {
    color: colors.green
  },
  negative: {
    color: colors.danger
  },
  state: {
    color: colors.muted
  },
  error: {
    color: colors.danger,
    fontWeight: "700"
  }
});
