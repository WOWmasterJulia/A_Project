// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
// import { getAuth } from "firebase/auth";

// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

// add WARN from EXPO
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// const auth = initializeAuth(app, { persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

const firebaseConfig = {
  apiKey: "AIzaSyBLcnU0RdW7H1JjYHmmhmUOlnB2iNDVqSk",
  authDomain: "a-project-native-1.firebaseapp.com",
  projectId: "a-project-native-1",
  storageBucket: "a-project-native-1.appspot.com",
  messagingSenderId: "961054400783",
  appId: "1:961054400783:web:d42f43ab4531d3ad9c5e7a",
  measurementId: "G-QY3R9TRTTY",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
// export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// const { getDefaultConfig } = require("@expo/metro-config");

// const defaultConfig = getDefaultConfig(__dirname);
// defaultConfig.resolver.assetExts.push("cjs");

// module.exports = defaultConfig;

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBLcnU0RdW7H1JjYHmmhmUOlnB2iNDVqSk",
//   authDomain: "a-project-native-1.firebaseapp.com",
//   projectId: "a-project-native-1",
//   storageBucket: "a-project-native-1.appspot.com",
//   messagingSenderId: "961054400783",
//   appId: "1:961054400783:web:d42f43ab4531d3ad9c5e7a",
//   measurementId: "G-QY3R9TRTTY"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
