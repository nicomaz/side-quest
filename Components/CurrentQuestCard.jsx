import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";
import { app, db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const CurrentQuestCard = () => {
  const [currentQuestId, setCurrentQuestId] = useState(null);
  const [currentQuest, setCurrentQuest] = useState({});
  const [questions, setCurrentQuestQuestions] = useState([]);
  const [render, setRender] = useState(null);

  const auth = getAuth(app);
  const user = auth.currentUser;

  async function getUserCurrentQuestId() {
    const docRef = doc(db, "users", user.phoneNumber);
    const docSnap = await getDoc(docRef);
    const data = await docSnap.data().currentQuest;
    setCurrentQuestId(data);
  }

  async function getCurrentQuestData() {
    const questsRef = collection(db, "quests");
    const q = query(questsRef, where("questId", "==", currentQuestId));
    const querySnapshot = await getDocs(q);
    setRender(true);
    querySnapshot.forEach((doc) => {
      setCurrentQuest(doc.data());
    });

    const questionsSnapshot = await getDocs(collection(db, "questions"));
    const allQuestions = [];
    questionsSnapshot.forEach((doc) => {
      allQuestions.push(doc.data());
    });
    setCurrentQuestQuestions(allQuestions);
  }

  console.log(questions);
  console.log(currentQuest.questId, "hi");

  useEffect(() => {
    getUserCurrentQuestId();
    getCurrentQuestData();
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
        <Text style={styles.questDescription}>{currentQuest.description}</Text>
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
