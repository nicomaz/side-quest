import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import QuestList from "./QuestList";
import Profile from "../screens/Profile";
import Header from "./Header";
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
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#fc7d3d" },
            headerTitle: () => <Header name="Home" />,
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#fc7d3d" },
            headerShadowVisible: false,
          }}
        />
        <Drawer.Screen
          name="Quests"
          component={QuestList}
          options={{
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#fc7d3d" },
          }}
        />
      </>
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;

// fdbb2d
