import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";
import type { AllocationPlan } from "@/types";
import { AllocationBar } from "./AllocationBar";

type Props = {
  allocation?: AllocationPlan | null;
};

export function AllocationCard({ allocation }: Props) {
  const items = allocation?.allocation || [];

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Portfolio Allocation</Text>
        <Text style={styles.badge}>{allocation?.risk_profile || "Balanced growth"}</Text>
      </View>
      <View style={styles.bars}>
        {items.map((item) => (
          <AllocationBar key={item.bucket} item={item} />
        ))}
      </View>
      <View style={styles.insight}>
        <Text style={styles.insightTitle}>{allocation?.insight_title || "AI Allocation Plan"}</Text>
        <Text style={styles.insightText}>
          {allocation?.insight || "Risk-adjusted allocation favors diversified equities and bonds while reserving a small trading bucket for active algorithmic strategies."}
        </Text>
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
    gap: 16,
    padding: 18
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between"
  },
  title: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: "900"
  },
  badge: {
    backgroundColor: "rgba(34, 211, 238, 0.1)",
    borderColor: "rgba(34, 211, 238, 0.24)",
    borderRadius: 999,
    borderWidth: 1,
    color: colors.cyan,
    fontSize: 11,
    fontWeight: "900",
    paddingHorizontal: 9,
    paddingVertical: 6
  },
  bars: {
    gap: 12
  },
  insight: {
    backgroundColor: "rgba(37, 99, 235, 0.1)",
    borderColor: "rgba(37, 99, 235, 0.22)",
    borderRadius: 14,
    borderWidth: 1,
    padding: 13
  },
  insightTitle: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "900"
  },
  insightText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5
  }
});
