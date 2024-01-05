import "react-native-gesture-handler";
import Login from "./screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Nav from "./Components/Nav";
import SingleQuest from "./screens/SingleQuest";

import SplashScreen from "./screens/SpashScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Nav"
            component={Nav}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="SingleQuest" component={SingleQuest} />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
