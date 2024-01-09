import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const QuestCard = ({ quest, questions, lockedQuests }) => {
  const navigation = useNavigation();

  const isLocked = lockedQuests.includes(quest.questId);

  const handlePress = () => {
    if (!isLocked) {
      navigation.navigate("SingleQuest", {
        questId: quest.questId,
        questions,
      });
    }
  };

  return (
    <TouchableOpacity
      style={isLocked ? styles.lockedQuest : styles.quest}
      onPress={handlePress}
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
