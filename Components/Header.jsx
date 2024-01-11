import { Text, SafeAreaView, View, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Header = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View className="bg-[#D01A1E] py-2 px-4 flex flex-row justify-between">
        <TouchableOpacity
          className="mt-2"
          onPress={() => navigation.toggleDrawer()}
        >
          <MaterialIcons name="menu" size={24} color="white" />
        </TouchableOpacity>
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
