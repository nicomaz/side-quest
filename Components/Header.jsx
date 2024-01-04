import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { auth } from "../firebaseConfig.js";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const Header = (props) => {
  const navigation = useNavigation();
  const user = auth.currentUser;
  console.log(auth.currentUser)

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Sidequest");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.header}>
      <Text style={styles.pageName}>{props.name}</Text>
      <Text style={styles.headerText}>SideQuest</Text>
      <Text style={styles.user}>Hello {user?.displayName}</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "120%",
    flexDirection: "row wrap",
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
