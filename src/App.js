import './App.css';
import ToDoList from "./ToDoList";
import {useState} from 'react';
import UserLists from "./UserLists";

import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {initializeApp} from "firebase/app";
import {getFirestore, query, collection, doc, setDoc, deleteDoc, where} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import SignInPage from "./SignInPage";
import {useAuthState} from "react-firebase-hooks/auth";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCwrC7AFEMEg9VAxhYk7n5EvwojCYsnpKQ",
    authDomain: "cs124-lab3-9fa78.firebaseapp.com",
    projectId: "cs124-lab3-9fa78",
    storageBucket: "cs124-lab3-9fa78.appspot.com",
    messagingSenderId: "198215005",
    appId: "1:198215005:web:0c2c84f0d6a280508d14b4"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const collectionName = "lab5"
const auth = getAuth();

function App() {
    const collectionRef = collection(db, collectionName)
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return (<h3 aria-label="loading lists"> loading lists ... </h3>)
    } else if (error) {
        return (<h3 aria-label="an error occurred"> an error occurred </h3>)
    } else {
        if (user) {
            return (<UserLists
                user={user}
                auth={auth}
                collectionRef={collectionRef}/>)
        } else {
            return <SignInPage
            auth={auth}/>
        }

    }
}

export default App;
