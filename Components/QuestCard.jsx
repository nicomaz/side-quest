import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const QuestCard = ({ quest, questions, lockedQuests, completedQuests }) => {
  const navigation = useNavigation();

  const isLocked = lockedQuests.includes(quest.questId);
  const isCompleted = completedQuests.includes(quest.questId);

  const handlePress = () => {
    if (!isLocked && !isCompleted) {
      navigation.navigate("SingleQuest", {
        questId: quest.questId,
        questions,
        quest: quest,
      });
    }
  };

  return (
    <TouchableOpacity
      className={`w-11/12 my-2 bg-[#344c76] h-32 py-12 ${
        isCompleted ? "mt-[-10]" : "mt-1"
      } `}
      style={[
        isLocked ? styles.lockedQuest : styles.quest,
        isCompleted ? styles.completedQuest : styles.quest,
      ]}
      onPress={handlePress}
    >
      <Text style={isLocked ? styles.lockedQuestTitle : styles.questTitle}>
        {quest.title}
      </Text>
      {isCompleted ? <Text style={styles.completeText}>COMPLETE!</Text> : <></>}
      {isLocked ? <Text style={styles.lockedText}>LOCKED</Text> : <></>}
    </TouchableOpacity>
  );
};

export default QuestCard;

const styles = StyleSheet.create({
  quest: {
    height: 150,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: "center",
    alignSelf: "center",
  },
  lockedQuest: {
    height: 150,
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
  completedQuest: {
    height: 150,
    borderRadius: 10,
    backgroundColor: "#4CBB17",
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
    color: "white",
  },
  lockedQuestTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  completeText: {
    fontSize: 15,
    textAlign: "center",
    color: "black",
  },
  lockedText: {
    fontSize: 15,
    textAlign: "center",
    color: "#000000",
  },
});
