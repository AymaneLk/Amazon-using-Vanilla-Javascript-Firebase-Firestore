/** FIREBASE CONFIGS **/
var firebaseConfig = {
    apiKey: "AIzaSyDeNQA2a0xivDMDunGCyOMTNhNl_LypbBY",
    authDomain: "clone-c7e21.firebaseapp.com",
    projectId: "clone-c7e21",
    storageBucket: "clone-c7e21.appspot.com",
    messagingSenderId: "480050083656",
    appId: "1:480050083656:web:248a4e4eb51a7b099f657d",
    measurementId: "G-5N4SJ5WYPB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();