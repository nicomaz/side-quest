import { View, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import QuestCard from "./QuestCard";
import { getQuestQuestions, getQuests, getUser } from "../utils/api";
import { LinearGradient } from "expo-linear-gradient";

const QuestList = () => {
  const [quests, setQuests] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [lockedQuests, setLockedQuests] = useState([]);
  const [completedQuests, setCompletedQuests] = useState([]);
  const [currentQuest, setCurrentQuest] = useState(0);

  useEffect(() => {
    getUser().then((user) => {
      setLockedQuests(user.lockedQuests);
      setCompletedQuests(user.completedQuests);
      setCurrentQuest(user.currentQuest);
    });
    getQuests(setQuests);
    getQuestQuestions(setQuestions);
  }, []);

  quests.sort((a, b) => a.questId - b.questId);

  return (
    <LinearGradient colors={["#344c76", "#74a4f7"]} className="h-screen">
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
                completedQuests={completedQuests}
                currentQuest={currentQuest}
              />
            )}
          />
        </View>
      </View>
    </LinearGradient>
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
    marginTop: 20,
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
