import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuestList from "./Components/QuestList";
import SingleQuest from "./Components/SingleQuest";
import SignIn from './Components/SignIn';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="QuestList" component={QuestList} />
        <Stack.Screen name="SingleQuest" component={SingleQuest} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
