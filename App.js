import "react-native-gesture-handler";
import Login from "./screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import Nav from "./Nav";
import Home from "./screens/Home";
import Map from "./Components/MapComponent";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="Nav"
            component={Nav}
            options={{ headerShown: false }}
          />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
