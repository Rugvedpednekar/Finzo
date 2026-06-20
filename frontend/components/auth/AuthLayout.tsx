import { ReactNode } from "react";
import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import { colors } from "@/constants/config";
import { AuthHero } from "./AuthHero";

type Props = {
  mode: "login" | "register";
  children: ReactNode;
};

export function AuthLayout({ mode, children }: Props) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <ScrollView contentContainerStyle={[styles.page, isMobile && styles.mobilePage]}>
      <View style={styles.backgroundGlowOne} />
      <View style={styles.backgroundGlowTwo} />
      <View style={[styles.shell, isMobile && styles.mobileShell]}>
        {!isMobile ? <AuthHero mode={mode} /> : null}
        <View style={[styles.cardWrap, isMobile && styles.mobileCardWrap]}>{children}</View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    alignItems: "center",
    backgroundColor: "#020617",
    justifyContent: "center",
    minHeight: "100%",
    overflow: "hidden",
    padding: 22,
    position: "relative"
  },
  mobilePage: {
    justifyContent: "flex-start",
    padding: 16,
    paddingTop: 26
  },
  shell: {
    alignItems: "center",
    flexDirection: "row",
    gap: 22,
    justifyContent: "center",
    maxWidth: 1080,
    width: "100%",
    zIndex: 1
  },
  mobileShell: {
    flexDirection: "column"
  },
  cardWrap: {
    alignItems: "center",
    flexBasis: 430,
    flexGrow: 1,
    maxWidth: 460,
    width: "100%"
  },
  mobileCardWrap: {
    flexBasis: "auto"
  },
  backgroundGlowOne: {
    backgroundColor: "rgba(37, 99, 235, 0.18)",
    borderRadius: 260,
    height: 420,
    position: "absolute",
    right: -120,
    top: -160,
    width: 420
  },
  backgroundGlowTwo: {
    backgroundColor: "rgba(34, 211, 238, 0.08)",
    borderRadius: 260,
    bottom: -150,
    height: 430,
    left: -140,
    position: "absolute",
    width: 430
  }
});
