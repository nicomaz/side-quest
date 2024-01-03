import { View, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const UserNameInputPage = ({ route }) => {
  const [username, setUsername] = useState("");
  const navigation = useNavigation();

  const saveUsername = async () => {
    const { mobileNumber } = route.params;
    try {
      await setDoc(doc(db, "usernames", mobileNumber), {
        username: username,
        mobileNumber: mobileNumber,
      });
      navigation.navigate("home");
    } catch (error) {}
  };

  return (
    <SafeAreaView>
      <View>
        <TextInput
          placeholder="please enter your username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <Button title="save username and continue" onPress={saveUsername} />
      </View>
    </SafeAreaView>
  );
};

export default UserNameInputPage;
