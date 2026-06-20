import { router } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, useWindowDimensions, View } from "react-native";
import { colors } from "@/constants/config";
import { api } from "@/services/api";
import type { User } from "@/types";

type Props = {
  user: User;
};

export function TopBar({ user }: Props) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const logout = () => {
    api.logout();
    router.replace("/");
  };

  return (
    <View style={styles.bar}>
      <View style={styles.left}>
        <Text style={styles.logo}>FINZO</Text>
        {!isMobile ? (
          <View style={styles.search}>
            <Text style={styles.searchIcon}>⌕</Text>
            <TextInput
              placeholder="Search ticker..."
              placeholderTextColor="#64748B"
              style={styles.searchInput}
              autoCapitalize="characters"
            />
          </View>
        ) : null}
      </View>
      <View style={styles.right}>
        <View style={styles.status}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>{isMobile ? "Open" : "Markets open"}</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.name.slice(0, 1).toUpperCase()}</Text>
        </View>
        {!isMobile ? <Text style={styles.name}>{user.name}</Text> : null}
        <Pressable onPress={logout} style={({ pressed }) => [styles.logout, pressed && styles.pressed]}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    alignItems: "center",
    backgroundColor: "rgba(2, 6, 23, 0.92)",
    borderBottomColor: "rgba(148, 163, 184, 0.14)",
    borderBottomWidth: 1,
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    minHeight: 68,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  left: {
    alignItems: "center",
    flexDirection: "row",
    flexShrink: 1,
    gap: 16
  },
  logo: {
    color: colors.ink,
    fontSize: 21,
    fontWeight: "900",
    letterSpacing: 1
  },
  search: {
    alignItems: "center",
    backgroundColor: "#0F172A",
    borderColor: "rgba(148, 163, 184, 0.16)",
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    minWidth: 250,
    paddingHorizontal: 12
  },
  searchIcon: {
    color: colors.cyan,
    fontSize: 18,
    fontWeight: "900"
  },
  searchInput: {
    color: colors.ink,
    flex: 1,
    fontSize: 14,
    minHeight: 42
  },
  right: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10
  },
  status: {
    alignItems: "center",
    backgroundColor: "rgba(16, 185, 129, 0.11)",
    borderColor: "rgba(16, 185, 129, 0.25)",
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    gap: 7,
    paddingHorizontal: 10,
    paddingVertical: 7
  },
  statusDot: {
    backgroundColor: "#10B981",
    borderRadius: 4,
    height: 8,
    width: 8
  },
  statusText: {
    color: "#A7F3D0",
    fontSize: 12,
    fontWeight: "900"
  },
  avatar: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 16,
    height: 32,
    justifyContent: "center",
    width: 32
  },
  avatarText: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "900"
  },
  name: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "800"
  },
  logout: {
    borderColor: "rgba(148, 163, 184, 0.16)",
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 11,
    paddingVertical: 9
  },
  pressed: {
    opacity: 0.72,
    transform: [{ scale: 0.98 }]
  },
  logoutText: {
    color: colors.cyan,
    fontSize: 12,
    fontWeight: "900"
  }
});
