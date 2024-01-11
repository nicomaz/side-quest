import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getSingularQuest, getQuestQuestions } from "../utils/api";

const CurrentQuestCard = ({ currentQuestId }) => {
  const [currentQuest, setCurrentQuest] = useState({});
  const [questions, setCurrentQuestQuestions] = useState([]);

  useEffect(() => {
    getSingularQuest(setCurrentQuest, currentQuestId);
    getQuestQuestions(setCurrentQuestQuestions);
  }, [currentQuestId]);

  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.currentQuestLabel}>Current Quest</Text>
        <TouchableOpacity
          style={styles.questContainer}
          onPress={() =>
            navigation.navigate("SingleQuest", {
              questId: currentQuestId,
              questions,
              quest: currentQuest,
            })
          }
        >
          <View style={styles.quest}>
            <Text style={styles.questTitle}>
              {Object.keys(currentQuest).length ? (
                currentQuest.title
              ) : (
                <Text>
                  You dont have any active quests. You may reset your progress
                  from your profile page if you wish to play again!
                </Text>
              )}
            </Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
  },
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
