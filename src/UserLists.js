import "./userLists.css"
import ToDoList from "./ToDoList";
import {collection, deleteDoc, doc, query, setDoc, where} from "firebase/firestore";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {useState} from "react";
import {signOut, sendEmailVerification} from "firebase/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";
import UserListsHeader from "./UserListsHeader";

function UserLists(props) {
    const q = query(props.collectionRef,
        where("owner", "==", props.user.uid));

    const [lists, loading, error] = useCollectionData(q)

    const [listID, setListID] = useState("")
    const [listTitle, setListTitle] = useState("")

    function addList(title) {
        const uniqueId = generateUniqueID()
        setDoc(doc(props.collectionRef, uniqueId), {
            ID: uniqueId,
            Title: title,
            owner: props.user.uid,
            canView: [props.user.uid],
            canEdit: [props.user.uid]
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

    if (loading) {
        return (<h3 aria-label="loading lists"> loading lists ... </h3>)
    } else if (error) {
        return (<h3 aria-label="an error occurred"> an error occurred </h3>)
    } else {
        if (listID === "") {
            return (
                <div>
                <span>
                    <UserListsHeader email={props.user.email} auth={props.auth} emailVerified = {props.user.emailVerified}/>
                </span>
                    <ul>
                        {lists.length === 0 && <small>No Lists</small>}
                        {lists.map(p =>
                            <li className={"listItem"}>
                                <button aria-label={p.Title + " ,click to enter " + p.Title}
                                        className="listButton"
                                        onClick={() => switchList(p.ID, p.Title)}>{p.Title}</button>
                                <button aria-label={"share " + p.Title}
                                        className={"shareListButton"}>👤</button>
                                <button aria-label={"delete " + p.Title}
                                        className="deleteListButton"
                                        onClick={() => deleteList(p.ID)}> +
                                </button>
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
}

export default UserLists;