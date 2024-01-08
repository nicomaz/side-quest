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

/*  return current quest object / current quest location

required setQuestDestination to return destination 

required setQuestDestination ONLY if you need destination, otherwise do not add is as argument. 
*/
async function getCurrentQuest(setCurrentQuest, questId, setQuestDestination) {

  // quests reference
  const questsRef = collection(db, "quests");

  // queries db to find quests with same quiestId as user.currentQuest
  const q = query(questsRef, where("questId", "==", questId));
  const querySnapshot = await getDocs(q);

  // setsQuestDestination of currentQuest
  querySnapshot.forEach((doc) => {
    if (setQuestDestination) {
      setQuestDestination(doc.data().location);
    } else {
      setCurrentQuest(doc.data());
    }
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

    // array with all quests
    setQuests(allQuests);
  });
}

/* gets questions of a quest
 */
async function getQuestQuestions(setCurrentQuestQuestions) {
  const questionsSnapshot = await getDocs(collection(db, "questions"));
  const allQuestions = [];
  questionsSnapshot.forEach((doc) => {
    allQuestions.push(doc.data());
  });
  setCurrentQuestQuestions(allQuestions);
}

export { getCurrentQuest, getUser, getQuests, getQuestQuestions };
