import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";

type TestItem = {
  strategy: string;
  symbol: string;
  date: string;
  returnValue: string;
};

type Props = {
  tests: TestItem[];
};

export function RecentTests({ tests }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Recent Tests</Text>
      <View style={styles.list}>
        {tests.map((test) => {
          const positive = test.returnValue.startsWith("+");
          return (
            <View key={`${test.strategy}-${test.date}`} style={styles.item}>
              <View style={styles.itemCopy}>
                <Text style={styles.strategy}>{test.strategy}</Text>
                <Text style={styles.meta}>{test.symbol} • {test.date}</Text>
              </View>
              <Text style={[styles.returnValue, positive ? styles.positive : styles.negative]}>{test.returnValue}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0F172A",
    borderColor: "rgba(148, 163, 184, 0.14)",
    borderRadius: 20,
    borderWidth: 1,
    flexBasis: 300,
    flexGrow: 1,
    gap: 14,
    minWidth: 260,
    padding: 18
  },
  title: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: "900"
  },
  list: {
    gap: 10
  },
  item: {
    alignItems: "center",
    backgroundColor: "rgba(2, 6, 23, 0.56)",
    borderColor: "rgba(148, 163, 184, 0.1)",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    minHeight: 64,
    padding: 12
  },
  itemCopy: {
    flex: 1,
    gap: 3
  },
  strategy: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "900"
  },
  meta: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700"
  },
  returnValue: {
    fontSize: 14,
    fontWeight: "900"
  },
  positive: {
    color: "#10B981"
  },
  negative: {
    color: "#F43F5E"
  }
});
