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

const CurrentQuestCard = ({ currentQuestId, setIsQuestionScreenDisplayed }) => {
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
        <TouchableOpacity
          style={styles.questContainer}
          onPress={() => {
            navigation.navigate("SingleQuest", {
              questId: currentQuestId,
              questions,
              quest: currentQuest,
            });
            setIsQuestionScreenDisplayed(true);
          }}
        >
          <View style={styles.quest} className="px-1 my-3 flex flex-row">
            <View className="flex flex-row">
              <Image
                style={styles.questImage}
                source={{ uri: currentQuest.imgUrl }}
              />
              <View className="flex flex-column flex-shrink pl-3">
                <Text style={styles.questTitle}>
                  {Object.keys(currentQuest).length ? (
                    currentQuest.title
                  ) : (
                    <Text>
                      You dont have any active quests. You may reset your
                      progress from your profile page if you wish to play again!
                    </Text>
                  )}
                </Text>
                <Text style={styles.questDescription}>
                  {currentQuest.shortDescription}
                </Text>
              </View>
            </View>
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
  container: { marginTop: 10 },
  questContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  quest: {
    padding: 10,
    alignItems: "center",
  },
  questTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#344c76",
    marginBottom: 10,
  },
  questDescription: {
    color: "#344c76",
    marginBottom: 15,
    fontWeight: "semibold",
  },
  questImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginTop: 10,
  },
});

export default CurrentQuestCard;
