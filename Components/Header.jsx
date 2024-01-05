import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { getAuth } from "firebase/auth";
import { app } from "../firebaseConfig";

const Header = (props) => {
  const auth = getAuth(app);
  const user = auth.currentUser;

  return (
    <View style={styles.header}>
      <Text style={styles.pageName}>{props.name}</Text>
      <Text style={styles.headerText}>SideQuest</Text>
      <Text style={styles.user}>Hello {user.displayName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "120%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#48821c",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 28,
    color: "#de6429",
    letterSpacing: 1,
  },
  pageName: {
    position: "absolute",
    left: 16,
  },
  user: {
    position: "absolute",
    right: 50,
  },
});

export default Header;
