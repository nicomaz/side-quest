import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import QuestList from './Components/QuestList';

export default function App() {
  return (
    <View className="bg-teal-400 flex-1 items-center justify-center">
      <QuestList />
      <StatusBar style="auto" />
    </View>
  );
}


