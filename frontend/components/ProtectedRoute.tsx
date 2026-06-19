import { router } from "expo-router";
import { ReactNode, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";
import { api, tokenStore } from "@/services/api";
import type { User } from "@/types";
import { LoadingSkeleton } from "./LoadingSkeleton";

type Props = {
  children: (user: User) => ReactNode;
};

export function ProtectedRoute({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = tokenStore.get();
    if (!token) {
      router.replace("/");
      return;
    }

    api.me()
      .then((response) => setUser(response.user))
      .catch((err: Error) => {
        setError(err.message);
        router.replace("/");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.page}>
        <LoadingSkeleton rows={4} />
      </View>
    );
  }

  if (error || !user) {
    return (
      <View style={styles.page}>
        <Text style={styles.error}>{error || "Please log in to continue."}</Text>
      </View>
    );
  }

  return <>{children(user)}</>;
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    flex: 1,
    padding: 20
  },
  error: {
    color: colors.danger,
    fontWeight: "800"
  }
});
