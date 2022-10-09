import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, runTransaction, collection, query, getDocs } from "firebase/firestore";

import {dispatch} from "../store/index.js";


const firebaseConfig = {
    apiKey: "AIzaSyCd4dolmxFwcE-YURhYfjkFq1H4JfMQk6c",
    authDomain: "canvas-workout.firebaseapp.com",
    projectId: "canvas-workout",
    storageBucket: "canvas-workout.appspot.com",
    messagingSenderId: "403584852622",
    appId: "1:403584852622:web:73db3ec07fb1bf84119fdf"
};

let localRevision = 0;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const collectionRef = collection(db, 'patches');

// const configDocumentRef = doc(db, 'config', 'current');

onSnapshot(collectionRef, doc => {

    const operations = doc.docs || [];

    const patches = operations.filter(op => op.id > localRevision).map(op => op.data());

    dispatch({
        type: 'applyPatch',
        payload: patches,
    });
});

export const sendToServer = async (patches) => {
    try {
        await runTransaction(db, async (transaction) => {
            const collectionQuery = query(collectionRef);

            if (!collection) {
                throw "Document does not exist!";
            }

            const querySnapshot = await getDocs(collectionQuery);

            let revision = querySnapshot.size;

            patches.forEach((patch, index) => {
                const docRef = doc(db, 'patches', `${revision + index}`);
                transaction.set(docRef, patch);
            });

            localRevision = revision + patches.length - 1;
        });
        console.log("Transaction successfully committed!");
    } catch (e) {
        console.log("Transaction failed: ", e);
    }
}

