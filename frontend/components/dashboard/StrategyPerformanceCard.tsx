import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";
import type { StrategyPerformance } from "@/types";
import { PortfolioChart } from "./PortfolioChart";

type Props = {
  performance?: StrategyPerformance | null;
};

export function StrategyPerformanceCard({ performance }: Props) {
  if (!performance) {
    return null;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Strategy Performance</Text>
      <Text style={styles.strategy}>{performance.strategy_name}</Text>
      <View style={styles.metrics}>
        <Metric label="Return" value={`${performance.cumulative_return.toFixed(1)}%`} positive />
        <Metric label="Win Rate" value={`${performance.win_rate.toFixed(1)}%`} />
        <Metric label="Max Drawdown" value={`${performance.max_drawdown.toFixed(1)}%`} negative />
        <Metric label="Sharpe" value={performance.sharpe_ratio.toFixed(2)} />
      </View>
      <PortfolioChart data={performance.equity_curve} />
    </View>
  );
}

function Metric({ label, value, positive, negative }: { label: string; value: string; positive?: boolean; negative?: boolean }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={[styles.metricValue, positive && styles.positive, negative && styles.negative]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0F172A",
    borderColor: "rgba(148, 163, 184, 0.14)",
    borderRadius: 20,
    borderWidth: 1,
    flexBasis: 360,
    flexGrow: 1,
    gap: 12,
    padding: 18
  },
  title: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900"
  },
  strategy: {
    color: colors.cyan,
    fontSize: 13,
    fontWeight: "900"
  },
  metrics: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  metric: {
    backgroundColor: "#020617",
    borderColor: "rgba(148, 163, 184, 0.1)",
    borderRadius: 12,
    borderWidth: 1,
    flexBasis: 108,
    flexGrow: 1,
    padding: 10
  },
  metricLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "900"
  },
  metricValue: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: "900",
    marginTop: 5
  },
  positive: {
    color: "#10B981"
  },
  negative: {
    color: "#F43F5E"
  }
});
