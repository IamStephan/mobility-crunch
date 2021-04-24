import createStore from "zustand"
import Firebase from "firebase"
import "firebase/firestore"
import "firebase/functions"

// TODO: move credentials to env
const FirebaseConfig = {
  apiKey: "AIzaSyB-sCMnoPhgeU7Odwa9Xy7_cuP7ktO-EOg",
  authDomain: "gerimed-mobility.firebaseapp.com",
  databaseURL: "https://gerimed-mobility.firebaseio.com",
  projectId: "gerimed-mobility",
  storageBucket: "gerimed-mobility.appspot.com",
  messagingSenderId: "2168722012",
  appId: "1:2168722012:web:aa65b856154b459fdb4c99",
  measurementId: "G-TYBFZSBVB4",
}

const FirebaseInstance = Firebase.initializeApp(FirebaseConfig)

// FirebaseInstance.firestore().enablePersistence()

export type State = {
  firebase: typeof FirebaseInstance
}

export const useFirebase = createStore<State>((set) => ({
  firebase: FirebaseInstance,
}))
