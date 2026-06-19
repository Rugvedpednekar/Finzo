import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "@/constants/config";

type Props = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
};

export function Button({ title, onPress, disabled, variant = "primary" }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, variant === "secondary" && styles.secondary, disabled && styles.disabled]}
    >
      <Text style={[styles.text, variant === "secondary" && styles.secondaryText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 12
  },
  secondary: {
    backgroundColor: colors.softBlue,
    borderColor: colors.border,
    borderWidth: 1
  },
  disabled: {
    opacity: 0.6
  },
  text: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700"
  },
  secondaryText: {
    color: colors.primaryDark
  }
});
