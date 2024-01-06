import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

export default function PickUserPhoto({ setUserPiece }) {
  const [isFocussed, setIsFocussed] = useState(null);
  const pieceImageSources = [
    "teapot.png",
    "double-decker-bus.png",
    "phone.png",
  ];

  function handleFocus(number) {
    setIsFocussed(number);
    setUserPiece(pieceImageSources[number]);
  }

  return (
    <View className="mt-10 mb-6">
      <Text className="text-2xl mt-12 mb-3 tracking-widest font-medium text-center shadow">
        Choose your piece
      </Text>

      <View className="flex flex-row justify-evenly">
        <TouchableOpacity
          onPress={() => handleFocus(0)}
          className={`border-black border-0 p-2 ${
            isFocussed == 0 && "border-2 border-[#f27e81] rounded-xl"
          }`}
        >
          <Image
            source={require("../assets/teapot.png")}
            className="h-16 w-16"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleFocus(1)}
          className={`border-black border-0 p-2 ${
            isFocussed == 1 && "border-2 border-[#f27e81] rounded-xl"
          }`}
        >
          <Image
            source={require("../assets/double-decker-bus.png")}
            className="h-16 w-16"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleFocus(2)}
          className={`border-black border-0 p-2 ${
            isFocussed == 2 && "border-2 border-[#f27e81] rounded-xl"
          }`}
        >
          <Image
            source={require("../assets/phone.png")}
            className="h-16 w-16"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
