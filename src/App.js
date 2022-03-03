import './App.css';
import List from "./List";
import Header from "./Header";
import {useState} from 'react';

const data = [
    {
        id: 1,
        content: "add an item here"
    },
    {
        id: 2,
        content: "add an "
    }
]

let counter = 3;

function App() {

    const [toDoItems, setToDoItems] = useState(data);
    const [completedItemIDs, setCompletedItemIDs] = useState([]);

    function addItem(itemContent) {
        setToDoItems([...toDoItems,{id: counter, content: itemContent}])
        counter++;
        console.log(counter)
    }

    function toggleItemCompleted(id) {
        if (completedItemIDs.includes(id)) {
            setCompletedItemIDs(completedItemIDs.filter(p => p!== id))
        }
        else {
            setCompletedItemIDs([...completedItemIDs, id]);
        }
    }

    function handleChangeContent(id, text) {
        setToDoItems(toDoItems.map(
            p => p.id === id ? {...p, content: text} : p
        ))
    }

    /* FUNCTION THAT SETS TODO ITEMS - DELETES COMPLETED ITEMS  */

    /* FUNCTION TODO TOGGLE (?) SHOW/HIDE COMPLETED */

    return (
        <div className="App">
            <Header></Header>
            <List items = {toDoItems}
                  completedItems = {completedItemIDs}
                  onAddItem = {addItem}
                  onItemCompleted = {toggleItemCompleted}
                  onContentChange = {handleChangeContent}
            ></List>
        </div>
  );
}

export default App;
