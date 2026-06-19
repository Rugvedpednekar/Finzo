import { StyleSheet, Text, View } from "react-native";
import { colors, disclaimer } from "@/constants/config";

export function Disclaimer() {
  return (
    <View style={styles.box}>
      <Text style={styles.text}>{disclaimer}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "rgba(242, 201, 76, 0.1)",
    borderColor: "rgba(242, 201, 76, 0.35)",
    borderRadius: 8,
    borderWidth: 1,
    padding: 12
  },
  text: {
    color: colors.warning,
    fontSize: 13,
    fontWeight: "700"
  }
});
