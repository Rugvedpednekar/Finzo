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
        <View style={styles.shell}>
          <View style={styles.storyPanel}>
            <Text style={styles.brand}>FINZO</Text>
            <Text style={styles.storyTitle}>Build conviction before capital.</Text>
            <Text style={styles.storyCopy}>Create a protected sandbox for backtests, AI sentiment checks, and strategy reports.</Text>
          </View>
          <View style={styles.wrap}>
            <AuthForm mode="register" loading={loading} error={error} onSubmit={submit} />
            <Text style={styles.switchText}>
              Already have an account? <Link href="/login" style={styles.link}>Login</Link>
            </Text>
          </View>
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
  shell: {
    alignItems: "stretch",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 22,
    justifyContent: "center",
    width: "100%"
  },
  storyPanel: {
    backgroundColor: "#090E18",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 18,
    borderWidth: 1,
    flexBasis: 360,
    flexGrow: 1,
    justifyContent: "center",
    maxWidth: 520,
    minHeight: 360,
    padding: 30
  },
  brand: {
    color: colors.cyan,
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 16
  },
  storyTitle: {
    color: colors.ink,
    fontSize: 38,
    fontWeight: "900",
    lineHeight: 44,
    maxWidth: 360
  },
  storyCopy: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
    maxWidth: 410
  },
  switchText: {
    color: colors.muted
  },
  link: {
    color: colors.cyan,
    fontWeight: "900"
  }
});
