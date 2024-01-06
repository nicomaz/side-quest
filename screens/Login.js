import { Text, View, TextInput, TouchableOpacity } from "react-native";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { PhoneAuthProvider, getAuth } from "firebase/auth";
import { app } from "../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRef, useState } from "react";
import VerifyCode from "../Components/VerifyCode";
import UsernameInput from "../Components/UsernameInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Login() {
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState();
  const [verificationId, setVerificationId] = useState();
  const [verificationCode, setVerificationCode] = useState();
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);
  const auth = getAuth(app);
  const user = auth.currentUser;

  async function sendVerificationCode() {
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      setError(false);
    } catch (err) {
      console.alert("Invalid phone number, please try again");
      setError(true);
    }
  }

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={false}
        enableOnAndroid={true}
      >
        <View className="items-center justify-center my-8">
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={app.options}
          />
          <Text className="text-2xl mb-12 tracking-widest font-medium text-center shadow">
            Welcome to {"\n"}
            <Text className="text-3xl tracking-tighter font-bold text-[#d86429]">
              SideQuest
            </Text>
          </Text>
          <Text className="text-xl text-center tracking-tighter font-bold text-[#d86429]">
            <Text className="text-black font-medium">Your</Text> Phone Number
          </Text>
          <Text className="text-[#706e69]">ps. include your country code!</Text>
          <View className="flex flex-row text-base justify-between p-2 mb-3 bg-[#ffe2d4] focus:bg-[#ffb087] w-8/12">
            <TextInput
              className="text-center text-base items-center justify-center pb-2"
              placeholder="+441231231233"
              placeholderTextColor="#8C8984"
              autoCompleteType="tel"
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
            />
            <TouchableOpacity
              className="items-center justify-center text-base text-center"
              disabled={!phoneNumber && !error}
              onPress={() => sendVerificationCode()}
            >
              <Text className="text-base font-bold">Send</Text>
            </TouchableOpacity>
          </View>
          <View className="mx-16">{<FirebaseRecaptchaBanner />}</View>
          {verificationId && (
            <VerifyCode
              verificationId={verificationId}
              setVerificationCode={setVerificationCode}
              verificationCode={verificationCode}
              setIsVerified={setIsVerified}
            />
          )}
          {isVerified && !user.displayName && (
            <UsernameInput isVerified={isVerified} />
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
