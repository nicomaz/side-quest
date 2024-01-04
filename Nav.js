import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import QuestList from "./Components/QuestList";
import Profile from "./screens/Profile";
import { NavigationContainer } from "@react-navigation/native";
import { auth } from "./firebaseConfig";
import Login from "./screens/Login";
import Home from "./screens/Home";

const Drawer = createDrawerNavigator();
const user = auth.currentUser;
function DrawerNavigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {user.displayName ? (
          <Drawer.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
        ) : (
          <>
            (
            <Drawer.Screen
              options={{ headerShown: true }}
              name="Home"
              component={Home}
            />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Quests" component={QuestList} />)
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerNavigation;
