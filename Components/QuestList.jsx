import { View, Text, FlatList } from "react-native";
import React from "react";
import QuestCard from "./QuestCard";

//dummy data, TODO - replace w firebase data
const quests = [
  {
    questionId: 1,
    title: "Great Fire Quest",
    text: "What year did the Great Fire of London occur?",
    type: 'multiple choice',
    options: ["1666", "1776", "1692", "1888"],
    correctAnswer: "1666",
  },
  {
    questionId: 2,
    title: "Tower Bridge Quest",
    text: "When was Tower Bridge officially opened?",
    type: 'multiple choice',
    options: ["1886", "1894", "1923", "1950"],
    correctAnswer: "1894",
  },
  {
    questionId: 3,
    title: "Covent Garden Quest",
    text: "Which famous market is located in Covent Garden?",
    type: 'multiple choice',
    options: [
      "Portobello Road Market",
      "Camden Market",
      "Covent Garden Market",
      "Borough Market",
    ],
    correctAnswer: "Covent Garden Market",
  },
];

const QuestList = () => {
  return (
    <FlatList
      data={quests}
      keyExtractor={(quest) => quest.questionId}
      renderItem={({ item }) => <QuestCard {...item} />}
    />
  );
};

export default QuestList;
