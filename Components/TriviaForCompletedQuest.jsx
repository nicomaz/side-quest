import { getAuth } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { app } from "../firebaseConfig";

const TriviaForCompletedQuest = ({ quest }) => {
  const [trivia, setTrivia] = useState(null);

  const auth = getAuth(app);
  const user = auth.currentUser;

  useEffect(() => {
    setTrivia(quest.trivia);
  }, [quest]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {trivia ? (
          <>
            <Text style={styles.title} className="pb-5 text-center">
              You've completed this quest {user.displayName}! You are rewarded
              with knowledge
            </Text>
            <Text
              style={styles.triviaText}
              className="text-[#344c76] font-bold"
            >
              Did you know that...
            </Text>
            <Text style={styles.triviaText}>{trivia}</Text>
          </>
        ) : (
          <Text style={styles.loadingText}>Loading trivia...</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default TriviaForCompletedQuest;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  triviaText: {
    fontSize: 16,
    textAlign: "center",
  },
  loadingText: {
    fontSize: 16,
    fontStyle: "italic",
  },
});
