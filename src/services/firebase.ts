
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwsyKBfgTueiHt48sRVysxFs-0sFxbne0",
  authDomain: "teste-50f98.firebaseapp.com",
  projectId: "teste-50f98",
  storageBucket: "teste-50f98.appspot.com",
  messagingSenderId: "840246014633",
  appId: "1:840246014633:web:ba7322cfea762e84ae6fb8",
  measurementId: "G-NFNE7DFBGL"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);