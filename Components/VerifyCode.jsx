import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  PhoneAuthProvider,
  getAuth,
  signInWithCredential,
} from "firebase/auth";
import { app } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function VerifyCode({
  verificationId,
  setVerificationCode,
  verificationCode,
  setIsLoading,
}) {
  const navigation = useNavigation();
  const auth = getAuth(app);
  async function confirmVerificationCode() {
    try {
      setIsLoading(true);
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await signInWithCredential(auth, credential);

      const user = auth.currentUser;

      if (user.displayName) {
        setIsLoading(false);
        navigation.navigate("Nav");
      } else {
        setIsLoading(false);
        navigation.navigate("UserCustomisation");
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View className="mt-1 py-3 mx-auto items-center w-9/12 h-24 rounded-lg">
          <Text className="text-xl font-medium mt-1">
            Verification <Text className="text-[#344c76] font-bold">Code</Text>
          </Text>
          <Text className="text-[#706e69]">please check your messages</Text>

          <View className="flex flex-row justify-between text-base bg-[#a7c5fa] focus:bg-[#699fff] p-2">
            <TextInput
              className="text-left text-base items-center justify-center pb-2 w-[181px]"
              placeholderTextColor="#676b99"
              editable={!!verificationId}
              keyboardType="phone-pad"
              autoFocus
              placeholder="Your Verification Code"
              onChangeText={setVerificationCode}
            />
            <TouchableOpacity
              className="items-center justify-center text-base text-center rounded-full"
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
