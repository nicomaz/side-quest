import { View, TextInput, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { updateProfile } from "firebase/auth";

const UsernameInput = () => {
  const user = auth.currentUser;

  const [username, setUsername] = useState("");
  const navigation = useNavigation();

  const saveUsername = async () => {
    try {
      await setDoc(doc(db, "usernames", user.phoneNumber), {
        username: username,
        mobileNumber: user.phoneNumber,
      });
      await updateProfile(user, { displayName: username });
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error saving username:", error); //change this to an alert at some point
    }
  };

  return (
    <SafeAreaView>
      <View className="items-center justify-center my-20">
        <Text className="text-xl text-center tracking-tighter font-bold text-[#d86429]">
          <Text className="text-black font-medium">Your</Text> Username
        </Text>
        <Text className="text-[#706e69]">
          pick wisely as you can't change this later
        </Text>
        <View className="flex flex-row text-base items-centerjustify-between p-2 mb-3 bg-[#ffe2d4] focus:bg-[#ffb087] w-64 mx-2">
          <TextInput
            className="text-center text-base items-center justify-center pb-2"
            placeholder="Username here..."
            placeholderTextColor="#8C8984"
            defaultValue={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <TouchableOpacity
          className="mt-6 bg-[#ff8345] w-40 py-4 rounded-full shadow w-8/12"
          onPress={saveUsername}
        >
          <Text className="text-base font-bold text-center text-white">
            Begin your quest!
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UsernameInput;
