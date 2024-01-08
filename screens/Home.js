import React from "react";
import Map from "../Components/MapComponent";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import CompleteQuestTriviaModal from "../Components/CompleteQuestTriviaModal";
import { useNavigation } from "@react-navigation/native";

const Home = ({ route }) => {
  const { showModal } = route.params || {};
  console.log(route)
  const [completeQuestTriviaModalVisible, setCompleteQuestTriviaModalVisible] =
    useState(false);
  const [completeGame, setCompleteGame] = useState(false)
  const navigation = useNavigation();

  const handleModalClose = () => {
    setCompleteQuestTriviaModalVisible(false);
  };

  useEffect(() => {
    if (showModal) {
      setCompleteQuestTriviaModalVisible(true);
    }
  }, [showModal]);

  return (
    <>
      <Map />

      <CompleteQuestTriviaModal
        isVisible={completeQuestTriviaModalVisible}
        onClose={handleModalClose}
      />
    </>
  );
};

export default Home;
