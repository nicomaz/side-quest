import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { getQuestQuestions, getSingularQuest, getUser } from "../utils/api";

export default function StartQuestButton() {
  const [questId, setQuestId] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [quest, setQuest] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    getUser().then((user) => {
      setQuestId(user.currentQuest);
      getQuestQuestions(setQuestions);
      getSingularQuest(setQuest, questId);
    });
  }, [questId]);

  return (
    <TouchableOpacity
      className="bg-[#344c76] p-2 m-2 rounded-xl"
      onPress={() =>
        navigation.navigate("SingleQuest", {
          questId,
          questions,
          quest: quest,
        })
      }
    >
      <Text className="text-white font-bold">Start Quest</Text>
    </TouchableOpacity>
  );
}
