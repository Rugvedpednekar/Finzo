import { ReactNode, useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/config";

type Props = {
  title: string;
  subtitle: string;
  error?: string;
  children: ReactNode;
  footer: ReactNode;
};

export function AuthCard({ title, subtitle, error, children, footer }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(14)).current;
  const errorOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 280, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 280, useNativeDriver: true })
    ]).start();
  }, [opacity, translateY]);

  useEffect(() => {
    Animated.timing(errorOpacity, { toValue: error ? 1 : 0, duration: 180, useNativeDriver: true }).start();
  }, [error, errorOpacity]);

  return (
    <Animated.View style={[styles.card, { opacity, transform: [{ translateY }] }]}>
      <Text style={styles.brand}>FINZO</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {error ? (
        <Animated.View style={[styles.error, { opacity: errorOpacity }]}>
          <Text style={styles.errorText}>{error}</Text>
        </Animated.View>
      ) : null}
      <View style={styles.body}>{children}</View>
      <View style={styles.footer}>{footer}</View>
    </Animated.View>
  );
}

export function AuthButton({ title, loading, onPress }: { title: string; loading?: boolean; onPress: () => void }) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }).start();
  const pressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        accessibilityRole="button"
        disabled={loading}
        onPress={onPress}
        onPressIn={pressIn}
        onPressOut={pressOut}
        style={[styles.button, loading && styles.buttonDisabled]}
      >
        <Text style={styles.buttonText}>{loading ? "Please wait..." : title}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(15, 23, 42, 0.94)",
    borderColor: "rgba(59, 130, 246, 0.22)",
    borderRadius: 22,
    borderWidth: 1,
    gap: 11,
    maxWidth: 440,
    padding: 24,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.32,
    shadowRadius: 30,
    width: "100%"
  },
  brand: {
    color: colors.cyan,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.2
  },
  title: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: "900"
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21
  },
  body: {
    gap: 11,
    marginTop: 4
  },
  footer: {
    alignItems: "center",
    marginTop: 2
  },
  error: {
    backgroundColor: "rgba(244, 63, 94, 0.12)",
    borderColor: "rgba(244, 63, 94, 0.35)",
    borderRadius: 12,
    borderWidth: 1,
    padding: 11
  },
  errorText: {
    color: "#FDA4AF",
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 18
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 12,
    minHeight: 50,
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 18
  },
  buttonDisabled: {
    opacity: 0.62
  },
  buttonText: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "900"
  }
});
