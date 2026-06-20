import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";

const tickers = [
  { symbol: "AAPL", price: "173.50", change: "+1.2%", up: true },
  { symbol: "MSFT", price: "338.11", change: "+0.8%", up: true },
  { symbol: "NVDA", price: "450.25", change: "-2.1%", up: false },
  { symbol: "TSLA", price: "215.40", change: "+3.4%", up: true }
];

export function MarketTickerStrip() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.strip}>
      {tickers.map((ticker) => (
        <View key={ticker.symbol} style={styles.item}>
          <Text style={styles.symbol}>{ticker.symbol}</Text>
          <Text style={styles.price}>${ticker.price}</Text>
          <Text style={[styles.change, ticker.up ? styles.up : styles.down]}>{ticker.change}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  strip: {
    gap: 10,
    paddingVertical: 2
  },
  item: {
    backgroundColor: "rgba(15, 23, 42, 0.82)",
    borderColor: "rgba(59, 130, 246, 0.22)",
    borderRadius: 14,
    borderWidth: 1,
    minWidth: 128,
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  symbol: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "900"
  },
  price: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 4
  },
  change: {
    fontSize: 12,
    fontWeight: "900",
    marginTop: 4
  },
  up: {
    color: colors.green
  },
  down: {
    color: colors.danger
  }
});
