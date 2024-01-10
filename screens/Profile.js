import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import ScrollableComponent from "../Components/ScrollableComponent";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCompletedQuests, getUser } from "../utils/api";
import { FontAwesome5 } from '@expo/vector-icons';
import CompleteCard from "../Components/CompleteCard";

export default function Profile() {
  const auth = getAuth(app);
  const navigation = useNavigation();
  const user = auth.currentUser;
  const [quests, setQuests] = useState([]);

  const images = {
    "phone.png": require("../assets/phone.png"),
    "teapot.png": require("../assets/teapot.png"),
    "double-decker-bus.png": require("../assets/double-decker-bus.png"),
  };

  useEffect(() => {
    getCompletedQuests(setQuests);
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View className="h-screen">
      <LinearGradient colors={["#D01A1E", "#ff7d80"]} className="h-screen">
        <SafeAreaView>
          <Image
            source={images[user.photoURL]}
            className="h-20 w-20 self-center mt-[-4]"
            
          />
          <Text className="text-center text-2xl font-medium text-white">
            {user.displayName}
          </Text>
          <Text className="text-center text-sm font-medium text-gray-100">
            {user.phoneNumber}
          </Text>
          <View className="flex flex-row justify-center pt-1">
            <View>
              {quests.length >= 1 ? (
                <Text>
                  <FontAwesome5 name="scroll" size={24} color="gold" />
                </Text>
              ) : (
                <Text>
                  <AntDesign name="star" size={14} color="white"></AntDesign>
                </Text>
              )}
            </View>
            <View>
              {quests.length >= 2 ? (
                <Text>
                  <FontAwesome5 name="scroll" size={24} color="gold"></FontAwesome5>
                </Text>
              ) : (
                <Text>
                  <AntDesign name="star" size={14} color="white"></AntDesign>
                </Text>
              )}
            </View>
            <View>
              {quests.length >= 3 ? (
                <Text>
                  <FontAwesome5 name="scroll" size={24} color="gold"></FontAwesome5>
                </Text>
              ) : (
                <Text>
                  <AntDesign name="star" size={14} color="white"></AntDesign>
                </Text>
              )}
            </View>
            <View>
              {quests.length >= 4 ? (
                <Text>
                  <FontAwesome5 name="scroll" size={24} color="gold"></FontAwesome5>
                </Text>
              ) : (
                <Text>
                  <AntDesign name="star" size={14} color="white"></AntDesign>
                </Text>
              )}
            </View>
            <View>
              {quests.length >= 5 ? (
                <Text>
                  <FontAwesome5 name="scroll" size={24} color="gold"></FontAwesome5>
                </Text>
              ) : (
                <Text>
                  <AntDesign name="star" size={14} color="white"></AntDesign>
                </Text>
              )}
            </View>
            <View>
              {quests.length === 6 ? (
                <Text>
                  <FontAwesome5 name="scroll" size={24} color="gold"></FontAwesome5>
                </Text>
              ) : (
                <Text>
                  <AntDesign name="star" size={14} color="white"></AntDesign>
                </Text>
              )}
            </View>
          </View>
          <View>
            {quests.length === 6 ? (
              <CompleteCard />
            ) : (
              <Text></Text>
            )}
          </View>
          <ScrollableComponent name={"Completed Quests"} quests={quests} />
          <TouchableOpacity
            className="mt-2 bg-[#D01A1E] py-4 rounded-full shadow w-32 self-center shadow"
            onPress={handleSignOut}
          >
            <Text className="text-base font-bold text-center text-white">
              Sign Out
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}



