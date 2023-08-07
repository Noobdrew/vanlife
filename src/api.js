import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { collection, getDocs, getFirestore, where, query, setDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCrE7nNQpM7y16fUGN4TSljIn4b8eYak6s",
    authDomain: "vanlife-beea8.firebaseapp.com",
    projectId: "vanlife-beea8",
    storageBucket: "vanlife-beea8.appspot.com",
    messagingSenderId: "410104164269",
    appId: "1:410104164269:web:eeca51943028beb4367b24"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore()

export const vansCollectionRef = collection(db, 'vans')
export const auth = getAuth()



export function getAllVans(onUpdate) {
    const q = collection(db, "vans");

    return onSnapshot(q, (snapshot) => {
        const vans = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        onUpdate(vans);
    });
}

export async function createProfile(user, uid, email, password, name) {


    try {
        await createUserWithEmailAndPassword(auth, email, password)

        await updateProfile(user, {
            displayName: name,
        });
        await updateDoc(doc(db, 'users', uid), {
            name: name
        })
    } catch (err) {
        console.log(err)
    }

}


export async function updateName(user, uid, newName) {

    try {
        await updateProfile(user, {
            displayName: newName,
        });
        await updateDoc(doc(db, 'users', uid), {
            name: newName
        })
    } catch (err) {
        console.log(err)
    }

}

export async function storeVanData(vanId, data) {
    await setDoc(doc(db, 'vans', vanId), data)
}

export function getHostVans(hostId, onUpdate) {
    const q = query(vansCollectionRef, where("hostId", "==", hostId));

    return onSnapshot(q, (snapshot) => {
        const vans = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        onUpdate(vans);
    });
}


export async function postRating(vanId, data) {
    updateDoc(doc(db, 'vans', vanId), data)



}
export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}