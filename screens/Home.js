import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import CompleteQuestTriviaModal from "../Components/CompleteQuestTriviaModal";
import Map from "../Components/MapComponent";
import StartQuestButton from "../Components/StartQuestButton";
import { getUser } from "../utils/api";
import { ModalContext } from "../modalContext";



const Home = ({ route }) => {
  const [isModalExited, setIsModalExited] = useState(false);
  const { quest } = route.params || {};
  const [user, setUser] = useState({ username: "" });
  const [completeQuestTriviaModalVisible, setCompleteQuestTriviaModalVisible] =
    useState(false);
    const { setShowModal } = useContext(ModalContext);
    const { showModal } = useContext(ModalContext);

  const handleModalClose = () => {
    setCompleteQuestTriviaModalVisible(false);
    setShowModal(false)
    setIsModalExited(true);
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
  }, [isModalExited]);

  useEffect(() => {
    getModalVisibility(showModal);
    setShowModal(true)
  }, [showModal]);

   useEffect(() => {
    setIsModalExited(false);
    setShowModal(false)
  }, [user]);


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
      {user.currentQuest && <Map user={user} />}
      <CompleteQuestTriviaModal
        quest={quest}
        isVisible={completeQuestTriviaModalVisible}
        onClose={handleModalClose}
        setIsModalExited={setIsModalExited}
      />
    </>
  );
};

export default Home;
