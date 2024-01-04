import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import QuestCard from "./QuestCard";

//dummy data, TODO - replace w firebase data
//landmarks for quests?
const quests = [
  {
    questId: 1,
    title: "Great Fire Quest",
  },
  {
    questId: 2,
    title: "Tower Bridge Quest",
  },
  {
    questId: 3,
    title: "Covent Garden Quest",
  },
];

const questions = [
  {
    questId: 1,
    questionId: 1,
    text: "What year did the Great Fire of London occur?",
    type: "multiple choice",
    options: ["1666", "1776", "1692", "1888"],
    correctAnswer: "1666",
  },
  {
    questId: 1,
    questionId: 2,
    text: "How many houses burnt down in the Great Fire of London?",
    type: "text input",
    correctAnswer: "13200",
  },
  {
    questId: 2,
    questionId: 3,
    text: "When was Tower Bridge officially opened?",
    type: "multiple choice",
    options: ["1886", "1894", "1923", "1950"],
    correctAnswer: "1894",
  },
  {
    questId: 2,
    questionId: 4,
    text: "How many towers does Tower Bridge have?",
    type: "text input",
    correctAnswer: "2",
  },
  {
    questId: 3,
    questionId: 5,
    text: "Which famous market is located in Covent Garden?",
    type: "multiple choice",
    options: [
      "Portobello Road Market",
      "Camden Market",
      "Covent Garden Market",
      "Borough Market",
    ],
    correctAnswer: "Covent Garden Market",
  },
  {
    questId: 3,
    questionId: 6,
    text: "Name one of the theaters in Covent Garden.",
    type: "text input",
    correctAnswer: "Royal Opera House",
  },
];

const QuestList = () => {
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
