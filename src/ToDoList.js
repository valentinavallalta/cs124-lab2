import "./ToDoList.css"
import Header from "./Header"
import List from "./List"
import {useCollectionData} from "react-firebase-hooks/firestore";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {deleteDoc, doc, query, serverTimestamp, setDoc, updateDoc} from "firebase/firestore";
import {useState} from "react";

function ToDoList(props) {
    const [sortAscending, setSortAscending] = useState('asc');
    const [sortBy, setSortBy] = useState("time created");

    function toggleAscending() {
        if (sortAscending === 'asc') {
            setSortAscending('desc')
        } else {
            setSortAscending('asc')
        }
    }

    function handleChangeSortBy(order) {
        setSortBy(order)
    }

    const q = query(props.collectionRef);
    const [toDoItems, loading, error] = useCollectionData(q)

    function addItem(itemContent) {
        const uniqueId = generateUniqueID()
        setDoc(doc(props.collectionRef, uniqueId), {
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
        const ref = doc(props.collectionRef, id)
        updateDoc(ref, {completed : newVal});
    }

    function handleChangeContent(id, text) {
        setDoc(doc(props.collectionRef, id), {
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
        temp.forEach(item => deleteDoc(doc(props.collectionRef, item.id)));
    }

    function deleteItem(id) {
        deleteDoc(doc(props.collectionRef, id));
    }

    function quadrogglePriority(id) {
        let item = toDoItems.filter(p => p.id === id)[0];
        if (item.priority === 3) {
            setDoc(doc(props.collectionRef, id), {priority: 0}, {merge: true})
        } else {
            setDoc(doc(props.collectionRef, id), {priority: item.priority + 1}, {merge: true})
        }
    }

    function getNumCompletedItems(){
        let temp = toDoItems.filter(p => p.completed === true);
        return temp.length
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

    if (loading) {
        return (<h3> loading items ... </h3>)
    } else if (error) {
        return (<h3> an error occurred </h3>)
    } else {
        toDoItems.sort(compareValues(sortBy, sortAscending))

        let uncompletedItems = toDoItems.filter(checkCompleted)

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

export default ToDoList;