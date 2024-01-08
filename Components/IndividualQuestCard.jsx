import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { getSingularQuest } from "../utils/api";

const IndividualQuestCard = ({ selectedMarker }) => {
  const [quest, setQuest] = useState(null);

  useEffect(() => {
    getSingularQuest(setQuest, selectedMarker);
  }, []);

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
