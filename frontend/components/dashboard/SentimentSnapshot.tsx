import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";

export function SentimentSnapshot() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Sentiment Snapshot</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Bullish</Text>
        </View>
      </View>
      <View style={styles.scoreRow}>
        <Text style={styles.score}>+0.72</Text>
        <View style={styles.track}>
          <View style={styles.fill} />
        </View>
      </View>
      <Text style={styles.explanation}>Recent market text is leaning positive, with growth and earnings language outweighing risk terms.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(15, 23, 42, 0.88)",
    borderColor: "rgba(34, 211, 238, 0.2)",
    borderRadius: 20,
    borderWidth: 1,
    gap: 14,
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
  badge: {
    backgroundColor: "rgba(16, 185, 129, 0.12)",
    borderColor: "rgba(16, 185, 129, 0.28)",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  badgeText: {
    color: "#A7F3D0",
    fontSize: 12,
    fontWeight: "900"
  },
  scoreRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12
  },
  score: {
    color: colors.cyan,
    fontSize: 26,
    fontWeight: "900"
  },
  track: {
    backgroundColor: "#020617",
    borderRadius: 999,
    flex: 1,
    height: 9,
    overflow: "hidden"
  },
  fill: {
    backgroundColor: "#10B981",
    borderRadius: 999,
    height: "100%",
    width: "86%"
  },
  explanation: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21
  }
});
