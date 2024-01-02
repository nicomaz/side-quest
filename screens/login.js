import * as React from "react";
import { Text, View, TextInput, Button, TouchableOpacity } from "react-native";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { app, auth } from "../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRef, useState } from "react";

export default function App() {
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState();
  const [verificationId, setVerificationId] = useState();
  const [verificationCode, setVerificationCode] = useState();
  const [message, showMessage] = useState();
  const attemptInvisibleVerification = false;

  return (
    <SafeAreaView>
      <View>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={app.options}
        />
        <Text>Enter phone number</Text>
        <TextInput
          placeholder="phone number"
          autoFocus
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
        />
        <Button
          title="Send Verification Code"
          disabled={!phoneNumber}
          onPress={async () => {
            try {
              const phoneProvider = new PhoneAuthProvider(auth);
              const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                recaptchaVerifier.current
              );
              setVerificationId(verificationId);
              showMessage({
                text: "Verification code has been sent to your phone.",
              });
            } catch (err) {
              showMessage({ text: `Error: ${err.message}` });
            }
          }}
        />
        <Text>Enter Verification code</Text>
        <TextInput
          editable={!!verificationId}
          placeholder="123456"
          onChangeText={setVerificationCode}
        />
        <Button
          title="Confirm Verification Code"
          disabled={!verificationId}
          onPress={async () => {
            try {
              const credential = PhoneAuthProvider.credential(
                verificationId,
                verificationCode
              );
              await signInWithCredential(auth, credential);
              showMessage({ text: "Phone authentication successful 👍" });
            } catch (err) {
              showMessage({ text: `Error: ${err.message}` });
            }
          }}
        />
        {message ? (
          <TouchableOpacity onPress={() => showMessage(undefined)}>
            <Text>{message.text}</Text>
          </TouchableOpacity>
        ) : undefined}
        {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
      </View>
    </SafeAreaView>
  );
}
