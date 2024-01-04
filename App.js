import Login from "./screens/Login";
import Logout from "./screens/Logout";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import QuestList from "./Components/QuestList";
import SingleQuest from "./Components/SingleQuest";
import Header from "./Components/Header";
import Home from "./screens/Home";
import { View, ActivityIndicator } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebaseConfig";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            
            <Stack.Screen
              options={{ headerTitle: () => <Header name="questlist" /> }}
              name="QuestList"
              component={QuestList}
            />
            <Stack.Screen name="SingleQuest" component={SingleQuest} options={{ headerTitle: () => <Header name="questlist" /> }} />
            <Stack.Screen name="Home" component={Home} options={{ headerTitle: () => <Header name="questlist" /> }} />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Logout"
              component={Logout}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Sidequest"
              component={Login}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Sidequest"
              component={Login}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
