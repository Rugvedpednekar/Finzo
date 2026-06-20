import { Link, router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { AuthButton, AuthCard } from "@/components/auth/AuthCard";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { colors } from "@/constants/config";
import { api } from "@/services/api";

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("demo@finzo.app");
  const [password, setPassword] = useState("demo-password");
  const [showPassword, setShowPassword] = useState(false);

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      await api.login({ email, password });
      router.replace("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message === "Failed to fetch" ? "Could not reach the Finzo API. Check your backend URL and try again." : message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout mode="login">
      <AuthCard
        title="Welcome back"
        subtitle="Enter your details to access your trading sandbox."
        error={error}
        footer={<Text style={styles.switchText}>New to Finzo? <Link href="/register" style={styles.link}>Create an account</Link></Text>}
      >
        <AuthInput label="Email address" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        <AuthInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secure={!showPassword}
          showToggle
          onToggleSecure={() => setShowPassword((value) => !value)}
        />
        <AuthButton title="Login" loading={loading} onPress={submit} />
        <Pressable disabled={loading} onPress={submit} style={styles.demoButton}>
          <Text style={styles.demoText}>Use demo account</Text>
        </Pressable>
      </AuthCard>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  switchText: {
    color: colors.muted
  },
  link: {
    color: colors.cyan,
    fontWeight: "900"
  },
  demoButton: {
    alignItems: "center",
    borderColor: "rgba(148, 163, 184, 0.16)",
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 12
  },
  demoText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "900"
  }
});
