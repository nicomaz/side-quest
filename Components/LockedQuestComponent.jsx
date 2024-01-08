import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { app, db } from "../firebaseConfig";
import LockedQuestCard from "./LockedQuestCard";


const LockedQuestsComponent = () => {
  const [lockedQuests, setlockedQuests] = useState([]);
  const [questDetails, setQuestDetails]= useState([])
  const [render, setRender] = useState(null);
  const auth = getAuth(app);
  const user = auth.currentUser;

  async function getUserLockedQuests() {
    const docRef = doc(db, "users", user.phoneNumber);
    const docSnap = await getDoc(docRef);
    setlockedQuests(docSnap.data().lockedQuests);
  }

  async function getQuests() {
    const userLockedQuests = await Promise.all(
      lockedQuests.map(async (lockedQuest) => {
        const questsRef = collection(db, "quests");
        const q = query(questsRef, where("questId", "==", lockedQuest));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => doc.data());
      })
    ); 
    setQuestDetails(userLockedQuests.flat())
  }


  useEffect(() => {
    getUserLockedQuests();
  }, []);


  useEffect(() => {
    getQuests();
  }, [lockedQuests, render]);


  return (
    <View style={styles.container}>
      <View style={styles.questContainer}>
        <FlatList
          data={questDetails}
          keyExtractor={(quest) => quest.questId}
          renderItem={({ item }) => (
            <LockedQuestCard quest={item} />
          )}
        />
      </View>
    </View>
  );
};

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

export default LockedQuestsComponent;
