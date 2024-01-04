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
import { auth } from "./firebaseConfig";

export default function App() {
  const Stack = createNativeStackNavigator();
  const user = auth.currentUser;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Sidequest"
              component={Login}
            />
            <Stack.Screen name="Home" component={Home} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Logout"
              component={Logout}
            />
            <Stack.Screen
              options={{ headerTitle: () => <Header name="questlist" /> }}
              name="QuestList"
              component={QuestList}
            />
            <Stack.Screen name="SingleQuest" component={SingleQuest} />
            <Stack.Screen name="Home" component={Home} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
