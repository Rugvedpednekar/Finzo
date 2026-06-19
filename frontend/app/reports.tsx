import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Disclaimer } from "@/components/Disclaimer";
import { colors } from "@/constants/config";
import { api } from "@/services/api";
import type { Report } from "@/types";

export default function ReportsScreen() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.reports()
      .then(setReports)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.title}>Saved Reports</Text>
      <Disclaimer />
      {loading ? <Text style={styles.state}>Loading saved reports...</Text> : null}
      {error ? <Text style={styles.error}>Could not load reports: {error}</Text> : null}
      {!loading && !error && reports.length === 0 ? <Text style={styles.state}>No reports yet. Run a backtest to generate one.</Text> : null}
      <View style={styles.list}>
        {reports.map((report) => (
          <View key={report.id} style={styles.card}>
            <Text style={styles.cardTitle}>{report.title}</Text>
            <Text style={styles.meta}>Backtest #{report.backtest_id} · {new Date(report.created_at).toLocaleDateString()}</Text>
            <Text style={styles.summary}>{report.summary}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    gap: 16,
    minHeight: "100%",
    padding: 20
  },
  title: {
    color: colors.ink,
    fontSize: 30,
    fontWeight: "900"
  },
  list: {
    gap: 12
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    padding: 16
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900"
  },
  meta: {
    color: colors.muted,
    fontSize: 13
  },
  summary: {
    color: colors.ink,
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
