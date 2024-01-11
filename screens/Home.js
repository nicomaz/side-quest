import React, { useContext } from "react";
import Map from "../Components/MapComponent";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import CompleteQuestTriviaModal from "../Components/CompleteQuestTriviaModal";
import StartQuestButton from "../Components/StartQuestButton";
import { getUser } from "../utils/api";
import Loading from "../Components/Loading";
import { UserContext } from "../utils/UserContext";

const Home = ({ route }) => {
  let { showModal } = route.params || false;
  const { quest } = route.params || {};
  const { userData } = useContext(UserContext);

  const [completeQuestTriviaModalVisible, setCompleteQuestTriviaModalVisible] =
    useState(false);

  const [mapKey, setMapKey] = useState(Date.now());
  const [isLoaded, setIsLoaded] = useState(false);

  const handleModalClose = async () => {
    setCompleteQuestTriviaModalVisible(false);
    showModal = false;

    try {
      const userData = await getUser();
      setUser(userData);
      setMapKey(Date.now());
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getModalVisibility = (showModal) => {
    if (showModal) {
      setCompleteQuestTriviaModalVisible(true);
    } else {
      setCompleteQuestTriviaModalVisible(false);
    }
  };

  useEffect(() => {
    if (userData) {
      setIsLoaded(true);
    }
    getModalVisibility(showModal);
  }, [userData]);

  return (
    <>
      {!isLoaded ? null : (
        <View className="flex flex-row justify-between">
          <View className="flex flex-column">
            <Text className="ml-1 text-lg font-semibold">
              Welcome {userData.username}!
            </Text>
            <Text> Ready to explore the city? </Text>
          </View>
          <StartQuestButton userData={userData} />
        </View>
      )}
      <View className="absolute top-1/3 left-[37%] transform -translate-x-1/2 -translate-y-1/2 ml-0">
        {!isLoaded && <Loading />}
      </View>
      {isLoaded && <Map user={userData} />}
      <CompleteQuestTriviaModal
        quest={quest}
        isVisible={completeQuestTriviaModalVisible}
        onClose={handleModalClose}
      />
    </>
  );
};

export default Home;
