import "./userLists.css"
import ToDoList from "./ToDoList";

import {collection, deleteDoc, doc, query, setDoc, where} from "firebase/firestore";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {useState} from "react";
import {useCollectionData} from "react-firebase-hooks/firestore";
import UserListsHeader from "./UserListsHeader";
import SharePopUp from "./SharePopUp";
import AlertPage from "./AlertPage";

function UserLists(props) {
    const q = query(props.collectionRef,
        where("owner", "==", props.user.email));

    const q2 = query(props.collectionRef,
        where("canView", "array-contains", props.user.email));

    const [lists, loading, error] = useCollectionData(q)

    const [sharedLists] = useCollectionData(q2)

    const [listID, setListID] = useState("")
    const [listTitle, setListTitle] = useState("")

    function addList(title) {
        const uniqueId = generateUniqueID()
        setDoc(doc(props.collectionRef, uniqueId), {
            ID: uniqueId,
            Title: title,
            owner: props.user.email,
            canView: [props.user.email],
            canEdit: [props.user.email]
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

    const [displayShare, setDisplayshare] = useState(false);

    function toggleSharePopup(id) {
        // let list = lists.filter(p => p.ID === id)[0]
        // setDoc(doc(props.collectionRef, id), {
        //     displayShare: !list.displayShare
        // }, {merge: true})
        setDisplayshare(!displayShare)
        setlistPopupID(id)
    }

    const [showAlert, setShowAlert] = useState(false);
    const [showAlertShared, setShowAlertShared] = useState(false);

    function showShareList(id) {
        setShowAlert(true)
        setlistPopupID(id)
    }

    function showShareListShared(id) {
        setlistPopupID(id)
        setShowAlertShared(true)
    }

    const [listPopupID, setlistPopupID] = useState("");

    function deleteViewer(email) {
        let list = lists.filter(p => p.ID === listPopupID)[0] || sharedLists.filter(p => p.ID === listPopupID)[0];
        setDoc(doc(props.collectionRef, listPopupID), {
            canView: list.canView.filter(p => p !== email),
            canEdit: list.canEdit.filter(p => p !== email)
        }, {merge: true})
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
                    <UserListsHeader email={props.user.email} auth={props.auth}
                                     user={props.user}
                                     emailVerified={props.user.emailVerified}/>
                </span>
                    <ul>
                        {lists.length === 0 && <small>No Lists</small>}
                        {lists.filter(p => p.owner === props.user.email).map(p =>
                            <li className={"listItem"}>
                                <button aria-label={p.Title + " ,click to enter " + p.Title}
                                        className="listButton"
                                        onClick={() => switchList(p.ID, p.Title)}>{p.Title}</button>
                                {props.user.emailVerified &&
                                    <button aria-label={"share " + p.Title}
                                            className={"shareListButton"}
                                            onClick={() => toggleSharePopup(p.ID)}>👤
                                    </button>
                                }
                                <button aria-label={"delete " + p.Title}
                                        className="deleteListButton"
                                        onClick={() => showShareList(p.ID)}> +
                                </button>
                            </li>
                        )}
                        <p onClick={() => addList("New List")}
                           className="empty">
                            <button aria-label="add a new list " className="addListButton">+</button>
                        </p>
                        {displayShare &&
                            <SharePopUp
                                list={lists.filter(p => p.ID === listPopupID)[0] || sharedLists.filter(p => p.ID === listPopupID)[0]}
                                listId={listPopupID}
                                toggleSharePopup={toggleSharePopup}
                                userEmail={props.user.email}
                                collectionRef={props.collectionRef}
                                deleteViewer={deleteViewer}
                            />}
                        {showAlert &&
                            <AlertPage onDeleteCompleted={deleteList}
                                       showAlert={showAlert}
                                       onShowAlert={setShowAlert}
                                       listID={listPopupID}
                                       message={"Are you sure you want to delete this list, for you and everyone it is shared with?"}
                            />}
                    </ul>
                    <h3> shared with me </h3>
                    {sharedLists ?
                        <ul>
                            {sharedLists.length === 0 && <small>No Lists Shared with you</small>}
                            {sharedLists.filter(p => p.owner !== props.user.email).map(p =>
                                <li className={"listItem"}>
                                    <button aria-label={p.Title + " ,click to enter " + p.Title}
                                            className="listButton"
                                            onClick={() => switchList(p.ID, p.Title)}>{p.Title}</button>
                                    <button aria-label={"delete " + p.Title}
                                            className="deleteListButton"
                                            onClick={() => showShareListShared(p.ID)}> +
                                    </button>
                                </li>
                            )}
                            {showAlertShared &&
                                <AlertPage onDeleteCompleted={deleteViewer}
                                           email={props.user.email}
                                           showAlert={showAlertShared}
                                           onShowAlert={setShowAlertShared}
                                           listID={listPopupID}
                                           message={"Are you sure you want to delete this list from your view?"}
                                />}
                        </ul> : <ul><small> verify your email to view lists shared with you </small></ul>
                    }
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
                    email={props.user.email}
                    list={lists.filter(p => p.ID === listID)[0] || sharedLists.filter(p => p.ID === listID)[0]}
                />
            )
        }
    }
}

export default UserLists;