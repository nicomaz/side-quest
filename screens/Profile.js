import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import ScrollableComponent from "../Components/ScrollableComponent";

export default function Profile() {
  const auth = getAuth(app);
  const navigation = useNavigation();
  const user = auth.currentUser;

  const images = {
    "phone.png": require("../assets/phone.png"),
    "teapot.png": require("../assets/teapot.png"),
    "double-decker-bus.png": require("../assets/double-decker-bus.png"),
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };


  return (
    <View>
      <LinearGradient colors={["#D01A1E", "#ff7d80"]} className="h-screen">
        <Image
          source={images[user.photoURL]}
          className="h-20 w-20 self-center mt-4"
        />
        <Text className="text-center text-2xl font-medium text-white">
          {user.displayName}
        </Text>
        <Text className="text-center text-sm font-medium text-gray-100">
          {user.phoneNumber}
        </Text>
        <View className="bg-[#fff5ed] w-screen h-24 rounded-lg my-10">
          <Text className="text-[#D01A1E] text-base mt-2 ml-2 font-bold">
            Locations visited
          </Text>
        </View>
        <ScrollableComponent name={"Completed Quests"} />
        <TouchableOpacity
          className="mt-8 bg-[#D01A1E] py-4 rounded-full shadow w-32 self-center shadow"
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
