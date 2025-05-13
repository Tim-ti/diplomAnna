
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCE-a3r1M--IOv4cjjRYLFXJb9zj7dirMc",
  authDomain: "diplom-4b9bf.firebaseapp.com",
  projectId: "diplom-4b9bf",
  storageBucket: "diplom-4b9bf.firebasestorage.app",
  messagingSenderId: "742722167093",
  appId: "1:742722167093:web:2fbf1ec919c1b4f9c0ac7c",
  measurementId: "G-35BTHLDPYJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app; 