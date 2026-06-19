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
    borderRadius: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 12
  },
  secondary: {
    backgroundColor: "rgba(47, 128, 255, 0.12)",
    borderColor: colors.border,
    borderWidth: 1,
    shadowOpacity: 0
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
    color: colors.cyan
  }
});
