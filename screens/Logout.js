import { View, Text } from "react-native";
import React from "react";
import { auth } from "../firebaseConfig.js";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Logout = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Click to Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Logout;
