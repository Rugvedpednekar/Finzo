import { ReactNode, useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

type Props = {
  children: ReactNode;
};

export function PageTransition({ children }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 260, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 260, useNativeDriver: true })
    ]).start();
  }, [opacity, translateY]);

  return <Animated.View style={[styles.page, { opacity, transform: [{ translateY }] }]}>{children}</Animated.View>;
}

const styles = StyleSheet.create({
  page: {
    flex: 1
  }
});
