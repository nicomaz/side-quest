import { createContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db, app } from "../firebaseConfig";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState();

  const auth = getAuth(app);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUser = onSnapshot(doc(db, "users", user.phoneNumber), (doc) => {
      setUserData(doc.data());
    });
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
