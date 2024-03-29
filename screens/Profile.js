import { View, Text, Image } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import ScrollableComponent from "../Components/ScrollableComponent";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCompletedQuests, getUser } from "../utils/api";
import { FontAwesome5 } from "@expo/vector-icons";
import CompleteCard from "../Components/CompleteCard";
import { UserContext } from "../utils/UserContext";
import Loading from "../Components/Loading";

export default function Profile() {
  const auth = getAuth(app);
  const user = auth.currentUser;
  const navigation = useNavigation();
  const { userData } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  const [quests, setQuests] = useState([]);
  const images = {
    "phone.png": require("../assets/phone.png"),
    "teapot.png": require("../assets/teapot.png"),
    "double-decker-bus.png": require("../assets/double-decker-bus.png"),
  };

  useEffect(() => {
    if (userData) {
      setIsLoading(false);
      getCompletedQuests(setQuests);
    }
  }, [userData]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View className="h-screen">
      <LinearGradient colors={["#344c76", "#74a4f7"]} className="h-screen">
        <SafeAreaView>
          {isLoading ? (
            <Loading />
          ) : (
            <Image
              source={images[user.photoURL]}
              className="h-20 w-20 self-center mt-[-4]"
            />
          )}

          <Text className="text-center text-2xl font-medium text-white">
            {userData.username}
          </Text>
          <Text className="text-center text-sm font-medium text-gray-100">
            {userData.mobileNumber}
          </Text>
          <View className="flex flex-row justify-center pt-1">
            <View>
              {userData.completedQuests.length >= 1 ? (
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
              {userData.completedQuests.length >= 2 ? (
                <Text>
                  <FontAwesome5
                    name="scroll"
                    size={24}
                    color="gold"
                  ></FontAwesome5>
                </Text>
              ) : (
                <Text>
                  <AntDesign name="star" size={14} color="white"></AntDesign>
                </Text>
              )}
            </View>
            <View>
              {userData.completedQuests.length >= 3 ? (
                <Text>
                  <FontAwesome5
                    name="scroll"
                    size={24}
                    color="gold"
                  ></FontAwesome5>
                </Text>
              ) : (
                <Text>
                  <AntDesign name="star" size={14} color="white"></AntDesign>
                </Text>
              )}
            </View>
            <View>
              {userData.completedQuests.length >= 4 ? (
                <Text>
                  <FontAwesome5
                    name="scroll"
                    size={24}
                    color="gold"
                  ></FontAwesome5>
                </Text>
              ) : (
                <Text>
                  <AntDesign name="star" size={14} color="white"></AntDesign>
                </Text>
              )}
            </View>
            <View>
              {userData.completedQuests.length >= 5 ? (
                <Text>
                  <FontAwesome5
                    name="scroll"
                    size={24}
                    color="gold"
                  ></FontAwesome5>
                </Text>
              ) : (
                <Text>
                  <AntDesign name="star" size={14} color="white"></AntDesign>
                </Text>
              )}
            </View>
            <View>
              {userData.completedQuests.length === 6 ? (
                <Text>
                  <FontAwesome5
                    name="scroll"
                    size={24}
                    color="gold"
                  ></FontAwesome5>
                </Text>
              ) : (
                <Text>
                  <AntDesign name="star" size={14} color="white"></AntDesign>
                </Text>
              )}
            </View>
          </View>
          <View>
            {userData.completedQuests.length === 6 ? (
              <CompleteCard />
            ) : (
              <Text></Text>
            )}
          </View>
          <ScrollableComponent name={"Completed Quests"} quests={quests} />
          <TouchableOpacity
            className="mt-2 bg-[#344c76] py-4 rounded-full w-32 self-center shadow"
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
