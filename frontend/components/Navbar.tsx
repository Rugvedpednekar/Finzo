import { Link, router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";
import { api } from "@/services/api";
import type { User } from "@/types";

type Props = {
  user: User;
};

export function Navbar({ user }: Props) {
  const logout = () => {
    api.logout();
    router.replace("/");
  };

  return (
    <View style={styles.nav}>
      <Link href="/dashboard" style={styles.brand}>
        FINZO
      </Link>
      <View style={styles.right}>
        <View style={styles.search}>
          <Text style={styles.searchText}>Search ticker...</Text>
        </View>
        <Text style={styles.bell}>Alert</Text>
        <Text style={styles.user}>{user.name}</Text>
        <Pressable onPress={logout} style={styles.logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    alignItems: "center",
    backgroundColor: "rgba(5, 11, 24, 0.88)",
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14
  },
  brand: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 0.5
  },
  right: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12
  },
  user: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700"
  },
  search: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8
  },
  searchText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700"
  },
  bell: {
    color: colors.cyan,
    fontSize: 12,
    fontWeight: "900"
  },
  logout: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  logoutText: {
    color: colors.cyan,
    fontWeight: "800"
  }
});
