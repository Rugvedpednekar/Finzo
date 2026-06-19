import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppLayout } from "@/components/AppLayout";
import { Disclaimer } from "@/components/Disclaimer";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { ProtectedRoute } from "@/components/ProtectedRoute";
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
    <ProtectedRoute>
      {(user) => (
        <AppLayout user={user}>
          <View style={styles.page}>
            <View style={styles.header}>
              <Text style={styles.kicker}>Protected workspace</Text>
              <Text style={styles.title}>Dashboard</Text>
              <Text style={styles.subtitle}>Welcome back, {user.name}. Your simulations are saved behind JWT auth.</Text>
            </View>
            <Disclaimer />
            {loading ? <LoadingSkeleton rows={4} /> : null}
            {error ? <Text style={styles.error}>Could not load dashboard: {error}</Text> : null}
            {!loading && !error && data ? (
              <View style={styles.grid}>
                <StatCard label="Total backtests" value={String(data.total_backtests)} helper="Saved paper simulations" />
                <StatCard label="Best return" value={`${data.best_return.toFixed(2)}%`} helper="Highest simulated result" />
                <StatCard label="Average win rate" value={`${data.average_win_rate.toFixed(2)}%`} helper="Across all backtests" />
                <StatCard label="Recent strategy" value={data.recent_strategy} helper="Last strategy tested" />
              </View>
            ) : null}
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
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
    padding: 18
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
  state: {
    color: colors.muted
  },
  error: {
    color: colors.danger,
    fontWeight: "700"
  }
});
