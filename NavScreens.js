import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect } from "react";
import QuestList from "./Components/QuestList";
import Profile from "./screens/Profile";
import Header from "./Components/Header";
import Home from "./screens/Home";
import { StatusBar } from "expo-status-bar";


function DrawerNavigation() {
  const Drawer = createDrawerNavigator();

  return (
    <>
      <StatusBar hidden={true} />
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: { backgroundColor: "#D01A1E" },
          drawerType: "front",
          drawerLabelStyle: { color: "white" },
        }}
      >
        <>
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{
              drawerActiveBackgroundColor: { backgroundColor: "#D01A1E" },
              headerShadowVisible: false,
              header: () => <Header />,
            }}
          />
          <Drawer.Screen
            name="Profile"
            component={Profile}
            options={{
              headerTintColor: "white",
              headerStyle: { backgroundColor: "#D01A1E" },
              headerShadowVisible: false,
            }}
          />
          <Drawer.Screen
            name="Quests"
            component={QuestList}
            options={{
              headerTintColor: "white",
              headerStyle: { backgroundColor: "#D01A1E" },
            }}
          />
        </>
      </Drawer.Navigator>
    </>
  );
}

export default DrawerNavigation;
