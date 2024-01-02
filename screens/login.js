import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPhoneNumber,
  signUpWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native/";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const navigation = useNavigation();
  auth.languageCode = "it";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("home");
      }
    });
    return () => unsubscribe();
  }, [navigation]);

  const handlePhoneSignup = () => {
    signUpWithPhoneNumber(auth, phoneNumber)
      .then((confirmationResult) => {
        const user = confirmationResult.user;
        console.log(`registered with ${user.phoneNumber}`);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handlePhoneLogin = () => {
    console.log(phoneNumber);
    signInWithPhoneNumber(auth, phoneNumber)
      .then((confirmationResult) => {
     
        const user = confirmationResult.user;
        console.log(`logged in as ${user.phoneNumber}`);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <View>
          <TextInput
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </View>
        <View>
          <TouchableOpacity onPress={handlePhoneLogin} id="sign-in">
            <Text>Log in</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={handlePhoneSignup}>
            <Text>Sign up</Text>
          </TouchableOpacity> */}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
