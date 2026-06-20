import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";

type Props = {
  label: string;
  value: string;
  helper: string;
  tone?: "blue" | "green" | "cyan" | "purple";
};

const toneColors = {
  blue: "#2563EB",
  green: "#10B981",
  cyan: "#22D3EE",
  purple: "#8B5CF6"
};

export function SummaryCard({ label, value, helper, tone = "blue" }: Props) {
  const accent = toneColors[tone];

  return (
    <View style={styles.card}>
      <View style={[styles.glow, { backgroundColor: accent }]} />
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.helper}>{helper}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0F172A",
    borderColor: "rgba(148, 163, 184, 0.14)",
    borderRadius: 18,
    borderWidth: 1,
    flexBasis: 190,
    flexGrow: 1,
    gap: 7,
    minWidth: 150,
    overflow: "hidden",
    padding: 16,
    position: "relative"
  },
  glow: {
    borderRadius: 70,
    height: 100,
    opacity: 0.16,
    position: "absolute",
    right: -34,
    top: -38,
    width: 100
  },
  label: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  value: {
    color: colors.ink,
    fontSize: 25,
    fontWeight: "900"
  },
  helper: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700"
  }
});
