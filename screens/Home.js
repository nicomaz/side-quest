import React from "react";
import Map from "../Components/MapComponent";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import CompleteQuestTriviaModal from "../Components/CompleteQuestTriviaModal";
import StartQuestButton from "../Components/StartQuestButton";
import { getUser } from "../utils/api";

const Home = ({ route }) => {
  let { showModal } = route.params || false;
  const [isModalExited, setIsModalExited] = useState(false)
  const { quest } = route.params || {};
  const [user, setUser] = useState({ username: "" });
  const [Rerender, setRerender] = useState(false);
  const [completeQuestTriviaModalVisible, setCompleteQuestTriviaModalVisible] =
    useState(false);


  const handleModalClose = () => {
    setCompleteQuestTriviaModalVisible(false);
    showModal = false;
    setRerender(true)
  };

  const getModalVisibility = (showModal) => {
    if (showModal) {
      setCompleteQuestTriviaModalVisible(true);
    } else {
      setCompleteQuestTriviaModalVisible(false);
    }
  };

  useEffect(() => {
    getUser().then((userData) => {
      setUser(userData);
    });
  }, [Rerender]);

  useEffect(() => {
    getModalVisibility(showModal);
  }, [showModal]);

  return (
    <>
      <View className="flex flex-row justify-between">
        <View className="flex flex-column">
          <Text className="ml-1 text-lg font-semibold">
            Welcome {user.username}!
          </Text>
          <Text> Ready to explore the city? </Text>
        </View>
        <StartQuestButton />
      </View>
      {user.currentQuest && <Map user={user} isModalExited={isModalExited}/>}
      <CompleteQuestTriviaModal
        quest={quest}
        isVisible={completeQuestTriviaModalVisible}
        onClose={handleModalClose}
        setRerender={setRerender}
        setIsModalExited={setIsModalExited}
      />
    </>
  );
};

export default Home;
