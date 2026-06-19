import { Link, router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AuthForm } from "@/components/AuthForm";
import { PageTransition } from "@/components/PageTransition";
import { colors } from "@/constants/config";
import { api } from "@/services/api";

export default function RegisterScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (values: { name: string; email: string; password: string }) => {
    setLoading(true);
    setError("");
    try {
      await api.register(values);
      router.replace("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <PageTransition>
        <View style={styles.wrap}>
          <AuthForm mode="register" loading={loading} error={error} onSubmit={submit} />
          <Text style={styles.switchText}>
            Already have an account? <Link href="/login" style={styles.link}>Login</Link>
          </Text>
        </View>
      </PageTransition>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    alignItems: "center",
    backgroundColor: colors.background,
    justifyContent: "center",
    minHeight: "100%",
    padding: 20
  },
  wrap: {
    alignItems: "center",
    gap: 16,
    width: "100%"
  },
  switchText: {
    color: colors.muted
  },
  link: {
    color: colors.cyan,
    fontWeight: "900"
  }
});
