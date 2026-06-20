import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";
import type { LiveQuote } from "@/types";
import { WatchlistCard } from "./WatchlistCard";

type Props = {
  quotes: LiveQuote[];
};

export function MarketWatchPanel({ quotes }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Live Market Monitor</Text>
        <Text style={styles.badge}>Fallback-safe</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.list}>
        {quotes.map((quote) => (
          <WatchlistCard
            key={quote.symbol}
            symbol={quote.symbol}
            price={quote.price.toFixed(2)}
            change={`${quote.percent_change >= 0 ? "+" : ""}${quote.percent_change.toFixed(2)}%`}
            direction={quote.percent_change >= 0 ? "up" : "down"}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 12
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900"
  },
  badge: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800"
  },
  list: {
    gap: 12,
    paddingRight: 4
  }
});
