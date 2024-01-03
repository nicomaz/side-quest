import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Login from "./screens/Login";
import Logout from "./screens/Logout";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserNameInputPage from "./screens/UserNameInputPage";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen name="Logout" component={Logout} />
        <Stack.Screen name="UserNameInputPage" component={UserNameInputPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
