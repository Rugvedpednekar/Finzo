import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/Button";
import { Disclaimer } from "@/components/Disclaimer";
import { colors } from "@/constants/config";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/backtest", label: "Run Backtest" },
  { href: "/sentiment", label: "Sentiment Analyzer" },
  { href: "/compare", label: "Compare Results" },
  { href: "/reports", label: "Saved Reports" }
] as const;

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>AI-powered paper-trading sandbox</Text>
        <Text style={styles.title}>Finzo</Text>
        <Text style={styles.copy}>
          Test technical strategies, inspect simulated trades, and see how financial sentiment can affect a paper portfolio.
        </Text>
        <View style={styles.actions}>
          <Link href="/backtest" asChild>
            <Button title="Run a Backtest" />
          </Link>
          <Link href="/dashboard" asChild>
            <Button title="View Dashboard" variant="secondary" />
          </Link>
        </View>
      </View>
      <Disclaimer />
      <View style={styles.navGrid}>
        {links.map((item) => (
          <Link key={item.href} href={item.href} style={styles.navCard}>
            <Text style={styles.navText}>{item.label}</Text>
          </Link>
        ))}
      </View>
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
    gap: 14,
    padding: 24
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase"
  },
  title: {
    color: colors.ink,
    fontSize: 44,
    fontWeight: "900"
  },
  copy: {
    color: colors.muted,
    fontSize: 17,
    lineHeight: 25,
    maxWidth: 720
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  navGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  navCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexBasis: 180,
    flexGrow: 1,
    padding: 16
  },
  navText: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "800"
  }
});
