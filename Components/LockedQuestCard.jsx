import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const LockedQuestCard = ({ quest }) => {
  return (
    <TouchableOpacity
      style={styles.lockedQuest}
      className="w-11/12 my-2 bg-[#344c76] h-32 py-12"
    >
      <Text style={styles.questTitle}>{quest.title}</Text>
      <Text style={styles.lockedText}>LOCKED</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  questTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
  },
  lockedText: {
    fontSize: 15,
    textAlign: "center",
    color: "#000000",
    marginTop: 3,
  },
});

export default LockedQuestCard;
