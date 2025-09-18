import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyDLRgKLmJTLjr7IWwwKw4gHOTSzds_BoI4",
  authDomain: "chat-app-gs-44478.firebaseapp.com",
  projectId: "chat-app-gs-44478",
  storageBucket: "chat-app-gs-44478.firebasestorage.app",
  messagingSenderId: "994370424858",
  appId: "1:994370424858:web:cb20c25c8ed295719381a3",
  measurementId: "G-HBZ7KBHD2L",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password); // this line of codes return a UserCrdential object not the user we need
    const user = res.user; // this will get the firebase user object ( user is the result of the function createUserWithEmail and Password )
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey, There i am using chat app",
      lastSeen: Date.now(),
    });
    await setDoc(doc(db, "chats", user.uid), {
      chatsData: []
    });
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};
export { signup, login, logout, auth, db };
