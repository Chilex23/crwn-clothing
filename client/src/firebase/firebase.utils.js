// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAz8soOQIsSWeLloSYFTsvI9WTRyEp3zZI",
  authDomain: "crwn-db-db05e.firebaseapp.com",
  projectId: "crwn-db-db05e",
  storageBucket: "crwn-db-db05e.appspot.com",
  messagingSenderId: "802554244722",
  appId: "1:802554244722:web:ecb43d366dabd3e497dceb",
  measurementId: "G-DN2FQKYX54"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = async () => await signInWithPopup(auth, googleProvider)
.then((result) => {
  // This gives you a Google Access Token. You can use it to access the Google API.
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  // The signed-in user info.
  const user = result.user;
  console.log(token, user);
  // ...
}).catch((error) => {
  // Handle Errors here.
  // const errorCode = error.code;
  const errorMessage = error.message;
  console.log(errorMessage)
});

export const signInWithEmail = async (email, password) => await signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
  // This gives you a Google Access Token. You can use it to access the Google API.
  // The signed-in user info.
  // const user = userCredential.user;
  // console.log(token, user);
  // ...
}).catch((error) => {
  // Handle Errors here.
  const errorMessage = error.message;
  console.log(errorMessage)
});

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const docRef = doc(db, "user", `${userAuth.uid}`);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    // doc.data() will be undefined in this case
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(docRef, { displayName, email, createdAt, ...additionalData });
    } catch(error) {
      console.log("Error creating user", error.message);
    }
    // console.log(docRef, "Document does not exist!");
  }

  return docRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  console.log(collectionRef);

  let batch = writeBatch(db);
  objectsToAdd.forEach((obj) => {
      const docRef = doc(collectionRef);
      console.log(docRef.id);
      batch.set(docRef, obj);
    }
  );
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  }
  );
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  } , {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  }
  );
}

export default app;