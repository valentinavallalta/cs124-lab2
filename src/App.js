import './App.css';
import List from "./List";
import Header from "./Header";
import {useState} from 'react';

import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {initializeApp} from "firebase/app";
import {getFirestore, query, collection, doc, setDoc, updateDoc, deleteDoc, serverTimestamp} from "firebase/firestore";
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
console.log(db)

const collectionName = "cs124-lab3-9fa78"

// let counter = 3;

function App(props) {
    // const data = props.data

    // const [toDoItems, setToDoItems] = useState(data);

    const collectionRef = collection(db, collectionName)
    const q = query(collectionRef);
    const [toDoItems, loading, error] = useCollectionData(q)

    console.log("toDoItems", toDoItems)

    const [completedItemIDs, setCompletedItemIDs] = useState([]);

    function addItem(itemContent) {
        // setToDoItems([...toDoItems, {id: counter, content: itemContent}])
        const uniqueId = generateUniqueID()
        setDoc(doc(db, collectionName, uniqueId), {
            id: uniqueId,
            content: itemContent,
            created: serverTimestamp()
        })
        // counter++;
    }

    function toggleItemCompleted(id) {
        if (completedItemIDs.includes(id)) {
            setCompletedItemIDs(completedItemIDs.filter(p => p !== id))
        } else {
            setCompletedItemIDs([...completedItemIDs, id]);
        }
    }

    function handleChangeContent(id, text) {
        // setToDoItems(toDoItems.map(
        //     p => p.id === id ? {...p, content: text} : p
        // ))
    }

    const [completedDisplay, setCompletedDisplay] = useState(true)

    function toggleCompletedDisplay() {
        setCompletedDisplay(!completedDisplay)
    }

    function checkCompleted(item) {
        return !(completedItemIDs.includes(item.id))
    }

    function deleteCompleted() {
        let newToDoItems = toDoItems.filter(checkCompleted)
        if (newToDoItems.length === 0) {
            // setToDoItems(data)
        } else {
            // setToDoItems(newToDoItems)
        }
        setCompletedItemIDs([])
    }

    function deleteItem(id) {
        deleteDoc(doc(db, collectionName, id))
        if (toDoItems.length === 0) {
            addItem("")
        }
        setCompletedItemIDs(completedItemIDs.filter(p => p !== id))
    }

    if (loading) {
        return (<h3> loading items ... </h3>)
    } else {
        let uncompletedItems = toDoItems.filter(checkCompleted)

        if (uncompletedItems.length === 0 && !completedDisplay) {
            addItem("")
        }

        if (toDoItems.length === 0) {
            addItem("")
        }

        return (
            <div className="App">
                <Header
                    toggleCompletedDisplay={toggleCompletedDisplay}
                    completedDisplay={completedDisplay}
                    onDeleteCompleted={deleteCompleted}
                    numCompletedItems={completedItemIDs.length}
                >
                </Header>
                <List
                    // default={data}
                      items={completedDisplay ? toDoItems : uncompletedItems}
                      completedItems={completedItemIDs}
                      onAddItem={addItem}
                      onItemCompleted={toggleItemCompleted}
                      onContentChange={handleChangeContent}
                      onDeleteItem={deleteItem}
                >
                </List>
            </div>
        );
    }
}

export default App;
