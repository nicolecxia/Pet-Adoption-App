import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db, collectionName } from './config';


/**
 * Loads all documents from the Posts collection
 * @returns 
 * Array with the posts.
 */
export async function load() {
    const querySnapshot = await getDocs(collection(db, collectionName));
    
    return processQuerySnapshot(querySnapshot);
}

/**
 * Loads all published documents from the Posts collection.
 * @returns 
 * Array with the posts.
 */
export async function loadPublished() {
    const dbCollection = collection(db, collectionName);
    const dbQuery = query(dbCollection, where('published', '==', true));
    const querySnapshot = await getDocs(dbQuery);

    return processQuerySnapshot(querySnapshot);
}

/**
 * Converts a Firebase query snapshot into an array.
 * @param {object} querySnapshot 
 * The query snapshot returned by Firebase.
 * @returns 
 * Array with the data.
 */
function processQuerySnapshot(querySnapshot) {
    const data = [];

    querySnapshot.forEach((doc) => {
        data.push({
            ...doc.data(),
            id: doc.id
        });
    });

    return data;
}


export async function loadById(id) {
    console.log('Id:', id);

    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
}

/**
 * Loads all documents by query conditions
 * @param  {object} coloum
 * Coloum name in conditions
 * @param {object} value
 * Value in conditions
 * @returns 
 * Array with the posts.
 */
export async function loadByConditions(columnName, value) {
    console.log('columnName:', columnName);
    console.log('value:', value);

    const dbCollection = collection(db, collectionName);
    const dbQuery = query(dbCollection, where(columnName, '==', value));
    const querySnapshot = await getDocs(dbQuery);

    return processQuerySnapshot(querySnapshot);
}
