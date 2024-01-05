import React, { useRef } from "react";
import { View, Button, Text } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import QuestList from "./QuestList";
import IndividualQuestCard from "./IndividualQuestCard";

export default function Example({ selectedMarker, setSelectedMarker }) {
  function handleOnClose (){
    setSelectedMarker(null)
  }
  const refRBSheet = useRef();
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        height: "10%",
      }}
    >
      <Button
        title="OPEN BOTTOM SHEET"
        onPress={() => refRBSheet.current.open()}
      />
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
        {/* placeholder for now - actual quest card component goes here */}
        {selectedMarker ? <IndividualQuestCard /> : <QuestList />}
      </RBSheet>
    </View>
  );
}
