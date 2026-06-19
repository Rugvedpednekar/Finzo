import { Stack } from "expo-router";
import { colors } from "@/constants/config";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTitleStyle: { color: colors.ink, fontWeight: "800" },
        headerTintColor: colors.primary
      }}
    >
      <Stack.Screen name="index" options={{ title: "Finzo" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="register" options={{ title: "Register" }} />
      <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Stack.Screen name="backtest" options={{ title: "Run Backtest" }} />
      <Stack.Screen name="sentiment" options={{ title: "Sentiment Analyzer" }} />
      <Stack.Screen name="compare" options={{ title: "Compare Results" }} />
      <Stack.Screen name="reports" options={{ title: "Saved Reports" }} />
    </Stack>
  );
}
