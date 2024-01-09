import React from "react";
import Map from "../Components/MapComponent";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import CompleteQuestTriviaModal from "../Components/CompleteQuestTriviaModal";
import { useNavigation } from "@react-navigation/native";
import StartQuestButton from "../Components/StartQuestButton";
import { getAuth } from "firebase/auth";
import { app } from "../firebaseConfig";

const Home = ({ route }) => {
  // maybe make a state for showModal as well?
  let { showModal } = route.params || {};
  const { quest } = route.params || {};
  const [completeQuestTriviaModalVisible, setCompleteQuestTriviaModalVisible] =
    useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [currentQuest, setCurrentQuest] = useState(null);
  const [questDestination, setQuestDestination] = useState({
    latitude: 51.5007,
    longitude: -0.1246,
  });

  const auth = getAuth(app);
  const user = auth.currentUser;


  const handleModalClose = () => {
    setCompleteQuestTriviaModalVisible(false);
    showModal = false;
  };

  const getModalVisibility = (showModal) => {
    if (showModal) {
      setCompleteQuestTriviaModalVisible(true);
    } else {
      setCompleteQuestTriviaModalVisible(false);
    }
  };

  useEffect(() => {
    async () => {
      setCurrentQuest(user.currentQuest);
      setQuestArr(user.completedQuests);
      getSingularQuest(setCurrentQuest, currentQuest, setQuestDestination);
    };
    getModalVisibility(showModal);
  }, [selectedMarker, showModal]);

  return (
    <>
      <View className="flex flex-row justify-between">
        <View className="flex flex-column">
          <Text className="ml-1 text-lg font-semibold">
            Welcome {user.displayName}!
          </Text>
          <Text> Ready to explore the city? </Text>
        </View>
        <StartQuestButton />
      </View>
      <Map
        setSelectedMarker={setSelectedMarker}
        currentQuest={currentQuest}
        questDestination={questDestination}
      />
      <CompleteQuestTriviaModal
        quest={quest}
        isVisible={completeQuestTriviaModalVisible}
        onClose={handleModalClose}
      />
    </>
  );
};

export default Home;
