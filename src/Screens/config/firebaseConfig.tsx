
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
const firebaseConfig = {
  apiKey: "AIzaSyA72L2G7ouuoxBfqeobNhazyvfMVwNOp-A",
  authDomain: "productnatura-9eb27.firebaseapp.com",
  projectId: "productnatura-9eb27",
  storageBucket: "productnatura-9eb27.appspot.com",
  messagingSenderId: "1019208416195",
  appId: "1:1019208416195:web:9a4e980530e131a533db76"
};


const firebase = initializeApp(firebaseConfig);
export const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

