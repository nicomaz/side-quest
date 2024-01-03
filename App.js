import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Login from "./screens/login";
import Logout from "./screens/logout";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserNameInputPage from "./screens/UserNameInputPage";
import * as React from "react";
import QuestList from "./Components/QuestList";
import SingleQuest from "./Components/SingleQuest";
import SignIn from "./Components/SignIn";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen name="Logout" component={Logout} />
        <Stack.Screen name="UserNameInputPage" component={UserNameInputPage} />
        <Stack.Screen name="QuestList" component={QuestList} />
        <Stack.Screen name="SingleQuest" component={SingleQuest} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
