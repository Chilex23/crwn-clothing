// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAz8soOQIsSWeLloSYFTsvI9WTRyEp3zZI",
  authDomain: "crwn-db-db05e.firebaseapp.com",
  projectId: "crwn-db-db05e",
  storageBucket: "crwn-db-db05e.appspot.com",
  messagingSenderId: "802554244722",
  appId: "1:802554244722:web:ecb43d366dabd3e497dceb",
  measurementId: "G-DN2FQKYX54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = async () => await signInWithPopup(auth, provider)
.then((result) => {
  // This gives you a Google Access Token. You can use it to access the Google API.
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  // The signed-in user info.
  const user = result.user;
  // ...
}).catch((error) => {
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
  // The email of the user's account used.
  const email = error.customData.email;
  // The AuthCredential type that was used.
  const credential = GoogleAuthProvider.credentialFromError(error);
  // ...
});
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const docRef = doc(db, "user", `${userAuth.uid}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
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
}
export default app;