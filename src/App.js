import './App.css';
import List from "./List";
import Header from "./Header";
import {useState} from 'react';

import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {initializeApp} from "firebase/app";
import {getFirestore, query, collection, doc, setDoc, deleteDoc, serverTimestamp, updateDoc} from "firebase/firestore";
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

const collectionName = "cs124-lab3-9fa78"

function App() {

    const [sortAscending, setSortAscending] = useState('asc');
    const [sortBy, setSortBy] = useState("time created");

    console.log("sortBy = ", sortBy)

    function handleChangeSortBy(order) {
        setSortBy(order)
    }

    function compareValues(key, order) {
        return function innerSort(a, b) {
            let aGreater = true
            if (key === "time created") {
                aGreater = (a.timeCreated > b.timeCreated)
            } else if (key === "name") {
                aGreater = (a.content > b.content)
            } else if (key === "priority") {
                aGreater = (a.priority > b.priority)
            }
            let aCompare = 1
            if (!aGreater) {
                aCompare = -1
            }
            return (
                (order === 'asc') ? aCompare : (-1*aCompare)
            )
        }
    }

    function toggleAscending() {
        if (sortAscending === 'asc') {
            setSortAscending('desc')
        } else {
            setSortAscending('asc')
        }
    }

    const collectionRef = collection(db, collectionName)
    const q = query(collectionRef);
    const [toDoItems, loading, error] = useCollectionData(q)

    function addItem(itemContent) {
        const uniqueId = generateUniqueID()
        setDoc(doc(db, collectionName, uniqueId), {
            id: uniqueId,
            content: itemContent,
            timeCreated: serverTimestamp(),
            priority: 0,
            completed: false
        })
    }

    function toggleItemCompleted(id) {
        const currItem = toDoItems.filter(p => p.id === id)[0];
        const newVal = !(currItem.completed)
        const ref = doc(db, collectionName, id)
        updateDoc(ref, {completed : newVal});
    }

    function handleChangeContent(id, text) {
        setDoc(doc(db, collectionName, id), {
            content: text
        }, {merge: true})
    }

    const [completedDisplay, setCompletedDisplay] = useState(true)

    function toggleCompletedDisplay() {
        setCompletedDisplay(!completedDisplay)
    }

    function checkCompleted(item) {
        return !(item.completed === true)
    }

    function deleteCompleted() {
        const temp = toDoItems.filter((p => p.completed === true))
        temp.forEach(item => deleteDoc(doc(db, collectionName, item.id)));
    }

    function deleteItem(id) {
        deleteDoc(doc(db, collectionName, id));
    }

    function quadrogglePriority(id) {
        let item = toDoItems.filter(p => p.id === id)[0];
        if (item.priority === 3) {
            setDoc(doc(db, collectionName, id), {priority: 0}, {merge: true})
        } else {
            setDoc(doc(db, collectionName, id), {priority: item.priority + 1}, {merge: true})
        }
    }

    function getNumCompletedItems(){
        let temp = toDoItems.filter(p => p.completed === true);
        return temp.length
    }

    if (loading) {
        return (<h3> loading items ... </h3>)
    } else if (error) {
        return (<h3> an error occurred </h3>)
    } else {
        toDoItems.sort(compareValues(sortBy, sortAscending))

        let uncompletedItems = toDoItems.filter(checkCompleted)

        console.log("items = ", toDoItems)

        return (
            <div className="App">
                <Header
                    toggleCompletedDisplay={toggleCompletedDisplay}
                    completedDisplay={completedDisplay}
                    onDeleteCompleted={deleteCompleted}
                    getNumCompletedItems={getNumCompletedItems}
                    sort={sortBy}
                    onSortBy={handleChangeSortBy}
                    sortAscending={sortAscending}
                    onAscendingChange={toggleAscending}
                    currSortBy={sortBy}

                >
                </Header>
                <List
                    items={completedDisplay ? toDoItems : uncompletedItems}
                    onAddItem={addItem}
                    onItemCompleted={toggleItemCompleted}
                    onContentChange={handleChangeContent}
                    onDeleteItem={deleteItem}
                    onPriorityChange={quadrogglePriority}
                >
                </List>
            </div>
        );
    }
}

export default App;
