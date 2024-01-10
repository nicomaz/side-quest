import { Text, StyleSheet, SafeAreaView, View, Image } from "react-native";
import React from "react";
import { getAuth } from "firebase/auth";
import { app } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Header = (props) => {
  const auth = getAuth(app);
  const user = auth.currentUser;
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

        {/* <TouchableOpacity className="self-center">
          <Text className="font-semibold text-white text-base">
            Hello {user.displayName}
          </Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Text className="self-center text-right justify-end text-white text-lg font-bold">
            {user.displayName}
          </Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default Header;
