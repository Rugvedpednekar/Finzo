import { StyleSheet, View } from "react-native";
import { colors } from "@/constants/config";

export function LoadingSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <View style={styles.stack}>
      {Array.from({ length: rows }).map((_, index) => (
        <View key={index} style={[styles.row, index === 0 && styles.wide]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 12
  },
  row: {
    backgroundColor: "rgba(159, 176, 199, 0.16)",
    borderRadius: 8,
    height: 54,
    overflow: "hidden"
  },
  wide: {
    height: 92
  }
});
