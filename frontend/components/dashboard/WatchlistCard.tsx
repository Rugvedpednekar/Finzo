import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";

type Props = {
  symbol: string;
  price: string;
  change: string;
  direction: "up" | "down";
};

export function WatchlistCard({ symbol, price, change, direction }: Props) {
  const positive = direction === "up";

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.symbol}>{symbol}</Text>
        <Text style={[styles.indicator, positive ? styles.up : styles.down]}>{positive ? "▲" : "▼"}</Text>
      </View>
      <Text style={styles.price}>${price}</Text>
      <Text style={[styles.change, positive ? styles.up : styles.down]}>{change}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0F172A",
    borderColor: "rgba(148, 163, 184, 0.14)",
    borderRadius: 16,
    borderWidth: 1,
    minWidth: 142,
    padding: 14
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  symbol: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "900"
  },
  indicator: {
    fontSize: 12,
    fontWeight: "900"
  },
  price: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 8
  },
  change: {
    fontSize: 12,
    fontWeight: "900",
    marginTop: 5
  },
  up: {
    color: "#10B981"
  },
  down: {
    color: "#F43F5E"
  }
});
