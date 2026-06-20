import { ReactNode, useEffect, useRef } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View
} from "react-native";
import type { User } from "@/types";
import { BottomTabs } from "./BottomTabs";
import { SideNav } from "./SideNav";
import { TopBar } from "./TopBar";

type Props = {
  user: User;
  children: ReactNode;
};

const SIDEBAR_WIDTH = 220;
const CONTENT_MAX_WIDTH = 1440;

export function AppShell({ user, children }: Props) {
  const { width } = useWindowDimensions();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const showSidebar = width >= 1024;

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true
      })
    ]).start();
  }, [opacity, translateY]);

  return (
    <View style={styles.shell}>
      <TopBar user={user} />

      <View style={styles.body}>
        {showSidebar ? (
          <View style={styles.sidebarColumn}>
            <SideNav />
          </View>
        ) : null}

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            isMobile && styles.mobileScrollContent,
            isTablet && styles.tabletScrollContent
          ]}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.contentContainer,
              {
                maxWidth: showSidebar ? CONTENT_MAX_WIDTH : "100%",
                opacity,
                transform: [{ translateY }]
              }
            ]}
          >
            {children}
          </Animated.View>
        </ScrollView>
      </View>

      {isMobile ? <BottomTabs /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    backgroundColor: "#020617",
    flex: 1
  },
  body: {
    flex: 1,
    flexDirection: "row",
    minHeight: 0
  },
  sidebarColumn: {
    width: SIDEBAR_WIDTH,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 20
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    alignItems: "center",
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32
  },
  tabletScrollContent: {
    paddingHorizontal: 18
  },
  mobileScrollContent: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 96
  },
  contentContainer: {
    width: "100%"
  }
});