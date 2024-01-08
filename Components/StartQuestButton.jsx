import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function StartQuestButton() {
  return (
    <TouchableOpacity className="bg-[#D01A1E] p-2 m-2 rounded-xl">
      <Text className="text-white font-bold">Start Quest</Text>
    </TouchableOpacity>
  );
}
