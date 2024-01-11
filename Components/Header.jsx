import { Text, SafeAreaView, View, Image } from "react-native";
import React from "react";

const Header = () => {
  return (
    <SafeAreaView>
      <View className="flex flex-row justify-end mr-3">
        <View className="flex flex-row ">
          <View className="flex flex-column justify-center ">
            <Text className="font-semibold text-white text-base leading-[-2px] self-end">
              Side
            </Text>
            <Text className="font-semibold text-white text-base leading-[-2px]">
              Quest
            </Text>
          </View>
          <Image
            source={require("../assets/scroll.png")}
            className="h-8 w-8 ml-1 mt-1"
            tintColor="white"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
