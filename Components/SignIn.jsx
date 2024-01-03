import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const SignIn = () => {
  const [user, setUser] = useState("");
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("QuestList", { user: user })}
      >
        <Text>Sign In Page!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
