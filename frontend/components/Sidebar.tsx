import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";

const items = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/backtest", label: "Backtest" },
  { href: "/sentiment", label: "Sentiment" },
  { href: "/compare", label: "Compare" },
  { href: "/reports", label: "Reports" }
] as const;

export function Sidebar() {
  return (
    <View style={styles.sidebar}>
      <Text style={styles.kicker}>Workspace</Text>
      {items.map((item) => (
        <Link key={item.href} href={item.href} style={styles.link}>
          {item.label}
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    minWidth: 190,
    padding: 14
  },
  kicker: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 4,
    textTransform: "uppercase"
  },
  link: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 8,
    color: colors.ink,
    fontWeight: "800",
    paddingHorizontal: 12,
    paddingVertical: 11
  }
});
