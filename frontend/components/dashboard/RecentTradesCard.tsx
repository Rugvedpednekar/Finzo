import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";
import type { RecentPaperTrade } from "@/types";

type Props = {
  trades: RecentPaperTrade[];
};

export function RecentTradesCard({ trades }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Recent Backtests & Paper Trades</Text>
      <View style={styles.list}>
        {trades.map((trade) => {
          const positive = trade.return_value.startsWith("+");
          return (
            <View key={`${trade.strategy}-${trade.date}`} style={styles.row}>
              <View style={styles.copy}>
                <Text style={styles.strategy}>{trade.strategy}</Text>
                <Text style={styles.meta}>{trade.symbol} • {trade.date}</Text>
              </View>
              <View style={styles.result}>
                <Text style={[styles.returnValue, positive ? styles.positive : styles.negative]}>{trade.return_value}</Text>
                <Text style={styles.status}>{trade.status}</Text>
              </View>
            </View>
          );
        })}
      </View>
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
    gap: 14,
    padding: 18
  },
  title: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900"
  },
  list: {
    gap: 10
  },
  row: {
    alignItems: "center",
    backgroundColor: "rgba(2, 6, 23, 0.56)",
    borderColor: "rgba(148, 163, 184, 0.1)",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    padding: 12
  },
  copy: {
    flex: 1
  },
  strategy: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "900"
  },
  meta: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 3
  },
  result: {
    alignItems: "flex-end",
    gap: 4
  },
  returnValue: {
    fontSize: 14,
    fontWeight: "900"
  },
  status: {
    backgroundColor: "rgba(34, 211, 238, 0.1)",
    borderRadius: 999,
    color: colors.cyan,
    fontSize: 10,
    fontWeight: "900",
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  positive: {
    color: "#10B981"
  },
  negative: {
    color: "#F43F5E"
  }
});
