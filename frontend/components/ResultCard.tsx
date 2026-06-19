import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";
import type { Backtest } from "@/types";
import { StatCard } from "./StatCard";
import { TradeTable } from "./TradeTable";

type Props = {
  result: Backtest;
};

export function ResultCard({ result }: Props) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>{result.symbol} {result.strategy_type}</Text>
        <Text style={styles.subtitle}>{result.start_date} to {result.end_date}</Text>
      </View>
      <View style={styles.grid}>
        <StatCard label="Total return" value={`${result.total_return.toFixed(2)}%`} />
        <StatCard label="Final value" value={`$${result.final_portfolio_value.toLocaleString()}`} />
        <StatCard label="Win rate" value={`${result.win_rate.toFixed(2)}%`} />
        <StatCard label="Max drawdown" value={`${result.max_drawdown.toFixed(2)}%`} />
        <StatCard label="Sharpe ratio" value={result.sharpe_ratio.toFixed(2)} />
      </View>
      <TradeTable trades={result.trades} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.2,
    shadowRadius: 22
  },
  title: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "800"
  },
  subtitle: {
    color: colors.muted,
    marginTop: 4
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  }
});
