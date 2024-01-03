import { Text, View, TextInput, TouchableOpacity } from "react-native";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { app, auth } from "../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRef, useState } from "react";
import VerifyCode from "../Components/VerifyCode";

export default function Login() {
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState();
  const [verificationId, setVerificationId] = useState();
  const [verificationCode, setVerificationCode] = useState();
  const [message, showMessage] = useState();
  const attemptInvisibleVerification = true;

  const [isVisible, setIsVisible] = useState(false);

  async function sendVerificationCode() {
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      await showMessage({
        text: "Check your messages! A verification code has been sent",
      });
      setIsVisible(true);
    } catch (err) {
      showMessage({ text: `Error: ${err.message}` });
    }
  }

  return (
    <SafeAreaView>
      <View className="items-center justify-center py-20">
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={app.options}
          attemptInvisibleVerification={true | false}
        />
        <Text className="text-2xl mb-20 tracking-widest font-medium text-center">
          Welcome to {"\n"}
          <Text className="text-3xl tracking-tighter font-bold text-[#d86429]">
            SideQuest
          </Text>
        </Text>
        <Text className="text-xl text-center tracking-tighter font-bold text-[#d86429]">
          <Text className="text-black font-medium">Your</Text> Phone Number
        </Text>
        <Text className="text-[#706e69]">ps. include your area code!</Text>
        <View className="flex flex-row text-base justify-between p-2 mb-3 bg-[#ffe2d4] focus:bg-[#ffb087] w-8/12">
          <TextInput
            className="text-center text-base items-center justify-center pb-2"
            placeholder="+44 123 123 1233"
            placeholderTextColor="#8C8984"
            autoCompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
          />
          <TouchableOpacity
            className="items-center justify-center text-base text-center"
            disabled={!phoneNumber}
            onPress={() => sendVerificationCode()}
          >
            <Text className="text-base font-bold">Send</Text>
          </TouchableOpacity>
        </View>
        <View className="mx-16">
          {attemptInvisibleVerification && !isVisible && (
            <FirebaseRecaptchaBanner />
          )}
        </View>
        <VerifyCode
          isVisible={isVisible}
          verificationId={verificationId}
          setVerificationCode={setVerificationCode}
          verificationCode={verificationCode}
          showMessage={showMessage}
          phoneNumber={phoneNumber}
          setIsVisible={setIsVisible}
        />
      </View>
    </SafeAreaView>
  );
}
