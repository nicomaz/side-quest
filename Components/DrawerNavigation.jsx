import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import QuestList from "./QuestList";
import Profile from "../screens/Profile";
import { NavigationContainer } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Quests" component={QuestList} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerNavigation;
