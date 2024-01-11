import React from "react";
import Map from "../Components/MapComponent";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import CompleteQuestTriviaModal from "../Components/CompleteQuestTriviaModal";
import StartQuestButton from "../Components/StartQuestButton";
import { getUser } from "../utils/api";
import Loading from "../Components/Loading";

const Home = ({ route }) => {
  let { showModal } = route.params || false;
  const { quest } = route.params || {};
  const [user, setUser] = useState({ username: "" });
  const [completeQuestTriviaModalVisible, setCompleteQuestTriviaModalVisible] =
    useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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
  console.log("hello");
  useEffect(() => {
    getUser().then((userData) => {
      setUser(userData);
    });
  }, []);

  useEffect(() => {
    getModalVisibility(showModal);
  }, [showModal]);

  return (
    <>
      <View className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {!isLoaded && <Loading />}
      </View>
      <View
        className={`${isLoaded ? "flex flex-row justify-between" : "hidden"}`}
      >
        <View className="flex flex-column">
          <Text className="ml-1 text-lg font-semibold">
            Welcome {user.username}!
          </Text>
          <Text> Ready to explore the city? </Text>
        </View>
        <StartQuestButton />
      </View>
      {user.currentQuest && <Map user={user} />}
      <CompleteQuestTriviaModal
        quest={quest}
        isVisible={completeQuestTriviaModalVisible}
        onClose={handleModalClose}
      />
    </>
  );
};

export default Home;
