import "react-native-gesture-handler";
import Login from "./screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Nav from "./NavScreens";
import SingleQuest from "./screens/SingleQuest";

import SplashScreen from "./screens/SpashScreen";
import CustomiseUser from "./screens/CustomiseUser";
import Home from "./screens/Home";

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
            name="UserCustomisation"
            component={CustomiseUser}
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
