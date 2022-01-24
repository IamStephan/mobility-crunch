import createStore from "zustand"
import Firebase from "firebase/app"
import "firebase/firestore"
import "firebase/functions"
import "firebase/storage"

// TODO: move credentials to env
const FirebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

const FirebaseInstance = Firebase.initializeApp(FirebaseConfig)

export type State = {
  firebase: typeof FirebaseInstance
}

export const useFirebase = createStore<State>((set) => ({
  firebase: FirebaseInstance,
}))
