import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { colors } from "@/constants/config";

type ChartPoint = {
  label: string;
  value: number;
};

type Props = {
  data: ChartPoint[];
};

export function PortfolioChart({ data }: Props) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const max = Math.max(...data.map((point) => point.value));
  const min = Math.min(...data.map((point) => point.value));
  const span = Math.max(max - min, 1);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Paper Portfolio Growth</Text>
          <Text style={styles.subtitle}>Demo equity curve</Text>
        </View>
        <Text style={styles.badge}>YTD</Text>
      </View>
      <View style={[styles.chart, isMobile && styles.mobileChart]}>
        {data.map((point) => {
          const height = 28 + ((point.value - min) / span) * (isMobile ? 102 : 150);
          return (
            <View key={point.label} style={styles.column}>
              <View style={[styles.bar, { height }]} />
              <Text style={styles.axis}>{point.label}</Text>
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
    flexBasis: 420,
    flexGrow: 2,
    gap: 20,
    minWidth: 260,
    padding: 18
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: "900"
  },
  subtitle: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 3
  },
  badge: {
    backgroundColor: "#020617",
    borderColor: "rgba(148, 163, 184, 0.14)",
    borderRadius: 9,
    borderWidth: 1,
    color: colors.muted,
    fontSize: 11,
    fontWeight: "900",
    paddingHorizontal: 9,
    paddingVertical: 6
  },
  chart: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 9,
    height: 210
  },
  mobileChart: {
    height: 155
  },
  column: {
    alignItems: "center",
    flex: 1,
    gap: 7,
    justifyContent: "flex-end"
  },
  bar: {
    backgroundColor: "#2563EB",
    borderRadius: 999,
    minHeight: 18,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.36,
    shadowRadius: 14,
    width: "100%"
  },
  axis: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "800"
  }
});
