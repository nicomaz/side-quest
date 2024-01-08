// import { collection, getDocs, query } from "firebase/firestore";
// import { getUser } from "./users";
// import { db } from "../firebaseConfig";

// /*  returns location of the users' current quest
// required setRender to re-rended upon completion, otherwise
// you have to refresh manually in order to update location which 
// is a problem on first render

// required setQuestDestination to return destination 
// */
// async function getLocation(setQuestDestination, setRender) {
//   const user = getUser();
//   console.log(user)

//   const questsRef = collection(db, "quests");
//   const q = query(questsRef, where("questId", "==", user.currentQuest));
//   const querySnapshot = await getDocs(q);
//   setRender(true);
//   querySnapshot.forEach((doc) => {
//     setQuestDestination(doc.data().location);
//   });
// }

// export { getLocation };
