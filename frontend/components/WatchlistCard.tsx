import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";

type Props = {
  ticker: string;
  price: string;
  change: string;
  up: boolean;
};

export function WatchlistCard({ ticker, price, change, up }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.ticker}>{ticker}</Text>
        <Text style={[styles.arrow, up ? styles.up : styles.down]}>{up ? "UP" : "DOWN"}</Text>
      </View>
      <Text style={styles.price}>${price}</Text>
      <Text style={[styles.change, up ? styles.up : styles.down]}>{change}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 14,
    borderWidth: 1,
    flexBasis: 140,
    flexGrow: 1,
    gap: 8,
    padding: 14
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  ticker: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "900"
  },
  arrow: {
    fontSize: 10,
    fontWeight: "900"
  },
  price: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "800"
  },
  change: {
    fontSize: 12,
    fontWeight: "800"
  },
  up: {
    color: colors.green
  },
  down: {
    color: colors.danger
  }
});
