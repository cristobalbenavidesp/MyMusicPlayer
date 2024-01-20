// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, getBlob } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

console.log(firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);
const storage = getStorage();

type audioPromiseType = (path: string) => Promise<Blob>;

export const getTrackFromStorage: audioPromiseType = async (path) => {
  console.log(path);
  const storageRef = ref(storage, `${path}/track.mp3`);
  return getBlob(storageRef);
};
