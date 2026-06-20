import { router } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from "react-native";
import { colors, disclaimer } from "@/constants/config";

const tickers = [
  { symbol: "AAPL", price: "$173.50", change: "+1.2%", positive: true },
  { symbol: "MSFT", price: "$338.11", change: "+0.8%", positive: true },
  { symbol: "NVDA", price: "$450.25", change: "-2.1%", positive: false },
  { symbol: "TSLA", price: "$215.40", change: "+3.4%", positive: true }
];

const features = [
  "JWT protected dashboard",
  "Backtesting engine",
  "AI sentiment analysis",
  "Aurora PostgreSQL storage"
];

export default function LandingScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={[
          styles.content,
          isMobile && styles.mobileContent
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.backgroundOrbTop} pointerEvents="none" />
        <View style={styles.backgroundOrbBottom} pointerEvents="none" />

        <View style={styles.container}>
          <View style={styles.topbar}>
            <Text style={styles.logo}>FINZO</Text>

            <View style={styles.topbarActions}>
              <Pressable
                onPress={() => router.push("/login")}
                style={({ pressed }) => [
                  styles.topbarGhostButton,
                  pressed && styles.pressed
                ]}
              >
                <Text style={styles.topbarGhostText}>Login</Text>
              </Pressable>

              <Pressable
                onPress={() => router.push("/register")}
                style={({ pressed }) => [
                  styles.topbarPrimaryButton,
                  pressed && styles.pressed
                ]}
              >
                <Text style={styles.topbarPrimaryText}>Register</Text>
              </Pressable>
            </View>
          </View>

          <View style={[styles.hero, isMobile && styles.heroMobile]}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>AI-powered paper trading</Text>
            </View>

            <Text
              style={[
                styles.heading,
                isTablet && styles.headingTablet,
                isMobile && styles.headingMobile
              ]}
            >
              Trade ideas. {"\n"}
              Not real money.
            </Text>

            <Text
              style={[
                styles.subtitle,
                isMobile && styles.subtitleMobile
              ]}
            >
              Backtest technical strategies, analyze financial sentiment, and
              track paper portfolios in a secure AI-assisted workspace.
            </Text>

            <View
              style={[
                styles.ctaRow,
                isMobile && styles.ctaColumn
              ]}
            >
              <Pressable
                onPress={() => router.push("/register")}
                style={({ pressed }) => [
                  styles.primaryCta,
                  isMobile && styles.fullWidthButton,
                  pressed && styles.pressed
                ]}
              >
                <Text style={styles.primaryCtaText}>Start Backtesting</Text>
              </Pressable>

              <Pressable
                onPress={() => router.push("/login")}
                style={({ pressed }) => [
                  styles.secondaryCta,
                  isMobile && styles.fullWidthButton,
                  pressed && styles.pressed
                ]}
              >
                <Text style={styles.secondaryCtaText}>Login</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.tickerSection}>
            <View
              style={[
                styles.tickerRow,
                isMobile && styles.tickerWrap
              ]}
            >
              {tickers.map((item) => (
                <View
                  key={item.symbol}
                  style={[
                    styles.tickerCard,
                    isMobile && styles.tickerCardMobile
                  ]}
                >
                  <Text style={styles.tickerSymbol}>{item.symbol}</Text>
                  <Text style={styles.tickerPrice}>{item.price}</Text>
                  <Text
                    style={[
                      styles.tickerChange,
                      item.positive ? styles.positive : styles.negative
                    ]}
                  >
                    {item.change}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View
            style={[
              styles.featuresGrid,
              isMobile && styles.featuresGridMobile
            ]}
          >
            {features.map((feature) => (
              <View
                key={feature}
                style={[
                  styles.featureCard,
                  isMobile && styles.featureCardMobile
                ]}
              >
                <View style={styles.featureDot} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.footerText}>{disclaimer}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#020617"
  },
  screen: {
    flex: 1,
    backgroundColor: "#020617"
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 28
  },
  mobileContent: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 24
  },
  container: {
    alignSelf: "center",
    maxWidth: 1280,
    width: "100%"
  },

  backgroundOrbTop: {
    position: "absolute",
    right: -140,
    top: -70,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "rgba(47, 128, 255, 0.18)"
  },
  backgroundOrbBottom: {
    position: "absolute",
    left: -120,
    bottom: 40,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "rgba(41, 211, 255, 0.12)"
  },

  topbar: {
    minHeight: 72,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 34
  },
  logo: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 1.5
  },
  topbarActions: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12
  },
  topbarGhostButton: {
    paddingHorizontal: 14,
    paddingVertical: 10
  },
  topbarGhostText: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "800"
  },
  topbarPrimaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 14
  },
  topbarPrimaryText: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900"
  },

  hero: {
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 18
  },
  heroMobile: {
    paddingTop: 10,
    paddingBottom: 10
  },
  badge: {
    backgroundColor: "rgba(47, 128, 255, 0.08)",
    borderColor: "rgba(41, 211, 255, 0.22)",
    borderRadius: 999,
    borderWidth: 1,
    marginBottom: 22,
    paddingHorizontal: 18,
    paddingVertical: 10
  },
  badgeText: {
    color: colors.cyan,
    fontSize: 16,
    fontWeight: "900"
  },
  heading: {
    color: colors.ink,
    fontSize: 72,
    fontWeight: "900",
    lineHeight: 78,
    maxWidth: 820,
    textAlign: "center"
  },
  headingTablet: {
    fontSize: 58,
    lineHeight: 64,
    maxWidth: 760
  },
  headingMobile: {
    fontSize: 42,
    lineHeight: 48,
    maxWidth: 340
  },
  subtitle: {
    color: colors.muted,
    fontSize: 18,
    lineHeight: 30,
    marginTop: 20,
    maxWidth: 760,
    textAlign: "center"
  },
  subtitleMobile: {
    fontSize: 16,
    lineHeight: 26,
    marginTop: 16,
    maxWidth: 340
  },

  ctaRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 14,
    marginTop: 28
  },
  ctaColumn: {
    alignItems: "stretch",
    flexDirection: "column",
    width: "100%",
    maxWidth: 320
  },
  primaryCta: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 16,
    minWidth: 220,
    paddingHorizontal: 24,
    paddingVertical: 18,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 22
  },
  primaryCtaText: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900"
  },
  secondaryCta: {
    alignItems: "center",
    backgroundColor: "#0F172A",
    borderColor: "rgba(148, 163, 184, 0.16)",
    borderRadius: 16,
    borderWidth: 1,
    minWidth: 170,
    paddingHorizontal: 24,
    paddingVertical: 18
  },
  secondaryCtaText: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900"
  },
  fullWidthButton: {
    width: "100%"
  },

  tickerSection: {
    marginTop: 34
  },
  tickerRow: {
    alignItems: "stretch",
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    justifyContent: "center",
    width: "100%"
  },
  tickerWrap: {
    justifyContent: "center"
  },
  tickerCard: {
    backgroundColor: "#0B1220",
    borderColor: "rgba(148, 163, 184, 0.14)",
    borderRadius: 18,
    borderWidth: 1,
    minWidth: 160,
    paddingHorizontal: 18,
    paddingVertical: 16
  },
  tickerCardMobile: {
    minWidth: "47%"
  },
  tickerSymbol: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900"
  },
  tickerPrice: {
    color: colors.muted,
    fontSize: 16,
    fontWeight: "700",
    marginTop: 8
  },
  tickerChange: {
    fontSize: 15,
    fontWeight: "900",
    marginTop: 8
  },
  positive: {
    color: colors.green
  },
  negative: {
    color: "#FB7185"
  },

  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 34
  },
  featuresGridMobile: {
    flexDirection: "column"
  },
  featureCard: {
    alignItems: "center",
    backgroundColor: "#0B1220",
    borderColor: "rgba(148, 163, 184, 0.14)",
    borderRadius: 16,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    gap: 12,
    minHeight: 62,
    minWidth: 240,
    paddingHorizontal: 18
  },
  featureCardMobile: {
    width: "100%",
    minWidth: 0
  },
  featureDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.cyan
  },
  featureText: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "800"
  },

  footerText: {
    color: "#64748B",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 28,
    textAlign: "center"
  },

  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }]
  }
});