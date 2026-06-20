import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";

type Props = {
  compact?: boolean;
  items?: string[];
};

const defaultItems = [
  "JWT protected dashboard",
  "Backtesting engine",
  "AI sentiment analysis",
  "Aurora PostgreSQL storage"
];

export function AuthFeatureList({ compact, items = defaultItems }: Props) {
  return (
    <View style={[styles.grid, compact && styles.compactGrid]}>
      {items.map((item) => (
        <View key={item} style={[styles.card, compact && styles.compactCard]}>
          <View style={styles.dot} />
          <Text style={styles.text}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  compactGrid: {
    flexDirection: "column"
  },
  card: {
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.74)",
    borderColor: "rgba(148, 163, 184, 0.16)",
    borderRadius: 14,
    borderWidth: 1,
    flexBasis: 180,
    flexDirection: "row",
    flexGrow: 1,
    gap: 10,
    padding: 14
  },
  compactCard: {
    flexBasis: "auto"
  },
  dot: {
    backgroundColor: colors.cyan,
    borderRadius: 5,
    height: 9,
    shadowColor: colors.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.55,
    shadowRadius: 10,
    width: 9
  },
  text: {
    color: colors.ink,
    flex: 1,
    fontSize: 14,
    fontWeight: "800"
  }
});
