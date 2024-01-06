import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const IndividualQuestCard = ({ selectedMarker }) => {
  const [quest, setQuest] = useState(null);
  const [render, setRender] = useState(null);

  async function getQuestByName() {
    try {
      const questsRef = collection(db, "quests");
      const q = query(questsRef, where("questId", "==", selectedMarker));
      const querySnapshot = await getDocs(q);
      setRender(true);
      querySnapshot.forEach((doc) => {
        setQuest(doc.data());
      });
    } catch (error) {
      console.error("Error fetching quest:", error);
    }
  }

  useEffect(() => {
    getQuestByName();
  }, [render]);

  if (!quest) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.quest}>
          <Text style={styles.questTitle}>{quest.title}</Text>
          <Text style={styles.questDescription}>{quest.description}</Text>
          <Image style={styles.questImage} source={{ uri: quest.imgUrl }} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  quest: {
    backgroundColor: "#de6429",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  questTitle: {
    fontSize: 20,
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

export default IndividualQuestCard;
