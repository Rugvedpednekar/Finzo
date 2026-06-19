import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { colors } from "@/constants/config";

type Props = {
  mode: "login" | "register";
  error?: string;
  loading?: boolean;
  onSubmit: (values: { name: string; email: string; password: string }) => void;
};

export function AuthForm({ mode, error, loading, onSubmit }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("demo@finzo.app");
  const [password, setPassword] = useState(mode === "login" ? "demo-password" : "");

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{mode === "login" ? "Welcome back" : "Create your account"}</Text>
      <Text style={styles.copy}>
        {mode === "login" ? "Sign in to your Finzo paper-trading workspace." : "Start tracking paper strategies with protected reports."}
      </Text>
      {mode === "register" ? <Input label="Name" value={name} onChangeText={setName} autoCapitalize="words" /> : null}
      <Input label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button
        title={loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
        disabled={loading}
        onPress={() => onSubmit({ name, email, password })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 14,
    maxWidth: 460,
    padding: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.28,
    shadowRadius: 28,
    width: "100%"
  },
  title: {
    color: colors.ink,
    fontSize: 28,
    fontWeight: "900"
  },
  copy: {
    color: colors.muted,
    lineHeight: 21
  },
  error: {
    backgroundColor: "rgba(255, 107, 107, 0.12)",
    borderColor: "rgba(255, 107, 107, 0.35)",
    borderRadius: 8,
    borderWidth: 1,
    color: colors.danger,
    fontWeight: "800",
    padding: 10
  }
});
