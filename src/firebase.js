import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCCRF4cRZyIaCh2Gxr_Y_FQnS3L7SmiOxM",
  authDomain: "netflix-clone-d26b4.firebaseapp.com",
  projectId: "netflix-clone-d26b4",
  storageBucket: "netflix-clone-d26b4.firebasestorage.app",
  messagingSenderId: "1041613759960",
  appId: "1:1041613759960:web:e11de05ac8ed942df0bead"
};
    

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name, email, password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",   
            email, 
        })
    }catch (err){
        console.log('crashed');
        console.log(err);
        toast.error(err.code.split('/')[1].split('-').join(" "));
    }
}


const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = () => {
    signOut(auth)
}

export {auth, db, login, signup, logout}