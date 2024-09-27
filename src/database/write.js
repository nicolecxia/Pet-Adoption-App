import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, collectionName } from "./config";


export async function save(data) {
    try {
        const dbCollection = collection(db, collectionName);
        const docRef = await addDoc(dbCollection, data);
        return docRef.id;
    } catch (e) {
        return null;
    }
}

export async function update(id, data) {
    try {
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, data);

        return true;
    } catch (e) {
        return false;
    }
}


export async function remove(id) {
    try {
        await deleteDoc(doc(db, collectionName, id));
        return true;
    } catch (e) {
        return false;
    }
}


/**
 * Save the notification token in the database
 * 
 * @param {object} token
 *  The token to be add to the collection
 * @returns
 *  The document id 
 */

export async function addToken(token) {
    try {
        const dbCollection = collection(db, "tokens");
        const docRef = await addDoc(dbCollection, token);
        return docRef.id;
    } catch (e) {
        console.log('DB error:', e);
        return null;
    }
}

export async function removeToken(docId) {
    try {
        const docRef = doc(db, "tokens", docId);
        await deleteDoc(docRef);
        return true;
    } catch (e) {
        return false;
    }
}