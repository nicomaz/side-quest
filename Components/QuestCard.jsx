import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const QuestCard = ({ quest, questions, onStartQuest }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.quest}>
      <Text style={styles.questTitle}>{quest.title}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Start Quest"
          onPress={() => onStartQuest(quest)}
          disabled={!quest.isActive}
        />
        <Button
          title="Details"
          onPress={() =>
            navigation.navigate("SingleQuest", {
              questId: quest.questId,
              questions,
            })
          }
        />
      </View>
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
