import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const LockedQuestCard = ({ quest, questions }) => {
  return (
    <TouchableOpacity style={styles.lockedQuest}>
      <Text style={styles.questTitle}>{quest.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default LockedQuestCard;

