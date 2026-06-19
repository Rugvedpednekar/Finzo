import { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { colors } from "@/constants/config";
import type { User } from "@/types";
import { Navbar } from "./Navbar";
import { PageTransition } from "./PageTransition";
import { Sidebar } from "./Sidebar";

type Props = {
  user: User;
  children: ReactNode;
};

export function AppLayout({ user, children }: Props) {
  return (
    <View style={styles.shell}>
      <Navbar user={user} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.contentRow}>
          <View style={styles.sidebarWrap}>
            <Sidebar />
          </View>
          <View style={styles.main}>
            <PageTransition>{children}</PageTransition>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    backgroundColor: colors.background,
    flex: 1
  },
  scroll: {
    minHeight: "100%",
    padding: 20
  },
  contentRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 18,
    width: "100%"
  },
  sidebarWrap: {
    flexGrow: 1,
    maxWidth: 220
  },
  main: {
    flex: 1,
    minWidth: 0,
    paddingBottom: 28
  }
});
