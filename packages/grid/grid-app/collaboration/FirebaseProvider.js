import {applyUpdate} from "yjs";


import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, push } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    // ...
    // The value of `databaseURL` depends on the location of the database
    databaseURL: "https://canvas-workout-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export class FirebaseProvider {
    constructor(doc) {
        // this.awareness = new awarenessProtocol.Awareness(doc);

        onValue(
            ref(database, 'operations'),
            (snapshot) => {
                const data = snapshot.val();
                applyUpdate(doc, data);

                console.info(doc.getMap(''));
            }
        );

        doc.on('update', (update) => {
            const opsRef = ref(database, 'operations');
            const newOpsRef = push(opsRef);
            set(newOpsRef, update);
        });
    }

    disconnect() {}

    destroy() {}
}
