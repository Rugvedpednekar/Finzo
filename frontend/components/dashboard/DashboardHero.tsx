import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";
import type { User } from "@/types";

type Pulse = "Bullish" | "Neutral" | "Bearish";

type Props = {
  user: User;
  pulse?: Pulse;
};

export function DashboardHero({ user, pulse = "Bullish" }: Props) {
  const pulseStyle = pulse === "Bullish" ? styles.bullish : pulse === "Bearish" ? styles.bearish : styles.neutral;

  return (
    <View style={styles.card}>
      <View style={styles.glow} />
      <View style={styles.copy}>
        <Text style={styles.kicker}>Protected Trading Workspace</Text>
        <Text style={styles.title}>Welcome back, {user.name}</Text>
        <Text style={styles.subtitle}>Monitor paper strategies, live-style watchlists, sentiment signals, and saved reports from one secure dashboard.</Text>
      </View>
      <View style={[styles.pulse, pulseStyle]}>
        <Text style={styles.pulseLabel}>Market Pulse</Text>
        <Text style={styles.pulseValue}>{pulse}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0F172A",
    borderColor: "rgba(37, 99, 235, 0.22)",
    borderRadius: 22,
    borderWidth: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "space-between",
    overflow: "hidden",
    padding: 20,
    position: "relative"
  },
  glow: {
    backgroundColor: "rgba(37, 99, 235, 0.2)",
    borderRadius: 170,
    height: 220,
    position: "absolute",
    right: -70,
    top: -80,
    width: 220
  },
  copy: {
    flex: 1,
    gap: 7,
    minWidth: 240,
    zIndex: 1
  },
  kicker: {
    color: colors.cyan,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0.4,
    textTransform: "uppercase"
  },
  title: {
    color: colors.ink,
    fontSize: 28,
    fontWeight: "900"
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    maxWidth: 640
  },
  pulse: {
    borderRadius: 16,
    borderWidth: 1,
    minWidth: 168,
    padding: 14,
    zIndex: 1
  },
  bullish: {
    backgroundColor: "rgba(16, 185, 129, 0.11)",
    borderColor: "rgba(16, 185, 129, 0.28)"
  },
  neutral: {
    backgroundColor: "rgba(34, 211, 238, 0.1)",
    borderColor: "rgba(34, 211, 238, 0.25)"
  },
  bearish: {
    backgroundColor: "rgba(244, 63, 94, 0.1)",
    borderColor: "rgba(244, 63, 94, 0.25)"
  },
  pulseLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  pulseValue: {
    color: "#A7F3D0",
    fontSize: 25,
    fontWeight: "900",
    marginTop: 5
  }
});
