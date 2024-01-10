import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { getQuestQuestions, getUser } from "../utils/api";

export default function StartQuestButton() {
  const [questId, setQuestId] = useState(null);
  const [questions, setQuestions] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    getUser().then((user) => {
      setQuestId(user.currentQuest);
      getQuestQuestions(setQuestions);
    });
  }, []);

  return (
    <TouchableOpacity
      className="bg-[#D01A1E] p-2 m-2 rounded-xl"
      onPress={() =>
        navigation.navigate("SingleQuest", {
          questId,
          questions,
        })
      }
    >
      <Text className="text-white font-bold">Start Quest</Text>
    </TouchableOpacity>
  );
}
