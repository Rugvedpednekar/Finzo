import { Link, router, usePathname } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";
import { api } from "@/services/api";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "D" },
  { href: "/backtest", label: "Backtest", icon: "B" },
  { href: "/sentiment", label: "AI Signals", icon: "S" },
  { href: "/compare", label: "Compare", icon: "C" },
  { href: "/reports", label: "Reports", icon: "R" }
] as const;

export function SideNav() {
  const pathname = usePathname();

  const logout = () => {
    api.logout();
    router.replace("/");
  };

  return (
    <View style={styles.nav}>
      <View style={styles.header}>
        <Text style={styles.logo}>FINZO</Text>
        <Text style={styles.caption}>AI paper trading</Text>
      </View>

      <View style={styles.links}>
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link key={item.href} href={item.href} asChild>
              <Pressable
                style={({ pressed }) => [
                  styles.link,
                  active && styles.activeLink,
                  pressed && styles.pressed
                ]}
              >
                <View style={[styles.iconBox, active && styles.activeIconBox]}>
                  <Text style={[styles.icon, active && styles.activeIcon]}>
                    {item.icon}
                  </Text>
                </View>
                <Text style={[styles.label, active && styles.activeLabel]}>
                  {item.label}
                </Text>
              </Pressable>
            </Link>
          );
        })}
      </View>

      <Pressable
        onPress={logout}
        style={({ pressed }) => [styles.logout, pressed && styles.pressed]}
      >
        <View style={styles.iconBox}>
          <Text style={styles.icon}>L</Text>
        </View>
        <Text style={styles.label}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    backgroundColor: "#0B1220",
    borderColor: "rgba(148, 163, 184, 0.14)",
    borderRadius: 18,
    borderWidth: 1,
    flex: 1,
    gap: 18,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.18,
    shadowRadius: 28
  },
  header: {
    borderBottomColor: "rgba(148, 163, 184, 0.1)",
    borderBottomWidth: 1,
    gap: 4,
    paddingBottom: 16,
    paddingHorizontal: 6,
    paddingTop: 6
  },
  logo: {
    color: colors.ink,
    fontSize: 23,
    fontWeight: "900",
    letterSpacing: 1.5
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
    borderColor: "transparent",
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    minHeight: 42,
    paddingHorizontal: 10
  },
  activeLink: {
    backgroundColor: "rgba(47, 128, 255, 0.1)",
    borderColor: "rgba(47, 128, 255, 0.22)"
  },
  logout: {
    alignItems: "center",
    borderColor: "rgba(244, 63, 94, 0.22)",
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    marginTop: "auto",
    minHeight: 44,
    paddingHorizontal: 10
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.99 }]
  },
  iconBox: {
    alignItems: "center",
    backgroundColor: "rgba(41, 211, 255, 0.08)",
    borderRadius: 8,
    height: 24,
    justifyContent: "center",
    width: 24
  },
  activeIconBox: {
    backgroundColor: "rgba(41, 211, 255, 0.16)"
  },
  icon: {
    color: colors.cyan,
    fontSize: 11,
    fontWeight: "900"
  },
  activeIcon: {
    color: colors.ink
  },
  label: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "800"
  },
  activeLabel: {
    color: colors.cyan
  }
});