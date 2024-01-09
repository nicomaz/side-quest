import { View, TextInput, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { updateProfile } from "firebase/auth";
import Loading from "./Loading";

const UsernameInput = ({ userPiece }) => {
  const user = auth.currentUser;
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");

  const navigation = useNavigation();
  const saveUsername = async () => {
    try {
      setIsLoading(true);
      await setDoc(doc(db, "users", user.phoneNumber), {
        username: username,
        mobileNumber: user.phoneNumber,
        currentQuest: 1,
        completedQuests: [],
        lockedQuests: [2, 3, 4, 5, 6],
      });
      await updateProfile(user, { displayName: username, photoURL: userPiece });
      setIsLoading(false);
      navigation.navigate("Nav");
    } catch (error) {
      console.error("Error saving username:", error); //change this to an alert at some point
    }
  };

  return (
    <SafeAreaView>
      <View className="items-center justify-center">
        <Text className="text-2xl font-medium text-center shadow tracking-widest mb-3">
          Your Username
        </Text>
        <View className="flex flex-row text-base items-center justify-between p-2 mb-3 bg-[#ffa6a8] focus:bg-[#f27e81] w-64 mx-2 rounded-xl">
          <TextInput
            className="text-center text-base items-center justify-center pb-2"
            placeholder="Username here..."
            placeholderTextColor="#8C8984"
            defaultValue={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <TouchableOpacity
          autoFocus
          className={`mt-8 bg-[#D01A1E] rounded-full shadow ${
            isLoading ? "h-14 w-[170px] items-center pt-2" : "py-4 px-4"
          }`}
          onPress={saveUsername}
        >
          {!isLoading ? (
            <Text className="text-base font-bold text-center text-white">
              Begin your quest!
            </Text>
          ) : (
            <Loading tintColour="white" />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UsernameInput;
