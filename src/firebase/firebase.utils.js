import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBkKLGtU0DC_qNF_H_QIFVqv6wuUcsHIJA",
    authDomain: "ecom-db-6d6ed.firebaseapp.com",
    databaseURL: "https://ecom-db-6d6ed.firebaseio.com",
    projectId: "ecom-db-6d6ed",
    storageBucket: "ecom-db-6d6ed.appspot.com",
    messagingSenderId: "329899318023",
    appId: "1:329899318023:web:845a654a55cfe466a3c3a2",
    measurementId: "G-D8WK1FLQ0Z"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({ 
                displayName,
                email,
                createdAt,
                ...additionalData
            })

        }catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;

};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;