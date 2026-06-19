import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Disclaimer } from "@/components/Disclaimer";
import { StatCard } from "@/components/StatCard";
import { colors } from "@/constants/config";
import { api } from "@/services/api";
import type { Dashboard } from "@/types";

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
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.title}>Dashboard</Text>
      <Disclaimer />
      {loading ? <Text style={styles.state}>Loading dashboard...</Text> : null}
      {error ? <Text style={styles.error}>Could not load dashboard: {error}</Text> : null}
      {!loading && !error && data ? (
        <View style={styles.grid}>
          <StatCard label="Total backtests" value={String(data.total_backtests)} helper="Saved paper simulations" />
          <StatCard label="Best return" value={`${data.best_return.toFixed(2)}%`} helper="Highest simulated result" />
          <StatCard label="Average win rate" value={`${data.average_win_rate.toFixed(2)}%`} helper="Across all backtests" />
          <StatCard label="Recent strategy" value={data.recent_strategy} helper="Last strategy tested" />
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    gap: 16,
    minHeight: "100%",
    padding: 20
  },
  title: {
    color: colors.ink,
    fontSize: 30,
    fontWeight: "900"
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  state: {
    color: colors.muted
  },
  error: {
    color: colors.danger,
    fontWeight: "700"
  }
});
