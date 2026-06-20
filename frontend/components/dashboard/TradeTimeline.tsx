import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";
import type { TradeTimelineItem } from "@/types";

const tagColors = {
  BUY: "#10B981",
  SELL: "#F43F5E",
  REBALANCE: "#22D3EE",
  HOLD: "#A78BFA",
  ALERT: "#F59E0B"
};

type Props = {
  items: TradeTimelineItem[];
};

export function TradeTimeline({ items }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>AI Trade Timeline</Text>
      <View style={styles.list}>
        {items.map((item, index) => (
          <View key={`${item.timestamp}-${item.title}`} style={styles.item}>
            <View style={styles.rail}>
              <View style={[styles.dot, { backgroundColor: tagColors[item.tag] }]} />
              {index < items.length - 1 ? <View style={styles.line} /> : null}
            </View>
            <View style={styles.copy}>
              <View style={styles.topLine}>
                <Text style={styles.time}>{item.timestamp}</Text>
                <Text style={[styles.tag, { color: tagColors[item.tag] }]}>{item.tag}</Text>
              </View>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.explanation}>{item.explanation}</Text>
              <Text style={styles.impact}>{item.impact}</Text>
            </View>
          </View>
        ))}
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
    gap: 0
  },
  item: {
    flexDirection: "row",
    gap: 12
  },
  rail: {
    alignItems: "center",
    width: 16
  },
  dot: {
    borderRadius: 6,
    height: 12,
    marginTop: 4,
    width: 12
  },
  line: {
    backgroundColor: "rgba(148, 163, 184, 0.18)",
    flex: 1,
    minHeight: 58,
    width: 2
  },
  copy: {
    flex: 1,
    paddingBottom: 14
  },
  topLine: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10
  },
  time: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "800"
  },
  tag: {
    fontSize: 11,
    fontWeight: "900"
  },
  itemTitle: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "900",
    marginTop: 3
  },
  explanation: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 3
  },
  impact: {
    color: colors.cyan,
    fontSize: 12,
    fontWeight: "900",
    marginTop: 4
  }
});
