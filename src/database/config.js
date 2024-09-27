import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
 import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCld3iYdpj9_ewkdXDxJRTFmzpXmQCNG1w",
  authDomain: "react-57c09.firebaseapp.com",
  projectId: "react-57c09",
  storageBucket: "react-57c09.appspot.com",
  messagingSenderId: "1075095181282",
  appId: "1:1075095181282:web:9c6c775c8919faaf6dcbbb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

//Initialize collection name
export const collectionName = "finalPosts";

// initialize Firebase Auth for that app immediately
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});