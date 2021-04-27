import firebase from "firebase/app";
import "firebase/firestore";

import {environment} from "../environment/environment"

// Initialize Firebase database connection
var firebaseConfig = environment.firebaseConfig;
firebase.initializeApp(firebaseConfig);

// Create db connection
const db = firebase.firestore();

export default firebase;