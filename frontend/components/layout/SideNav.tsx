import { Link, router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";
import { api } from "@/services/api";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "D" },
  { href: "/backtest", label: "Run Backtest", icon: "B" },
  { href: "/sentiment", label: "AI Sentiment", icon: "S" },
  { href: "/compare", label: "Compare", icon: "C" },
  { href: "/reports", label: "Saved Reports", icon: "R" }
] as const;

export function SideNav() {
  const logout = () => {
    api.logout();
    router.replace("/");
  };

  return (
    <View style={styles.nav}>
      <View style={styles.header}>
        <Text style={styles.logo}>FINZO</Text>
        <Text style={styles.caption}>Paper trading lab</Text>
      </View>
      <View style={styles.links}>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} asChild>
            <Pressable style={({ pressed }) => [styles.link, pressed && styles.pressed]}>
              <Text style={styles.icon}>{item.icon}</Text>
              <Text style={styles.label}>{item.label}</Text>
            </Pressable>
          </Link>
        ))}
      </View>
      <Pressable onPress={logout} style={({ pressed }) => [styles.logout, pressed && styles.pressed]}>
        <Text style={styles.icon}>L</Text>
        <Text style={styles.label}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    backgroundColor: "#0F172A",
    borderColor: "rgba(148, 163, 184, 0.14)",
    borderRadius: 18,
    borderWidth: 1,
    gap: 18,
    minWidth: 218,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.24,
    shadowRadius: 28
  },
  header: {
    gap: 3,
    padding: 8
  },
  logo: {
    color: colors.ink,
    fontSize: 23,
    fontWeight: "900",
    letterSpacing: 1
  },
  caption: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700"
  },
  links: {
    gap: 8
  },
  link: {
    alignItems: "center",
    backgroundColor: "rgba(2, 6, 23, 0.45)",
    borderColor: "rgba(148, 163, 184, 0.1)",
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    minHeight: 46,
    paddingHorizontal: 12
  },
  logout: {
    alignItems: "center",
    borderColor: "rgba(244, 63, 94, 0.22)",
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    marginTop: "auto",
    minHeight: 46,
    paddingHorizontal: 12
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.99 }]
  },
  icon: {
    color: colors.cyan,
    fontSize: 12,
    fontWeight: "900",
    textAlign: "center",
    width: 18
  },
  label: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "800"
  }
});
