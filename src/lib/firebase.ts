
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBlkad-7Qu1aXYThqmvLoCbHwfNpSdyP2M",
  authDomain: "notesapp-e1524.firebaseapp.com",
  projectId: "notesapp-e1524",
  storageBucket: "notesapp-e1524.firebasestorage.app",
  messagingSenderId: "19037946206",
  appId: "1:19037946206:web:eaccbe934d6fecc20fcfcf"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };