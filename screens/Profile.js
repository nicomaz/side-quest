import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default function Profile() {
  const auth = getAuth(app);
  const navigation = useNavigation();
  const user = auth.currentUser;

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View>
      <LinearGradient colors={["#fc7d3d", "#fdbb2d"]} className="h-screen">
        <Text className="text-center text-2xl font-medium text-white">
          {user.displayName}
        </Text>
        <Text className="text-center text-sm font-medium text-gray-100">
          {user.phoneNumber}
        </Text>
        <View className="bg-[#ffecde] w-screen h-24 rounded-lg my-6">
          <Text className="text-[#fc7d3d] text-base mt-2 ml-2 font-bold">
            Locations visited
          </Text>
        </View>
        <View className="bg-[#ffecde] w-screen h-24 rounded-lg mb-6">
          <Text className="text-[#fc7d3d] text-base mt-2 ml-2 font-bold">
            Completed Quests
          </Text>
        </View>
        <TouchableOpacity
          className="mt-8 bg-[#ff8345] py-4 rounded-full shadow w-32 self-center"
          onPress={handleSignOut}
        >
          <Text className="text-base font-bold text-center text-white">
            Sign Out
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}
