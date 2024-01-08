import { Text, StyleSheet, SafeAreaView, View } from "react-native";
import React from "react";
import { getAuth } from "firebase/auth";
import { app } from "../firebaseConfig";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Header = (props) => {
  const auth = getAuth(app);
  const user = auth.currentUser;
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View className="flex flex-row justify-between w-screen pr-24">
        <Text className="font-bold text-white text-xl tracking-wide">
          SideQuest
        </Text>
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
