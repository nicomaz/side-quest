import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useState } from "react";
import QuestList from "./Components/QuestList";
import Profile from "./screens/Profile";
import Header from "./Components/Header";
import Home from "./screens/Home";

function DrawerNavigation() {
  const Drawer = createDrawerNavigator();
  return (
    <>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerStyle: { backgroundColor: "#344c76" },
          drawerType: "front",
          drawerLabelStyle: { color: "white" },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            drawerActiveBackgroundColor: { backgroundColor: "#344c76" },
            headerShadowVisible: false,
            header: () => <Header />,
          }}
        />
        <Drawer.Screen
          name="Quests"
          component={QuestList}
          options={{
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#344c76" },
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#344c76" },
            headerShadowVisible: false,
          }}
        />
      </Drawer.Navigator>
    </>
  );
}

export default DrawerNavigation;
