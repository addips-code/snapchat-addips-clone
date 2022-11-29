import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDduGAGxJqnXc1AEztir4wmJTQO1xuaI-A",
    authDomain: "snapchat-addips-clone.firebaseapp.com",
    projectId: "snapchat-addips-clone",
    storageBucket: "snapchat-addips-clone.appspot.com",
    messagingSenderId: "91414418719",
    appId: "1:91414418719:web:5b2d6b84289cb0805a8c2a"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();


export{ db, auth, storage, provider};