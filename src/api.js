import { initializeApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import {
    collection,
    getFirestore,
    where,
    query,
    setDoc,
    doc,
    onSnapshot,
    updateDoc,
    arrayUnion,
    getDoc,
    addDoc,
    deleteDoc
} from "firebase/firestore";

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

export async function getExcludedDates(vanId) {
    const vanDocRef = doc(db, 'vans', vanId);
    try {
        const docSnap = await getDoc(vanDocRef);
        if (docSnap.exists()) {
            const existingDatesArray = docSnap.data().rented || [];

            // Convert Firestore Timestamps to JavaScript Date objects
            return existingDatesArray.map((timestamp) => timestamp.toDate())

        } else {
            console.log('Document not found.');
        }
    } catch (error) {
        console.error('Error fetching document data: ', error);
    }

}

async function storeRentDates(vanId, newDateArray,) {
    const vanDocRef = doc(db, 'vans', vanId);
    try {
        const vanDocSnap = await getDoc(vanDocRef);
        if (vanDocSnap.exists()) {
            const existingDatesArray = vanDocSnap.data().rented || [];
            const combinedArray = [...existingDatesArray, ...newDateArray];

            // Update the Firestore document with the combined array of dates
            await updateDoc(vanDocRef, {
                rented: combinedArray
            });

            console.log('Dates array successfully updated in Firestore.');
        } else {
            console.log('Document not found.');
        }
    } catch (error) {
        console.error('Error updating dates array in Firestore: ', error);
    }
}

async function calculateIncome(transactionObj, hostId) {
    const monthNum = transactionObj.timestamp.getMonth();
    const year = transactionObj.timestamp.getFullYear();
    const newIncome = transactionObj.price;

    const userDocRef = doc(db, 'users', hostId);

    try {
        const docSnap = await getDoc(userDocRef); // Read operation

        if (docSnap.exists()) {
            const dataArray = docSnap.data().income || [];
            let entryFound = false;

            for (const entry of dataArray) {
                if (entry.monthNum === monthNum && entry.year === year) {
                    entry.income += newIncome; // Modify the income directly
                    entryFound = true;
                    break;
                }
            }

            if (!entryFound) {
                // Calculate the month name based on the month number
                const monthNames = [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ];
                const monthName = monthNames[monthNum];

                // Push a new object with month name to the array
                dataArray.push({
                    monthNum,
                    year,
                    income: newIncome,
                    month: monthName,
                });
            }

            console.log(dataArray);

            // Update the document with the modified income array
            await updateDoc(userDocRef, { income: dataArray }); // Write operation
            console.log('Income updated successfully.');
        } else {
            console.log('Document does not exist.');
        }
    } catch (error) {
        console.error('Error updating income: ', error);
    }
}

async function storeRentTransaction(hostId, transactionObj) {
    const userDocRef = doc(db, 'users', hostId)

    try {
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
            const transactionArray = userDocSnap.data().transactions || [];
            transactionArray.push(transactionObj)

            // Update the Firestore document with the combined array of dates
            await updateDoc(userDocRef, {
                transactions: transactionArray
            });

            console.log('Dates array successfully updated in Firestore.');
        } else {
            console.log('Document not found.');
        }
    } catch (error) {
        console.error('Error updating dates array in Firestore: ', error);
    }
}

export async function rentVan(vanId, newDateArray, hostId, transactionObj) {
    try {
        await storeRentTransaction(hostId, transactionObj)
        await calculateIncome(transactionObj, hostId)
        await storeRentDates(vanId, newDateArray)

    } catch (err) {
        console.log(err)
    }
}

export async function postComment(vanId, newComment) {
    const vansDocRef = doc(db, 'vans', vanId);

    try {
        await updateDoc(vansDocRef, {
            comments: arrayUnion(newComment)
        });

        console.log("Comment added successfully!");
    } catch (error) {
        console.error("Error adding comment:", error);
    }
};

export async function removeCommentAt(indexToRemove, vanId) {
    try {
        const documentRef = doc(db, 'vans', vanId);
        const docSnapshot = await getDoc(documentRef);

        if (docSnapshot.exists()) {
            const comments = docSnapshot.data().comments || [];

            // Check if the comment index is valid
            if (indexToRemove >= 0 && indexToRemove < comments.length) {
                comments.splice(indexToRemove, 1); // Remove the comment at the specified index
                await updateDoc(documentRef, { comments: comments });
                console.log('Comment removed successfully.');
            } else {
                console.log('Invalid comment index.');
            }
        } else {
            console.log('Document does not exist.');
        }
    } catch (error) {
        console.error('Error removing comment:', error);
    }
}

export async function toggleCommentVisibility(indexToToggle, vanId) {
    try {
        const documentRef = doc(db, 'vans', vanId);
        const docSnapshot = await getDoc(documentRef);

        if (docSnapshot.exists()) {
            const comments = docSnapshot.data().comments || [];

            // Check if the comment index is valid
            if (indexToToggle >= 0 && indexToToggle < comments.length) {
                // Toggle the "visible" property
                comments[indexToToggle].visible = !comments[indexToToggle].visible;

                // Step 3: Update the modified document back to Firestore
                await updateDoc(documentRef, { comments: comments });
                console.log('Comment visibility toggled.');
            } else {
                console.log('Invalid comment index.');
            }
        } else {
            console.log('Document does not exist.');
        }
    } catch (error) {
        console.error('Error toggling comment visibility:', error);
    }
}

export async function postRating(vanId, data) {
    updateDoc(doc(db, 'vans', vanId), data)
}

export async function addNewVan(vanData) {
    try {
        // Get the vans collection reference
        const vansCollection = collection(db, 'vans');

        // Add a new van document with auto-generated ID
        const newVanDocRef = await addDoc(vansCollection, vanData);

        console.log('New van added with ID:', newVanDocRef.id);
        return newVanDocRef
    } catch (error) {
        console.error('Error adding van:', error);
    }
};

export async function removeVan(vanId) {
    try {
        const vanRef = doc(db, 'vans', vanId);
        await deleteDoc(vanRef);
        console.log('Van removed successfully:', vanId);
    } catch (error) {
        console.error('Error removing van:', error);
        throw error;
    }
};