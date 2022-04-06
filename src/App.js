import './App.css';
import ToDoList from "./ToDoList";
import {useState} from 'react';

import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {initializeApp} from "firebase/app";
import {getFirestore, query, collection, doc, setDoc, deleteDoc, serverTimestamp, updateDoc} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import Item from "./Item";

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

const collectionName = "lists"

function App() {

    const collectionRef = collection(db, collectionName)
    const q = query(collectionRef);

    const [listID, setListID] = useState("")
    const [listTitle, setListTitle] = useState("")


    const [lists, loading, error] = useCollectionData(q)

    // TODO: add a list adds a list
    function addList(title) {
        const uniqueId = generateUniqueID()
        setDoc(doc(collectionRef, uniqueId), {
            ID: uniqueId,
            Title: "TRIAL"
        })
    }

    function deleteList(id) {
        deleteDoc(doc(collectionRef, id));
    }

    // TODO: delete a list

    // TODO: choose a list and display it

    // TODO: display list of lists

    if (loading) {
        return (<h3> loading lists ... </h3>)
    } else if (error) {
        return (<h3> an error occurred </h3>)
    } else {
        if (listID === "") {
            return (
                <h3> Lists </h3>,

                    <div>
                        <h3> Lists </h3>
                        <ul>
                            {lists.length === 0 && <small>No Items</small>}
                            {lists.map(p =>
                                <li> {p.Title}
                                    <button onClick={() => deleteList(p.ID)}> X </button>
                                </li>
                            )}
                            <li onClick={() => addList("")}
                                className="empty">
                                <button>+</button>
                            </li>
                        </ul>
                    </div>
            )
        } else {

            const listCollectionRef = collection(db, collectionName, listID, "tasks")

            return (
                <ToDoList
                    collectionRef={listCollectionRef}
                    // listTitle = {listTitle}
                />
            )
        }
    }
}

export default App;
