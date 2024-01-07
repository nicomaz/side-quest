import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import QuestCard from "./QuestCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebaseConfig';

const QuestList = () => {
  const [quests, setQuests] = useState([]);
  const [questions, setQuestions] = useState([]);

  const getFirestoreData = async () => {
    const questsSnapshot = await getDocs(collection(db, 'quests'));
    const questionsSnapshot = await getDocs(collection(db, 'questions'));
    const allQuests = [];
    const allQuestions = [];
    questsSnapshot.forEach((doc) => {
      allQuests.push(doc.data());
    });
    questionsSnapshot.forEach((doc) => {
      allQuestions.push(doc.data());
    });
    setQuests(allQuests);
    setQuestions(allQuestions);
    console.log(allQuestions)

  }
  
  useEffect(() => {
    getFirestoreData()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.questContainer}>
        <FlatList
          data={quests}
          keyExtractor={(quest) => quest.questId}
          renderItem={({ item }) => (
            <QuestCard quest={item} questions={questions} />
          )}
        />
      </View>
    </View>
  );
};

export default QuestList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 50,
  },
});
