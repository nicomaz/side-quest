import React, { useRef } from "react";
import { View, Button, Text } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import QuestList from "./QuestList";

export default function Example() {
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
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
      ><QuestList/></RBSheet>

      {/* quest card component goes here */}
    </View>
  );
}
