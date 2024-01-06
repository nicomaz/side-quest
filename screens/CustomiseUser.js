import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UsernameInput from "../Components/UsernameInput";
import PickUserPhoto from "../Components/PickUserPhoto";

export default function CustomiseUser() {
  const [userPiece, setUserPiece] = useState(null);

  return (
    <SafeAreaView>
      <View className="mt-2">
        <PickUserPhoto setUserPiece={setUserPiece} />
        <UsernameInput userPiece={userPiece} />
      </View>
    </SafeAreaView>
  );
}
