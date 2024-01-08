import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { app, db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

/*  gets users details from database
docSnap.currentQuest // docSnap.completedQuests // docSnap.lockedQuests to access users current/completed/locked quests
*/
async function getUser() {
  // retrieves current logged in user
  const auth = getAuth(app);
  const user = auth.currentUser;

  // returns user in db
  const docRef = doc(db, "users", user.phoneNumber);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

/*  returns location of the users' current quest
required setRender to re-rended upon completion, otherwise
you have to refresh manually in order to update location which 
is a problem on first render

required setQuestDestination to return destination 
*/
async function getLocation(setQuestDestination, setRender) {
  //gets current user from db
  const user = await getUser();

  // quests reference
  const questsRef = collection(db, "quests");

  // queries db to find quests with same quiestId as user.currentQuest
  const q = query(questsRef, where("questId", "==", user.currentQuest));
  const querySnapshot = await getDocs(q);
  setRender(true);

  // setsQuestDestination of currentQuest
  querySnapshot.forEach((doc) => {
    setQuestDestination(doc.data().location);
  });
}

/* getAllQuests
returns all quests 
*/
async function getQuests(setQuests) {
  // returns quests from db
  const questsSnapshot = await getDocs(collection(db, "quests"));
  const allQuests = [];

  questsSnapshot.forEach((doc) => {
    allQuests.push(doc.data());

    setQuests(allQuests);
  });
}

export { getLocation, getUser, getQuests };
