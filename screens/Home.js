import React from "react";
import Map from "../Components/MapComponent";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import CompleteQuestTriviaModal from "../Components/CompleteQuestTriviaModal";
import { useNavigation } from "@react-navigation/native";

const Home = ({ route }) => {
  // maybe make a state for showModal as well?
  let { showModal } = route.params || {};
  const { quest } = route.params || {};
  const [completeQuestTriviaModalVisible, setCompleteQuestTriviaModalVisible] =
    useState(false);

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
    getModalVisibility(showModal);
  }, [showModal]);

  return (
    <>
      <Map />

      <CompleteQuestTriviaModal
        quest={quest}
        isVisible={completeQuestTriviaModalVisible}
        onClose={handleModalClose}
      />
    </>
  );
};

export default Home;
