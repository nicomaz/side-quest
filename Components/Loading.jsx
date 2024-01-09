import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

export default function Loading() {
  return (
    <View className="mt-10">
      <LottieView
        source={require("../assets/bus-loading.json")}
        autoPlay
        className="h-20"
      />
      <Text className="mt-[-22] text-[#D01A1E] font-bold tracking-tighter">One moment</Text>
    </View>
  );
}

// on component page setIsLoading => true
// on component page isLoading ? render <Loading>
// on component page when API call made, setIsLoading(false)
// Loading no longer appears

// Loading page (?) on login
// Loading icon / modal <= focus

// Every stage of logging in + sigining up
// Loading the home page
// Loading each quest list
// Loading the questions
// Loading profile
