import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { getCurrentQuest, getQuestQuestions } from "../utils/users";

const CurrentQuestCard = () => {
  const [currentQuest, setCurrentQuest] = useState({});
  const [questions, setCurrentQuestQuestions] = useState([]);
  const [render, setRender] = useState(null);

  useEffect(() => {
    getCurrentQuest(setCurrentQuest, setRender);
    getQuestQuestions(setCurrentQuestQuestions);
  }, [render]);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.currentQuestLabel}>Current Quest</Text>
      <TouchableOpacity
        style={styles.questContainer}
        onPress={() =>
          navigation.navigate("SingleQuest", {
            questId: currentQuest.questId,
            questions,
          })
        }
      >
        <View style={styles.quest}>
          <Text style={styles.questTitle}>{currentQuest.title}</Text>
          <Text style={styles.questDescription}>
            {currentQuest.description}
          </Text>
          <Image
            style={styles.questImage}
            source={{ uri: currentQuest.imgUrl }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  questContainer: {
    backgroundColor: "#de6429",
    borderRadius: 10,
    overflow: "hidden",
  },
  quest: {
    padding: 20,
    alignItems: "center",
  },
  currentQuestLabel: {
    color: "black",
    fontSize: 15,
    marginBottom: 5,
  },
  questTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  questDescription: {
    color: "#fff",
    marginBottom: 15,
  },
  questImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
  },
});

export default CurrentQuestCard;
