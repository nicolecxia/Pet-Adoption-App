import { getAuth, signOut, onAuthStateChanged, signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config";


export async function userSignIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export async function userSignUp(email, password) {
    return createUserWithEmailAndPassword(auth,email,password);
}

export async function userSignOut() {
    return signOut(getAuth());
}

var userUID = null;
onAuthStateChanged(getAuth(), (user) => {
    if (user) {
        userUID = user.uid;
        userEmail = user.email;
        console.log("user sign in, UID", userUID)
    } else {
        userUID = null;
        userEmail = null;
        console.log("user sign out")
    }
})
export var userUID, userEmail;