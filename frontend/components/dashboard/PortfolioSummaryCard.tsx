import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";
import type { PortfolioSummary } from "@/types";

type Props = {
  summary?: PortfolioSummary | null;
};

const fallback: PortfolioSummary = {
  total_portfolio_value: 104850.25,
  daily_pl: 1240.5,
  daily_pl_percent: 1.2,
  total_return: 4.85,
  cash_available: 10000,
  virtual_capital: 100000,
  currency: "USD"
};

function money(value: number) {
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

export function PortfolioSummaryCard({ summary = fallback }: Props) {
  const data = summary || fallback;
  const positive = data.daily_pl >= 0;

  return (
    <View style={styles.grid}>
      <View style={styles.card}>
        <Text style={styles.label}>Total Portfolio Value</Text>
        <Text style={styles.value}>{money(data.total_portfolio_value)}</Text>
        <Text style={styles.helper}>Virtual capital: {money(data.virtual_capital)}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Daily P/L</Text>
        <Text style={[styles.value, positive ? styles.positive : styles.negative]}>{positive ? "+" : ""}{money(data.daily_pl)}</Text>
        <Text style={[styles.helper, positive ? styles.positive : styles.negative]}>{positive ? "+" : ""}{data.daily_pl_percent.toFixed(2)}% today</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Total Return</Text>
        <Text style={[styles.value, data.total_return >= 0 ? styles.positive : styles.negative]}>{data.total_return.toFixed(2)}%</Text>
        <Text style={styles.helper}>Since simulation start</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Cash Available</Text>
        <Text style={styles.value}>{money(data.cash_available)}</Text>
        <Text style={styles.helper}>Ready for paper trades</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  card: {
    backgroundColor: "#0F172A",
    borderColor: "rgba(148, 163, 184, 0.14)",
    borderRadius: 18,
    borderWidth: 1,
    flexBasis: 190,
    flexGrow: 1,
    minWidth: 155,
    padding: 16
  },
  label: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  value: {
    color: colors.ink,
    fontSize: 23,
    fontWeight: "900",
    marginTop: 8
  },
  helper: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 6
  },
  positive: {
    color: "#10B981"
  },
  negative: {
    color: "#F43F5E"
  }
});
