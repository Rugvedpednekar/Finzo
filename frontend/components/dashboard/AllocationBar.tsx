import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";
import type { AllocationItem } from "@/types";

type Props = {
  item: AllocationItem;
};

export function AllocationBar({ item }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.meta}>
        <Text style={styles.bucket}>{item.bucket}</Text>
        <Text style={styles.percent}>{item.percent}%</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${item.percent}%`, backgroundColor: item.color }]} />
      </View>
      <Text style={styles.rationale}>{item.rationale}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 7
  },
  meta: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bucket: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "900"
  },
  percent: {
    color: colors.cyan,
    fontSize: 13,
    fontWeight: "900"
  },
  track: {
    backgroundColor: "#020617",
    borderRadius: 999,
    height: 9,
    overflow: "hidden"
  },
  fill: {
    borderRadius: 999,
    height: "100%"
  },
  rationale: {
    color: colors.muted,
    fontSize: 11,
    lineHeight: 16
  }
});
