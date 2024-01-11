import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

export default function Loading({ tintColour }) {
  return (
    <View className="mt-[-13]">
      <LottieView
        source={
          tintColour === "white"
            ? require("../assets/white-bus-animation.json")
            : require("../assets/bus-loading.json")
        }
        autoPlay
        className="h-20"
      />
      <Text className="mt-[-20] text-[#344c76] font-bold tracking-tighter">
        One moment
      </Text>
    </View>
  );
}
