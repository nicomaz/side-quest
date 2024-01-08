import { View, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import QuestCard from "./QuestCard";
import { getQuestQuestions, getQuests } from "../utils/api";

const QuestList = () => {
  const [quests, setQuests] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuests(setQuests);
    getQuestQuestions(setQuestions);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.questContainer}>
        <FlatList
          data={quests}
          keyExtractor={(quest) => quest.questId}
          renderItem={({ item }) => (
            <QuestCard quest={item} questions={questions} />
          )}
        />
      </View>
    </View>
  );
};

export default QuestList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 50,
  },
});
