import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

export default function SideQuestSplashScreen() {
  const navigation = useNavigation();
  const [appIsReady, setAppIsReady] = useState(false);

  const auth = getAuth(app);

  useEffect(() => {
    async function prepare() {
      try {
        await onAuthStateChanged(auth, (user) => {
          if (user && user.displayName) {
            navigation.navigate("Nav");
          } else {
            navigation.navigate("Login");
          }
        });
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      onLayout={onLayoutRootView}
    >
      <Text>SideQuest</Text>
      <Entypo name="rocket" size={30} />
    </View>
  );
}
