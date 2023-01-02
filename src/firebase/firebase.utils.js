import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDsHXDZZ6QRUunRsUIjimc6wMXQoM7mCR4",
  authDomain: "crwn-db-202.firebaseapp.com",
  projectId: "crwn-db-202",
  storageBucket: "crwn-db-202.appspot.com",
  messagingSenderId: "107060277315",
  appId: "1:107060277315:web:1519019395c831200624f6",
  measurementId: "G-TJ0ZT277QG"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date()

    try{
      await userRef.set({
        displayName, 
        email,
        createdAt,
        ...additionalData
      })
    }
    catch(error){
      console.log("error creating user", error.message);
    }
  }
  return userRef;
}



export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

