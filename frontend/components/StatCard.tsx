import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";

type Props = {
  label: string;
  value: string;
  helper?: string;
};

export function StatCard({ label, value, helper }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {helper ? <Text style={styles.helper}>{helper}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexBasis: 220,
    flexGrow: 1,
    gap: 8,
    padding: 16
  },
  label: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700"
  },
  value: {
    color: colors.ink,
    fontSize: 26,
    fontWeight: "800"
  },
  helper: {
    color: colors.muted,
    fontSize: 13
  }
});
