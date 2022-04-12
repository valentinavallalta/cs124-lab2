import './App.css';
import ToDoList from "./ToDoList";
import {useState} from 'react';

import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {initializeApp} from "firebase/app";
import {getFirestore, query, collection, doc, setDoc, deleteDoc, updateDoc} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";

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

    function addList(title) {
        const uniqueId = generateUniqueID()
        setDoc(doc(collectionRef, uniqueId), {
            ID: uniqueId,
            Title: title
        })
    }

    function deleteList(id) {
        deleteDoc(doc(collectionRef, id));
    }

    function switchList(id, title) {
        setListID(id)
        setListTitle(title)
    }

    function changeTitle(id, title) {
        setDoc(doc(collectionRef, id), {
            Title: title
        }, {merge: true})
        setListTitle(title)
    }

    if (loading) {
        return (<h3> loading lists ... </h3>)
    } else if (error) {
        return (<h3> an error occurred </h3>)
    } else {
        if (listID === "") {
            return (
                <div>
                        <h3> Lists </h3>
                        <ul>
                            {lists.length === 0 && <small>No Items</small>}
                            {lists.map(p =>
                                <li className={"listItem"}>
                                    <button
                                        className="listButton" onClick={() => switchList(p.ID, p.Title)}>{p.Title}</button>
                                    <button className = "deleteListButton"
                                            onClick={() => deleteList(p.ID)}> + </button>
                                </li>
                            )}
                            <p onClick={() => addList("New List")}
                                className="empty">
                                <button className="addListButton">+</button>
                            </p>
                        </ul>
                    </div>
            )
        } else {

            const listCollectionRef = collection(db, collectionName, listID, "tasks")

            return (
                <ToDoList
                    switchList={switchList}
                    collectionRef={listCollectionRef}
                    listTitle={listTitle}
                    listID={listID}
                    onChangeTitle={changeTitle}
                />
            )
        }
    }
}

export default App;
