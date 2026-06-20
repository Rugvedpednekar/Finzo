import { Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { colors } from "@/constants/config";
import type { MarketCandle } from "@/types";

type Props = {
  symbol: string;
  range: string;
  candles: MarketCandle[];
  onRangeChange: (range: string) => void;
};

const ranges = ["1D", "1W", "1M", "3M", "1Y"];

export function PriceChart({ symbol, range, candles, onRangeChange }: Props) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const visible = candles.slice(-40);
  const closes = visible.map((item) => Number(item.close));
  const max = Math.max(...closes, 1);
  const min = Math.min(...closes, max - 1);
  const span = Math.max(max - min, 1);
  const latest = visible[visible.length - 1];

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{symbol} Live Paper Chart</Text>
          <Text style={styles.subtitle}>SMA/EMA overlay simulated for education</Text>
        </View>
        <View style={styles.rangeRow}>
          {ranges.map((item) => (
            <Pressable key={item} onPress={() => onRangeChange(item)} style={[styles.range, item === range && styles.rangeActive]}>
              <Text style={[styles.rangeText, item === range && styles.rangeTextActive]}>{item}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View style={[styles.chart, isMobile && styles.mobileChart]}>
        {visible.map((point, index) => {
          const height = 22 + ((Number(point.close) - min) / span) * (isMobile ? 110 : 180);
          return <View key={`${point.date}-${index}`} style={[styles.bar, { height }]} />;
        })}
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.info}>O {latest?.open?.toFixed?.(2) || "--"}</Text>
        <Text style={styles.info}>H {latest?.high?.toFixed?.(2) || "--"}</Text>
        <Text style={styles.info}>L {latest?.low?.toFixed?.(2) || "--"}</Text>
        <Text style={styles.info}>C {latest?.close?.toFixed?.(2) || "--"}</Text>
        <Text style={styles.info}>Vol {latest?.volume ? `${Math.round(latest.volume / 1000)}k` : "--"}</Text>
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
    flexBasis: 520,
    flexGrow: 2,
    gap: 16,
    minWidth: 260,
    padding: 18
  },
  header: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between"
  },
  title: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900"
  },
  subtitle: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 3
  },
  rangeRow: {
    flexDirection: "row",
    gap: 6
  },
  range: {
    backgroundColor: "#020617",
    borderColor: "rgba(148, 163, 184, 0.12)",
    borderRadius: 9,
    borderWidth: 1,
    paddingHorizontal: 9,
    paddingVertical: 7
  },
  rangeActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB"
  },
  rangeText: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "900"
  },
  rangeTextActive: {
    color: colors.ink
  },
  chart: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 3,
    height: 220
  },
  mobileChart: {
    height: 150
  },
  bar: {
    backgroundColor: "#22D3EE",
    borderRadius: 999,
    flex: 1,
    minHeight: 8,
    opacity: 0.85
  },
  infoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  info: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800"
  }
});
