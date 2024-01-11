import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { useState } from "react";
import { resetUser } from "../utils/api";

const CompleteCard = () => {
  const [displayModal, setDisplayModal] = useState(false);

  const handleRestart = () => {
    setDisplayModal(true);
  };
  const handleExit = () => {
    setDisplayModal(false);
  };
  const handleResetUser = async () => {
    await resetUser();
    setDisplayModal(false);
  };
  return (
    <>
      <View className="bg-[#fff5ed] mx-1 px-2 rounded-xl mb-2 mt-6 p-3">
        <Text className="text-[#344c76] text-base mt-2 ml-2 font-bold">
          Congratulations! You have officially completed SideQuest! Your journey
          is at its end...or is it?
        </Text>
        <TouchableOpacity
          className="mt-2 bg-[#344c76] p-1 py-4 rounded-full shadow w-32 self-center"
          onPress={handleRestart}
        >
          <Text className="text-base p-1 font-bold text-center text-white">
            Start a New Journey!
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {displayModal ? (
          <Modal
            transparent={true}
            animationType="slide"
            className="flex-1 justify-center items-center"
          >
            <View className="bg-[#415177] mx-1 px-2 rounded-xl mb-2 mt-40 p-3">
              <Text className="text-[#344c76] text-base mt-2 ml-2 font-bold">
                Are you sure you wish to restart? This action cannot be undone.
              </Text>
              <TouchableOpacity
                onPress={handleResetUser}
                className="mt-2 bg-[#344c76] p-1 py-4 rounded-full shadow w-32 self-center"
              >
                <Text className="text-base p-1 font-bold text-center text-white">
                  Restart Quests
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleExit}
                className="mt-2 bg-[#344c76] p-1 py-4 rounded-full shadow w-32 self-center"
              >
                <Text className="text-base p-1 font-bold text-center text-white">
                  Exit
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        ) : (
          <Text></Text>
        )}
      </View>
    </>
  );
};

export default CompleteCard;
