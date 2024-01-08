import { View, Text, SectionList, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import IndividualQuestCard from "./IndividualQuestCard";
import SmallQuestCard from "./SmallQuestCard";

export default function ScrollableComponent({ name }) {
  const [quests, setQuests] = useState([]);

  const getFirestoreData = async () => {
    const questsSnapshot = await getDocs(collection(db, "quests"));
    const allQuests = [];
    questsSnapshot.forEach((doc) => {
      allQuests.push(doc.data());
    });
    setQuests(allQuests);
  };

  useEffect(() => {
    getFirestoreData();
  }, []);

  return (
    <View className="bg-[#fff5ed]">
     <Text className="text-[#D01A1E] text-base mt-2 ml-2 font-bold">{name}</Text>
      <FlatList
        horizontal
        data={quests}
        keyExtractor={(quest) => quest.questId}
        renderItem={({ item }) => (
          <SmallQuestCard quest={item} />
        )}
      ></FlatList>
    </View>
  );
}
