import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/Button";
import { Disclaimer } from "@/components/Disclaimer";
import { Input } from "@/components/Input";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ResultCard } from "@/components/ResultCard";
import { colors } from "@/constants/config";
import { api } from "@/services/api";
import type { Backtest, StrategyType } from "@/types";

const strategies: StrategyType[] = ["SMA crossover", "RSI strategy", "MACD strategy"];

export default function BacktestScreen() {
  const [symbol, setSymbol] = useState("AAPL");
  const [strategy, setStrategy] = useState<StrategyType>("SMA crossover");
  const [capital, setCapital] = useState("10000");
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-04-30");
  const [result, setResult] = useState<Backtest | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const run = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.runBacktest({
        symbol,
        strategy_type: strategy,
        starting_capital: Number(capital),
        start_date: startDate,
        end_date: endDate
      });
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Backtest failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      {(user) => (
        <AppLayout user={user}>
          <View style={styles.page}>
            <Text style={styles.title}>Run Backtest</Text>
            <Disclaimer />
            <View style={styles.form}>
              <Input label="Stock symbol" value={symbol} onChangeText={setSymbol} autoCapitalize="characters" />
              <Text style={styles.label}>Strategy type</Text>
              <View style={styles.segmentRow}>
                {strategies.map((item) => (
                  <Pressable key={item} onPress={() => setStrategy(item)} style={[styles.segment, strategy === item && styles.segmentActive]}>
                    <Text style={[styles.segmentText, strategy === item && styles.segmentTextActive]}>{item}</Text>
                  </Pressable>
                ))}
              </View>
              <Input label="Starting capital" value={capital} onChangeText={setCapital} keyboardType="numeric" />
              <Input label="Start date" value={startDate} onChangeText={setStartDate} placeholder="YYYY-MM-DD" />
              <Input label="End date" value={endDate} onChangeText={setEndDate} placeholder="YYYY-MM-DD" />
              <Button title={loading ? "Running..." : "Run Backtest"} onPress={run} disabled={loading} />
              {error ? <Text style={styles.error}>{error}</Text> : null}
            </View>
            {loading ? <LoadingSkeleton rows={2} /> : null}
            {!result && !loading ? <Text style={styles.state}>Run a simulation to see paper-trading results here.</Text> : null}
            {result ? <ResultCard result={result} /> : null}
          </View>
        </AppLayout>
      )}
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  page: {
    gap: 16,
    width: "100%"
  },
  title: {
    color: colors.ink,
    fontSize: 30,
    fontWeight: "900"
  },
  form: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 16
  },
  label: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "700"
  },
  segmentRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  segment: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  segmentActive: {
    backgroundColor: colors.primary
  },
  segmentText: {
    color: colors.ink,
    fontWeight: "700"
  },
  segmentTextActive: {
    color: "#FFFFFF"
  },
  state: {
    color: colors.muted
  },
  error: {
    color: colors.danger,
    fontWeight: "700"
  }
});
