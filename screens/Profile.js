import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const auth = getAuth(app);
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
      <Text>Profile</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
