import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";
import type { Trade } from "@/types";

type Props = {
  trades: Trade[];
};

export function TradeTable({ trades }: Props) {
  if (!trades.length) {
    return <Text style={styles.empty}>No simulated trades were generated for this period.</Text>;
  }

  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.header]}>
        <Text style={styles.headCell}>Date</Text>
        <Text style={styles.headCell}>Action</Text>
        <Text style={styles.headCell}>Price</Text>
        <Text style={styles.headCell}>Value</Text>
      </View>
      {trades.map((trade, index) => (
        <View key={`${trade.date}-${trade.action}-${index}`} style={styles.row}>
          <Text style={styles.cell}>{trade.date}</Text>
          <Text style={[styles.cell, trade.action === "BUY" ? styles.buy : styles.sell]}>{trade.action}</Text>
          <Text style={styles.cell}>${trade.price.toFixed(2)}</Text>
          <Text style={styles.cell}>${trade.value.toLocaleString()}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    backgroundColor: colors.backgroundAlt,
    borderColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden"
  },
  row: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    flexDirection: "row",
    gap: 8,
    padding: 10
  },
  header: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderTopWidth: 0
  },
  headCell: {
    color: colors.muted,
    flex: 1,
    fontSize: 12,
    fontWeight: "800"
  },
  cell: {
    color: colors.ink,
    flex: 1,
    fontSize: 12
  },
  buy: {
    color: colors.success,
    fontWeight: "800"
  },
  sell: {
    color: colors.danger,
    fontWeight: "800"
  },
  empty: {
    color: colors.muted,
    fontSize: 14
  }
});
