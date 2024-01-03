import Login from "./screens/Login";
import Logout from "./screens/Logout";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserNameInputPage from "./screens/UserNameInputPage";
import * as React from "react";
import QuestList from "./Components/QuestList";
import SingleQuest from "./Components/SingleQuest";
import Header from './Components/Header'
import { UserProvider } from "./userContext";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Sidequest"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Logout"
          component={Logout}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="UserNameInputPage"
          component={UserNameInputPage}
        />
        <Stack.Screen options={{ headerTitle: () => <Header name="questlist" /> }} name="QuestList" component={QuestList} />
          <Stack.Screen name="SingleQuest" component={SingleQuest} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
