const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const quests = require("./quests.json");
const questions = require("./questions.json");

async function uploadJsonFiles() {
  for (const doc of quests) {
    await db.collection("quests").add(doc);
  }
  for (const doc of questions) {
    await db.collection("questions").add(doc);
  }
}

uploadJsonFiles();
