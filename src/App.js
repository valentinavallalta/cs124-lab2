import './App.css';
import List from "./List";
import Header from "./Header";
import {useState} from 'react';

const data = [
    // {
    //     id: 1,
    //     content: "add an item here"
    // },
    // {
    //     id: 2,
    //     content: "add an "
    // }
    {
        id: 1,
        content: ""
    }
]

let counter = 3;

function App() {

    const [toDoItems, setToDoItems] = useState(data);
    const [completedItemIDs, setCompletedItemIDs] = useState([]);

    function addItem(itemContent) {
        setToDoItems([...toDoItems, {id: counter, content: itemContent}])
        counter++;
        console.log(counter)
    }

    function toggleItemCompleted(id) {
        if (completedItemIDs.includes(id)) {
            setCompletedItemIDs(completedItemIDs.filter(p => p !== id))
        } else {
            setCompletedItemIDs([...completedItemIDs, id]);
        }
    }

    function handleChangeContent(id, text) {
        setToDoItems(toDoItems.map(
            p => p.id === id ? {...p, content: text} : p
        ))
    }

    const [completedDisplay, setCompletedDisplay] = useState(true)

    function toggleCompletedDisplay() {
        setCompletedDisplay(!completedDisplay)
    }

    function checkCompleted(item) {
        return !(completedItemIDs.includes(item.id))
    }

    let uncompletedItems = toDoItems.filter(checkCompleted)

    function deleteCompleted() {
        let newToDoItems = toDoItems.filter(checkCompleted)
        if (newToDoItems.length === 0) {
            setToDoItems(data)
        }
        else {
            setToDoItems(newToDoItems)
        }
        setCompletedItemIDs([])
    }

    function deleteItem(id) {
        let newToDoItems = toDoItems.filter(p => p.id !== id)
        if (newToDoItems.length === 0) {
            setToDoItems(data)
        }
        else {
            setToDoItems(newToDoItems)
        }
        setCompletedItemIDs(completedItemIDs.filter(p => p !== id))
    }

    /* FUNCTION THAT SETS TODO ITEMS - DELETES COMPLETED ITEMS  */

    /* FUNCTION TODO TOGGLE (?) SHOW/HIDE COMPLETED */

    return (
        <div className="App">
            <Header
                toggleCompletedDisplay={toggleCompletedDisplay}
                completedDisplay={completedDisplay}
                onDeleteCompleted={deleteCompleted}
                numCompletedItems={completedItemIDs.length}
            >
            </Header>
            <List default={data}
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

export default App;
