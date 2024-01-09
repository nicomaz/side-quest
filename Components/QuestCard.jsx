import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const QuestCard = ({ quest, questions }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.quest}
      onPress={() => navigation.navigate("SingleQuest", { questId: quest.questId, questions, quest })}
    >
      <Text style={styles.questTitle}>{quest.title}</Text>
    </TouchableOpacity>
  );
};

export default QuestCard;

const styles = StyleSheet.create({
  quest: {
    width: 150,
    height: 150,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
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
