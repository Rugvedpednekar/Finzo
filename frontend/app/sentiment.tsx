import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/Button";
import { Disclaimer } from "@/components/Disclaimer";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { colors } from "@/constants/config";
import { api } from "@/services/api";
import type { SentimentResult } from "@/types";

export default function SentimentScreen() {
  const [text, setText] = useState("Revenue increased after strong growth and record profit.");
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyze = async () => {
    setLoading(true);
    setError("");
    try {
      setResult(await api.analyzeSentiment(text));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sentiment analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      {(user) => (
        <AppLayout user={user}>
          <View style={styles.page}>
            <Text style={styles.title}>Sentiment Analyzer</Text>
            <Disclaimer />
            <View style={styles.card}>
              <Text style={styles.label}>Financial news or earnings-call text</Text>
              <TextInput
                multiline
                onChangeText={setText}
                placeholder="Paste market text here..."
                placeholderTextColor="#8B98AA"
                style={styles.textArea}
                value={text}
              />
              <Button title={loading ? "Analyzing..." : "Analyze Sentiment"} onPress={analyze} disabled={loading} />
              {error ? <Text style={styles.error}>{error}</Text> : null}
            </View>
            {loading ? <LoadingSkeleton rows={2} /> : null}
            {!result && !loading ? <Text style={styles.state}>Paste text and run analysis to see a label, score, and explanation.</Text> : null}
            {result ? (
              <View style={styles.result}>
                <Text style={styles.resultLabel}>{result.label}</Text>
                <Text style={styles.score}>Score: {result.score.toFixed(2)}</Text>
                <Text style={styles.explanation}>{result.explanation}</Text>
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
  card: {
    backgroundColor: colors.surface,
    borderColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
    padding: 18,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.22,
    shadowRadius: 24
  },
  label: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "700"
  },
  textArea: {
    backgroundColor: colors.backgroundAlt,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    color: colors.ink,
    minHeight: 150,
    padding: 12,
    textAlignVertical: "top"
  },
  result: {
    backgroundColor: colors.surface,
    borderColor: "rgba(139, 92, 246, 0.35)",
    borderRadius: 16,
    borderWidth: 1,
    gap: 8,
    padding: 16
  },
  resultLabel: {
    color: "#C4B5FD",
    fontSize: 24,
    fontWeight: "900"
  },
  score: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "800"
  },
  explanation: {
    color: colors.muted,
    lineHeight: 21
  },
  state: {
    color: colors.muted
  },
  error: {
    color: colors.danger,
    fontWeight: "700"
  }
});
