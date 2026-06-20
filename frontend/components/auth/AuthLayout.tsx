import { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { colors } from "@/constants/config";
import { AuthHero } from "./AuthHero";

type Props = {
  mode: "login" | "register";
  children: ReactNode;
};

export function AuthLayout({ mode, children }: Props) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.keyboard}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.page, !isDesktop && styles.mobilePage]}
        >
          <View style={styles.backgroundGlowOne} />
          <View style={styles.backgroundGlowTwo} />
          <View style={[styles.shell, !isDesktop && styles.mobileShell]}>
            {!isDesktop ? <Text style={styles.mobileLogo}>FINZO</Text> : null}
            {isDesktop ? <AuthHero mode={mode} /> : null}
            <View style={[styles.cardWrap, !isDesktop && styles.mobileCardWrap]}>{children}</View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#020617",
    flex: 1
  },
  keyboard: {
    flex: 1
  },
  page: {
    alignItems: "center",
    backgroundColor: "#020617",
    justifyContent: "center",
    minHeight: "100%",
    overflow: "hidden",
    paddingHorizontal: 32,
    paddingVertical: 28,
    position: "relative"
  },
  mobilePage: {
    justifyContent: "center",
    minHeight: "100%",
    paddingBottom: 28,
    paddingHorizontal: 16,
    paddingTop: 24
  },
  shell: {
    alignItems: "center",
    flexDirection: "row",
    gap: 32,
    justifyContent: "center",
    maxWidth: 1120,
    minHeight: 560,
    width: "100%",
    zIndex: 1
  },
  mobileShell: {
    flexDirection: "column",
    gap: 18,
    maxWidth: 460,
    minHeight: "auto"
  },
  cardWrap: {
    alignItems: "center",
    flexBasis: 440,
    flexGrow: 0,
    flexShrink: 0,
    maxWidth: 460,
    width: "100%"
  },
  mobileCardWrap: {
    flexBasis: "auto",
    flexShrink: 1,
    maxWidth: 440
  },
  mobileLogo: {
    alignSelf: "center",
    color: colors.ink,
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 2
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
