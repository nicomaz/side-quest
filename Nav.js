import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import QuestList from "./Components/QuestList";
import Profile from "./screens/Profile";
import Header from "./Components/Header";
import Map from "./Components/MapComponent";

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
