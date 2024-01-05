import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import QuestList from "./QuestList";
import Profile from "../screens/Profile";
import Header from "./Header";
import Logout from "../screens/Logout";
import Home from "../screens/Home";

function DrawerNavigation() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <>
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle: { backgroundColor: "#f0ad4e" },
            headerTitle: () => <Header name="Home" />,
          }}
        />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Quests" component={QuestList} />
        <Drawer.Screen name="Logout" component={Logout} />
      </>
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
