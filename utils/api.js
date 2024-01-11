import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
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

/*  return singular quest object / current quest location

required questId !!

required setQuestDestination ONLY if you need destination, otherwise do not add is as argument. 
*/
async function getSingularQuest(setQuest, questId, setQuestDestination) {
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
      setQuest(doc.data());
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
requires state setting function
 */
async function getQuestQuestions(setQuestions) {
  //gets questions from db
  const questionsSnapshot = await getDocs(collection(db, "questions"));

  const allQuestions = [];
  questionsSnapshot.forEach((doc) => {
    allQuestions.push(doc.data());
  });
  setQuestions(allQuestions);
}

async function getCompletedQuests(setQuests) {
  const user = await getUser();
  const completedQuests = user.completedQuests;
  const userCompletedQuests = await Promise.all(
    completedQuests.map(async (completedQuest) => {
      const questsRef = collection(db, "quests");
      const q = query(questsRef, where("questId", "==", completedQuest));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => doc.data());
    })
  );
  setQuests(userCompletedQuests.flat());
}

const resetUser = async () => {
  try {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (!user) {
      console.error("user not auth");
      return;
    }

    const userRef = doc(db, "users", user.phoneNumber);

    await updateDoc(userRef, {
      currentQuest: 1,
      lockedQuests: [2, 3, 4, 5, 6],
      completedQuests: [],
    });

    console.log("user is reset");
  } catch (error) {
    console.error("error trying to reset user", error.message);
  }
};

export {
  getSingularQuest,
  getUser,
  getQuests,
  getQuestQuestions,
  getCompletedQuests,
  resetUser,
};
