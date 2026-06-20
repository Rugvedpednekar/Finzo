import { Link, router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { AuthButton, AuthCard } from "@/components/auth/AuthCard";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { colors } from "@/constants/config";
import { api } from "@/services/api";

export default function RegisterScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      await api.register({ name, email, password });
      router.replace("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Registration failed";
      setError(message === "Failed to fetch" ? "Could not reach the Finzo API. Check your backend URL and try again." : message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout mode="register">
      <AuthCard
        title="Create an account"
        subtitle="Start backtesting strategies and saving paper-trading reports."
        error={error}
        footer={<Text style={styles.switchText}>Already have an account? <Link href="/login" style={styles.link}>Login</Link></Text>}
      >
        <AuthInput label="Full name" value={name} onChangeText={setName} autoCapitalize="words" placeholder="Jane Trader" />
        <AuthInput label="Email address" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="you@example.com" />
        <AuthInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secure={!showPassword}
          showToggle
          onToggleSecure={() => setShowPassword((value) => !value)}
          placeholder="At least 8 characters"
        />
        <AuthButton title="Register" loading={loading} onPress={submit} />
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
  }
});
