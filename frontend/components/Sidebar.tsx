import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: "D" },
  { href: "/backtest", label: "Run Backtest", icon: "B" },
  { href: "/sentiment", label: "AI Sentiment", icon: "S" },
  { href: "/compare", label: "Compare", icon: "C" },
  { href: "/reports", label: "Saved Reports", icon: "R" }
] as const;

export function Sidebar() {
  return (
    <View style={styles.sidebar}>
      <Text style={styles.brand}>FINZO</Text>
      <Text style={styles.kicker}>Workspace</Text>
      {items.map((item) => (
        <Link key={item.href} href={item.href} asChild>
          <Pressable style={styles.link}>
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.linkText}>{item.label}</Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: "#090E18",
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    gap: 8,
    minWidth: 190,
    padding: 14,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.24,
    shadowRadius: 24
  },
  brand: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 0.5,
    marginBottom: 10
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
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 11
  },
  icon: {
    color: colors.cyan,
    fontSize: 12,
    fontWeight: "900",
    width: 18
  },
  linkText: {
    color: colors.ink,
    fontWeight: "800"
  }
});
