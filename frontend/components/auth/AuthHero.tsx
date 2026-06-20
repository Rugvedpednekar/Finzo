import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";
import { AuthFeatureList } from "./AuthFeatureList";
import { MarketTickerStrip } from "./MarketTickerStrip";

type Props = {
  mode: "login" | "register";
};

export function AuthHero({ mode }: Props) {
  return (
    <View style={styles.panel}>
      <View style={styles.glow} />
      <Text style={styles.logo}>FINZO</Text>
      <Text style={styles.headline}>
        {mode === "login" ? "Backtest smarter with market sentiment." : "Build conviction before capital."}
      </Text>
      <Text style={styles.copy}>
        Paper-trade technical strategies, read market tone, and save strategy reports without connecting to a brokerage.
      </Text>
      <AuthFeatureList compact items={["Paper trading only", "AI sentiment signals", "Saved strategy reports"]} />
      <View style={styles.tickerCard}>
        <Text style={styles.tickerTitle}>Live market feel</Text>
        <MarketTickerStrip />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: "rgba(15, 23, 42, 0.72)",
    borderColor: "rgba(59, 130, 246, 0.18)",
    borderRadius: 22,
    borderWidth: 1,
    flex: 1,
    gap: 16,
    height: 540,
    maxWidth: 620,
    minWidth: 0,
    overflow: "hidden",
    padding: 30,
    position: "relative"
  },
  glow: {
    backgroundColor: "rgba(37, 99, 235, 0.26)",
    borderRadius: 180,
    height: 260,
    position: "absolute",
    right: -80,
    top: -90,
    width: 260
  },
  logo: {
    color: colors.cyan,
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1.4
  },
  headline: {
    color: colors.ink,
    fontSize: 36,
    fontWeight: "900",
    lineHeight: 42,
    maxWidth: 430
  },
  copy: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 450
  },
  tickerCard: {
    backgroundColor: "rgba(2, 6, 23, 0.58)",
    borderColor: "rgba(148, 163, 184, 0.14)",
    borderRadius: 16,
    borderWidth: 1,
    gap: 10,
    padding: 14
  },
  tickerTitle: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "900"
  }
});
