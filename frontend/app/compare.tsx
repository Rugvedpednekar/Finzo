import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/Button";
import { Disclaimer } from "@/components/Disclaimer";
import { Input } from "@/components/Input";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ResultCard } from "@/components/ResultCard";
import { colors } from "@/constants/config";
import { api } from "@/services/api";
import type { CompareResult, StrategyType } from "@/types";

const strategies: StrategyType[] = ["SMA crossover", "RSI strategy", "MACD strategy"];

export default function CompareScreen() {
  const [symbol, setSymbol] = useState("MSFT");
  const [strategy, setStrategy] = useState<StrategyType>("MACD strategy");
  const [capital, setCapital] = useState("10000");
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-04-30");
  const [sentimentText, setSentimentText] = useState("Analysts warned of weak demand and a revenue dropped outlook.");
  const [result, setResult] = useState<CompareResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const compare = async () => {
    setLoading(true);
    setError("");
    try {
      setResult(await api.compare({
        symbol,
        strategy_type: strategy,
        starting_capital: Number(capital),
        start_date: startDate,
        end_date: endDate,
        sentiment_text: sentimentText
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Comparison failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      {(user) => (
        <AppLayout user={user}>
          <View style={styles.page}>
            <Text style={styles.title}>Compare Results</Text>
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
              <Input label="Start date" value={startDate} onChangeText={setStartDate} />
              <Input label="End date" value={endDate} onChangeText={setEndDate} />
              <Text style={styles.label}>Sentiment text</Text>
              <TextInput multiline value={sentimentText} onChangeText={setSentimentText} style={styles.textArea} />
              <Button title={loading ? "Comparing..." : "Compare Strategies"} onPress={compare} disabled={loading} />
              {error ? <Text style={styles.error}>{error}</Text> : null}
            </View>
            {loading ? <LoadingSkeleton rows={3} /> : null}
            {!result && !loading ? <Text style={styles.state}>Compare a technical-only run with a sentiment-adjusted version.</Text> : null}
            {result ? (
              <View style={styles.results}>
                <View style={styles.summary}>
                  <Text style={styles.summaryTitle}>Comparison Summary</Text>
                  <Text style={styles.summaryText}>{result.summary}</Text>
                  <Text style={styles.summaryText}>Sentiment: {result.sentiment.label} ({result.sentiment.score.toFixed(2)})</Text>
                </View>
                <Text style={styles.sectionTitle}>Technical-only strategy</Text>
                <ResultCard result={result.technical_only} />
                <Text style={styles.sectionTitle}>Sentiment-adjusted strategy</Text>
                <ResultCard result={result.sentiment_adjusted} />
              </View>
            ) : null}
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
  textArea: {
    backgroundColor: colors.backgroundAlt,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.ink,
    minHeight: 110,
    padding: 12,
    textAlignVertical: "top"
  },
  results: {
    gap: 14
  },
  summary: {
    backgroundColor: colors.softBlue,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    padding: 16
  },
  summaryTitle: {
    color: colors.primaryDark,
    fontSize: 18,
    fontWeight: "900"
  },
  summaryText: {
    color: colors.ink
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "900"
  },
  state: {
    color: colors.muted
  },
  error: {
    color: colors.danger,
    fontWeight: "700"
  }
});
