import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";

const tabs = [
  { href: "/dashboard", label: "Home", icon: "D" },
  { href: "/backtest", label: "Test", icon: "B" },
  { href: "/sentiment", label: "AI", icon: "S" },
  { href: "/compare", label: "Compare", icon: "C" },
  { href: "/reports", label: "Reports", icon: "R" }
] as const;

export function BottomTabs() {
  return (
    <View style={styles.tabs}>
      {tabs.map((tab) => (
        <Link key={tab.href} href={tab.href} asChild>
          <Pressable style={({ pressed }) => [styles.tab, pressed && styles.pressed]}>
            <Text style={styles.icon}>{tab.icon}</Text>
            <Text style={styles.label}>{tab.label}</Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.96)",
    borderColor: "rgba(148, 163, 184, 0.16)",
    borderRadius: 18,
    borderWidth: 1,
    bottom: 12,
    flexDirection: "row",
    gap: 3,
    justifyContent: "space-between",
    left: 12,
    minHeight: 64,
    paddingHorizontal: 8,
    position: "absolute",
    right: 12,
    zIndex: 20
  },
  tab: {
    alignItems: "center",
    flex: 1,
    gap: 3,
    justifyContent: "center",
    minHeight: 50
  },
  pressed: {
    opacity: 0.72,
    transform: [{ scale: 0.96 }]
  },
  icon: {
    color: colors.cyan,
    fontSize: 12,
    fontWeight: "900"
  },
  label: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "800"
  }
});
