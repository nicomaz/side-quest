import { View, Text, FlatList } from "react-native";
import React from "react";

import SmallQuestCard from "./SmallQuestCard";

export default function ScrollableComponent({ name, quests }) {
  return (
    <View className="bg-[#fff5ed] mx-1 px-2 rounded-xl mb-2 mt-6">
      <Text className="text-[#D01A1E] text-base mt-2 ml-2 font-bold">
        {name}
      </Text>
      {!quests || !quests.length ? (
        <Text className="text-base mt-1 pb-2 ml-2">
          None yet, get questing!
        </Text>
      ) : (
        <FlatList
          horizontal
          data={quests}
          keyExtractor={(quest) => quest.questId}
          renderItem={({ item }) => <SmallQuestCard quest={item} />}
        ></FlatList>
      )}
    </View>
  );
}
