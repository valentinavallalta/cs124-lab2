import './App.css';
import List from "./List";
import Header from "./Header";
import {useState} from 'react';

import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {initializeApp} from "firebase/app";
import {getFirestore, query, collection, doc, setDoc, deleteDoc, serverTimestamp, updateDoc} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
// import Item from "./Item";

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

function App() {
    // const data = props.data

    // const [toDoItems, setToDoItems] = useState(data);

    const [sortAscending, setSortAscending] = useState('asc');
    const [sortBy, setSortBy] = useState("timeCreated");

    function handleChangeSortBy(order) {
        setSortBy(order)
    }

    function compareValues(key, order) {
        return function innerSort(a, b) {
            let aGreater = true
            if (key === "timeCreated") {
                aGreater = (a.timeCreated > b.timeCreated)
            } else if (key === "name") {
                aGreater = (a.content > b.content)
            } else if (key === "priority") {
                aGreater = (a.priority > b.priority)
            }
            return (
                (order === 'asc') ? aGreater : !aGreater
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

    console.log("toDoItems", toDoItems)

    // todo: comment out
    // const [completedItemIDs, setCompletedItemIDs] = useState([]);

    function addItem(itemContent) {
        // setToDoItems([...toDoItems, {id: counter, content: itemContent}])
        const uniqueId = generateUniqueID()
        setDoc(doc(db, collectionName, uniqueId), {
            id: uniqueId,
            content: itemContent,
            timeCreated: serverTimestamp(),
            priority: 0,
            completed: false
        })
        // counter++;
    }

    function toggleItemCompleted(id) {
        // if (completedItemIDs.includes(id)) {
        //     setCompletedItemIDs(completedItemIDs.filter(p => p !== id))
        // } else {
        //     setCompletedItemIDs([...completedItemIDs, id]);
        // }
        //
        // const temp = getDoc(doc(db, collectionName, id));
        // const itemData = temp.data();
        // console.log("itemData" + itemData);
        // // updateDoc()
        const currItem = toDoItems.filter(p => p.id === id)[0];
        console.log("TOGGLE ITEM COMPLETED"+ currItem)
        console.log("before value "+ currItem.completed)
        const newVal = !(currItem.completed)
        console.log("newVal " + newVal)
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
        // return !(completedItemIDs.includes(item.id))
        return !(item.completed === true)
    }

    function deleteCompleted() {
        // completedItemIDs.forEach(id => deleteDoc(doc(db, collectionName, id)));
        // setCompletedItemIDs([]);
        const temp = toDoItems.filter((p => p.completed === true))
        temp.forEach(item => deleteDoc(doc(db, collectionName, item.id)));

        // if (toDoItems.length === 0) {
        //     addItem()
        // }
    }

    function deleteItem(id) {
        deleteDoc(doc(db, collectionName, id));
        // if (toDoItems.length === 0) {
        //     addItem("")
        // }
        // setCompletedItemIDs(completedItemIDs.filter(p => p !== id))
    }

    function quadrogglePriority(id) {
        let item = toDoItems.filter(p => p.id === id)[0];
        console.log(item)
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
        let uncompletedItems = toDoItems.filter(checkCompleted)

        toDoItems.sort(compareValues(sortBy, sortAscending)) // TODO - CHANGE sortASCENDING FORMAT ?
        console.log(sortAscending)

        return (
            <div className="App">
                <Header
                    toggleCompletedDisplay={toggleCompletedDisplay}
                    completedDisplay={completedDisplay}
                    onDeleteCompleted={deleteCompleted}
                    // numCompletedItems={completedItemIDs.length}
                    numCompletedItems={getNumCompletedItems()}
                    sort={sortBy}
                    onSortBy={handleChangeSortBy}
                    sortAscending={sortAscending}
                    onAscendingChange={toggleAscending}
                >
                </Header>
                <List
                    // default={data}
                    items={completedDisplay ? toDoItems : uncompletedItems}
                    // completedItems={completedItemIDs}
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
