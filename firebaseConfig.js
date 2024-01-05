import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth"

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPX-bc6jhMYH120V430Ffj8UV7s9e6STA",
  authDomain: "side-quest-8ecea.firebaseapp.com",
  projectId: "side-quest-8ecea",
  storageBucket: "side-quest-8ecea.appspot.com",
  messagingSenderId: "630136307356",
  appId: "1:630136307356:web:fa60ec14570d9af029f759",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);

export { app, auth, db };
