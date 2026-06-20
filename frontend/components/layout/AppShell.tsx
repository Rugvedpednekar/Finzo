import { ReactNode, useEffect, useRef } from "react";
import { Animated, ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import { colors } from "@/constants/config";
import type { User } from "@/types";
import { BottomTabs } from "./BottomTabs";
import { SideNav } from "./SideNav";
import { TopBar } from "./TopBar";

type Props = {
  user: User;
  children: ReactNode;
};

export function AppShell({ user, children }: Props) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 240, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 240, useNativeDriver: true })
    ]).start();
  }, [opacity, translateY]);

  return (
    <View style={styles.shell}>
      <TopBar user={user} />
      <View style={styles.body}>
        {!isMobile ? (
          <View style={styles.sideWrap}>
            <SideNav />
          </View>
        ) : null}
        <ScrollView contentContainerStyle={[styles.scroll, isMobile && styles.mobileScroll]} showsVerticalScrollIndicator={false}>
          <Animated.View style={[styles.content, { opacity, transform: [{ translateY }] }]}>{children}</Animated.View>
        </ScrollView>
      </View>
      {isMobile ? <BottomTabs /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    backgroundColor: "#020617",
    flex: 1,
    overflow: "hidden"
  },
  body: {
    flex: 1,
    flexDirection: "row",
    minHeight: 0
  },
  sideWrap: {
    paddingBottom: 20,
    paddingLeft: 16,
    paddingTop: 16
  },
  scroll: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 30
  },
  mobileScroll: {
    padding: 12,
    paddingBottom: 92
  },
  content: {
    gap: 16,
    width: "100%"
  }
});
