import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { colors } from "@/constants/config";

type Props = TextInputProps & {
  label: string;
  showToggle?: boolean;
  secure?: boolean;
  onToggleSecure?: () => void;
};

export function AuthInput({ label, showToggle, secure, onToggleSecure, style, ...props }: Props) {
  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrap}>
        <TextInput
          placeholderTextColor="#64748B"
          secureTextEntry={secure}
          style={[styles.input, showToggle && styles.inputWithToggle, style]}
          {...props}
        />
        {showToggle ? (
          <Pressable accessibilityRole="button" onPress={onToggleSecure} style={styles.toggle}>
            <Text style={styles.toggleText}>{secure ? "Show" : "Hide"}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: 6,
    width: "100%"
  },
  label: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "800"
  },
  inputWrap: {
    position: "relative"
  },
  input: {
    backgroundColor: "#020617",
    borderColor: "rgba(148, 163, 184, 0.18)",
    borderRadius: 12,
    borderWidth: 1,
    color: colors.ink,
    fontSize: 15,
    minHeight: 50,
    paddingHorizontal: 13,
    paddingVertical: 11
  },
  inputWithToggle: {
    paddingRight: 66
  },
  toggle: {
    bottom: 0,
    justifyContent: "center",
    paddingHorizontal: 13,
    position: "absolute",
    right: 0,
    top: 0
  },
  toggleText: {
    color: colors.cyan,
    fontSize: 12,
    fontWeight: "900"
  }
});
