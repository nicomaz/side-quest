import React, { useEffect, useRef, useState } from "react";
import { View, Button, Text } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import IndividualQuestCard from "./IndividualQuestCard";
import CurrentQuestCard from "./CurrentQuestCard";
import LockedQuestsComponent from "./LockedQuestComponent";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function BottomSheet({
  selectedMarker,
  setSelectedMarker,
  currentQuest,
  setCurrentQuestClicked,
}) {
  const [isLockedQuest, setIsLockedQuest] = useState(false);
  const [isQuestionScreenDisplayed, setIsQuestionScreenDisplayed] =
    useState(false);
  const refRBSheet = useRef();

  useEffect(() => {
    if (selectedMarker) {
      refRBSheet.current.open();
    }
  }, [selectedMarker]);

  useEffect(() => {
    if (isQuestionScreenDisplayed) {
      refRBSheet.current.close();
      setIsQuestionScreenDisplayed(false);
    }
  }, [isQuestionScreenDisplayed]);

  function handleOnClose() {
    setSelectedMarker(null);
  }

  const handleQuestTypeClick = (locked) => {
    refRBSheet.current.open();
    setIsLockedQuest(locked);
  };
  const handleCurrentQuestZoom = () => {
    setCurrentQuestClicked(true);
  };
  return (
    <View className="bg-[#344c76] w-screen py-2 px-1">
      <View className="flex flex-row justify-between mx-2 my- py-1 px-2">
        <TouchableOpacity
          onPress={() => {
            handleQuestTypeClick(false);
            handleCurrentQuestZoom();
          }}
        >
          <Text className="text-white text-lg font-bold">Current Quest</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleQuestTypeClick(true)}>
          <Text className="text-white text-lg font-bold">Locked Quests</Text>
        </TouchableOpacity>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={300}
        onClose={handleOnClose}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
          container: {
            backgroundColor: "#344c76",
          },
        }}
      >
        {selectedMarker ? (
          <IndividualQuestCard selectedMarker={selectedMarker} />
        ) : isLockedQuest ? (
          <LockedQuestsComponent />
        ) : (
          <CurrentQuestCard
            currentQuestId={currentQuest}
            setIsQuestionScreenDisplayed={setIsQuestionScreenDisplayed}
          />
        )}
      </RBSheet>
    </View>
  );
}
