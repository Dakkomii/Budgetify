import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage'; 

const firebaseConfig = {
    apiKey: "AIzaSyCmU7zD9yCOYWZ9NRmjMEO4iZnDwA3DQ_g",
    authDomain: "leaksp2-239a7.firebaseapp.com",
    projectId: "leaksp2-239a7",
    storageBucket: "leaksp2-239a7.appspot.com",
    messagingSenderId: "929218534186",
    appId: "1:929218534186:web:5cef2009d3ee3e73731c53",
    measurementId: "G-P8YZEL55B5"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();
export const storageRef = firebase.storage().ref();