// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAD1Cq3K9XA9lTB1HH-4S0xs2YzuHM2cPw",
    authDomain: "fennec-games-cfs.firebaseapp.com",
    databaseURL: "https://fennec-games-cfs.firebaseio.com",
    projectId: "fennec-games-cfs",
    storageBucket: "fennec-games-cfs.appspot.com",
    messagingSenderId: "1056856877507",
    appId: "1:1056856877507:web:5ceccc0a77cdb82915f576"
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Auth and Firestore references
const auth = firebase.auth();
const db = firebase.firestore();
const usersRef = db.collection("users");
var storageRef = firebase.storage().ref();

// Initialize Firebase UI
// const firebaseUI = new firebaseui.auth.AuthUI(firebase.auth());