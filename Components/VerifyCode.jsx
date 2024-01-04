import { Text, TextInput, Modal, View, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function VerifyCode({
  verificationId,
  setVerificationCode,
  verificationCode,
  showMessage,
  setIsVerified,
}) {
  async function confirmVerificationCode() {
    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await signInWithCredential(auth, credential);
      setIsVerified(true);
    } catch (err) {
      showMessage({ text: `Error: ${err.message}` });
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View className="py-3 mx-auto items-center w-9/12 h-28  rounded-lg">
          <Text className="text-xl text-center tracking-tighter font-bold text-[#d86429]">
            <Text className="text-black font-medium">Verification</Text> Code
          </Text>
          <Text className="text-[#706e69]">please check your messages</Text>

          <View className="flex flex-row justify-between text-base bg-[#ffe2d4] focus:bg-[#ffb087] p-2">
            <TextInput
              className="text-left text-base items-center justify-center pb-2 w-44"
              placeholderTextColor="#8C8984"
              editable={!!verificationId}
              placeholder="Your Verification Code"
              onChangeText={setVerificationCode}
            />
            <TouchableOpacity
              className="items-center justify-center text-base text-center"
              disabled={!verificationId}
              onPress={() => confirmVerificationCode()}
            >
              <Text className="text-base font-bold">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
