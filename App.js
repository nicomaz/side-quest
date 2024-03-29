import "react-native-gesture-handler";
import Login from "./screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Nav from "./NavScreens";
import SingleQuest from "./screens/SingleQuest";
import { LogBox } from "react-native";
import SplashScreen from "./screens/SpashScreen";
import CustomiseUser from "./screens/CustomiseUser";

export default function App() {
  LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications

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
            options={{ headerShown: false, headerShadowVisible: false }}
          />
          <Stack.Screen
            name="SingleQuest"
            component={SingleQuest}
            options={{
              headerTintColor: "white",
              headerStyle: { backgroundColor: "#344c76" },
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
