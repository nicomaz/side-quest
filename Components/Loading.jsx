import { View, Text } from "react-native";
import React from "react";

export default function Loading() {
  return (
    <View>
      <Text>Loading</Text>
    </View>
  );
}

// on component page setIsLoading => true
// on component page isLoading ? render <Loading>
// on component page when API call made, setIsLoading(false)
// Loading no longer appears

// Loading page (?) on login
// Loading icon / modal <= focus

// Every stage of logging in + sigining up
// Loading the home page
// Loading each quest list
// Loading the questions
// Loading profile
