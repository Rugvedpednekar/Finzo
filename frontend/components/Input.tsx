import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { colors } from "@/constants/config";

type Props = TextInputProps & {
  label: string;
};

export function Input({ label, style, ...props }: Props) {
  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>
      <TextInput placeholderTextColor="#8B98AA" style={[styles.input, style]} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: 6
  },
  label: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "700"
  },
  input: {
    backgroundColor: colors.backgroundAlt,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    color: colors.ink,
    fontSize: 15,
    minHeight: 46,
    paddingHorizontal: 12,
    paddingVertical: 10
  }
});
