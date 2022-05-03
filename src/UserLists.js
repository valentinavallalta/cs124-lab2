import "./userLists.css"
import ToDoList from "./ToDoList";
import {collection, deleteDoc, doc, setDoc} from "firebase/firestore";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {useState} from "react";

function UserLists(props) {
    const [listID, setListID] = useState("")
    const [listTitle, setListTitle] = useState("")

    function addList(title) {
        const uniqueId = generateUniqueID()
        setDoc(doc(props.collectionRef, uniqueId), {
            ID: uniqueId,
            Title: title
        })
    }

    function deleteList(id) {
        deleteDoc(doc(props.collectionRef, id));
    }

    function switchList(id, title) {
        setListID(id)
        setListTitle(title)
    }

    function changeTitle(id, title) {
        setDoc(doc(props.collectionRef, id), {
            Title: title
        }, {merge: true})
        setListTitle(title)
    }

    if (listID === "") {
        return (
            <div>
                <h3 aria-label="Lists"> Lists </h3>
                <ul>
                    {props.lists.length === 0 && <small>No Lists</small>}
                    {props.lists.map(p =>
                        <li className={"listItem"}>
                            <button aria-label={p.Title + " ,click to enter " + p.Title}
                                    className="listButton" onClick={() => switchList(p.ID, p.Title)}>{p.Title}</button>
                            <button aria-label={"delete " + p.Title}
                                    className = "deleteListButton"
                                    onClick={() => deleteList(p.ID)}> + </button>
                        </li>
                    )}
                    <p onClick={() => addList("New List")}
                       className="empty">
                        <button aria-label="add a new list " className="addListButton">+</button>
                    </p>
                </ul>
            </div>
        )
    } else {

        const listCollectionRef = collection(props.collectionRef, listID, "tasks")

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

export default UserLists;