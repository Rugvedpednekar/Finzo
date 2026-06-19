import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";

type Props = {
  label: string;
  value: string;
  helper?: string;
  accent?: string;
};

export function StatCard({ label, value, helper, accent = colors.primary }: Props) {
  return (
    <View style={styles.card}>
      <View style={[styles.glow, { backgroundColor: accent }]} />
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {helper ? <Text style={styles.helper}>{helper}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 16,
    borderWidth: 1,
    flexBasis: 220,
    flexGrow: 1,
    gap: 8,
    overflow: "hidden",
    padding: 16,
    position: "relative"
  },
  glow: {
    borderRadius: 70,
    height: 92,
    opacity: 0.18,
    position: "absolute",
    right: -28,
    top: -34,
    width: 92
  },
  label: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700"
  },
  value: {
    color: colors.ink,
    fontSize: 26,
    fontWeight: "800"
  },
  helper: {
    color: colors.muted,
    fontSize: 13
  }
});
