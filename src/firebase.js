import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASfuasPtCUWxK9nCmJERKgCsc9yQWupkY",
  authDomain: "facebook-messenger-80c8b.firebaseapp.com",
  projectId: "facebook-messenger-80c8b",
  storageBucket: "facebook-messenger-80c8b.appspot.com",
  messagingSenderId: "267688258130",
  appId: "1:267688258130:web:0079101e32e10f88bacd8b",
};

initializeApp(firebaseConfig);

const db = getFirestore();
const colRef = collection(db, "Messages");

export { db, colRef };
