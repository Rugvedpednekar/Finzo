import { router } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/Button";
import { Disclaimer } from "@/components/Disclaimer";
import { PageTransition } from "@/components/PageTransition";
import { colors } from "@/constants/config";
import { tokenStore } from "@/services/api";

export default function HomeScreen() {
  useEffect(() => {
    if (tokenStore.get()) {
      router.replace("/dashboard");
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <PageTransition>
        <View style={styles.hero}>
          <View style={styles.glowOne} />
          <View style={styles.glowTwo} />
          <Text style={styles.eyebrow}>AI-powered paper trading</Text>
          <Text style={styles.title}>Finzo</Text>
          <Text style={styles.copy}>
            Backtest strategies, analyze financial sentiment, and compare paper portfolios in a secure fintech workspace.
          </Text>
          <View style={styles.actions}>
            <Button title="Login" onPress={() => router.push("/login")} />
            <Button title="Register" variant="secondary" onPress={() => router.push("/register")} />
          </View>
        </View>
        <Disclaimer />
        <View style={styles.featureGrid}>
          {["JWT protected dashboard", "Yahoo-backed historical data", "Finnhub quote support"].map((item) => (
            <View key={item} style={styles.feature}>
              <Text style={styles.featureText}>{item}</Text>
            </View>
          ))}
        </View>
      </PageTransition>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    gap: 18,
    minHeight: "100%",
    padding: 20
  },
  hero: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 16,
    marginBottom: 16,
    overflow: "hidden",
    padding: 28,
    position: "relative"
  },
  glowOne: {
    backgroundColor: "rgba(41, 211, 255, 0.18)",
    borderRadius: 160,
    height: 220,
    position: "absolute",
    right: -50,
    top: -70,
    width: 220
  },
  glowTwo: {
    backgroundColor: "rgba(55, 227, 159, 0.12)",
    borderRadius: 160,
    bottom: -80,
    height: 240,
    left: -70,
    position: "absolute",
    width: 240
  },
  eyebrow: {
    color: colors.cyan,
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase"
  },
  title: {
    color: colors.ink,
    fontSize: 54,
    fontWeight: "900"
  },
  copy: {
    color: colors.muted,
    fontSize: 18,
    lineHeight: 27,
    maxWidth: 760
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 16
  },
  feature: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexBasis: 180,
    flexGrow: 1,
    padding: 16
  },
  featureText: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "800"
  }
});
