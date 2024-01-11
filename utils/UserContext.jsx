import { createContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { app } from "firebase-admin";
import { getAuth } from "firebase/auth";
import { db } from "../firebaseConfig";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState();

  const auth = getAuth(app);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUser = onSnapshot(doc(db, "users", user.phoneNumber), (doc) => {
      setUserData(doc.data());
    });
    fetchUser();
  }, []);

  console.log(userData);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
// Need to keep track of state here? to update when a quest completes, triggering a rerender?
