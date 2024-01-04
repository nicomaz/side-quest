import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import QuestList from "./QuestList";
import Profile from "../screens/Profile";
import Header from "./Header";
import Map from "./MapComponent";

function DrawerNavigation() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <>
        <Drawer.Screen
          options={{ headerTitle: () => <Header name="Home" /> }}
          name="Map"
          component={Map}
        />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Quests" component={QuestList} />
      </>
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
