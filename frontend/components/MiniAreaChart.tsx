import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";

type Point = {
  label: string;
  value: number;
};

type Props = {
  title: string;
  data: Point[];
  accent?: string;
};

export function MiniAreaChart({ title, data, accent = colors.primary }: Props) {
  const max = Math.max(...data.map((item) => item.value));
  const min = Math.min(...data.map((item) => item.value));
  const span = Math.max(max - min, 1);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.badge}>YTD</Text>
      </View>
      <View style={styles.chart}>
        {data.map((item) => {
          const height = 34 + ((item.value - min) / span) * 126;
          return (
            <View key={item.label} style={styles.column}>
              <View style={[styles.bar, { height, backgroundColor: accent }]} />
              <Text style={styles.axis}>{item.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 16,
    borderWidth: 1,
    flex: 1,
    gap: 18,
    minWidth: 280,
    padding: 18,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.22,
    shadowRadius: 24
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
  badge: {
    backgroundColor: colors.backgroundAlt,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.muted,
    fontSize: 11,
    fontWeight: "900",
    paddingHorizontal: 8,
    paddingVertical: 5
  },
  chart: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 10,
    height: 190
  },
  column: {
    alignItems: "center",
    flex: 1,
    gap: 8,
    justifyContent: "flex-end"
  },
  bar: {
    borderRadius: 999,
    opacity: 0.86,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    width: "100%"
  },
  axis: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "700"
  }
});
