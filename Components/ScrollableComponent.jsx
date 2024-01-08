import { View, Text, SectionList, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import SmallQuestCard from "./SmallQuestCard";
import { getQuests } from "../utils/api";

export default function ScrollableComponent({ name }) {
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    getQuests(setQuests);
  }, []);

  return (
    <View className="bg-[#fff5ed] mx-1 rounded-xl mb-2">
      <Text className="text-[#D01A1E] text-base mt-2 ml-2 font-bold">
        {name}
      </Text>
      <FlatList
        horizontal
        data={quests}
        keyExtractor={(quest) => quest.questId}
        renderItem={({ item }) => <SmallQuestCard quest={item} />}
      ></FlatList>
    </View>
  );
}