import React, { useRef, useState } from "react";
import { View, Button, Text } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import QuestList from "./QuestList";
import IndividualQuestCard from "./IndividualQuestCard";
import CurrentQuestCard from "./CurrentQuestCard";

export default function Example({ selectedMarker, setSelectedMarker }) {

  const [isLockedQuest, setIsLockedQuest] = useState(false);
  function handleOnClose() {
    setSelectedMarker(null);
  }

  const refRBSheet = useRef();

  const handleLockedQuestClick = () => {
  refRBSheet.current.open()
  setIsLockedQuest(true)
  }

  const handleCurrentQuestClick = () => {
    refRBSheet.current.open()
    setIsLockedQuest(false)
  }
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        height: "10%",
        flexDirection: 'row'
      }}
    >
      <Button title="current quest" onPress={handleCurrentQuestClick} />
      <Button title="locked quest" onPress={handleLockedQuestClick} />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={500}
        onClose={handleOnClose}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
      >
       {isLockedQuest ? <QuestList /> : <CurrentQuestCard/> }
      </RBSheet>
    </View>
  );
}
