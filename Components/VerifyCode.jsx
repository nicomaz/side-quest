import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  PhoneAuthProvider,
  getAuth,
  signInWithCredential,
} from "firebase/auth";
import { app, auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function VerifyCode({
  verificationId,
  setVerificationCode,
  verificationCode,
  setIsVerified,
}) {
  const auth = getAuth(app);
  const user = auth.currentUser;
  const navigation = useNavigation();

  async function confirmVerificationCode() {
    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await signInWithCredential(auth, credential);
      setIsVerified(true);
      navigation.navigate("UserCustomisation");
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View className="py-3 mx-auto items-center w-9/12 h-24 rounded-lg">
          <Text className="text-xl font-medium mt-1">
            Verification <Text className="text-[#D01A1E] font-bold">Code</Text>
          </Text>
          <Text className="text-[#706e69]">please check your messages</Text>

          <View className="flex flex-row justify-between text-base bg-[#ffa6a8] focus:bg-[#f27e81] p-2">
            <TextInput
              className="text-left text-base items-center justify-center pb-2 w-44"
              placeholderTextColor="#8C8984"
              editable={!!verificationId}
              keyboardType="phone-pad"
              autoFocus
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
