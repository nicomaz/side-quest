import React, { useEffect, useRef, useState } from "react";
import { View, Button } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import QuestList from "./QuestList";
import IndividualQuestCard from "./IndividualQuestCard";
import CurrentQuestCard from "./CurrentQuestCard";
import LockedQuestsComponent from "./LockedQuestComponent";

export default function Example({ selectedMarker, setSelectedMarker }) {
  const [isLockedQuest, setIsLockedQuest] = useState(false);

  const refRBSheet = useRef();

  useEffect(() => {
    if (selectedMarker) {
      refRBSheet.current.open();
    }
  }, [selectedMarker]);

  function handleOnClose() {
    setSelectedMarker(null);
  }

  const handleQuestTypeClick = (locked) => {
    refRBSheet.current.open();
    setIsLockedQuest(locked);
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        height: "10%",
        flexDirection: "row",
      }}
    >
      <Button
        title="Current Quest"
        onPress={() => handleQuestTypeClick(false)}
      />
      <Button title="Locked Quests" onPress={() => handleQuestTypeClick(true)} />

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={400}
        onClose={handleOnClose}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
          container: {
            backgroundColor: "white",
          },
        }}
      >
        {selectedMarker ? (
          <IndividualQuestCard selectedMarker={selectedMarker} />
        ) : isLockedQuest ? (
          <LockedQuestsComponent />
        ) : (
          <CurrentQuestCard />
        )}
      </RBSheet>
    </View>
  );
}
