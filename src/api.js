import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore, where, query } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCrE7nNQpM7y16fUGN4TSljIn4b8eYak6s",
    authDomain: "vanlife-beea8.firebaseapp.com",
    projectId: "vanlife-beea8",
    storageBucket: "vanlife-beea8.appspot.com",
    messagingSenderId: "410104164269",
    appId: "1:410104164269:web:eeca51943028beb4367b24"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionRef = collection(db, 'vans')
export const auth = getAuth()

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
    })
    console.log(vans)
    return vans
}



export async function getHostVans(hostId) {
    const q = query(vansCollectionRef, where("hostId", "==", hostId))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))

    return vans
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