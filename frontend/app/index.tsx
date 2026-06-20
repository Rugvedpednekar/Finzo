import { router } from "expo-router";
import { useEffect } from "react";
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { AuthFeatureList } from "@/components/auth/AuthFeatureList";
import { MarketTickerStrip } from "@/components/auth/MarketTickerStrip";
import { colors } from "@/constants/config";
import { tokenStore } from "@/services/api";

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  useEffect(() => {
    if (tokenStore.get()) {
      router.replace("/dashboard");
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={[styles.page, isMobile && styles.mobilePage]}>
      <View style={styles.glowOne} />
      <View style={styles.glowTwo} />
      <View style={styles.navbar}>
        <Text style={styles.logo}>FINZO</Text>
        <View style={styles.navActions}>
          <Pressable onPress={() => router.push("/login")} style={styles.navGhost}>
            <Text style={styles.navGhostText}>Login</Text>
          </Pressable>
          <Pressable onPress={() => router.push("/register")} style={styles.navButton}>
            <Text style={styles.navButtonText}>Register</Text>
          </Pressable>
        </View>
      </View>
      <View style={[styles.hero, isMobile && styles.mobileHero]}>
        <Text style={styles.badge}>AI-powered paper trading</Text>
        <Text style={[styles.headline, isMobile && styles.mobileHeadline]}>Trade ideas. Not real money.</Text>
        <Text style={[styles.subtitle, isMobile && styles.mobileSubtitle]}>
          Backtest technical strategies, analyze financial sentiment, and track paper portfolios in a protected sandbox.
        </Text>
        <View style={[styles.ctas, isMobile && styles.mobileCtas]}>
          <Pressable onPress={() => router.push("/register")} style={[styles.primaryCta, isMobile && styles.fullButton]}>
            <Text style={styles.primaryText}>Start Backtesting</Text>
          </Pressable>
          <Pressable onPress={() => router.push("/login")} style={[styles.secondaryCta, isMobile && styles.fullButton]}>
            <Text style={styles.secondaryText}>Login</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.marketSection}>
        <MarketTickerStrip />
      </View>
      <AuthFeatureList compact={isMobile} />
      <Text style={styles.disclaimer}>Finzo is for educational paper trading only and does not provide financial advice.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#020617",
    gap: 22,
    minHeight: "100%",
    overflow: "hidden",
    padding: 24,
    position: "relative"
  },
  mobilePage: {
    gap: 16,
    padding: 16
  },
  navbar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: 1180,
    width: "100%",
    zIndex: 1
  },
  logo: {
    color: colors.ink,
    fontSize: 23,
    fontWeight: "900",
    letterSpacing: 1
  },
  navActions: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10
  },
  navGhost: {
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  navGhostText: {
    color: colors.muted,
    fontWeight: "900"
  },
  navButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  navButtonText: {
    color: colors.ink,
    fontWeight: "900"
  },
  hero: {
    alignItems: "center",
    alignSelf: "center",
    gap: 18,
    justifyContent: "center",
    maxWidth: 840,
    minHeight: 360,
    paddingHorizontal: 12,
    paddingTop: 48,
    zIndex: 1
  },
  mobileHero: {
    minHeight: 280,
    paddingTop: 24
  },
  glowOne: {
    backgroundColor: "rgba(37, 99, 235, 0.24)",
    borderRadius: 260,
    height: 420,
    position: "absolute",
    right: -130,
    top: -160,
    width: 420
  },
  glowTwo: {
    backgroundColor: "rgba(34, 211, 238, 0.1)",
    borderRadius: 260,
    bottom: -160,
    height: 420,
    left: -140,
    position: "absolute",
    width: 420
  },
  badge: {
    backgroundColor: "rgba(59, 130, 246, 0.12)",
    borderColor: "rgba(59, 130, 246, 0.3)",
    borderRadius: 999,
    borderWidth: 1,
    color: colors.cyan,
    fontSize: 13,
    fontWeight: "900",
    paddingHorizontal: 14,
    paddingVertical: 7
  },
  headline: {
    color: colors.ink,
    fontSize: 58,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 64,
    textAlign: "center"
  },
  mobileHeadline: {
    fontSize: 38,
    lineHeight: 43
  },
  subtitle: {
    color: colors.muted,
    fontSize: 18,
    lineHeight: 27,
    maxWidth: 680,
    textAlign: "center"
  },
  mobileSubtitle: {
    fontSize: 15,
    lineHeight: 22
  },
  ctas: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center"
  },
  mobileCtas: {
    width: "100%"
  },
  primaryCta: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 14,
    minWidth: 190,
    paddingHorizontal: 22,
    paddingVertical: 15,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.38,
    shadowRadius: 20
  },
  secondaryCta: {
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.86)",
    borderColor: "rgba(148, 163, 184, 0.18)",
    borderRadius: 14,
    borderWidth: 1,
    minWidth: 130,
    paddingHorizontal: 22,
    paddingVertical: 15
  },
  fullButton: {
    width: "100%"
  },
  primaryText: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "900"
  },
  secondaryText: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "900"
  },
  marketSection: {
    alignSelf: "center",
    maxWidth: 720,
    width: "100%",
    zIndex: 1
  },
  disclaimer: {
    color: "#64748B",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
    textAlign: "center",
    zIndex: 1
  }
});
