import { View, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import QuestCard from "./QuestCard";
import { getQuestQuestions, getQuests, getUser } from "../utils/api";

const QuestList = () => {
  const [quests, setQuests] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [lockedQuests, setLockedQuests] = useState([]);

  useEffect(() => {
    getUser().then((user) => {
      setLockedQuests(user.lockedQuests);
    });
    getQuests(setQuests);
    getQuestQuestions(setQuestions);
  }, []);

  quests.sort((a, b) => a.questId - b.questId);

  return (
    <View style={styles.container}>
      <View style={styles.questContainer}>
        <FlatList
          data={quests}
          keyExtractor={(quest) => quest.questId}
          renderItem={({ item }) => (
            <QuestCard
              quest={item}
              questions={questions}
              lockedQuests={lockedQuests}
            />
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
  lockedQuest: {
    width: 150,
    height: 150,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#d3d3d3",
    opacity: 0.5,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: "center",
    alignSelf: "center",
  },
  questTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
  },
});
